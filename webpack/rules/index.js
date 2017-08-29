const javascript = require('./javascript');
const image = require('./image');
const css = require('./css');

module.exports = ({ production = false } = {}) => (
  [
    javascript({ production }),
    css({ production }),
    image()
  ]
);
