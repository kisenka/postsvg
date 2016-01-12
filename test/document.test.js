var expect = require('chai').expect;

var Result = require('../lib/result');
var Document = require('../lib/document');

describe('Document', function() {

  var input = '<svg />';

  describe('#constructor()', function() {
    it('throws when content is not a string', function() {
      expect(function() {
        new Document(123);
      }).to.throws(TypeError);
    });

    it('creates Cheerio factory function', function() {
      var doc = new Document(input);
      var $ = doc.$;

      expect($).to.be.a('function');
      expect($.fn).to.equals($.prototype);
      expect($._root).to.be.an('object');
    });

    it('properly set parse options', function() {
      var doc = new Document(input);
      var $ = doc.$;

      expect($._options).to.eql(Document.defaultParseOptions);
    });
  });

  describe('::create()', function() {
    it('returns Document instance', function() {
      expect(Document.create(input)).to.be.instanceOf(Document);
    });
  });

  describe('root()', function() {
    it('returns document root node', function() {
      var doc = new Document(input);

      expect(doc.root()).to.eql(doc.$(':root'));
    });
  });

  describe('clone()', function() {
    it('returns cloned document', function() {
      var doc = new Document(input);
      var cloned = doc.clone();

      expect(cloned).to.be.instanceOf(Document);
      expect(cloned).to.not.equal(doc);
      expect(cloned.toString()).to.eql(doc.toString());
    });
  });

  it('toString()', function() {
    var doc = new Document(input);

    expect(doc.toString()).to.be.a('string');
  });

});