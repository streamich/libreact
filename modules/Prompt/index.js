import { PureComponent } from 'react';
import { noop, isClient } from '../util';
export class Prompt extends PureComponent {
    componentDidMount() {
        if (!(typeof this.props.children === 'function')) {
            this.prompt();
        }
    }
    componentDidUpdate() {
        if (!(typeof this.props.children === 'function')) {
            this.prompt();
        }
    }
    prompt() {
        const { show, message, default: def, onResult } = this.props;
        if (show) {
            const result = prompt(message, def);
            (onResult || noop)(result);
            return result;
        }
    }
    render() {
        const { children, default: def } = this.props;
        if (typeof children === 'function') {
            if (isClient) {
                const result = this.prompt();
                return children(result);
            }
            else {
                return children(def);
            }
        }
        else {
            return children || null;
        }
    }
}
