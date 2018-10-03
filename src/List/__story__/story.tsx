import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {List, withList} from '..';
import ShowDocs from '../../ShowDocs'

const Demo = ({value, push, filter, sort}) =>
  <div>
    <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(value)}</pre>
    <button onClick={() => push(0)}>push</button>
    <button onClick={() => filter((i) => i > 0)}>filter</button>
    <button onClick={() => sort()}>sort</button>
  </div>;

const Hoc1 = withList(({list}) => h(Demo, list));
const Hoc2 = withList(Demo, '', [1, 2, 3]);

@withList('foo', [1, 2, 3])
class Decorator1 extends Component<any, any> {
  render () {
    return <Demo {...this.props.foo} />
  }
}

@withList
class Decorator2 extends Component<any, any> {
  render () {
    return <Demo {...this.props.list} />
  }
}

storiesOf('Inversion/List', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/List.md')}))
  .add('FaCC', () =>
    <List init={[1, 2, 3]}>{Demo}</List>
  )
  .add('HOC 1', () => <Hoc1 />)
  .add('HOC 2', () => <Hoc2 />)
  .add('Decorator 1', () => <Decorator1 />)
  .add('Decorator 2', () => <Decorator2 />);
