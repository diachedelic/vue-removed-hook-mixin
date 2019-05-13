/*!
  * vue-removed-hook-mixin v0.0.3
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

    var removed = function () {
      // quick and dirty version of Vue's lifecycle callHook method
      this$1.$options.removed.call(this$1);
    };

    // element was immediately detached from DOM (no transition)
    if (!this.$el.offsetParent) {
      removed();
      return
    }

    var mutationHandler = function (mutations, observer) {
      for (var i = 0; i < mutations.length; i++) {
        var ref = mutations[i];
        var removedNodes = ref.removedNodes;

        for (var j = 0; j < removedNodes.length; j++) {
          if (removedNodes[j] === this$1.$el) {
            observer.disconnect();
            removed();
          }
        }
      }
    };

    // start observing parent element for changes to the DOM
    var observer = new MutationObserver(mutationHandler);

    observer.observe(this.$parent.$el, { childList: true });
  },
}

return index;

})));
