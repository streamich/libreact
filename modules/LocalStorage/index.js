import { Component } from 'react';
const debounce = require('throttle-debounce/debounce');
export class LocalStorage extends Component {
    constructor() {
        super(...arguments);
        this.put = debounce(this.props.debounce, (rawData) => {
            const { name, data } = this.props;
            try {
                if (!rawData) {
                    rawData = JSON.stringify(data);
                }
                localStorage[String(name)] = rawData;
            }
            catch (error) {
            }
        });
    }
    componentDidMount() {
        const { name, onMount } = this.props;
        if (onMount) {
            const json = localStorage[name];
            if (typeof json === 'string') {
                try {
                    const data = JSON.parse(json);
                    onMount(data);
                }
                catch { }
            }
        }
        else {
            this.put();
        }
    }
    componentDidUpdate(props) {
        if (props.name !== this.props.name) {
            this.remove();
            this.put();
        }
        else {
            try {
                const newJson = JSON.stringify(this.props.data);
                if (JSON.stringify(props.data) !== newJson) {
                    this.put(newJson);
                }
            }
            catch { }
        }
    }
    componentWillUnmount() {
        this.remove();
    }
    remove(name = this.props.name) {
        if (!this.props.persist) {
            delete localStorage[name];
        }
    }
    render() {
        return null;
    }
}
LocalStorage.defaultProps = {
    debounce: 200
};
