import React, { Component } from 'react';  // eslint-disable-line no-unused-vars
import PropTypes from 'react-proptypes';   // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
// import * as actions from 'actions';

// consider using themr instead => import { themr } from 'react-css-themr';
// import style from './style.pcss';

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

const mapStateToProps = (state)  => {
  return {
    authenticated: state.auth.authenticated,
  };
};

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

    // function callback (optional) when tyre clicked
    onClick: PropTypes.func,  // eslint-disable-line react/require-default-props

    // PCSS Object, similar code style as react toolbox allowing
    // for Tyre color overrides and size overrides
    theme: PropTypes.object,

    // Link - where to go to get MORE information about this tyre
    linkTo: PropTypes.string,
  }

  static get defaultProps() {
    return {
      fullDepth: 10,
      theme: undefined,
      linkTo: '#',
    };
  }

  onClicked = (/* event */) => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  polarToCartesian(cx, cy, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    return {
      x: cx + (radius * Math.cos(angleInRadians)),
      y: cy + (radius * Math.sin(angleInRadians))
    };
  }

  describeArc(x, y, radius, spread, startAngle, endAngle) {
    var innerStart = this.polarToCartesian(x, y, radius, endAngle);
    var innerEnd = this.polarToCartesian(x, y, radius, startAngle);
    var outerStart = this.polarToCartesian(x, y, radius + spread, endAngle);
    var outerEnd = this.polarToCartesian(x, y, radius + spread, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    var d = [
      'M', outerStart.x, outerStart.y,
      'A', radius + spread, radius + spread, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
      'L', innerEnd.x, innerEnd.y,
      'A', radius, radius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      'L', outerStart.x, outerStart.y, 'Z'
    ].join(' ');

    return d;
  }

  // SVG will scale to fit the size we put it in anyway,
  // lets make everything scalable to a 100% by 100% box
  // So let use some fixed values to make display easier
  // An overall width/height of 100px
  // A view box of 100 by 100
  buildDonut(pressure, depth, fullDepth, theme) {

    const factor = 200 / 42;
    const cx=100, cy=100;

    // 238.0952380952381
    const upper = 100 * factor;

    // 15.91549430918954  => // 37.89403406949889
    const radius = upper / (Math.PI * 2);

    // Maximum pressure
    const bigPressure = 45;

    // limits
    const minPressure = 0.65;
    const maxPressure = 0.85;

    // HACK
    const p = (pressure / bigPressure);

    let color;
    if ( p > maxPressure || p < minPressure ) {
      color = theme && theme.error || '#e53935';
    } else {
      color = theme && theme.ok || '#72bcd4';
    }

    const wornAway = radius - (10 - depth);
    const sideWall = radius - 20;
    const guageEdge = sideWall - 20;  // guage will be 20 wide

    // const zeroOffset = shiftBack90Degrees;
    const pressureDegrees = 360 * p;
    console.log( pressureDegrees ); // eslint-disable-line no-console

    // describe an arc
    const arcPath = this.describeArc(cx, cy, guageEdge, 20, 0, pressureDegrees);

    // ouside sashed line is this thick
    const thinLine = 2;

    return (
      <svg className="donut-chart" width="100%" height="100%" viewBox={`0 0 ${cx*2} ${cy*2}`}>

        <circle
          className="tyre-limits"
          cx={cx}
          cy={cy}
          r={radius}
          stroke="#999"
          fill="transparent"
          strokeDasharray="4 4"
          strokeWidth={thinLine}
        />

        <circle
          className="worn-limit"
          cx={cx}
          cy={cy}
          r={radius - thinLine}
          fill="white"
        />

        <circle
          className="rubber-limit"
          cx={cx}
          cy={cy}
          r={wornAway}
          fill="black"
        />

        <circle
          className="guage-area"
          cx={cx}
          cy={cy}
          r={sideWall}
          fill="#eee"
        />

        <circle
          className="hole"
          cx={cx}
          cy={cy}
          r={guageEdge}
          fill="white"
        />

        <path d={arcPath} fill={color} stroke={color} />

        <g
          className="tyre-text">
          <text
            x="40%"
            y="50%"
            style={{ fontFamily: 'Helvetica arial', fontSize: 20, width:(radius*2), textAlign:'center' }}
            className="pressure-text">
            {`${pressure} psi`}
          </text>
          <text
            x="40%"
            y="60%"
            style={{ fontFamily: 'Helvetica arial', fontSize: 20, width:(radius*2), textAlign:'center' }}
            className="depth-text">
            {`${depth} mm`}
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
      onClick,  // eslint-disable-line react/require-default-props, no-unused-vars
      linkTo,   // eslint-disable-line no-unused-vars
      fullDepth,
      theme,
      ...other
    } = this.props;

    // what is the fill colour;
    // const fill = this.getFillColor(red, amber, green, reflect, theme);

    // build the SVG do-nut chart
    const tyre = this.buildDonut(pressure, depth, fullDepth, theme);

    //
    // Styles
    //

    const wrapperStyle = {
      width: '200px',
      height: '200px',
      backgroundColor: 'rgba(0,0,0,0.1)',
      borderRadius: '50%',
    };

    const containerStyle = {
      position: 'absolute',
      top: '0',
      // bottom: '20px',
      left: '0',
      right: '0',
      width: '100%',
      cursor: 'pointer',
    };

    // const backgroundStyle = {
    //   position: 'absolute',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   justifyContent: 'center',
    //   textAlign: 'center',
    //   backgroundColor: fill,
    //   borderRadius: '50%',
    //   top: '15%',
    //   left: '15%',
    //   width: '70%',
    //   height: '70%',
    //   color: 'white',
    //   fontSize: '4em',
    // };

    const svgStyle = {
      width: '200px',
      height: '200px',
      position: 'absolute',
      top: '0',
    };

    // const textStyle = {
    //   position: 'absolute',
    //   bottom: '0',
    //   height: '50px',
    //   width: '100%',
    // };

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
      <div className="chart" style={svgStyle}>
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
      <div key={id} className="wrapper" {...other} style={wrapperStyle} onClick={this.onClicked}>
        <div className="container" style={containerStyle}>
          {tyreSvg}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Tyre);
