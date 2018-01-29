import { Component } from 'react';
import { on, off, isClient } from '../util';
import faccToHoc from '../util/faccToHoc';
import renderProp from '../util/renderProp';
const patchHistoryMethod = (method) => {
    const original = history[method];
    history[method] = function (state, title, url) {
        const result = original.apply(this, arguments);
        const event = new Event(method.toLowerCase());
        event.state = state;
        window.dispatchEvent(event);
        return result;
    };
};
if (isClient) {
    patchHistoryMethod('pushState');
    patchHistoryMethod('replaceState');
}
export class LocationSensor extends Component {
    constructor(props, context) {
        super(props, context);
        this.onPopstate = (e) => {
            this.onChange('popstate');
        };
        this.onPushstate = (e) => {
            this.onChange('pushstate');
        };
        this.onReplacestate = (e) => {
            this.onChange('replacestate');
        };
        this.onChange = (trigger) => {
            this.setState(this.buildState(trigger));
        };
        if (isClient) {
            this.state = this.buildState('load');
        }
        else {
            this.state = {
                trigger: 'load',
                length: 1
            };
        }
    }
    componentDidMount() {
        on(window, 'popstate', this.onPopstate);
        on(window, 'pushstate', this.onPushstate);
        on(window, 'replacestate', this.onReplacestate);
    }
    componentWillUnmount() {
        off(window, 'popstate', this.onPopstate);
        off(window, 'pushstate', this.onPushstate);
        off(window, 'replacestate', this.onReplacestate);
    }
    buildState(trigger) {
        const { state, length } = history;
        const { hash, host, hostname, href, origin, pathname, port, protocol, search } = location;
        return {
            trigger,
            state,
            length,
            hash,
            host,
            hostname,
            href,
            origin,
            pathname,
            port,
            protocol,
            search
        };
    }
    render() {
        return renderProp(this.props, this.state);
    }
}
export const withLocation = faccToHoc(LocationSensor, 'location');
