import { Component } from 'react';
import renderProp from '../util/renderProp';
export class ScrollSensor extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            x: 0,
            y: 0
        };
        this.onScroll = () => {
            const { el } = this.props;
            if (el) {
                cancelAnimationFrame(this.frame);
                this.frame = requestAnimationFrame(() => {
                    this.setState({
                        x: el.scrollLeft,
                        y: el.scrollTop
                    });
                });
            }
        };
    }
    componentDidMount() {
        this.onScroll();
        this.addListener();
    }
    componentDidUpdate(props) {
        if (props.el !== this.props.el) {
            this.removeListener(props.el);
            this.addListener();
        }
    }
    componentWillUnmount() {
        this.removeListener();
    }
    addListener() {
        const { el } = this.props;
        if (el) {
            el.addEventListener('scroll', this.onScroll, {
                capture: false,
                passive: true
            });
        }
    }
    removeListener(el = this.props.el) {
        if (el) {
            el.removeEventListener('scroll', this.onScroll);
        }
    }
    render() {
        return renderProp(this.props, this.state);
    }
}
