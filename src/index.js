// adds a 'removed' hook to the component, which fires once the component
// is fully removed from the DOM
export default {
  destroyed() {
    const removed = () => {
      // quick and dirty version of Vue's lifecycle callHook method
      this.$options.removed.call(this)
    }

    // element was immediately detached from DOM (no transition)
    if (!this.$el.offsetParent) {
      removed()
      return
    }

    const mutationHandler = (mutations, observer) => {
      for (const mutation of mutations) {
        for (const node of mutation.removedNodes) {
          if (node === this.$el) {
            observer.disconnect()
            removed()
          }
        }
      }
    }

    // start observing parent element for changes to the DOM
    const observer = new MutationObserver(mutationHandler)

    observer.observe(this.$parent.$el, { childList: true })
  },
}
