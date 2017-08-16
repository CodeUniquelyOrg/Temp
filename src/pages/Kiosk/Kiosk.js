import React, { Component } from 'react';      // eslint-disable-line no-unused-vars
import QRCode  from 'qrcode.react';

import style from './style.pcss';

const encodeTicks = ()  => {
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

class Kiosk extends Component {
  render() {
    const code = encodeTicks();
    const URL = `http://localhost:5000/qr/${code}`;

    return (
      <div>
        <br/>
        <h1>Drive over - Kiosk (&trade;)</h1>
        <br/>

        <p>
          Your Unique Code is
        </p>
        <br/>
        <p>
          {code}
        </p>
        <br/>

        <p>
          Link is:
        </p>
        <a href={URL} target="_blank">
          {URL}
        </a>
        <br/>
        <br/>

        <p>
          or simply just scan the QR Code generated below
        </p>
        <QRCode value={URL} />
        <br/>
      </div>
    );
  }
}

export default Kiosk;
