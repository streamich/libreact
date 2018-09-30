import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Toggle, withToggle} from '..';
import ShowDocs from '../../ShowDocs'

const Checkbox = ({on, toggle}) =>
  <div onClick={toggle}>
    <input type='checkbox' checked={on} />
    Toggle me!
  </div>;

const Checkbox2 = ({toggle}) => h(Checkbox, toggle);

const Hoc1 = withToggle(Checkbox, '', {init: true});
const Hoc2 = withToggle(Checkbox2);

@withToggle
class Decorator extends Component<any, any> {
  render () {
    const {on, toggle} = this.props.toggle;

    return (
      <div onClick={toggle}>
        <input type='checkbox' checked={on} />
        Toggle me!
      </div>
    );
  }
}

storiesOf('Inversion/Toggle', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Toggle.md')}))
  .add('Example', () =>
    <Toggle init={true}>{({on, toggle}) =>
      <div onClick={toggle}>
        <input type='checkbox' checked={on} />
        Toggle me!
      </div>
    }</Toggle>
  )
  .add('HOC 1', () => <Hoc1 />)
  .add('HOC 2', () => <Hoc2 />)
  .add('Decorator', () => <Decorator />);
