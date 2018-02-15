import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import ShowDocs from '../../../.storybook/ShowDocs'
import {CssVarsProvider, CssVars} from '..';
import {Example1} from './Example1';
import {Example2} from './Example2';

const Print = (props) => <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(props, null, 4)}</pre>;

storiesOf('Context/CSS Variables', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/FocusSensor.md')}))
  .add('Basic example', () => <Example1 />)
  .add('Inline style', () =>
    <CssVarsProvider vars={{
      color: 'tomato',
      border: '1px solid tomato'
    }}>
      <CssVars>{(vars) =>
        <div>
          <Print {...vars} />
          <button style={vars}>Click me!</button>
        </div>
      }</CssVars>
    </CssVarsProvider>
  )
  .add('With namespace', () =>
    <CssVarsProvider ns='namespace-' vars={{
      color: 'tomato',
      border: '1px solid tomato'
    }}>
      <CssVars ns='namespace'>{(vars) =>
        <div>
          <Print {...vars} />
          <button style={vars}>Click me!</button>
        </div>
      }</CssVars>
    </CssVarsProvider>
  )
  .add('Change theme', () => <Example2 />);
