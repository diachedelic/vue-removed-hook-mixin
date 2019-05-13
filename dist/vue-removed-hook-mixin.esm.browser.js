/*!
  * vue-removed-hook-mixin v0.0.3
  * (c) 2019 James Diacono
  * @license MIT
  */
// adds a 'removed' hook to the component, which fires once the component
// is fully removed from the DOM
var index = {
  destroyed() {
    const removed = () => {
      // quick and dirty version of Vue's lifecycle callHook method
      this.$options.removed.call(this);
    };

    // element was immediately detached from DOM (no transition)
    if (!this.$el.offsetParent) {
      removed();
      return
    }

    const mutationHandler = (mutations, observer) => {
      for (let i = 0; i < mutations.length; i++) {
        const { removedNodes } = mutations[i];

        for (let j = 0; j < removedNodes.length; j++) {
          if (removedNodes[j] === this.$el) {
            observer.disconnect();
            removed();
          }
        }
      }
    };

    // start observing parent element for changes to the DOM
    const observer = new MutationObserver(mutationHandler);

    observer.observe(this.$parent.$el, { childList: true });
  },
}

export default index;
