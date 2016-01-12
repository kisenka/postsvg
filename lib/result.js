var Document = require('./document');

/**
 * @param {Document} doc
 * @param {ProcessOptions} [options]
 * @constructor
 */
function Result(doc, options) {
  if (!(doc instanceof Document))
    throw new TypeError('doc must be instance of Document');

  this.doc = doc;
  this.options = options;
}

Result.prototype.toString = function () {
  return this.doc.toString();
};

module.exports = Result;