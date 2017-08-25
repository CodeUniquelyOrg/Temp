import React, { Component } from 'react';      // eslint-disable-line no-unused-vars
import QRCode  from 'qrcode.react';

import style from './style.pcss';

const encodeTicks = (extra = 'not')  => {
  // var nowticks = Math.floor((new Date().getTime()) / 256);
  // var possible = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-';

  // Kiosk Identifier
  const kiosk = 'AEF';

  // var nowticks = Math.floor((new Date().getTime()) / 1024);  // could just mask out the bottom 10 bits
  var nowticks = Math.floor((new Date().getTime()) >>> 10);
  var possible = 'ABCDEFGHJKLMNPQRSTVWXY1234567890';
  var response = '';
  while(nowticks > 0) {
    response += possible.charAt(nowticks % 32);  // effectively reverses the digits into string
    nowticks = Math.floor(nowticks / 32);
  }

  // return response + 'Z' + kiosk;
  return response.split('').reverse().join('') + 'Z' + kiosk;
};

// need TWO possible qrCodes
const code1 = 'reg';
const code2 = 'not';

class Kiosk extends Component {
  render() {
    // const code = encodeTicks();
    const URL1 = `http://localhost:5000/code/${code1}`;
    const URL2 = `http://localhost:5000/code/${code2}`;

    return (
      <div className={style.root}>
        <h1 className={style.title}>Drive over - Kiosk (&trade;)</h1>

        <h4 className={style.header}>
          Registered Vehicle Code is
        </h4>
        <a className={style.link} href={URL2} target="_blank">
          {URL2}
        </a>
        <QRCode  className={style.code} value={URL2} />

        <h4 className={style.header}>
          Un-registered Vehicle Code is
        </h4>
        <a className={style.link} href={URL1} target="_blank">
          {URL1}
        </a>
        <QRCode className={style.code} value={URL1} />

      </div>
    );
  }
}

export default Kiosk;
