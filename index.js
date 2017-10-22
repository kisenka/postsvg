const Processor = require('./lib/processor');

/**
 * @param {Array<Function>} [plugins]
 * @return {Processor}
 */
module.exports = function postxml(plugins) {
  return new Processor(plugins);
};