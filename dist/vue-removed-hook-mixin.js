/*!
  * vue-removed-hook-mixin v0.0.1
  * (c) 2019 James Diacono
  * @license MIT
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueRemovedHookMixin = factory());
}(this, (function () { 'use strict';

// adds a 'removed' hook to the component, which fires once the component
// is fully removed from the DOM
var index = {
  destroyed: function destroyed() {
    var this$1 = this;

    var timer = setInterval(function () {
      if (document.body.contains(this$1.$el)) {
        // element not yet removed from component
        return
      }

      // quick and dirty version of Vue's lifecycle callHook method
      this$1.$options.removed.call(this$1);

      clearInterval(timer);
    }, 25);
  },
}

return index;

})));
