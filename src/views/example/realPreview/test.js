export default () => {
  window.open = function() { console.log('window.open is disabled.') }
  window.print = function() { console.log('window.print is disabled.') }
  window.alert = function() { console.log('window.alert is disabled.') }
  window.confirm = function() { console.log('window.confirm is disabled.') }
  window.prompt = function() { console.log('window.prompt is disabled.') }
  window.Notification = function() { console.log('HTML5 notifications are disabled.') }

  /**
  * Capture and kill animations after X number of seconds
  **/
  var __animationDuration = 1500
  var __animationsTimedOut = false
  var __animationRequests = []
  var __requestAnimationFrame = false
  var __cancelAnimationFrame = false
  var x, i

  var vendorsReqestAnimationFrame = [
    'requestAnimationFrame',
    'mozRequestAnimationFrame',
    'webkitRequestAnimationFrame'
  ]

  // find the browsers requestAnimationFrame and cancelAnimationFrame
  for (x = 0; x < vendorsReqestAnimationFrame.length; x++) {
    if (!__requestAnimationFrame) {
      __requestAnimationFrame = window[vendorsReqestAnimationFrame[x]]
    }
  }

  __cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame

  // Wrap the requestAnimationFrame so we can stop it in the future
  function __reqFrame(callback, element) {
    // after the timeout we no longer take requests
    var timerID
    if (__animationsTimedOut) {
      return 0
    } else {
      timerID = __requestAnimationFrame(callback, element)
      __animationRequests.push(timerID)

      return timerID
    }
  }

  for (x = 0; x < vendorsReqestAnimationFrame.length; x++) {
    window[vendorsReqestAnimationFrame[x]] = __reqFrame
  }

  // Cancel the animations after expiration
  setTimeout(function() {
    for (i = 0; i < __animationRequests.length; i++) {
      __cancelAnimationFrame(__animationRequests[i])
    }

    var ss = window.document.createElement('style')
    ss.textContent = '*, *::before, *::after { animation-play-state: paused !important; }'
    var ref = window.document.getElementsByTagName('script')[0]
    ref.parentNode.insertBefore(ss, ref)

    __animationsTimedOut = true
  }, __animationDuration, 'push')

  /**
    * Capture setInterval and setTimeout to kill after X number of seconds
    **/
  window.setInterval = (function(oldSetInterval) {
    var registered = []

    function f(a, b) {
      // check if the time has expired,
      // after __animationDuration expires don't take anymore setIntervals
      if (this.timedOut) {
        return 0
      } else {
        return registered[ registered.length ] = oldSetInterval(a, b)
      }
    }

    f.clearAll = function() {
      var r

      while (r = registered.pop()) {
        clearInterval(r)
      }

      this.timedOut = true
    }

    f.timedOut = false

    return f
  }(window.setInterval))

  window.setTimeout = (function(oldSetTimeout) {
    var registered = []

    // because some of our timeouts may time out afterwards
    // we want to make sure they know the secret sauce to still use
    // setTimeout after the time has expired, thats why we have a
    // third param
    function f(a, b, push) {
      // check if the time has expired,
      // after __animationDuration expires don't take anymore requests
      if (this.timedOut && typeof (push) === 'undefined') {
        return 0
      } else {
        // If push is there, never clear that interval
        // so never add it to the registry
        if (push) {
          return oldSetTimeout(a, b)
        } else {
          return registered[ registered.length ] = oldSetTimeout(a, b)
        }
      }
    }

    f.clearAll = function() {
      var r

      while (r = registered.pop()) {
        clearTimeout(r)
      }

      this.timedOut = true
    }

    f.timedOut = false

    return f
  }(window.setTimeout))

  setTimeout(function() {
    setTimeout.clearAll()
    setInterval.clearAll()

    // Stop Web Animations API
    // Idea from Gregor: https://github.com/CodePen/CodePen-Bug-Reporting-Only/issues/173#issuecomment-203443301
    // Status as of August 2016:
    //  Chrome = stops animations
    //  Safari = doesn't support anyway
    //  Firefox = doesn't stop them, but probably will someday? Doesn't error
    if (document.timeline && typeof document.timeline.getAnimations === 'function') {
      document.timeline.getAnimations().map(function(animation) {
        animation.pause()
      })
    }
  }, __animationDuration, 'push')

  /** */
  // var __animationDuration = 4000

  // setTimeout(function() {
  //   // If onload hasn't been called, stop all requests after 2 seconds
  //   if (typeof (_l) === 'undefined') {
  //     if (window.stop !== undefined) window.stop()
  //     else if (document.execCommand !== undefined) document.execCommand('Stop', false)
  //   }
  // }, 2000, 'push')

  // /*
  //   * Capture and kill CSS animations after X number of seconds
  //   */
  // function pauseAnimations() {
  //   var body = document.getElementsByTagName('body')[0]

  //   if (body.addEventListener) {
  //     body.addEventListener('webkitAnimationStart', listener, false)
  //     body.addEventListener('webkitAnimationIteration', listener, false)
  //     body.addEventListener('animationstart', listener, false)
  //     body.addEventListener('animationiteration', listener, false)
  //   }
  // }

  // function listener(e) {
  //   var targetEl

  //   if (e.type == 'webkitAnimationStart' || e.type == 'webkitAnimationIteration') {
  //     targetEl = e.target

  //     setTimeout(function() {
  //       targetEl.style.webkitAnimationPlayState = 'paused'
  //     }, __animationDuration, 'push')
  //   } else if (e.type == 'animationstart' || e.type == 'animationiteration') {
  //     targetEl = e.target

  //     setTimeout(function() {
  //       targetEl.style.MozAnimationPlayState = 'paused'
  //     }, __animationDuration, 'push')
  //   }
  // }

  // pauseAnimations()

  // Pause all audio elements, allow the audio/video
  // elements to render before stopping them
  function pauseElementTypes(type) {
    for (var i = 0, els = document.getElementsByTagName(type); i < els.length; i++) {
      els[i].pause()
    }
  }

  // // Wait until the elements have been created to pause them
  setTimeout(function() {
    pauseElementTypes('audio')
    pauseElementTypes('video')
  }, 100)
}
