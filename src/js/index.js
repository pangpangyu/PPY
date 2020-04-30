/**
 * 注释
 * form pangpangyu
 */
;(function(window){
  const $ = require('jquery')
  class PPY{
    constructor(){

    }
    ajax(option){
      let defaultOption = {

      }
      $.extend(defaultOption,option || {})
      //ajax封装
    }
    env(){
      let envObj = {}
      let osname = ''
      let ua = window.navigator.userAgent
      let platform = ua.toLowerCase().match(/(iphone|ipod|ipad|android)/) ? 'mobile' : 'pc'
      if (ua.indexOf("Windows NT 10.0")!= -1){
        osname = "Windows 10";
      }else if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1){
        osname = "Windows 8";
      }else if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1){
        osname = "Windows 7";
      }else if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1){
        osname = "Windows Vista";
      }else if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1){
        osname = "Windows XP";
      }else if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1){
        osname = "Windows 2000";
      }else if (window.navigator.userAgent.indexOf("Mac") != -1){
        osname = "Mac/iOS";
      }else if (window.navigator.userAgent.indexOf("X11") != -1){
        osname = "UNIX";
      }else if (window.navigator.userAgent.indexOf("Linux") != -1){
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
      console.log(this.env().platform)
      console.log(window.screen.height)
      console.log(window.screen.width)
      document.documentElement.style.fontSize = `${fontSize}px`
    }
  }
  window.p = new PPYS()
  window.$ = $
  window.onresize = function(){
    p.rem()
  }
})(window)
