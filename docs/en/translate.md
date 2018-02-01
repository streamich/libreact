# Translate

Provides translation API using [context](./context.md) interfaces.


## `<Translations>`

Translation provider, use it to broadcast your translation map. You can have multiple nested
translations providers, where child provider will overwrite parent's translations. Also, you
can have different translation providers at the same time, using the namespace `ns` prop.

### Usage

```jsx
import {Translations} from 'libreact/lib/translate';

<Translations map={{
  key: 'value',
  bye: 'ciao'
}}>
  <App />
</Translations>
```

### Props

```ts
interface ITranslationsProps {
  map: {[key: string]: string | ((T, ...args) => string)};
  ns?: string;
}
```

, where

  - `map` - required, object, a dictionary of translations.
  - `ns` - optional, string, namespace.


## `<Translate>` or `<T>`

Translation consumer render prop component that receives translation function `T`, which has the following signature

```ts
T: (key: string, ...args) => string;
```

`<Translate>` component has also a shorthand alias `<T>` component.

### Usage

```jsx
import {Translations, T} from 'libreact/lib/translate';

<Translations map={{
  key: 'value',
  bye: 'ciao'
}}>
  <T>{(t) =>
    <span>Goodbye is ${t('bye')}</span>
  }</T>
</Translations>
```

### Props

```ts
interface ITranslateProps {
  ns?: string;
}
```

, where

  - `ns` - optional, string, namespace.


## `withT()` HOC

`withT` is an enhancer that injects `T` function into your component.

```jsx
import {withT} from 'libreact/lib/translate';

const MyCompWithT = withT(MyComp);
```


## `@withT` decorator

Component class decorator that injects `T` function into your component.

```jsx
import {withT} from 'libreact/lib/translate';

@withT
class MyComp extends Component {

}
```
