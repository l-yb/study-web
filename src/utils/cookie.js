// 获取cookie
export function getCookie(name) {
  // 获取name在Cookie中起止位置
  var start = document.cookie.indexOf(name + '=')
  if (start !== -1) {
    start = start + name.length + 1
    // 获取value的终止位置
    var end = document.cookie.indexOf(';', start)
    if (end === -1) end = document.cookie.length
    // 截获cookie的value值,并返回
    return unescape(document.cookie.substring(start, end))
  }
  return ''
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie(cName, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cName + '=' + escape(value) + (expiredays == null ? ';path=/' : ';path=/;expires=' + exdate.toGMTString())
}

// 删除cookie
export function delCookie(name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
}
