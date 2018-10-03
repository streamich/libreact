import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Value, withValue} from '..';
import ShowDocs from '../../ShowDocs'

const Val = ({value, set}) =>
    <input value={value} onChange={(e) => set(e.target.value)} />;

const Hoc1 = withValue(({value}) => h(Val, value), 'value', 'default');
// const Hoc2 = withToggle(Checkbox2);

@withValue
class Decorator extends Component<any, any> {
  render () {
    return <Val {...this.props.value} />
  }
}

storiesOf('Inversion/Value', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Value.md')}))
  .add('Example', () =>
    <Value init={'foobar'}>{(props) => <Val {...props} />}</Value>
  )
  .add('HOC 1', () => <Hoc1 />)
  .add('Decorator', () => <Decorator />);
