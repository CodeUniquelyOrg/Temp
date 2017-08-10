import React, { Component } from 'react';  // eslint-disable-line no-unused-vars
import PropTypes from 'react-proptypes';   // eslint-disable-line no-unused-vars
// import { connect } from 'react-redux';

// consider using themr instead => import { themr } from 'react-css-themr';
import style from './style.pcss';

const defaultColours = {
  red: '#e53935',
  amber: '#ffd54f',
  green: '#8bc34a',
  blue: '#72bcd4',
};

// const Wrapper = props => (
//   <div onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} style={props.style} className={props.className}>
//     {props.children}
//   </div>
// );

// const ToolTipWrapper = Tooltip(Wrapper);

// const ToolTipRag = ({ tooltip, ...props }) => (
//   <ToolTipWrapper tooltip={tooltip} {...props}>
//     <Rag {...props}/>
//   </ToolTipWrapper>
// );

// const mapStateToProps = (state)  => {
//   return {
//     authenticated: state.auth.authenticated,
//   };
// };

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
    // id: PropTypes.oneOfType([
    //   PropTypes.string,
    //   PropTypes.number,
    // ]).isRequired,

    // Circle value
    pressure: PropTypes.number.isRequired,

    // AMBER value
    depth: PropTypes.number.isRequired,

    // optionally where is the outer limit of te tyre
    fullDepth: PropTypes.number,

    // First line of text under the Circle
    // label: PropTypes.string.isRequired,

    // maximum allowed presssure
    top: PropTypes.number.isRequired,

    // upper pressure limit for tyre
    upper: PropTypes.number.isRequired,

    // lower pressure limit for tyre
    lower: PropTypes.number.isRequired,

    // minimum allowed presssure
    bottom: PropTypes.number.isRequired,

    // deviation
    sigma: PropTypes.number.isRequired,

    units: PropTypes.PropTypes.shape({
      pressure: PropTypes.string.isRequired,
      depth: PropTypes.string.isRequired,
    }),

    // function callback (optional) when tyre clicked
    onClick: PropTypes.func,  // eslint-disable-line react/require-default-props

    // PCSS Object, similar code style as react toolbox allowing
    // for Tyre color overrides and size overrides
    theme: PropTypes.object,

    // Link - where to go to get MORE information about this tyre
    linkTo: PropTypes.string,
  }

  static defaultProps = {
    fullDepth: 10,
    theme: undefined,
    linkTo: '#',
    units: {
      pressure: 'PSI',
      depth: 'mm',
    },
  }

  onClicked = (/* event */) => {
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

  rotateNeedle(cx,cy, value, range) {
    if (value < 0 || value > 1) {
      return false;
    }

    // Has value => 0-100% which will sweep over [range] degrees
    // from the right hand side to the left hand side
    const degrees = (value * range) + ((180 - range) / 2);

    return `rotate(${degrees} ${cx} ${cy})`;
  }

  convertPressureUnits(pressure) {
    const {
      units,
    } = this.props;

    if (units.pressure === 'PSI') {
      return Math.round(pressure * 0.145038,0);
    } else if ( units.pressure === 'bar') {
      return Math.round(pressure * 0.01,2);
    }
    return Math.round(pressure,0);
  }

  convertDepthUnits(depth) {
    const {
      units,
    } = this.props;

    if (units.depth === '1/32"') {
      return Math.round(depth * 1.259842519685037,2);
    }
    return Math.round(depth,0);
  }

  // SVG will scale to fit the size we put it in anyway,
  // lets make everything scalable to a 100% by 100% box
  // So let use some fixed values to make display easier
  // So just draw a guage with width and height of 200px
  // and put it inside a view box aslo of 200px by 200px
  buildDonut(pressure, top, maxPressure, minPressure, bottom, depth, fullDepth, theme) {

    // center point will be a at 100,100
    const cx=100, cy=100;

    // Pressure is in the range defined here
    const range = top - bottom;
    const offset = pressure - bottom;
    const p = (offset / range); // + bottom;

    let color1 = theme && theme.error || '#f44336';
    let color2 = theme && theme.error || '#8BC34A';
    let color3 = theme && theme.error || '#f44336';

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
          fill="transparent"
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

  getColor(name, theme) {
    return theme && theme[name] ? theme[name] : defaultColours[name];
  }

  // render the editable value
  render() {
    const {
      id,
      pressure,
      depth,
      top,
      upper,
      lower,
      bottom,
      onClick,    // eslint-disable-line react/require-default-props, no-unused-vars
      linkTo,
      fullDepth,
      theme,
      units,      // removing from ..other
      sigma,      // removing from ..other
      dispatch,   // removing from ..other

      ...other
    } = this.props;

    // build the SVG do-nut chart
    const tyre = this.buildDonut(pressure, top, upper, lower, bottom, depth, fullDepth, theme);

    //
    // Styling in Code
    //
    /*
    // this WILL chnage the size of the guage
    const wrapperStyle = {
      width: '160px',
      height: '160px',
      backgroundColor: 'rgba(0,0,0,0.1)',
      borderRadius: '50%',
    };

    // This will SCALE the guage to that size
    const svgStyle = {
      width: '100%',
      height: '100%',
      position: 'absolute',
      cursor: 'pointer',
    };
    */

    return (
      <div key={id} className={style.scaledTyre} onClick={this.onClicked}>
        <div className={style.svg} >
          {tyre}
        </div>
      </div>
    );
  }
}

// export default connect()(Tyre);
export default Tyre;

