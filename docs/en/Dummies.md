# Dummies

Dummies are empty *"shell"* components that don't contain the actual implementation.
However, those dummies can be used as real React components and they will re-render
automatically once they get implemented.

Essentially you can create dummies, which will not add any size to your bundle, use them,
but implement them with real components only later when necessary.

  - [`mock()`](./mock.md) - dummy that can be implemented using `.implement()` method.
  - [`loadable()`](./loadable.md) - dummy that can be loaded using `.load()` method.
  - [`lazy()`](./lazy.md) - like `loadable()`, but also loads automatically when rendered for the first time.
  - [`delayed()`](./delayed.md) - like `lazy()`, but its loading can be delayed.
