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
    var msg = new SpeechSynthesisUtterance(this.props.text);
    window.speechSynthesis.speak(msg);
  }

  render () {
    return null;
  }
}
