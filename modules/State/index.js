import { Component } from 'react';
import { h, noop } from '../util';
import renderProp from '../util/renderProp';
export class State extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = props.init || {};
        this.setState = this.setState.bind(this);
    }
    componentDidMount() {
        this.props.onMount(this.state);
    }
    componentWillUnmount() {
        this.props.onUnmount(this.state);
    }
    render() {
        return renderProp(this.props, this.state, this.setState);
    }
}
State.defaultProps = {
    onChange: noop,
    onMount: noop,
    onUnmount: noop
};
export const withState = (Comp, name = 'state', init = {}) => (props) => h(State, {
    init,
    render: (state, set) => h(Comp, name ?
        {
            [name]: {
                ...state,
                set
            },
            ...props
        } :
        {
            ...state,
            set,
            ...props,
        })
});
