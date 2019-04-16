/*!
  * vue-removed-hook-mixin v0.0.1
  * (c) 2019 James Diacono
  * @license MIT
  */
// adds a 'removed' hook to the component, which fires once the component
// is fully removed from the DOM
var index = {
  destroyed() {
    const timer = setInterval(() => {
      if (document.body.contains(this.$el)) {
        // element not yet removed from component
        return
      }

      // quick and dirty version of Vue's lifecycle callHook method
      this.$options.removed.call(this);

      clearInterval(timer);
    }, 25);
  },
}

export default index;
