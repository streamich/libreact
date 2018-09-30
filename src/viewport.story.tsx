import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {delayed} from './delayed';
import {viewport} from './viewport';
import ShowDocs from './ShowDocs'


const Loaded = () => <div>LOADED</div>;
const Loadable = delayed({
  loading: <div>Loading....</div>,
  loader: () => Promise.resolve(Loaded),
  delay: 1000
});

const MyComp = viewport(Loadable);

const Demo1 = () =>
  <div>
    <div style={{width: 800, height: 1200, border: '1px solid tomato'}} />
    <MyComp />
  </div>;

const Demo2 = () =>
  <div>
    <MyComp />
  </div>;

storiesOf('Dummies/viewport()', module)
  .add('Documentation', () => h(ShowDocs, {name: 'viewport'}))
  .add('Example', () => h(Demo1))
  .add('Shows when visible', () => h(Demo2));
