var DEBUG, clipboard, detectBrowserLang, detectInFBApp, float, focusFirstInput, forceDownload, headerTo, isAndroid, isFirefox, isIE, isMobile, isMobileChrome, isSafari, refreshOGData, xx;

DEBUG = true;

window.countdown = Date.now();

window.requesting = false;

isAndroid = /Android/i.test(navigator.userAgent);

xx = function(x) {
  return DEBUG && console.log(x);
};

float = function(val) {
  return parseFloat(val.replace('px', ''));
};

headerTo = function(path) {
  return window.location = path;
};

focusFirstInput = function() {
  return $('form').find('input[type="text"], textarea').first().focus();
};

detectBrowserLang = function() {
  var language;
  return language = navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage;
};

detectInFBApp = function() {
  var ua;
  ua = navigator.userAgent || navigator.vendor || window.opera;
  return ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1;
};

refreshOGData = function(url) {
  return $.ajax({
    url: 'https://graph.facebook.com',
    type: 'post',
    data: {
      id: url,
      scrape: 'true'
    },
    dataType: 'json'
  });
};

isMobile = function() {
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/BlackBerry/)) {
    return true;
  } else {
    return false;
  }
};

isIE = function() {
  if (navigator.userAgent.indexOf('MSIE ') > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    return true;
  } else {
    return false;
  }
};

isSafari = function() {
  var ua;
  ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('safari') !== -1) {
    if (ua.indexOf('chrome') > -1) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

isFirefox = function() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
};

isMobileChrome = function() {
  if (navigator.userAgent.match('CriOS')) {
    return true;
  } else {
    return false;
  }
};

forceDownload = function(file_url, filename) {
  var _window, evt, save;
  if (!window.ActiveXObject) {
    save = document.createElement('a');
    save.href = file_url;
    save.target = '_blank';
    save.download = filename || 'unknown';
    evt = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': false
    });
    save.dispatchEvent(evt);
    return (window.URL || window.webkitURL).revokeObjectURL(save.href);
  } else if (!!window.ActiveXObject && document.execCommand) {
    _window = window.open(file_url, '_blank');
    _window.document.close();
    _window.document.execCommand('SaveAs', true, filename || file_url);
    return _window.close();
  }
};

NProgress.configure({
  showSpinner: false
});

clipboard = new ClipboardJS('.clipboard-button');

clipboard.on('success', function(event) {
  event.clearSelection();
  return alert('複製成功！');
});

clipboard.on('error', function(error) {
  return alert('複製失敗！請稍後再試！');
});

window.onload = function() {
  return $('body').addClass('loaded');
};
