import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.css';

const Counter = ({ increment, incrementIfOdd, incrementAsync, decrement, counter }) => (
  <div>
    <p>
      Clicked: {counter} times
      &nbsp;
      <button onClick={increment}>+</button>
      &nbsp;
      <button onClick={decrement}>-</button>
      &nbsp;
      <button onClick={incrementIfOdd}>Increment if odd</button>
      &nbsp;
      <button onClick={() => incrementAsync()}>Increment async</button>
    </p>
    <div>
      <h1>Helo World</h1>
    </div>
  </div>
);

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};

export default Counter;
