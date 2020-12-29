# vue-removed-hook-mixin

Adds a `removed` hook to components, signalling `$el`'s removal from the DOM.

## Usage

```javascript
// 1) Use the mixin in a single component.
import addRemovedHook from "vue-removed-hook-mixin";
export default {
    mixins: [addRemovedHook],

    // ...

    removed() {
        // this.$el is no longer a descendant of document.body.
    }
}

// 2) Apply the mixin to all components.
import addRemovedHook from "vue-removed-hook-mixin";
Vue.mixin(addRemovedHook);
````

## Rationale

The built in `destroyed` hook is called before a component is fully transitioned out of view, which is a problem if destroying a non-Vue component changes how it looks. For instance, an interactive map, once destroyed, may remove all its tiles and becomes an unsightly grey box. Detecting the end of transitions is unreliable, so I opted to wait until the component's root element was removed from the DOM.

## Discussion

* https://github.com/vuejs/vue/issues/6983
* https://github.com/staskjs/vue-slick/issues/56

## License

[MIT](http://opensource.org/licenses/MIT)
