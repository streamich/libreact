import {createElement as h, Component} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import ShowDocs from '../../../.storybook/ShowDocs'
import {CssVarsProvider, CssVars, withCssVars} from '..';
import {Example1} from './Example1';
import {Example2} from './Example2';

const Print = (props) => <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(props, null, 4)}</pre>;

const Hoc1 = withCssVars(({vars}) =>
  <div style={vars}>Hello world!</div>
);

const Hoc2 = withCssVars(({theme}) => {
  return <div style={theme}>Hello world!</div>;
}, 'theme', {ns: 'namespaced'});

@withCssVars('theme')
class Decorator1 extends Component<any, any> {
  render () {
    return <div style={this.props.theme}>Hello world!</div>;
  }
}

storiesOf('Context/CSS Variables', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/cssvars.md')}))
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
      <CssVars ns='namespace-'>{(vars) =>
        <div>
          <Print {...vars} />
          <button style={vars}>Click me!</button>
        </div>
      }</CssVars>
    </CssVarsProvider>
  )
  .add('Change theme', () => <Example2 />)
  .add('HOC 1', () =>
    <CssVarsProvider vars={{
      color: 'tomato',
      border: '1px solid tomato'
    }}>
      <Hoc1 />
    </CssVarsProvider>
  )
  .add('HOC 2', () =>
    <CssVarsProvider ns='namespaced' vars={{
      color: 'tomato',
      border: '1px solid tomato'
    }}>
      <Hoc2 />
    </CssVarsProvider>
  )
  .add('Decorator 1', () =>
    <CssVarsProvider vars={{
      color: 'tomato',
      border: '1px solid tomato'
    }}>
      <Decorator1 />
    </CssVarsProvider>
  )
