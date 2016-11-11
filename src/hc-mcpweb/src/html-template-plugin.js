'use strict';

let path = require('path');
let fs = require('fs');
let Handlebars = require('handlebars');

let defaultOptions = {
  filename: 'index.html',
  data: {}
};

function HTMLTemplatePlugin(options) {
  this.options = Object.assign({}, defaultOptions, options || {});
}

HTMLTemplatePlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', (compilation, cb) => {
    Promise.resolve()
      .then(() => {
        let templateText = this.getTemplate(compilation);
        let assets = this.getAssets(compilation);

        let template = Handlebars.compile(templateText);

        return Promise.resolve(template(Object.assign({}, this.options, assets)));
      })
      .then((htmlContent) => {
        compilation.assets[this.options.filename] = {
          source: function() {
            return htmlContent;
          },
          size: function() {
            return htmlContent.length;
          }
        };
        cb();
      })
      .catch((err) => {
        compilation.errors.push(err);
        compilation.assets[this.options.filename] = {
          source: function() {
            return err.toString();
          },
          size: function() {
            return err.toString().length;
          }
        };
        cb();
      });
  });
};

HTMLTemplatePlugin.prototype.getTemplate = function(compilation) {
  if (this.options.template === undefined) {
    throw new Error('Template not specified');
  }
  let templateFileName = path.normalize(this.options.template);
  compilation.fileDependencies.push(templateFileName);
  let contents = fs.readFileSync(templateFileName, {encoding: 'utf8'});
  return contents;
};

HTMLTemplatePlugin.prototype.getAssets = function(compilation) {
  let assets = {
    js: [],
    css: []
  };
  let chunks = compilation.getStats().toJson().chunks;
  let publicPath = compilation.options.output.publicPath;

  sortChunks(chunks);

  chunks.forEach((chunk) => {
    chunk.files.forEach((file) => {
      let filename = publicPath + file;
      let ext = path.extname(filename);
      switch (ext) {
        case '.css':
          assets.css.push(filename);
          break;
        case '.js':
          assets.js.push(filename);
          break;
        default:
          break;
      }
    });
  });

  return assets;
};

function sortChunks(chunks) {
  return chunks.sort(function orderEntryLast(a, b) {
    if (a.entry !== b.entry) {
      return b.entry ? 1 : -1;
    } else {
      return b.id - a.id;
    }
  });
}

module.exports = HTMLTemplatePlugin;
