/*!
  * vue-removed-hook-mixin v0.1.0
  * (c) 2019 James Diacono
  * @license MIT
  */
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
    if (!document.body.contains(this.$el)) {
      removed();
      return
    }

    var mutationHandler = function (mutations, observer) {
      for (var i = 0; i < mutations.length; i++) {
        var ref = mutations[i];
        var removedNodes = ref.removedNodes;

        for (var j = 0; j < removedNodes.length; j++) {
          if (removedNodes[j].contains(this$1.$el)) {
            observer.disconnect();
            removed();
          }
        }
      }
    };

    // start observing parent element for changes to the DOM
    var observer = new MutationObserver(mutationHandler);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
}

export default index;
