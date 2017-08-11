import React, { Component } from 'react';      // eslint-disable-line no-unused-vars

// Local Components
import Tutorial  from 'components/Tutorial';

import style from './style.pcss';

class Initial extends Component {
  render() {
    return (
      <div>
        <Tutorial />
      </div>
    );
  }
}

export default Initial;
