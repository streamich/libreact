import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {State, withState} from '..';
import ShowDocs from '../../ShowDocs'

const Cnt = ({cnt, set}) =>
  <div onClick={() => set({cnt: cnt + 1})}>{cnt}</div>;

const Hoc1 = withState(Cnt, '', {cnt: 3});
const Hoc2 = withState(({foobar}) => h(Cnt, foobar), 'foobar', {cnt: 0});

storiesOf('Inversion/State', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/State.md')}))
  .add('Basic example', () =>
    <State init={{cnt: 0}}>{({cnt}, set) =>
      <div
        style={{
          width: 100,
          height: 100,
          border: '1px solid tomato',
          fontSize: '70px',
          lineHeight: '100px',
          textAlign: 'center'
        }}
        onClick={() => set({cnt: cnt + 1})}
      >
        {cnt}
      </div>
    }</State>
  )
  .add('HOC 1', () => <Hoc1 />)
  .add('HOC 2', () => <Hoc2 />);
