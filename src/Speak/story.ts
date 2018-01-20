import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Speak} from '.';

class StorySpeakBasic extends Component<any, any> {
  state = {
    text: 'Hello user, how are you today?',
    speakText: '',
  };

  render () {
    return h('div', {},
      h('input', {value: this.state.text, onChange: (e) => this.setState({text: e.target.value})}),
      h('btn', {onClick: () => this.setState({speakText: this.state.text})}, 'Speak'),
      h(Speak, {
        text: this.state.speakText
      })
    );
  }
}

storiesOf('Speak', module)
  .add('basic', () =>
    h(StorySpeakBasic)
  );
