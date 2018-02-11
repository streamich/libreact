import {Component} from 'react';
import {Provider, Consumer} from '../context';
import {h} from '../util';
import renderProp from '../util/renderProp';

let idCnt = 0;

const supportsCssVariables = typeof window === 'object' && (window as any).CSS && CSS.supports && CSS.supports('--a', '0');

export type TVars = {[name: string]: string};

export interface ICssVarsProviderProps {
  ns?: string;
  prefix?: string;
  vars: TVars;
}

export interface ICssVarsProviderState {
}

export class CssVarsProvider extends Component<ICssVarsProviderProps, ICssVarsProviderState> {
  vars: TVars = {};

  constructor (props, context) {
    super(props, context);

    this.updateVars(props.vars);
  }

  updateVars (vars: TVars) {
    if (supportsCssVariables) {
      const {prefix = ''} = this.props;
      const {style} = document.documentElement;

      for (const name in vars) {
        const id = (idCnt++).toString(36);
        const varName = `---${prefix}${id}`;

        this.vars[name] = `var(${varName})`;
        style.setProperty(varName, String(vars[name]));
      }
    } else {
      this.vars = vars;
    }
  }

  render () {
    return h(Provider, {
      name: 'css/' + this.props.ns,
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
  render () {
    return h(Consumer, {name: 'css/' + this.props.ns}, (vars) => {
      return renderProp(this.props, vars);
    });
  }
}
