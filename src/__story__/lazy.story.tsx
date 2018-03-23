import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {lazy} from '../lazy';
import ShowDocs from '../../.storybook/ShowDocs'

const MyComponent = () => <div style={{
  background: 'tomato',
  width: 300,
  height: 300,
}} />;

const Spinner = () => <span>Spinner :)</span>;

const Lazy1 = lazy({
  loader: () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(MyComponent);
    }, 1000);
  }),
  loading: 'Loading...'
});

const Lazy2 = lazy({
  loader: () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(MyComponent);
    }, 1000);
  }),
  loading: <Spinner />
});

storiesOf('Dummies/lazy()', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../docs/en/lazy.md')}))
  .add('Loads in 1s', () => <Lazy1 />)
  .add('Loads in 1s with <Spinner>', () => <Lazy2 />)
