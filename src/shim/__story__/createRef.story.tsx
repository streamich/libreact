import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {createRef} from '../createRef';
import ShowDocs from '../../../.storybook/ShowDocs'

class Example extends Component<any, any> {
  divRef = createRef();

  onClick = () => {
    console.log('ref', this.divRef.value);
  };

  render () {
    return <div ref={this.divRef} onClick={this.onClick}>foobar</div>;
  }
}

storiesOf('Shims/createRef()', module)
  .add('Basic example', () => <Example />);
