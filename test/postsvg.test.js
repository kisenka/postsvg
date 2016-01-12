var expect = require('chai').expect;

var postsvg = require('../lib/postsvg');
var Processor = require('../lib/processor');
var Document = require('../lib/document');
var Result = require('../lib/result');

describe('postsvg()', function () {

  it('creates instance of Processor', function () {
    expect(postsvg()).to.be.instanceOf(Processor);
  });

  describe('::parse()', function() {
    it('returns Document instance', function() {
      expect(postsvg.create('<svg />')).to.be.instanceOf(Document);
    });
  });

  describe('::plugin()', function () {

    var plugin;
    var transformer;
    var testInput = '<svg />';
    var expectedResult = '<svg id="test"/>';

    beforeEach(function () {
      plugin = postsvg.plugin('plugin-name', function () {
        return function(doc, result) {
          doc.root().attr('id', 'test');
        };
      });
      transformer = plugin();
    });

    it('returns factory function', function () {
      expect(plugin).to.be.a('function');
    });

    it('factory function returns configured transform function', function () {
      expect(transformer).to.be.a('function');
      expect(transformer.pluginName).to.be.a('string');
      expect(transformer.process).to.be.a('function');
      expect(transformer.lastResult).to.be.a('null');
    });

    describe('#process()', function () {
      it('properly process input', function () {
        var result = transformer.process(testInput);

        expect(result).to.be.instanceOf(Result);
        expect(result.toString()).to.eql(expectedResult);
      });

      it('properly pass options to result', function () {
        var options = {from: 'test.svg'};
        var result = transformer.process(testInput, options);

        expect(result.options).to.eql(options);
      });

      it('save result in `lastResult` property', function () {
        transformer.process(testInput);

        expect(transformer.lastResult).to.be.instanceOf(Result);
        expect(transformer.lastResult.toString()).to.eql(expectedResult);
      });
    });
  })

});