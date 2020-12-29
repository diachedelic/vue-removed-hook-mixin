/*jslint this, browser */

/*property
    $el, $options, body, call, childList, contains, destroyed, disconnect,
    freeze, from, observe, removed, removedNodes, some, subtree
*/

// A Vue mixin which adds a 'removed' hook to the component, which fires once
// the component is fully removed from the DOM.

export default Object.freeze({
    destroyed() {
        const vm = this;
        function call_removed_hook() {

// A quick and dirty version of Vue's lifecycle 'callHook' method.

            return vm.$options.removed.call(vm);
        }

// Check if the element was immediately detached from DOM, for example if
// there was no transition.

        if (!document.body.contains(vm.$el)) {
            return call_removed_hook();
        }

// Wait for the element to be removed from the DOM.

        const observer = new MutationObserver(function (mutations, observer) {
            if (
                mutations.some(function (mutation) {
                    return Array.from(mutation.removedNodes).some(
                        (node) => node.contains(vm.$el)
                    );
                })
            ) {
                observer.disconnect();
                return call_removed_hook();
            }
        });

        return observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});
