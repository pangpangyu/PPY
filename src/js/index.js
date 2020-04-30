/**
 * 注释
 * form pangpangyu
 */
;(function(window){
  // const $ = require('jquery')
  const Promise = require("bluebird");
  class PPY{
    constructor(){
      let xhr = null
      if (window.XDomainRequest) {
        xhr = new XDomainRequest();
      }else{
        xhr = new XMLHttpRequest();
      }
      xhr.withCredentials = false;
      this.xhr = xhr
    }
    doAjax(option){
      const that = this
      if(!option){
        return that
      }else{
        return that.ajax(option)
      }
      //ajax默认封装
      /**
       * 修改 不依赖jq
       */
      // let defaultOption = {}
      // $.extend(defaultOption,option || {})
      // //ajax封装
      // return new Promise((resolve, reject)=>{
      //   console.log('执行完成');
      //   setTimeout(()=>{
      //     resolve('随便什么数据');
      //   },1000)
      // })
    }
    ajax(option){
      const that = this
      let xhr = that.xhr
      return new Promise((resolve, reject)=>{
        xhr.open(option.method || 'get',option.url || '/')
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
        xhr.send()
        xhr.onreadystatechange = function () {
          let response = JSON.parse(xhr.responseText || "{}")
          console.log(xhr.responseText)
          if (xhr.readyState == 4 && xhr.status == 200) {
            resolve(response)
          }
        };
      })
    }
    post(option){
      this.ajax(option)
    }
    get(option){
      this.ajax(option)
    }
    env(){
      let envObj = {}
      let osname = ''
      let ua = window.navigator.userAgent
      let platform = ua.toLowerCase().match(/(iphone|ipod|ipad|android)/) ? 'mobile' : 'pc'
      if (ua.indexOf("Windows NT 10.0")!= -1){
        osname = "Windows 10";
      }else if (ua.indexOf("Windows NT 6.2") != -1){
        osname = "Windows 8";
      }else if (ua.indexOf("Windows NT 6.1") != -1){
        osname = "Windows 7";
      }else if (ua.indexOf("Windows NT 6.0") != -1){
        osname = "Windows Vista";
      }else if (ua.indexOf("Windows NT 5.1") != -1){
        osname = "Windows XP";
      }else if (ua.indexOf("Windows NT 5.0") != -1){
        osname = "Windows 2000";
      }else if (ua.indexOf("Mac") != -1){
        osname = "Mac/iOS";
      }else if (ua.indexOf("X11") != -1){
        osname = "UNIX";
      }else if (ua.indexOf("Linux") != -1){
        osname = "Linux";
      }
      envObj.ua = ua
      envObj.osname = osname
      envObj.platform = platform
      return envObj
    }
  }
  class PPYS extends PPY{
    constructor(props){
      super(props)
      this.init()
    }
    init(){
      this.rem()
    }
    rem(){
      let fontSize = '16'
      document.documentElement.style.fontSize = `${fontSize}px`
    }
  }
  window.p = new PPYS()
  // window.$ = $
  window.onresize = function(){
    p.rem()
  }
})(window)
