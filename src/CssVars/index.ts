import {PureComponent, Component} from 'react';
import {Provider, Consumer} from '../context';
import {h, isClient} from '../util';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';

const supportsCssVariables = isClient && (window as any).CSS && CSS.supports && CSS.supports('--a', '0');
let style;

if (supportsCssVariables) {
  style = document.documentElement.style;
}

export type TVars = {[name: string]: string};

export interface ICssVarsProviderProps {
  ns?: string;
  vars: TVars;
}

export interface ICssVarsProviderState {
}

export class CssVarsProvider extends PureComponent<ICssVarsProviderProps, ICssVarsProviderState> {
  static defaultProps = {
    ns: ''
  };

  vars: TVars = {};

  componentWillMount () {
    this.setVars(this.props.vars);
  }

  componentWillUpdate (newProps) {
    const oldVars = this.props.vars;
    const newVars = newProps.vars;

    const shouldRerender = this.setVars(newVars, oldVars) || this.removeVars(oldVars, newVars);

    if (shouldRerender) {
      this.vars = {...this.vars};
    }
  }

  componentWillUnmount () {
    this.removeVars(this.vars);
  }

  setVars (vars: TVars, oldVars: TVars = {}): boolean {
    if (!supportsCssVariables) {
      this.vars = vars;

      return true;
    }

    let shouldRerender = false;
    const {ns} = this.props;

    for (const name in vars) {
      let doUpdate = false;

      if (oldVars[name]) {
        if (vars[name] !== oldVars[name]) {
          doUpdate = true;
        }
      } else {
        shouldRerender = true;
        doUpdate = true;
      }

      if (doUpdate) {
        const varName = `---${ns}libreact-${name}`;

        this.vars[name] = `var(${varName})`;
        style.setProperty(varName, String(vars[name]));
      }
    }

    return shouldRerender;
  }

  removeVars (oldVars: TVars, vars: TVars = {}): boolean {
    let shouldRerender = false;
    const {ns} = this.props;

    for (const name in oldVars) {
      if (vars[name] === undefined) {
        const varName = `---${ns}libreact-${name}`;

        delete this.vars[name];
        style.removeProperty(varName);
        shouldRerender = true;
      }
    }

    return shouldRerender;
  }

  render () {
    return h(Provider, {
      name: 'css-vars/' + this.props.ns,
      value: this.vars
    },
      this.props.children
    );
  }
}

export interface ICssVarsProps {
  children?: any;
  render?: any;
  component?: any;
  comp?: any;
  ns?: string;
}

export interface ICssVarsState {
}

export class CssVars extends Component<ICssVarsProps, ICssVarsState> {
  static defaultProps = {
    ns: ''
  };

  render () {
    return h(Consumer, {name: 'css-vars/' + this.props.ns}, (vars) => {
      return renderProp(this.props, vars);
    });
  }
}

export const withCssVars = faccToHoc(CssVars, 'vars');
