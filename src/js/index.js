/**
 * form pangpangyu
 */
; (function (window) {
  const $ = require('jquery')
  const Promise = require("bluebird");
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
  let _default = {
    url: location.href,
    type: 'get',
    data: {},
    contentType: 'application/x-www-form-urlencoded',
    timeout: 60000,
    headers: {},
    async: false,
    loading: false
  }
  let loadIndex = 1
  class PPY {
    constructor() {}
    HandleOption(arr, type) {
      let option = {}
      if (arr.length == 1) {
        if (typeof arr[0] === 'object') {
          option = arr[0]
        } else if (typeof arr[0] === 'string') {
          option.url = arr[0]
        }
      } else {
        option.url = arr[0] || '/'
        option.data = arr[1] || {}
        option.headers = arr[2] || {}
        option.async = arr[3] || false
        option.loading = arr[4] || false
      }
      option.type = type
      return option
    }
    /**
     * 网络请求兼容至ie9 如果考虑更低版本ie兼容  考虑原生ajax
     */
    doAjaxGet() {
      let data = Array.from(arguments)
      let option = this.HandleOption(data, 'get')
      return this.ajaxRequest(option)
    }
    doAjaxPost() {
      let data = Array.from(arguments)
      let option = this.HandleOption(data, 'post')
      return this.ajaxRequest(option)
    }
    ajaxRequest(option) {
      const that = this
      option = option || {}
      if (typeof option === "object") {
        Object.assign(_default, option)
      } else {
        _default.url = option
      }
      return new Promise((resolve, reject) => {
        if (_default.loading) {
          that.loading()
        }
        $.support.cors = true; 
        $.ajax({
          url: _default.url,
          type: _default.type,
          data: _default.data,
          contentType: _default.contentType,
          async: _default.async,
          headers: _default.headers,
          xhrFields: {
            withCredentials: false
          },
          crossDomain: true,
          success: function (res) {
            resolve(res)
          },
          error: function (err) {
            reject(err)
          },
          complete:function(){
            console.log(_default.loading)
            if (_default.loading) {
              that.loadremove()
            }
          }
        })
      })
    }
    /**
     * loading
     */
    loading() {
      if(loadIndex == 1){
        this.message('加载中...')
      }
      loadIndex ++
    }
    loadremove(){
      loadIndex--
      if(loadIndex == 1){
        $('.ppy-modal-message').remove()
      }
    }
    message(context){
      var msg = `<div id="ppy-modal-message"><div class="ppy-modal-message-body">${context || '提示信息'}</div></div>`
      $('body').append(msg)
      setTimeout(()=>{
        $('.ppy-modal-message').remove()
      },3000)
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
      this.rem()
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
  window.$ = $
  window.onresize = function () { PPYUI.rem() }
})(window)
