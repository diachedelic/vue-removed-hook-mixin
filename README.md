# vue-removed-hook-mixin

Adds a `removed` hook to components, signalling `$el`'s removal from the DOM.

## Usage

```javascript
// use in a component
import addRemovedHook from 'vue-removed-hook-mixin'

export default {
  mixins: [addRemovedHook],

  // ...

  removed() {
    // this.$el is no longer a descendant of document.body
  }
}
```

```javascript
// use in all components
import addRemovedHook from 'vue-removed-hook-mixin'

Vue.mixin(addRemovedHook)
````

## Explanation

The built in `destroyed` hook is called before a component is fully transitioned
out of view, which is a problem if destroying your component changes how it
looks. For instance, a Leaflet map, once destroyed, immediately removes all its
tiles and becomes an unsightly grey box. My only options was to wait until the
transition was finished and my component out of view, and then destroy my
Leaflet map.  However, detecting the end of transitions is unreliable, so I
opted to wait until the component's root element was removed from the DOM.

## Discussion

* https://github.com/vuejs/vue/issues/6983
* https://github.com/staskjs/vue-slick/issues/56

## License

[MIT](http://opensource.org/licenses/MIT)
