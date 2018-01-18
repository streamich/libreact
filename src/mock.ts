/* eslint-disable import/prefer-default-export */
import {Component, createElement as h} from 'react';

export interface IMock<TProps> extends Component<TProps, any> {}

export interface IMockConstructor<TProps> {
  new (props: TProps, context): IMock<TProps>;
  implement(Implementation: React.Component<TProps, any> | React.SFC<TProps>);
}

export interface ImockParams {
  loading?: React.ReactElement<any>;
}

export type TMock = <TProps>(params?: ImockParams) => IMockConstructor<TProps>;

export const mock: TMock = <TProps>({loading = null}: ImockParams = {}) => {
  let Comp;
  const notifyOnImplementationList = [];

  const Mock: IMockConstructor<TProps> = class Mock extends Component<TProps, any> {
    constructor (props, context) {
      super(props, context);

      if (!Comp) {
        notifyOnImplementationList.push(this);
      }
    }

    render () {
      return Comp ? h(Comp, this.props) : loading;
    }
  } as IMockConstructor<TProps>;

  Mock.implement = (Implementation) => {
    Comp = Implementation;
    for (const instance of notifyOnImplementationList) {
      instance.forceUpdate();
    }
  };

  return Mock;
};
