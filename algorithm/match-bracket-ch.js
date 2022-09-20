/**
 * @description 判断字符串是否括号匹配
 * @author CH
 * (a{b[c]a}e)
 */

/**
 * 判断左右括号是否匹配
 * @param left 左括号
 * @param right 右括号
 */
function isMatch(left, right) {
  if (left === "{" && right === "}") return true;
  if (left === "[" && right === "]") return true;
  if (left === "(" && right === ")") return true;
  return false;
}

/**
 *
 * @param str
 */
function matchBracket(str) {
  if (!str || !str.length) return true;
  const leftBracket = "([{";
  const rightBracket = ")]}";
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    const s = str[i];
    if (leftBracket.includes(s)) {
      stack.push(s);
    } else if (rightBracket.includes(s)) {
      const top = stack[stack.length - 1];
      if (isMatch(top, s)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}

// // 功能测试
const str = "{a(bc)[]de}f";
console.info(matchBracket(str));
