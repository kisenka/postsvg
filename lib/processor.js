var Result = require('./result');
var Document = require('./document');

/**
 * @typedef {Object} ProcessOptions
 * @property {string} [from]
 * @property {string} [to]
 */

/**
 * @param {Array<Function>} [plugins]
 * @constructor
 */
function Processor(plugins) {
  if (Array.isArray(plugins))
    this.plugins = plugins;
  else if (typeof plugins === 'undefined')
    this.plugins = [];
  else
    throw new TypeError('Plugins must be array or null');
}

/**
 * @type {Result}
 */
Processor.prototype.lastResult = null;

/**
 * @param {Function} plugin
 * @returns {Processor}
 */
Processor.prototype.use = function (plugin) {
  if (typeof plugin !== 'function')
    throw new TypeError('Plugin must be a function');

  this.plugins.push(plugin);
  return this;
};

/**
 * @param {string} source
 * @param {ProcessOptions} [options]
 * @returns {Result}
 */
Processor.prototype.process = function (source, options) {
  var doc = Document.create(source);
  var result = new Result(doc, options);

  this.plugins.forEach(function (plugin) {
    plugin(doc, result);
  });

  this.lastResult = result;

  return result;
};

module.exports = Processor;