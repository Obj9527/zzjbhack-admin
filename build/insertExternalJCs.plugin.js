function InsertExternalJCs(externalJCs) {
  this.externalJCs = externalJCs;
}

InsertExternalJCs.prototype.apply = function(compiler) {
  var externalJCs = this.externalJCs;
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin(

      'html-webpack-plugin-before-html-processing',
      function(htmlPluginData, callback) {
        var htmlString = htmlPluginData.html;
        var externalJCsString = '';
        var externalJCsLen = externalJCs.length;
        for (var i = 0; i < externalJCsLen; i++) {
          var externalJC = externalJCs[i];
          if (externalJC.type === 'css') {
            externalJCsString += `<link rel="stylesheet" type="text/css" href="${externalJC.url}"/>`;
          }
          if (externalJC.type === 'js') {
            var ignore = externalJC.ignore ? 'ignore' : '';
            externalJCsString += `<script src="${externalJC.url}" ${ignore}></script>`;
          }
        }
        externalJCsString += '<body>';
        htmlPluginData.html = htmlString.replace('<body>', externalJCsString);
      }
    )
  })
}

module.exports = InsertExternalJCs
