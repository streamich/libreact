import { Component } from 'react';
export class Speak extends Component {
    componentDidMount() {
        this.speak();
    }
    componentDidUpdate(props) {
        if (props.text !== this.props.text) {
            this.speak();
        }
    }
    speak() {
        const { text } = this.props;
        if (text && window.speechSynthesis) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
        }
    }
    render() {
        return null;
    }
}
