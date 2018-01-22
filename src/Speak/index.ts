import {Component} from 'react';

export interface ISpeakProps {
  text: string;
}

export class Speak extends Component<ISpeakProps, any> {
  componentDidMount () {
    this.speak();
  }

  componentDidUpdate (props) {
    if (props.text !== this.props.text) {
      this.speak();
    }
  }

  speak () {
    const {text} = this.props;

    if (text && window.speechSynthesis) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }
  }

  render () {
    return null;
  }
}
