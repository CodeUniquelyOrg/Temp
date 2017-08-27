import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

// Loal component
import PinItem from './PinItem';

//
class PinInput extends Component {

  static propTypes = {
    length: PropTypes.number.isRequired,
    onComplete: PropTypes.func,
    secret: React.PropTypes.bool,
    focus: React.PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    secret: false,
    focus: false,
    onChange: () => {},
    onComplete: () => {},
  };

  constructor(props) {
    super(props);
    // this.props.secret = this.props.secret || false;
    // HACK: find a better way to create array of (length) elements
    this.values = new Array(props.length).join('0').split('0');
    this.elements = [];
    this.currentIndex = 0;
  }

  componentDidMount() {
    // Setting focus on the first element
    if(this.props.focus && this.props.length) this.elements[0].focus();
  }

  clear() {
    this.elements.forEach(e => e.clear());
    this.values = this.values.map(() => undefined);
  }

  focus() {
    if(this.props.length) {
      this.elements[0].focus();
    }
  }

  //
  onItemChange(value, index) {
    const { length, onComplete, onChange } = this.props;
    let currentIndex = index;

    this.values[index] = value;

    // Set focus on next
    if (value.length === 1 && index < length - 1) {
      currentIndex += 1;
      this
        .elements[currentIndex]
        .focus();
    }

    // Notify the parent
    const pin = this
      .values
      .join('');

    onChange(pin, currentIndex);
    if (pin.length === length) {
      onComplete(pin, currentIndex);
    }
  }

  onBackspace(index) {
    if (index > 0) {
      this.elements[index - 1].focus();
    }
  }

  render() {
    return (
      <div>
        {this
          .values
          .map((e, i) => <PinItem
            ref={ n => (this.elements[i] = n) }
            key={ i }
            onBackspace={ () => this.onBackspace(i) }
            secret={ this.props.secret || false }
            onChange={ v => this.onItemChange(v, i) }
          />)
        }
      </div>
    );
  }
}

export default PinInput;
