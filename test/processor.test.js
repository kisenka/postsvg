var expect = require('chai').expect;

var Processor = require('../lib/processor');
var Result = require('../lib/result');
var addViewBox = require('./stuff/add-viewbox-plugin');

var testInput = '<svg width="30" height="50" />';
var expectedResult = '<svg width="30" height="50" viewBox="0 0 30 50"/>';

describe('Processor', function() {

  describe('#constructor()', function() {
    it('creates empty plugins array if no arguments is passed', function () {
      expect(new Processor().plugins).to.eql([]);
    });

    it('properly set array of plugins', function () {
      var plugin = function() {};
      var processor = new Processor([plugin]);

      expect(processor.plugins).to.eql([plugin]);
    });

    it('throws when wrong plugins type is passed', function() {
      expect(function() { new Processor('zhuzhu'); })
        .to.throws(TypeError);
    });
  });

  describe('#use()', function() {
    it('throws when wrong plugin type', function() {
      var processor = new Processor();

      expect(function() { processor.use('zhuzhu'); })
        .to.throws(TypeError);
    });

    it('adds new plugin', function() {
      var plugin = function () {};
      var processor = new Processor();
      processor.use(plugin);

      expect(processor.plugins).to.eql([plugin]);
    });

    it('returns itself', function() {
      var plugin = function() {};
      var processor = new Processor();

      expect(processor.use(plugin)).to.be.instanceOf(Processor);
    });
  });

  describe('#process()', function() {
    it('properly pass options to result', function () {
      var options = {from: 'test.svg'};
      var processor = new Processor([addViewBox()]);
      var result = processor.process(testInput, options);

      expect(result.options).to.eql(options);
    });

    it('call every plugin only once', function() {
      var test = '';
      var plugin1 = function() { test += '1'; };
      var plugin2 = function() { test += '2'; };
      var processor = new Processor([plugin1, plugin2]);
      processor.process(testInput);

      expect(test).to.eql('12');
    });

    it('processes source', function() {
      var result = new Processor([addViewBox()]).process(testInput);

      expect(result.toString()).to.eql(expectedResult);
    });

    it('return Result instance', function () {
      var result = new Processor([addViewBox()]).process(testInput);

      expect(result).to.be.instanceOf(Result);
    });

    it('save result in `lastResult` property', function () {
      var processor = new Processor([addViewBox()]);
      processor.process(testInput);

      expect(processor.lastResult).to.be.instanceOf(Result);
      expect(processor.lastResult.toString()).to.eql(expectedResult);
    });
  });

});