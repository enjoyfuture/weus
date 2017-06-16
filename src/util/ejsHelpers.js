/**
 * Helper functions which will passed while rendering ejs
 */
export default {
  //首字母大写
  capitalize: n => n.charAt(0).toUpperCase() + n.slice(1),

  //拼接字符
  spliceString(str) {
    if (!str) {
      return '';
    }
    const strArr = str.split(',');
    let spliceStr = '';
    strArr.forEach((item, index) => {
      spliceStr += `"${item}"`;
      if (index !== strArr.length - 1) {
        spliceStr += ' ,';
      }
    });
    return spliceStr;
  }
};