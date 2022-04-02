const { checkModules } = require('are-you-es5');
const path = require('path');

const result = checkModules({
  path: '',
  checkAllNodeModules: true,
  ignoreBabelAndWebpackPackages: true
});

const es6Modules = result.es6Modules.map(item => {
  if (item.indexOf('\\') > -1) {
    return `(${item.replace(/\\/g, `\\${path.sep}`)})`;
  } else {
    return item;
  }
})
es6Modules.push('element-ui');
const es6ModulesStr = es6Modules.join('|');
const es6ExcludeRegExpStr = `\\${path.sep}node_modules\\${path.sep}(?!(${es6ModulesStr})\\${path.sep}).*`;
const es6ExcludeRegExp = new RegExp(es6ExcludeRegExpStr);

module.exports = es6ExcludeRegExp;
