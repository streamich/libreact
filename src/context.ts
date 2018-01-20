import {createElement as h} from 'react';
import {Provider, Consumer} from 'freestyler-context';

export const withContext = (Comp, name) => {
  return (props) => {
    const {contextName = name, ...rest} = props;

    return h(Consumer, {name: contextName}, (value) => {
      rest[contextName] = value;

      return h(Comp, rest);
    });
  };
};

export {
  Provider,
  Consumer
};
