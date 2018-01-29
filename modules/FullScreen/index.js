import { Component, Children } from 'react';
import { h, noop } from '../util';
const screenfull = require('screenfull');
export class FullScreen extends Component {
    constructor() {
        super(...arguments);
        this.el = null;
        this.mounted = false;
        this.ref = (el) => {
            this.el = el;
            this.props.innerRef(el);
        };
        this.onChange = () => {
            const isFullScreen = screenfull.element === this.el;
            if (!isFullScreen) {
                (this.props.onClose || noop)();
            }
        };
    }
    componentDidMount() {
        this.mounted = true;
        screenfull.on('change', this.onChange);
    }
    componentDidUpdate(props) {
        if (!props.on && this.props.on) {
            this.enter();
        }
        else if (props.on && !this.props.on) {
            this.leave();
        }
    }
    componentWillUnmount() {
        this.mounted = false;
        screenfull.off('change', this.onChange);
    }
    enter() {
        if (this.el) {
            if (screenfull.enabled) {
                try {
                    screenfull.request(this.el);
                }
                catch { }
            }
            else {
                const { video } = this.props;
                if (video && video.webkitEnterFullscreen) {
                    const onWebkitEndFullscreen = () => {
                        video.removeEventListener('webkitendfullscreen', onWebkitEndFullscreen);
                        if (this.mounted) {
                            this.props.onClose();
                        }
                    };
                    video.webkitEnterFullscreen();
                    video.addEventListener('webkitendfullscreen', onWebkitEndFullscreen);
                }
            }
        }
    }
    leave() {
        if (screenfull.enabled) {
            try {
                screenfull.exit();
            }
            catch { }
        }
        else {
            const { video } = this.props;
            if (video && video.webkitExitFullscreen) {
                video.webkitExitFullscreen();
            }
        }
    }
    render() {
        const { video, innerRef, on, onClose, tag, children, ...rest } = this.props;
        rest.ref = this.ref;
        return h(tag, rest, ...Children.toArray(children));
    }
}
FullScreen.defaultProps = {
    onClose: noop,
    innerRef: noop,
    tag: 'div'
};
