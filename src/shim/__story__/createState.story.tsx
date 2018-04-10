import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {createState} from '../createState';

const State1 = createState({
  cnt: 1,
});

storiesOf('Shims/createState()', module)
  .add('Basic example', () =>
    <State1>{(state, setState) =>
      <div onClick={() => setState({cnt: state.cnt + 1})}>Count: {state.cnt}</div>
    }</State1>
  );
