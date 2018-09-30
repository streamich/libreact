import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {HoverSensor, withHover} from '..';
import ShowDocs from '../../ShowDocs'

const Demo = ({bond, isHover}) =>
  <div {...bond} style={{
    border: '1px solid tomato',
    padding: 30
  }}>
    {isHover ? 'HOVERED' : '...'}
  </div>;

const Hoc = withHover(Demo, '');

storiesOf('Sensors/HoverSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/HoverSensor.md')}))
  .add('FaCC', () =>
    <HoverSensor>{({isHover}) =>
      <div style={{
        border: '1px solid tomato',
        padding: 30
      }}>
        {isHover ? 'HOVERED' : '...'}
      </div>
    }</HoverSensor>
  )
  .add('FaCC with bond', () =>
    <HoverSensor bond>{({bond, isHover}) =>
      <div style={{border: '1px solid yellow'}}>
        <div {...bond} style={{
          border: '1px solid tomato',
          padding: 30,
          margin: 30
        }}>
          {isHover ? 'HOVERED' : '...'}
        </div>
      </div>
    }</HoverSensor>
  )
  .add('HOC', () => <Hoc />);
