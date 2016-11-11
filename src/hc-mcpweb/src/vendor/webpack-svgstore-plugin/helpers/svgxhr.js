/**
 * Load svg via ajax
 * @param  {string} url path to svg sprite
 * @generator: webpack-svgstore-plugin
 * @see: https://www.npmjs.com/package/webpack-svgstore-plugin
 * @return {[type]}     [description]
 */
function svgXHR(url, baseUrl) {
  var _ajax = new XMLHttpRequest();

  if (typeof baseUrl === 'undefined') {
    var wholeURL = window.location.href.replace(/#.*$/, '').split('/');
    baseUrl = wholeURL.slice(0, wholeURL.length - 1).join('/');
  }

  var id = '__svg-sprite__';

  if(!document.getElementById(id) || !window.__svg_sprite_requested__) {
    window.__svg_sprite_requested__ = true;
    _ajax.open('GET', baseUrl + url, true);
    _ajax.send();
    _ajax.onload = function() {
      var div = document.createElement('div');
      div.id = id;
      div.innerHTML = _ajax.responseText;
      document.body.insertBefore(div, document.body.childNodes[0]);
    };
  }
}
