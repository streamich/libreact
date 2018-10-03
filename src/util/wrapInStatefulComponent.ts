import * as React from 'react';
import {h} from '../util';

const wrapInStatefulComponent = (Comp) => {
  const Decorated = class Decorated extends React.Component<any, any> {
    render () {
      return h(Comp, this.props);
    }
  };

  return Decorated;
};

export default wrapInStatefulComponent;
