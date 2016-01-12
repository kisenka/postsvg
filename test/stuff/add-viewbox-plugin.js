var postsvg = require('../../index');

module.exports = postsvg.plugin('add-viewbox', function () {
  return function (doc) {
    var svg = doc.root();
    var width = svg.attr('width');
    var height = svg.attr('height');

    if (!svg.attr('viewBox') && width && height)
      svg.attr('viewBox', [0, 0, width, height].join(' '))
  }
});