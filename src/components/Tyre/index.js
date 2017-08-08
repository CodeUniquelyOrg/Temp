import React, { Component } from 'react';  // eslint-disable-line no-unused-vars
import PropTypes from 'react-proptypes';   // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
// import * as actions from 'actions';

// consider using themr instead => import { themr } from 'react-css-themr';

// import tyreStyle from './style.pcss';
const tyreStyle = {};

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

class Tyre extends Component {

  static propTypes = {

    // id: PropTypes.string.isRequired,  -  will it be a string ???

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
    label: PropTypes.string.isRequired,

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

    // will value = 0-100% which will sweep over 180 degrees
    // from the right hand sie tot he left hand side
    const degrees = (value * range) + ((180 - range) / 2);

    // return {
    //   // transform: rotate(30deg);
    //   transform: `rotate(${degrees}deg)`,
    //   transformOrigin: `${cx}px ${cy}px`
    // };

    // return {};

    // => `M ${cx} ${cy+5} L ${cx+55} ${cy} L ${cx} ${cy-5}`;
    //
    // ( rect-x + (rect-width/2) , rect-y + (rect-height/2) )
    // return `translate(${cx},${cy}) rotate(${degrees} ${cx} ${cy})`;
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
  // An overall width/height of 100px
  // A view box of 100 by 100
  buildDonut(pressure, top, maxPressure, minPressure, bottom, depth, fullDepth, theme) {

    const factor = 200 / 42;
    const cx=100, cy=100;

    // 238.0952380952381
    const upper = 100 * factor;

    // 15.91549430918954  => // 37.89403406949889
    const radius = upper / (Math.PI * 2);

    // Pressure in the range
    const range = top - bottom;
    const offset = pressure - bottom;
    const p = (offset / range); // + bottom;

    // Maximum pressure
    // const bigPressure = maxPressure + minPressure; // ((maxPressure / 0.70) + (minPressure / 0.30)) / 2;
    // const p = (pressure / bigPressure);

    // let color;
    // if ( pressure > maxPressure || pressure < minPressure ) {
    //   color = theme && theme.error || '#e53935';
    // } else {
    //   color = theme && theme.ok || '#72bcd4';
    // }

    let color1 = theme && theme.error || '#e53935';
    let color2 = theme && theme.error || '#8bc34a';
    let color3 = theme && theme.error || '#e53935';

    // const wornAway = radius - (10 - depth);
    // const sideWall = radius - 20;
    const guageEdge = 40; // sideWall - 20;  // guage will be 20 wide

    // const maxTreadPath = this.describeArc(cx, cy, 60, depth + 10, 0, 359.99999);  // 120 degrees wide

    // 4px per mm + minimum of 0px
    // effectively supports a depth upto 10mm
    // (who cares after that much rubber anyway)
    let treadDepth = depth * 4; // + 10;

    // Limit depth on info-graphic
    const maxDepth = 40;
    if (treadDepth > maxDepth) {
      treadDepth = maxDepth;
    }

    let treadColor = '#000';
    if(treadDepth < 12) {
      treadColor = '#e53935';
    } else if(treadDepth < 20) {
      treadColor = '#ffd54f';
    }

    // where the rubber goes
    const tyrePath = this.describeArc(cx, cy, 60, treadDepth, 25, 335);  // 240 degrees wide

    // describe an arc
    // const arcPath1 = this.describeArc(cx, cy, guageEdge, 20, 0, pressureDegrees);
    const arcPath1 = this.describeArc(cx, cy, guageEdge, 20, 60, 120);   //  60 degrees wide
    const arcPath2 = this.describeArc(cx, cy, guageEdge, 20, 120, 240);  // 120 degrees wide
    const arcPath3 = this.describeArc(cx, cy, guageEdge, 20, 240, 300);  //  60 degrees wide

    // ouside 'dashed' line is this maximum thickness
    const thinLine = 2;

    const depthText = `${this.convertDepthUnits(depth)} ${this.props.units.depth}`;
    const pressureText = `${this.convertPressureUnits(pressure)} ${this.props.units.pressure}`;

    // roate the needle using css-Transforms
    const needleStyle = this.rotateNeedle(cx,cy,p,240);

    // describe a nedles 120 px long
    // 'M 100 95 L 60 100 L 100 105'
    const needlePath =  `M ${cx} ${cy+5} L ${cx+55} ${cy} L ${cx} ${cy-5}`;

    // <circle
    //   className="worn-limit"
    //   cx={cx}
    //   cy={cy}
    //   r={radius - thinLine}
    //   fill="white"
    // />

    // <circle
    //   className="rubber-limit"
    //   cx={cx}
    //   cy={cy}
    //   r={wornAway}
    //   fill="black"
    // />

    // <circle
    //   className="guage-area"
    //   cx={cx}
    //   cy={cy}
    //   r={sideWall}
    //   fill="white"
    // />

    // <circle
    //   className="hole"
    //   cx={cx}
    //   cy={cy}
    //   r={guageEdge}
    //   fill="white"
    // />

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
          stroke="#999"
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

  // getFillColor(red, amber, green, theme) {
  //   if (reflect) {
  //     if (red === 0 && amber === 0) {
  //       return this.getColor('green', theme);
  //     }
  //     if (red === 0 && green === 0) {
  //       return this.getColor('amber', theme);
  //     }
  //     if (amber === 0 && green === 0) {
  //       return this.getColor('red', theme);
  //     }
  //   }
  //   if (theme && theme.fill) {
  //     return theme.fill;
  //   }
  //   return '#616161';
  // }

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

    // what is the fill colour;
    // const fill = this.getFillColor(red, amber, green, reflect, theme);

    // build the SVG do-nut chart
    const tyre = this.buildDonut(pressure, top, upper, lower, bottom, depth, fullDepth, theme);

    //
    // Styling in Code
    //

    const wrapperStyle = {
      width: '160px',
      height: '160px',
      backgroundColor: 'rgba(0,0,0,0.1)',
      borderRadius: '50%',
    };

    const svgStyle = {
      width: '100%',
      height: '100%',
      position: 'absolute',
      cursor: 'pointer',
    };

    // const presureStyle = {
    //   lineHeight: '24px',
    //   textAlign: 'center',
    //   fontWeight: '700',
    //   overflow: 'hidden',
    //   whiteSpace: 'no-wrap',
    //   verticalAlign: 'middle',
    //   color: '#323233',
    // };

    // const depthStyle = {
    //   lineHeight: '24px',
    //   textAlign: 'center',
    //   fontWeight: '700',
    //   overflow: 'hidden',
    //   whiteSpace: 'no-wrap',
    //   verticalAlign: 'middle',
    //   color: '#323233',
    // };

    const tyreSvg = (
      <div className={tyreStyle.svg} style={wrapperStyle} >
        {tyre}
      </div>
    );

    // const text = (
    //   <div className="tyreText" style={textStyle}>
    //     <div className="pressure" style={presureStyle}>{pressure}</div>
    //     <div className="depth" style={depthStyle}>{depth}</div>
    //   </div>
    // );
    // {text}

    return (
      <div key={id} className={tyreStyle.wrapper} style={svgStyle} {...other} onClick={this.onClicked}>
        {tyreSvg}
      </div>
    );
  }
}

export default connect()(Tyre);
