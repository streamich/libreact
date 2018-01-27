# Dummies

Dummies are empty *"shell"* components that don't contain the actual implementation.

However, those dummies can be used as real React components and they will re-render
automatically once they get implemented.

Essentially you can create dummies, which will not add any size to your bundle, use them,
but implement them with real component only when necessary.

  - [`mock()`](./mock.md) - dummy that can be implemented using `.implement()` method.
  - [`loadable()`](./loadable.md) - dummy that can be loaeded using `.load()` method.
  - [`lazy()`](./lazy.md) - dummy that loads automatically when rendered for the first time.
  - [`delayed()`](./delayed.md) - like `lazy()`, but its loading can be delayed further.
  - [`viewport()`](./viewport.md) - dummy that is loaded automatically when it appears for
  the first time in viewport.
