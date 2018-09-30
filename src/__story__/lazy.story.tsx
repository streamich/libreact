import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {lazy} from '../lazy';
import ShowDocs from '../ShowDocs'

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

const Lazy3 = lazy({
  // @ts-ignore
  loader: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('could not load'));
    }, 1000);
  }),
  loading: <Spinner />,
  error: (error) => {
    console.log(error);

    return () => <div>Could not load</div>;
  }
});

storiesOf('Dummies/lazy()', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../docs/en/lazy.md')}))
  .add('Loads in 1s', () => <Lazy1 />)
  .add('Loads in 1s with <Spinner>', () => <Lazy2 />)
  .add('Error', () => <Lazy3 />)
