var expect = require('chai').expect;

var Result = require('../lib/result');
var Document = require('../lib/document');

function arrayHasDuplicates(array) {
  array.sort();

  var last = array[0];
  for (var i = 1, len = array.length; i < len; i++) {
    if (array[i] === last) return true;
    last = array[i];
  }

  return false;
}

describe('Document', function() {

  var input = '<svg />';
  var doc, $;

  beforeEach(function() {
    doc = new Document(input);
    $ = doc.$;
  });

  describe('#constructor()', function() {
    it('throws when content is not a string', function() {
      expect(function() {
        new Document(123);
      }).to.throws(TypeError);
    });

    it('creates Cheerio factory function', function() {
      expect($).to.be.a('function');
      expect($.fn).to.equals($.prototype);
      expect($._root).to.be.an('object');
    });

    it('properly set parse options', function() {
      expect($._options).to.eql(Document.defaultParseOptions);
    });
  });

  describe('::create()', function() {
    it('returns Document instance', function() {
      expect(Document.create(input)).to.be.instanceOf(Document);
    });
  });

  describe('#root()', function() {
    it('returns document root node', function() {
      expect(doc.root()).to.eql($(':root'));
    });
  });

  describe('#clone()', function() {
    it('returns cloned document', function() {
      var cloned = doc.clone();

      expect(cloned).to.be.instanceOf(Document);
      expect(cloned).to.not.equal(doc);
      expect(cloned.toString()).to.eql(doc.toString());
    });
  });

  it('#toString()', function() {
    expect(doc.toString()).to.be.a('string');
  });

  describe('#getId()', function() {
    it('returns string', function() {
      expect(doc.getId()).to.be.a('string');
    });

    it('returns the same id on every call', function () {
      var id = doc.getId();
      var alwaysReturnTheSameId = true;
      var returnValue;

      for (var i = 0; i < 1000; i++) {
        returnValue = doc.getId();
        if (returnValue !== id) {
          alwaysReturnTheSameId = false;
          break;
        }
      }

      expect(alwaysReturnTheSameId).to.be.true;
    });

    it('returns unique ids for every new instance', function () {
      var ids = [];

      for (var i = 0; i < 1000; i++)
        ids.push(new Document('').getId());

      expect(arrayHasDuplicates(ids)).to.be.false;
    });
  })

});