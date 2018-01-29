import { Component } from 'react';
export class Vibrate extends Component {
    componentDidMount() {
        this.vibrate();
    }
    componentDidUpdate(props) {
        if (String(props.ms) !== String(this.props.ms)) {
            this.vibrate();
        }
    }
    vibrate() {
        if (navigator.vibrate) {
            navigator.vibrate(this.props.ms);
        }
    }
    render() {
        return null;
    }
}
