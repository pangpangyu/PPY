/*!
 * form pangpangyu
 */
; (function (window) {
  // const $ = require('jquery')
  // const Promise = require("bluebird");
  /**
   * Object.assign 兼容
   */
  if (typeof Object.assign != 'function') {
    Object.assign = function (target) {
      'use strict';
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      target = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source != null) {
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
  }
  /**
   * Array.from兼容
   */
  if (!Array.from) {
    Array.from = function (el) {
      return Array.apply(this, el);
    }
  }
  /**
   * _default 
   */
  // let _default = {
  //   url: location.href,
  //   type: 'get',
  //   data: {},
  //   contentType: 'application/x-www-form-urlencoded',
  //   timeout: 60000,
  //   headers: {},
  //   async: false
  // }
  class ajax{
    constructor(){
      let xhr = null
      if (typeof XMLHttpRequest !== 'undefined') {
        xhr = new XMLHttpRequest();
      } else if (typeof ActiveXObject !== 'undefined'){
        // 支持IE7之前的版本
        if (typeof arguments.callee.activeXString !== 'string') {
          var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
          for (var i = 0; i < versions.length; i++) {
            try {
              xhr = new ActiveXObject(versions[i]);
              arguments.callee.activeXString = versions[i];
              break;
            } catch (e) {console.log('xhr',e)}
          }
        }
        xhr = new ActiveXObject(arguments.callee.activeXString);
      } else {
        throw new Error("No XHR Object available!");
      }
      return xhr
    }
  }
  class PPY {
    constructor() {
      
    }
    doAjaxGet(url,data,header,callback) {
      return this.ajaxRequest(url,"get",data,header,callback)
    }
    doAjaxPost(url,data,header,callback) {
      return this.ajaxRequest(url,"post",data,header,callback)
    }
    ajaxRequest(url,type,data,header,callback) {
      //固定格式为 url data header callback
      let _default = {
        async: true,
      }
      url = url || '/'
      type = type || 'get'
      Object.assign(_default,header)
      let xhr = new ajax()
      xhr.open(type, url , _default.async);
      xhr.send()
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          let data = JSON.parse(xhr.responseText)
          callback && callback(data)
        }
      }
    }
    /**
     * 当前环境参数
     */
    env() {
      let envObj = {}
      let osname = ''
      let browser = ''
      let ua = window.navigator.userAgent
      let platform = ua.toLowerCase().match(/(iphone|ipod|ipad|android)/) ? 'mobile' : 'pc'
      if (ua.indexOf("Windows NT 10.0") != -1) {
        osname = "Windows 10";
      } else if (ua.indexOf("Windows NT 6.2") != -1) {
        osname = "Windows 8";
      } else if (ua.indexOf("Windows NT 6.1") != -1) {
        osname = "Windows 7";
      } else if (ua.indexOf("Windows NT 6.0") != -1) {
        osname = "Windows Vista";
      } else if (ua.indexOf("Windows NT 5.1") != -1) {
        osname = "Windows XP";
      } else if (ua.indexOf("Windows NT 5.0") != -1) {
        osname = "Windows 2000";
      } else if (ua.indexOf("Mac") != -1) {
        osname = "Mac/iOS";
      } else if (ua.indexOf("X11") != -1) {
        osname = "UNIX";
      } else if (ua.indexOf("Linux") != -1) {
        osname = "Linux";
      }
      if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
        browser = 'Opera';
      }
      else if (ua.indexOf("compatible") > -1 && ua.indexOf("MSIE") > -1) {
        browser = 'IE';
      }
      else if (ua.indexOf("Edge") > -1) {
        browser = 'Edge';
      }
      else if (ua.indexOf("Firefox") > -1) {
        browser = 'Firefox';
      }
      else if (ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") == -1) {
        browser = 'Safari';
      }
      else if (ua.indexOf("Chrome") > -1 && ua.indexOf("Safari") > -1) {
        browser = 'Chrome';
      }
      else if (!!window.ActiveXObject || "ActiveXObject" in window) {
        browser = 'IE>=11';
      }
      envObj.ua = ua
      envObj.osname = osname
      envObj.platform = platform
      envObj.browser = browser
      return envObj
    }
    /**
     * 获取当前时间
     * 一般时间为yyyy-MM-dd HH:mm:ss
     * 火狐及mac系统时间为 yyyy/MM/dd HH:mm:ss
     */
    getDate() {
      let now = new Date()
      let yyyy = now.getFullYear()
      let MM = now.getMonth() + 1
      let dd = now.getDate()
      let HH = now.getHours()
      let mm = now.getMinutes()
      let ss = now.getSeconds()
      let time = null
      if (this.env.osname == "Mac/iOS") {
        time = yyyy + '/' + (MM < 10 ? ('0' + MM) : MM) + '/' + (dd < 10 ? ('0' + dd) : dd) + ' ' + (HH < 10 ? ('0' + HH) : HH) + ':' + (mm < 10 ? ('0' + mm) : mm) + ':' + (ss < 10 ? ('0' + ss) : ss)
      } else {
        if (this.env.browser == "Firefox") {
          time = yyyy + '/' + (MM < 10 ? ('0' + MM) : MM) + '/' + (dd < 10 ? ('0' + dd) : dd) + ' ' + (HH < 10 ? ('0' + HH) : HH) + ':' + (mm < 10 ? ('0' + mm) : mm) + ':' + (ss < 10 ? ('0' + ss) : ss)
        } else {
          time = yyyy + '-' + (MM < 10 ? ('0' + MM) : MM) + '-' + (dd < 10 ? ('0' + dd) : dd) + ' ' + (HH < 10 ? ('0' + HH) : HH) + ':' + (mm < 10 ? ('0' + mm) : mm) + ':' + (ss < 10 ? ('0' + ss) : ss)
        }
      }
      return time
    }
    /**
     * 获取url参数
     */
    getQueryStr(name) {
      let value = ''
      let query = window.location.search.substring(1)
      let vars = query.split("&")
      for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == name) {
          value = pair[1]
        }
      }
      return value
    }
  }
  class PPYS extends PPY {
    constructor(props) {
      super(props)
      this.init()
    }
    init() {
      // this.rem()
    }
    rem() {
      let fontSize = '14';//默认字体大小

      let designWidth = 1920; //设计稿宽度
      var minCompWidth = 1280; //兼容的最小屏幕宽度
      var minFontSize = ((designWidth / minCompWidth) * 10) + 1;  //前半部分是计算字体大小的公式，某尾的+1是由自己根据实际情况微调
      var pageRemWidth = minCompWidth / minFontSize;
      var clientWidth = document.documentElement.clientWidth;
      if (clientWidth <= minCompWidth) {
        fontSize = minFontSize;
      } else {
        fontSize = clientWidth / pageRemWidth
      }
      document.documentElement.style.fontSize = `${fontSize}px`
    }
  }
  window.PPYUI = new PPYS()
  // window.$ = $
  // window.onresize = function () { PPYUI.rem() }
})(window)
