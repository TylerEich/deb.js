function injectScript() {
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.innerHTML = '!function(o,n){"function"==typeof define&&define.amd?define([],n):n()}(this,function(){Function.prototype.debc=function(o){return Function.prototype.deb.apply(this,[o,!0])},Function.prototype.deb=function(o,n){var t,e=function(){return"rgb("+(Math.floor(76*Math.random())+200)+","+(Math.floor(76*Math.random())+200)+","+(Math.floor(76*Math.random())+200)+")"},r=function(o,e,r){"undefined"!=typeof console&&(l&&"string"==typeof o?r!==!1&&o.indexOf("%20")<0?console[e?n?"groupCollapsed":"group":"log"]("%c"+o,"background:"+t+";"+r):console[e?n?"groupCollapsed":"group":"log"](o):console[e?"group":"log"](o))},i=function(){"undefined"!=typeof console&&console.groupEnd()},c=function(n,t,e){var c=e.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[0];if(0===n[0].indexOf("Error")&&(n=n.slice(1)),r(o+c+")",a),t&&t.length>0){r("arguments:",!0);for(var u=0;u<t.length;u++){var f="function"==typeof t[u]?"function":t[u];r(f,!1,"color:#727272;font-size:10px;")}i()}if(n&&n.length>1){r("stack trace:",!0);for(var u=0;u<n.length;u++)r("  "+n[u].trim(),!1,!1);i()}},u=function(o,n){r("  returns: "+("function"==typeof n?"function":n)),r("  duration: "+(Date.now()-o)+"ms"),r("}"),a&&i()},f=this,o=o?o+": ":"",a=console&&console.group&&console.groupEnd,l=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;return function(){t=e();var o=Date.now();c((new Error).stack.split(new RegExp("\\n")),arguments,f);var n=f.apply(this,Array.prototype.slice.call(arguments,0));return u(o,n),n}}});';
  var root = document.head || document.documentElement;
  root.insertBefore(s, root.firstChild);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message === 'inject' && sessionStorage.debJsState) {
    injectScript();
  } else if (message === 'getState') {
    sendResponse(sessionStorage.debJsState);
  } else if (typeof message.setState === 'string') {
    sessionStorage.debJsState = message.setState;
    sendResponse();
  }
});

chrome.runtime.sendMessage(null, 'ready');
