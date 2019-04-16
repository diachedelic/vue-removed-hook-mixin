// adds a 'removed' hook to the component, which fires once the component
// is fully removed from the DOM
export default {
  destroyed() {
    const timer = setInterval(() => {
      if (document.body.contains(this.$el)) {
        // element not yet removed from component
        return
      }

      // quick and dirty version of Vue's lifecycle callHook method
      this.$options.removed.call(this)

      clearInterval(timer)
    }, 25)
  },
}
