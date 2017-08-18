import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

import FontIcon from 'material-ui/FontIcon';

import { green500, red500, redA400, amber500, lightGreenA400, lightGreen800, grey500, grey900, white, black } from 'material-ui/styles/colors';

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
    worn: PropTypes.number.isRequired,

    // was it a good read
    good: PropTypes.bool.isRequired,

    // units: PropTypes.PropTypes.shape({
    //   pressure: PropTypes.string.isRequired,
    //   depth: PropTypes.string.isRequired,
    // }),

    // function callback (optional) when tyre clicked
    onClick: PropTypes.func,  // eslint-disable-line react/require-default-props
  }

  onClicked = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.id);
    }
  };

  polarToCartesian(cx, cy, radius, angleInDegrees) {
    let angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    return {
      x: cx + (radius * Math.cos(angleInRadians)),
      y: cy + (radius * Math.sin(angleInRadians))
    };
  }

  describeArc(x, y, radius, spread, startAngle, endAngle, maxRadius=1) {
    let innerStart = this.polarToCartesian(x, y, radius, endAngle);
    let innerEnd = this.polarToCartesian(x, y, radius, startAngle);
    let outerStart = this.polarToCartesian(x, y, radius + spread, endAngle);
    let outerEnd = this.polarToCartesian(x, y, radius + spread, startAngle);
    let largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    let d = [
      'M', outerStart.x / maxRadius, outerStart.y / maxRadius,
      'A', (radius + spread) / maxRadius, (radius + spread) / maxRadius, 0, largeArcFlag, 0, outerEnd.x / maxRadius, outerEnd.y / maxRadius,
      // 'L', innerEnd.x, innerEnd.y,
      'A', (spread / 2) / maxRadius, (spread / 2) / maxRadius, 0, 1, 0, innerEnd.x / maxRadius, innerEnd.y / maxRadius,
      'A', radius / maxRadius, radius / maxRadius, 0, largeArcFlag, 1, innerStart.x / maxRadius, innerStart.y / maxRadius,
      // 'L', outerStart.x, outerStart.y,
      'A', (spread / 2) / maxRadius, (spread / 2) / maxRadius, 0, 1, 0, outerStart.x / maxRadius, outerStart.y / maxRadius,
      'Z'
    ].join(' ');

    return d;
  }

  describeBobble(x, y, radius, spread, startAngle) {
    return this.polarToCartesian(x, y, radius + spread/2, startAngle);
  }

  // // center point will be a at 100,100
  // buildIndicator(percent, anticlock, good) {
  //   const cx=100, cy=100;
  //
  //   // let arcPath;
  //   // if (anticlock) {
  //   //   const start = 360 - (180* percent);
  //   //   arcPath = this.describeArc(cx, cy, 80, 20, start, 360);
  //   // } else {
  //   //   arcPath = this.describeArc(cx, cy, 80, 20, 0, percent * 180);
  //   // }
  //   // const arcPath1 = this.describeArc(cx, cy, 90, 10, 200, 360);
  //   // const arcPath2 = this.describeArc(cx, cy, 90, 10, 0, 160);
  //   // <path d={arcPath1} fill={colour} stroke={colour} />
  //   // <path d={arcPath2} fill={colour} stroke={colour} />
  //   // <stop offset="50%" stopColor={amber500}/>
  //
  //   const arcPath = this.describeArc(cx, cy, 90, 10, 20, 340);
  //   const endColor = good ? lightGreenA400 : grey500;
  //   const startColor = good ? redA400 : grey500;
  //   const grad = `grad${this.props.id}`;
  //   const url = `url(#grad${this.props.id})`;
  //
  //   return (
  //     <svg className="indicator" width="100%" height="100%" viewBox={`0 0 ${cx*2} ${cy*2}`}>
  //       <defs>
  //         <linearGradient id={grad}>
  //           <stop offset="0%" stopColor={endColor}/>
  //           <stop offset="100%" stopColor={startColor}/>
  //         </linearGradient>
  //       </defs>
  //       <path fill={url} transform='rotate(180 100 100)' d={arcPath} />
  //       <line x1={100} y1={0} x2={100} y2={10} stroke={grey900} strokeWidth={2} />
  //     </svg>
  //   );
  // }

  buildGreyGuage() {
    const cx=100, cy=100;
    const arcPath = this.describeArc(cx, cy, 85, 10, 20, 340);
    return (
      <div className={style.indicator}>
        <svg width="100%" height="100%" viewBox={`0 0 ${cx*2} ${cy*2}`}>
          <path fill={grey500} transform='rotate(180 100 100)' d={arcPath} />
          <line x1={100} y1={0} x2={100} y2={20} stroke={grey900} strokeWidth={2} />
        </svg>
      </div>
    );
  }

  buildRainbowGuage() {
    const cx=100, cy=100;
    const arcPath = this.describeArc(cx, cy, 85, 10, 20, 340, 200);
    return (
      <div className="masked">
        <div className={style.clipped}>
          <ul className={style.umbrella}>
            <li className={style.color}></li>
            <li className={style.color}></li>
            <li className={style.color}></li>
            <li className={style.color}></li>
            <li className={style.color}></li>
            <li className={style.color}></li>
          </ul>
        </div>
        <div className={style.indicator}>
          <svg width="100%" height="100%" viewBox={`0 0 ${cx*2} ${cy*2}`}>
            <defs>
              <clipPath id="svgPath1" clipPathUnits="objectBoundingBox">
                <path transform='rotate(180 0.5 0.5)' fill="#FFFFFF" d={arcPath} />
              </clipPath>
            </defs>
            <line x1={100} y1={0} x2={100} y2={20} stroke={grey900} strokeWidth={2} />
          </svg>
        </div>
      </div>
    );
  }

  buildBobble(percent, anticlock, good) {
    const cx=100, cy=100;

    let bobble;
    if (anticlock) {
      const pos = 360 - (180 * percent);
      bobble = this.describeBobble(cx, cy, 85, 10, pos);
    } else {
      const pos = 180 * percent;
      bobble = this.describeBobble(cx, cy, 85, 10, pos);
    }

    const thumbColor = good ? anticlock ? redA400 : green500 : grey500;

    // return (
    //   <svg width="100%" height="100%" viewBox={`0 0 ${cx*2} ${cy*2}`}>
    //     <circle cx={bobble.x} cy={bobble.y} r={10} fill="white" />
    //   </svg>
    // );

    const mask = `hole${this.props.id}`;
    const url = `url(#hole${this.props.id})`;

    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${cx*2} ${cy*2}`}>
        <defs>
          <mask id={mask}>
            <rect width="100%" height="100%" fill="white"/>
            <circle cx={bobble.x} cy={bobble.y} r={5} fill="black" />
          </mask>
        </defs>
        <circle cx={bobble.x} cy={bobble.y} r={10} fill="white" mask={url} />
      </svg>
    );

    // return (
    //   <svg width="100%" height="100%" viewBox={`0 0 ${cx*2} ${cy*2}`}>
    //     <circle cx={bobble.x} cy={bobble.y} r={10} fill={white} />
    //     <circle cx={bobble.x} cy={bobble.y} r={5} fill={thumbColor} />
    //   </svg>
    // );
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
      worn,
      good,

      onClick,    // eslint-disable-line react/require-default-props, no-unused-vars
      dispatch,   // removing from ...rest

      ...rest
    } = this.props;

    const background = (under || over) ? red500 : lightGreen800;

    let overUnderIndicator;
    if (under || over) {

      const name = over ? 'mdi mdi-arrow-up-bold' : 'mdi mdi-arrow-down-bold';
      // const name = over ? 'mdi mdi-arrow-up-bold-circle' : 'mdi mdi-arrow-down-bold-circle';
      // const name = over ? 'mdi mdi-menu-up-outline' : 'mdi mdi-menu-down-outline';

      //   <div className={`${ under ? style.under : style.over}`}>
      // <FontIcon color={white} className="material-icons" style={{ fontSize:32 }} >error</FontIcon>
      //  <div className={style.under}>

      overUnderIndicator = (
        <div className={`${ under ? style.under : style.over}`}>
          <FontIcon color={white} className={name} style={{ fontSize:32 }} />
        </div>
      );
    }

    // SVG guage
    const normalizedDepth = depth > 10 ? 10 : depth;
    const anticlock = normalizedDepth < worn;

    // const percent = (Math.abs(normalizedDepth - worn) + 1) * 0.1;
    let percent;
    if (anticlock) {
      percent = (worn - normalizedDepth) / worn;
    } else {
      percent = (normalizedDepth - worn) * 0.1;
    }

    let wearIndicator;
    if ( good ) {
      wearIndicator = this.buildRainbowGuage();
    } else {
      wearIndicator = this.buildGreyGuage();
    }

    const bobble = (
      <div className={style.bobble}>
        {this.buildBobble(percent, anticlock, good)}
      </div>
    );

    return (
      <div className={style.scaledTyre} onClick={this.onClicked}>
        <div div={style.inside}>
          {wearIndicator}
          {bobble}
          <div>
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
        </div>
      </div>
    );
  }
}

// export default connect()(Tyre);
export default Tyre;
