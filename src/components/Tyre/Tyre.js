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
      // 'L', innerEnd.x, innerEnd.y,
      'A', spread /2, spread /2, 0, 1, 0, innerEnd.x, innerEnd.y,
      'A', radius, radius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      // 'L', outerStart.x, outerStart.y,
      'A', spread /2, spread /2, 0, 1, 0, outerStart.x, outerStart.y,
      'Z'
    ].join(' ');

    return d;
  }

  describeBobble(x, y, radius, spread, startAngle) {
    return this.polarToCartesian(x, y, radius + spread/2, startAngle);
  }

  // center point will be a at 100,100
  buildIndicator(percent, anticlock, good) {
    const cx=100, cy=100;

    // let arcPath;
    // if (anticlock) {
    //   const start = 360 - (180* percent);
    //   arcPath = this.describeArc(cx, cy, 80, 20, start, 360);
    // } else {
    //   arcPath = this.describeArc(cx, cy, 80, 20, 0, percent * 180);
    // }
    // const arcPath1 = this.describeArc(cx, cy, 90, 10, 200, 360);
    // const arcPath2 = this.describeArc(cx, cy, 90, 10, 0, 160);
    const arcPath = this.describeArc(cx, cy, 90, 10, 20, 340);

    let bobble;
    if (anticlock) {
      const pos = 360 - (180 * percent);
      bobble = this.describeBobble(cx, cy, 90, 10, pos);
    } else {
      const pos = 180 * percent;
      bobble = this.describeBobble(cx, cy, 90, 10, pos);
    }

    // <path d={arcPath1} fill={colour} stroke={colour} />
    // <path d={arcPath2} fill={colour} stroke={colour} />
    // <stop offset="50%" stopColor={amber500}/>

    // const thumbColor = good ? anticlock ? redA400 : lightGreenA400 : grey500;
    const endColor = good ? lightGreenA400 : grey500;
    const startColor = good ? redA400 : grey500;

    const grad = `grad${this.props.id}`;
    const url = `url(#grad${this.props.id})`;

    return (
      <svg className="indicator" width="100%" height="100%" viewBox={`0 0 ${cx*2} ${cy*2}`}>
        <defs>
          <linearGradient id={grad}>
            <stop offset="0%" stopColor={endColor}/>
            <stop offset="100%" stopColor={startColor}/>
          </linearGradient>
        </defs>
        <path fill={url} transform='rotate(180 100 100)' d={arcPath} />
        <line x1={100} y1={0} x2={100} y2={10} stroke={grey900} stroke-width={2} />
      </svg>
    );
  }

  buildBobble(percent, anticlock, good) {
    const cx=100, cy=100;

    let bobble;
    if (anticlock) {
      const pos = 360 - (180 * percent);
      bobble = this.describeBobble(cx, cy, 90, 10, pos);
    } else {
      const pos = 180 * percent;
      bobble = this.describeBobble(cx, cy, 90, 10, pos);
    }

    const thumbColor = good ? anticlock ? redA400 : green500 : grey500;
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${cx*2} ${cy*2}`}>
        <circle cx={bobble.x} cy={bobble.y} r={10} fill={white} />
        <circle cx={bobble.x} cy={bobble.y} r={5} fill={thumbColor} />
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
      worn,
      good,

      onClick,    // eslint-disable-line react/require-default-props, no-unused-vars
      dispatch,   // removing from ...rest

      ...rest
    } = this.props;

    const background = (under || over) ? red500 : lightGreen800;

    let overUnderIndicator;
    if (under || over) {
      overUnderIndicator = (
        <div className={`${ under ? style.under : style.over}`}>
          <FontIcon color={white} className="material-icons" style={{ fontSize:32 }} >error</FontIcon>
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
      percent = (normalizedDepth - worn + 1) * 0.1;
    }

    const wearIndicator = (
      <div className={style.indicator}>
        {this.buildIndicator(percent, anticlock, good)}
      </div>
    );

    const bobble = (
      <div className={style.bobble}>
        {this.buildBobble(percent, anticlock, good)}
      </div>
    );

    return (
      <div className={style.scaledTyre} onClick={this.onClicked}>
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
        {wearIndicator}
        {bobble}
      </div>
    );
  }
}

// export default connect()(Tyre);
export default Tyre;
