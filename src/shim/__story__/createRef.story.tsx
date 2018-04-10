import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {createRef} from '../createRef';

class Example extends Component<any, any> {
  divRef = createRef();

  onClick = () => {
    console.log('ref', this.divRef.value);
  };

  render () {
    return <div ref={this.divRef} onClick={this.onClick}>{'See <div> ref in console.'}</div>;
  }
}

storiesOf('Shims/createRef()', module)
  .add('Basic example', () => <Example />);
