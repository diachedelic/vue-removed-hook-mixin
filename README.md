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

## License

[MIT](http://opensource.org/licenses/MIT)
