import { Component } from 'react';
import renderProp from '../util/renderProp';
import * as throttle from 'throttle-debounce/throttle';
export class SyncSensor extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = props.initial || {};
        this.onEvent = throttle(this.props.throttle, false, (event) => {
            const state = this.props.onEvent(event);
            this.setState(state);
        });
    }
    componentDidMount() {
        this.props.addListener(this.onEvent);
    }
    componentWillUnmount() {
        this.props.removeListener(this.onEvent);
    }
    render() {
        return renderProp(this.props, this.state);
    }
}
SyncSensor.defaultProps = {
    throttle: 100
};
