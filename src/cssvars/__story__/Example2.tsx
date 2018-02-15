import {Component, createElement as h} from 'react';
import {CssVarsProvider, CssVars} from '..';

const Print = (props) => <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(props, null, 4)}</pre>;

const theme1 = {
  color: 'red',
  border: '1px solid red',
  background: 'yellow'
};

const theme2 = {
  color: 'blue',
  border: '1px solid red',
  background: 'pink',
  fontWeight: 'bold'
};

const theme3 = {
  color: 'black',
  border: '1px solid black',
  background: 'yellow'
};

export class Example2 extends Component<any, any> {
  el;

  state = {
    theme: theme1
  };

  render () {
    return (
      <CssVarsProvider vars={this.state.theme}>
        <CssVars>{(vars) =>
          <div>
            <div style={vars}>Demo</div>

            <button onClick={() => this.setState({theme: theme1})}>Theme 1</button>
            <button onClick={() => this.setState({theme: theme2})}>Theme 2</button>
            <button onClick={() => this.setState({theme: theme3})}>Theme 3</button>

            <div>Theme 1:</div>
            <div><Print {...theme1} /></div>

            <div>Theme 2:</div>
            <div><Print {...theme2} /></div>

            <div>Theme 3:</div>
            <div><Print {...theme3} /></div>
          </div>
        }</CssVars>
      </CssVarsProvider>
    );
  }
}
