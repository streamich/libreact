import {Component} from 'react';
import {h} from '../util';

export interface IPluggableOptions<TPluginProps> {
  beforePlugins: TPluginProps[],
  afterPlugins: TPluginProps[],
  render: (state) => React.ReactElement<any>,
}

const createPluggable = <TPluginProps extends {[s: string]: (self, state) => any}>(options: IPluggableOptions<TPluginProps>) => {
  const {beforePlugins, afterPlugins, render} = options;


  interface IPluggableProps {
    plugins?: TPluginProps[],
  }

  interface IPluggableState {
    exec: (name: keyof TPluginProps) => any,
    plugins: TPluginProps[],
  }

  const Pluggable = class Pluggable extends Component<IPluggableProps & TPluginProps, IPluggableState> {
    state: IPluggableState;

    constructor (props) {
      super(props);

      this.state = {
        exec: this.exec,
        plugins: this.createPluginArray(),
      };
    }

    createPluginArray (): TPluginProps[] {
      return [
        ...options.beforePlugins,
        ...this.props.plugins,
        this.props as any as TPluginProps,
        ...options.afterPlugins
      ];
    }

    exec = (name: keyof TPluginProps) => {
      const {plugins} = this.state;

      let result;

      for (let i = 0; i < plugins.length; i++) {
        const method = plugins[i][name];

        if (!method) {
          continue;
        }

        result = method(this, this.state);

        if (result !== undefined) {
          return result;
        }
      }
    };

    render () {
      return render(this.state);
    }
  };

  return Pluggable;
};
