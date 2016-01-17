var expect = require('chai').expect;

var Result = require('../lib/result');
var Document = require('../lib/document');

describe('Result', function() {

  var input = '<svg />';
  var doc;

  beforeEach(function() {
    doc = Document.create(input);
  });

  describe('#constructor()', function() {
    it('throws on wrong document type', function () {
      expect(function () {
        new Result('zhuzhu');
      }).to.throws(TypeError);
    });

    it('properly set options', function () {
      var options = {from: 'test.svg'};
      var result = new Result(doc, options);
      expect(result.options).to.eql(options);
    });

    it('set empty `options` if not presented', function () {
      var result = new Result(doc);
      expect(result.options).to.eql({});
    });
  });

  it('#toString()', function() {
    var result = new Result(doc);
    expect(result.toString()).to.be.a('string');
  });

});