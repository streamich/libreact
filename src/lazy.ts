import {Component, createElement as h} from 'react';
import {noop} from './util';

const requestIdleCallback = (window as any).requestIdleCallback;

const waitForIdleTime = () => new Promise((resolve) => {
  if (requestIdleCallback) {
    setTimeout(() => requestIdleCallback(resolve), 300);
  } else {
    setTimeout(resolve, 500);
  }
});

export interface IlazyOpts {
  name?: string,
  placeholder?,
  onIdle?: boolean,
}

/**
 * Creates a lazy component, which is loaded only when used for the first time. Usage:
 *
 *     const LazyComponent = lazy(() => import('../path/to/real/component').then(module => module.Component));
 *
 * Or, if component is the default export:
 *
 *     const LazyComponent = lazy(() => import('../path/to/real/Component'));
 *
 * You can preload the component at any point using the `.load` method:
 *
 *     LazyComponent.load();
 *
 */
export const lazy = (compOrModulePromise, opts: IlazyOpts = {}) => {
  let Comp = null;
  const placeholder = opts.placeholder || null;
  const name = opts.name || 'Lazy';

  const load = async () => {
    if (Comp) {
      return Comp;
    }

    if (opts.onIdle) {
      await waitForIdleTime();
    }

    let compOrModule = await compOrModulePromise();

    // Sugar syntax, pick the component from the default export of the module, if we are given a module.
    if (typeof compOrModule === 'object' && compOrModule.__esModule) {
      compOrModule = compOrModule.default;
    }

    Comp = compOrModule;

    return compOrModule;
  };

  const LazyComp = class extends Component<any, any> {
    static displayName = name;

    static propTypes = {
      refInstance: Types.func
    };

    static defaultProps = {
      refInstance: noop
    };

    unmounted: boolean;

    // eslint-disable-next-line class-methods-use-this
    async componentWillMount () {
      if (!Comp) {
        await load();
        await waitForCSSStylesToRender();
        if (!this.unmounted) {
          this.forceUpdate();
        }
      }
    }

    componentWillUnmount () {
      this.unmounted = true;
    }

    render () {
      const {refInstance, ...props} = this.props;

      if (Comp) {
        return h(Comp, {
          ...props,
          ref: refInstance
        });
      } else {
        return typeof placeholder === 'function' ? placeholder(props) : placeholder;
      }
    }
  };

  (LazyComp as any).load = load;

  return LazyComp as any;
};
