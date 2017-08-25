import React, { Component } from 'react';      // eslint-disable-line no-unused-vars
import QRCode  from 'qrcode.react';

import config from 'src/config';

import style from './style.pcss';

//
const CLIENT_ROOT_URL = process.env.CLIENT_ROOT || `${config.server.protocol}://${config.server.host}:${config.server.port}${config.server.root}`;

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
const code1 = 'REG123';
const code2 = 'NOT789';
const code3 = 'IOU000';

class Kiosk extends Component {
  render() {
    // const code = encodeTicks();
    const URL1 = `${CLIENT_ROOT_URL}/code/${code1}`;
    const URL2 = `${CLIENT_ROOT_URL}/code/${code2}`;
    const URL3 = `${CLIENT_ROOT_URL}/code/${code3}`;

    return (
      <div className={style.root}>
        <h1 className={style.title}>Drive over - Kiosk (&trade;)</h1>

        <h4 className={style.header}>
          Previously Registered Vehicle - Will be Found - Code is
        </h4>
        <a className={style.link} href={URL1} target="_blank">
          {URL1}
        </a>
        <QRCode  className={style.code} value={URL1} />

        <h4 className={style.header}>
          Previous Un-registered Vehicle - Will be Found - Code is
        </h4>
        <a className={style.link} href={URL2} target="_blank">
          {URL2}
        </a>
        <QRCode className={style.code} value={URL2} />

        <h4 className={style.header}>
          <strong><u>WILL NOT</u></strong> Found - Code is
        </h4>
        <a className={style.link} href={URL3} target="_blank">
          {URL3}
        </a>
        <QRCode className={style.code} value={URL3} />

      </div>
    );
  }
}

export default Kiosk;
