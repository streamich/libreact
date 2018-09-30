import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Speak} from '..';
import ShowDocs from '../../ShowDocs'

class StorySpeakBasic extends Component<any, any> {
  state = {
    text: 'Hello user, how are you today?',
    speakText: '',
  };

  render () {
    return h('div', {},
      h('input', {value: this.state.text, onChange: (e) => this.setState({text: e.target.value})}),
      h('button', {onClick: () => this.setState({speakText: this.state.text})}, 'Speak'),
      h('pre', {style: {fontFamily: 'monospace'}},
        `<Speak text="${this.state.speakText}" />`
      ),
      h(Speak, {
        text: this.state.speakText
      })
    );
  }
}

storiesOf('Generators/Speak', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Speak.md')}))
  .add('Example', () =>
    h(StorySpeakBasic)
  );
