var Processor = require('./processor');
var Document = require('./document');

/**
 * @param {Array<Function>} [plugins]
 * @returns {Processor}
 */
var postsvg = function (plugins) {
  return new Processor(plugins);
};

/**
 * @param {string} content
 * @returns {Document}
 */
postsvg.create = function (content) {
  return new Document(content);
};

/**
 * TODO: refactor this shit
 * @param {string} name
 * @param {Function} initializer
 * @returns {Function}
 */
postsvg.plugin = function (name, initializer) {
  var creator = function (options) {
    var transformer = initializer(options);

    transformer.pluginName = name;

    transformer.process = function (source, processOptions) {
      var result = postsvg([transformer]).process(source, processOptions);
      transformer.lastResult = result;
      return result;
    };

    transformer.lastResult = null;

    return transformer;
  };

  return creator;
};

module.exports = postsvg;