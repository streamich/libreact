import { Component } from 'react';
export class Resolve extends Component {
    constructor(props, context) {
        super(props, context);
        this.mounted = false;
        this.state = {
            pending: true
        };
        this.resolve();
    }
    componentDidMount() {
        this.mounted = true;
    }
    componentDidUpdate({ promise }) {
        if (promise !== this.props.promise) {
            this.resolve();
        }
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    resolve() {
        const { promise } = this.props;
        promise
            .then((value) => {
            if (this.mounted && (promise === this.props.promise)) {
                this.setState({
                    pending: false,
                    value
                });
            }
        })
            .catch((error) => {
            if (this.mounted && (promise === this.props.promise)) {
                this.setState({
                    pending: false,
                    error
                });
            }
        });
    }
    render() {
        return this.props.children(this.state);
    }
}
