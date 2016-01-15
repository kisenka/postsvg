var cheerio = require('cheerio');

/**
 * @see https://github.com/fb55/htmlparser2/wiki/Parser-options
 * @see https://github.com/fb55/domhandler
 */
var defaultParseOptions = {
  xmlMode: true,
  normalizeWhitespace: false,
  decodeEntities: false,
  lowerCaseAttributeNames: false
};

var c = 0;

/**
 * @param {string} content
 * @constructor
 */
function Document(content) {
  if (typeof content !== 'string')
    throw new TypeError('Content must be a string');

  this.$ = cheerio.load(content, defaultParseOptions);
  ++c;
}

/**
 * Creates new Document instance
 *
 * @static
 * @param {string} content
 * @returns {Document}
 */
Document.create = function (content) {
  return new Document(content);
};

/**
 * @type {Function} Cheerio factory function
 * @see https://github.com/cheeriojs/cheerio#loading
 */
Document.prototype.$ = null;

/**
 * Returns document root node
 * @returns {Cheerio}
 */
Document.prototype.root = function () {
  return this.$(':root');
};

/**
 * @returns {Document}
 */
Document.prototype.clone = function () {
  return new Document(this.toString());
};

/**
 * @returns {string}
 */
Document.prototype.toString = function () {
  return this.$.xml();
};

/**
 * The unique ID of the document
 * @returns {string}
 */
Document.prototype.getId = function () {
  return 'doc' + c.toString();
};

module.exports = Document;
module.exports.defaultParseOptions = defaultParseOptions;