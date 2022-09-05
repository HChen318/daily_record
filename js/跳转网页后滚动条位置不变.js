window.onscroll = function () {
  var scrollTop =
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop;
  SetCookie("a", scrollTop);
};
window.onload = function () {
  document.body.scrollTop = GetCookie("a"); //页面加载时设置scrolltop高度
};
/**
 * @name: 设置cookie
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2022-01-10
 */
function SetCookie(sName, sValue) {
  document.cookie = sName + "=" + escape(sValue) + "; ";
}
/**
 * @name: 读取cookie
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2022-01-10
 */
function GetCookie(sName) {
  var aCookie = document.cookie.split("; ");
  for (var i = 0; i < aCookie.length; i++) {
    var aCrumb = aCookie[i].split("=");
    if (sName == aCrumb[0]) {
      return unescape(aCrumb[1]);
    }
  }
  return 0;
}
