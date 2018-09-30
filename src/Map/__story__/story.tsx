import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Map, withMap} from '..';
import ShowDocs from '../../ShowDocs'

const Demo = ({get, set, remove}) =>
  <div>
    <div>a: {get('a')}</div>
    <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(get())}</pre>
    <button onClick={() => set('a', 'b')}>set('a', 'b')</button>
    <button onClick={() => remove('a')}>remove('a')</button>
  </div>;

const Hoc1 = withMap(({map}) => h(Demo, map));
const Hoc2 = withMap(Demo, '', {c: 'd'});

@withMap('foo', {c: 'd'})
class Decorator1 extends Component<any, any> {
  render () {
    return <Demo {...this.props.foo} />
  }
}

@withMap
class Decorator2 extends Component<any, any> {
  render () {
    return <Demo {...this.props.map} />
  }
}

storiesOf('Inversion/Map', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Map.md')}))
  .add('FaCC', () =>
    <Map init={{c: 'd'}}>{Demo}</Map>
  )
  .add('HOC 1', () => <Hoc1 />)
  .add('HOC 2', () => <Hoc2 />)
  .add('Decorator 1', () => <Decorator1 />)
  .add('Decorator 2', () => <Decorator2 />);
