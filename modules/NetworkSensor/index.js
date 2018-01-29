import { Component } from 'react';
import { on, off, isClient } from '../util';
import faccToHoc from '../util/faccToHoc';
import renderProp from '../util/renderProp';
export class NetworkSensor extends Component {
    constructor(props, context) {
        super(props, context);
        this.onOnline = () => {
            this.setState({
                online: true,
                since: new Date()
            });
        };
        this.onOffline = () => {
            this.setState({
                online: false,
                since: new Date()
            });
        };
        this.onNetConnChange = () => {
            this.setState(this.getConnState());
        };
        if (isClient) {
            this.state = {
                online: navigator.onLine,
                since: undefined
            };
        }
        else {
            this.state = {
                online: true,
                since: undefined
            };
        }
        this.state = {
            ...this.state,
            ...this.getConnState()
        };
    }
    get connection() {
        if (typeof navigator !== 'object') {
            return null;
        }
        const nav = navigator;
        return nav.connection || nav.mozConnection || nav.webkitConnection;
    }
    componentDidMount() {
        on(window, 'online', this.onOnline);
        on(window, 'offline', this.onOffline);
        const { connection } = this;
        if (connection) {
            on(connection, 'change', this.onNetConnChange);
        }
    }
    componentWillUnmount() {
        off(window, 'online', this.onOnline);
        off(window, 'offline', this.onOffline);
        const { connection } = this;
        if (connection) {
            off(connection, 'change', this.onNetConnChange);
        }
    }
    getConnState() {
        const { connection } = this;
        if (!connection) {
            return {};
        }
        const { downlink, downlinkMax, effectiveType, type, rtt } = connection;
        return {
            downlink,
            downlinkMax,
            effectiveType,
            type,
            rtt
        };
    }
    render() {
        return renderProp(this.props, this.state);
    }
}
export const withNetwork = faccToHoc(NetworkSensor, 'net');
