import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

import FontIcon from 'material-ui/FontIcon';

import { red500, amber500, blue500, indigo500, green500, lightGreen800, grey900, white } from 'material-ui/styles/colors';

// consider using themr instead => import { themr } from 'react-css-themr';
import style from './style.pcss';

const labelNames = (id) => {
  switch(id) {
    case '11':
      return 'Front Left';
    case '12':
      return 'Front Right';
    case '21':
      return 'Rear Left';
    case '22':
      return 'Rear Right';
  }
  return 'unknown';
};

class Tyre extends Component {

  static propTypes = {

    id: PropTypes.string.isRequired,  // -  will it be a string ???

    // pressure value
    pressure: PropTypes.number.isRequired,
    over: PropTypes.bool.isRequired,
    under: PropTypes.bool.isRequired,

    // depth to display
    depth: PropTypes.number.isRequired,
    legal: PropTypes.bool.isRequired,

    // was it a good read
    good: PropTypes.bool.isRequired,

    // units: PropTypes.PropTypes.shape({
    //   pressure: PropTypes.string.isRequired,
    //   depth: PropTypes.string.isRequired,
    // }),

    // function callback (optional) when tyre clicked
    onClick: PropTypes.func,  // eslint-disable-line react/require-default-props
  }

  // static defaultProps = {
  //   fullDepth: 10,
  // }

  onClicked = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  polarToCartesian(cx, cy, radius, angleInDegrees) {
    let angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    return {
      x: cx + (radius * Math.cos(angleInRadians)),
      y: cy + (radius * Math.sin(angleInRadians))
    };
  }

  describeArc(x, y, radius, spread, startAngle, endAngle) {
    let innerStart = this.polarToCartesian(x, y, radius, endAngle);
    let innerEnd = this.polarToCartesian(x, y, radius, startAngle);
    let outerStart = this.polarToCartesian(x, y, radius + spread, endAngle);
    let outerEnd = this.polarToCartesian(x, y, radius + spread, startAngle);
    let largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    let d = [
      'M', outerStart.x, outerStart.y,
      'A', radius + spread, radius + spread, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
      'L', innerEnd.x, innerEnd.y,
      'A', radius, radius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      'L', outerStart.x, outerStart.y, 'Z'
    ].join(' ');

    return d;
  }

  buildDonutAlt(pressure, top, maxPressure, minPressure, bottom, depth, fullDepth, good, theme) {
    // center point will be a at 100,100
    const cx=100, cy=100;

    const range = top - bottom;
    const offset = pressure - bottom;
    const p = (offset / range); // + bottom;

    // const depthText = `${this.convertDepthUnits(depth)} ${this.props.units.depth}`;
    // const pressureText = `${this.convertPressureUnits(pressure)} ${this.props.units.pressure}`;

    const arcPath = this.describeArc(cx, cy, 75, 20, 0, p * 360);

    return (
      <svg className="donut-chart" width="100%" height="100%" viewBox={`0 0 ${cx*2} ${cy*2}`}>
        <path d={arcPath} fill={indigo500} />
      </svg>
    );
  }

  // SVG will scale to fit the size we put it in anyway,
  // lets make everything scalable to a 100% by 100% box
  // So let use some fixed values to make display easier
  // So just draw a guage with width and height of 200px
  // and put it inside a view box aslo of 200px by 200px
  buildDonut(pressure, top, maxPressure, minPressure, bottom, depth, fullDepth, good, theme) {

    // center point will be a at 100,100
    const cx=100, cy=100;

    // Pressure is in the range defined here
    const range = top - bottom;
    const offset = pressure - bottom;
    const p = (offset / range); // + bottom;

    let color1 = red500;
    let color2 = grey900;
    let color3 = red500;

    // where the guage starts (in the 100px radius)
    const guageEdge = 40;

    // 4px per mm + minimum of 0px
    // effectively supports a depth upto 10mm
    // (who cares after that much rubber anyway)
    let treadDepth = depth * 4; // + 10;

    // Limit depth of tread on info-graphic to 40px
    const maxDepth = 40;
    if (treadDepth > maxDepth) {
      treadDepth = maxDepth;
    }

    let treadColor = '#212121';
    if(treadDepth < 12) {
      treadColor = '#b71c1c';
    } else if(treadDepth < 20) {
      treadColor = '#FFC107';
    }

    // where the rubber goes (max of 40px so start at 60px out from centre)
    const tyrePath = this.describeArc(cx, cy, 60, treadDepth, 25, 335);  // 240 degrees wide

    // describe an arc
    // const arcPath1 = this.describeArc(cx, cy, guageEdge, 20, 0, pressureDegrees);

    // width of 20px and needs to end at 60px so put them at 40px from centre
    const arcPath1 = this.describeArc(cx, cy, guageEdge, 20, 60, 120);   //  60 degrees wide
    const arcPath2 = this.describeArc(cx, cy, guageEdge, 20, 120, 240);  // 120 degrees wide
    const arcPath3 = this.describeArc(cx, cy, guageEdge, 20, 240, 300);  //  60 degrees wide

    // ouside 'dashed' line is this maximum thickness
    const thinLine = 2;

    const depthText = `${this.convertDepthUnits(depth)} ${this.props.units.depth}`;
    const pressureText = `${this.convertPressureUnits(pressure)} ${this.props.units.pressure}`;

    // describe a needle being 55px long and 10 px @ its' base
    // so as to hit the guage sweep which is between 40 - 60px
    // 'M 100 105 L 155 100 L 100 95'
    const needlePath =  `M ${cx} ${cy+5} L ${cx+55} ${cy} L ${cx} ${cy-5}`;

    // rotate the needle inside its sweep of 240 degrees
    const needleStyle = this.rotateNeedle(cx,cy,p,240);

    let depthTextColor = good ? grey900 : red500;

    return (
      <svg className="donut-chart" width="100%" height="100%" viewBox={`0 0 ${cx*2} ${cy*2}`}>

        <defs>
          <filter id="shadow">
            <feOffset dx="0" dy="3" />
            <feGaussianBlur result="offset-blur" stdDeviation="5" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="black" floodOpacity="0.2" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
          <filter x="0" y="0" width="1" height="1" id="solid">
            <feFlood floodColor="#e5e5e5"/>
            <feComposite in="SourceGraphic" />
          </filter>

        </defs>

        <circle
          className="tyre-limits"
          cx={cx}
          cy={cy}
          r="100"
          stroke="#616161"
          fill="rgba(0,0,0,0.1)"
          strokeDasharray="4 4"
          strokeWidth={thinLine}
        />

        <circle
          className="background"
          cx={cx}
          cy={cy}
          r={60}
          fill="white"
        />

        <path d={tyrePath} fill={treadColor} stroke="darkGray" filter="url(#shadow)" />

        <path d={arcPath1} fill={color1} stroke={color1} filter="url(#shadow)" />
        <path d={arcPath2} fill={color2} stroke={color2} filter="url(#shadow)" />
        <path d={arcPath3} fill={color3} stroke={color3} filter="url(#shadow)" />

        <g className='needleset' transform={needleStyle}>
          <circle className='needle-center' cx={cx} cy={cy} r='5'></circle>
          <path className='needle' d={needlePath}></path>
        </g>

        <g
          className="tyre-text">
          <text
            x="50%"
            y="18%"
            textAnchor="middle"
            filter="url(#solid)"
            fill={depthTextColor}
            style={{ fontFamily: 'Helvetica arial', fontSize: 20 }}>
            {depthText}
          </text>
          <text
            x="50%"
            y="38%"
            textAnchor="middle"
            style={{ fontFamily: 'Helvetica arial', fontSize: 20 }}>
            {pressureText}
          </text>
        </g>

      </svg>
    );
  }

  // render the editable value
  render() {
    const {
      id,
      pressure,
      over,
      under,
      units,      // removing from ...rest

      depth,
      legal,
      good,

      onClick,    // eslint-disable-line react/require-default-props, no-unused-vars
      dispatch,   // removing from ...rest

      ...rest
    } = this.props;

    // build the SVG do-nut chart
    // const tyre = this.buildDonut(pressure, top, upper, lower, bottom, depth, fullDepth, good, theme);
    // const tyre = this.buildDonutAlt(pressure, top, upper, lower, bottom, depth, fullDepth, good, theme);

    const background = (under || over) ? red500 : green500;

    let overUnderIndicator;
    if (under || over) {
      overUnderIndicator = (
        <div className={`${ under ? style.under : style.over}`}>
          <FontIcon color={white} className="material-icons" style={{ fontSize:24 }} >error</FontIcon>
        </div>
      );
    }

    return (
      <div className={style.scaledTyre} onClick={this.onClicked}>
        <div className={style.circle} style={{ backgroundColor:background }}>
          <div className={style.pressureText}>
            {pressure}
          </div>
          <div className={style.unitsText}>
            psi
          </div>
        </div>
        {overUnderIndicator}
      </div>
    );
  }
}

// export default connect()(Tyre);
export default Tyre;
