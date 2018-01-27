import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Counter, withCounter} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

const Val = ({value, inc, set}) =>
    <div onClick={(e) => inc(3)} onDoubleClick={inc}>{value}</div>;

const Hoc1 = withCounter(({counter}) => h(Val, counter));
const Hoc2 = withCounter(Val, '', -5);

@withCounter('foo', -4)
class Decorator extends Component<any, any> {
  render () {
    return <Val {...this.props.foo} />
  }
}

storiesOf('Inversion/Counter', module)
  .add('Documentation', () => h(ShowDocs, {name: 'Counter'}))
  .add('FaCC', () =>
    <Counter init={1}>{(props) => <Val {...props} />}</Counter>
  )
  .add('HOC 1', () => <Hoc1 />)
  .add('HOC 2', () => <Hoc2 />)
  .add('Decorator', () => <Decorator />);
