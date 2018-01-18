/* eslint-disable import/prefer-default-export */
import {Component, createElement as h} from 'react';

export interface IMock<TProps> extends Component<TProps, any> {}

export interface IMockComponent<TProps> {
  new (props: TProps, context): IMock<TProps>;
  implement(Implementation: React.Component<TProps, any> | React.SFC<TProps>);
}

export interface IMockParams {
  loading?: React.ReactElement<any>;
}

export type TMock = <TProps>(params?: IMockParams) => IMockComponent<TProps>;

export const mock: TMock = <TProps>({loading = null}: IMockParams = {}) => {
  let Comp;
  const notifyOnImplementationList = [];

  const Mock: IMockComponent<TProps> = class Mock extends Component<TProps, any> {
    constructor (props, context) {
      super(props, context);

      if (!Comp) {
        notifyOnImplementationList.push(this);
      }
    }

    render () {
      return Comp ? h(Comp, this.props) : loading;
    }
  } as IMockComponent<TProps>;

  Mock.implement = (Implementation) => {
    Comp = Implementation;
    for (const instance of notifyOnImplementationList) {
      instance.forceUpdate();
    }
  };

  return Mock;
};
