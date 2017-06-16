'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Helper functions which will passed while rendering ejs
 */
exports.default = {
  //首字母大写
  capitalize: function capitalize(n) {
    return n.charAt(0).toUpperCase() + n.slice(1);
  },

  //拼接字符
  spliceString: function spliceString(str) {
    if (!str) {
      return '';
    }
    var strArr = str.split(',');
    var spliceStr = '';
    strArr.forEach(function (item, index) {
      spliceStr += '"' + item + '"';
      if (index !== strArr.length - 1) {
        spliceStr += ' ,';
      }
    });
    return spliceStr;
  }
};