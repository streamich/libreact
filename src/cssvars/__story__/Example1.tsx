import {Component, createElement as h} from 'react';
import {CssVarsProvider, CssVars} from '..';

const Print = (props) => <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(props, null, 4)}</pre>;

export class Example1 extends Component<any, any> {
  el;
  vars;

  ref = (el) => {
    this.el = el;
  };

  componentDidMount () {
    this.applyCssVars();
  }

  componentDidUpdate () {
    this.applyCssVars();
  }

  applyCssVars () {
    if (this.el && this.vars) {
      for (const name in this.vars) {
        console.log('name, this.vars[name]', name, this.vars[name]);
        this.el.style.setProperty(name, this.vars[name]);
      }
    }
  }

  render () {
    return (
      <CssVarsProvider vars={{
        color: 'tomato',
        border: '1px solid tomato'
      }}>
        <CssVars>{(vars) => {
          this.vars = vars;

          return (
            <div>
              <Print {...vars} />
              <button ref={this.ref}>Click me!</button>
            </div>
          );
        }}</CssVars>
      </CssVarsProvider>
    );
  }
}
