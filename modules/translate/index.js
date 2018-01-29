import { Component } from 'react';
import { h, ns } from '../util';
import { Provider, Consumer } from '../context';
import faccToHoc from '../util/faccToHoc';
import renderProp from '../util/renderProp';
export class Translations extends Component {
    render() {
        return h(Provider, {
            name: ns(`T/${this.props.ns}`),
            value: this.props.map
        }, this.props.children);
    }
}
export class Translate extends Component {
    render() {
        return h(Consumer, { name: ns(`T/${this.props.ns}`) }, (map) => {
            const T = (key, ...args) => {
                const value = map[key];
                if (typeof value === 'function') {
                    return value(T, ...args);
                }
                return value || key;
            };
            return renderProp(this.props, T);
        });
    }
}
export const T = Translate;
export const withT = faccToHoc(Translate, 'T');
