import { Component, cloneElement } from 'react';
import { h, noop } from '../util';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';
export class MouseSensor extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            docX: 0,
            docY: 0,
            posX: 0,
            posY: 0,
            elH: 0,
            elW: 0,
            elX: 0,
            elY: 0
        };
        this.el = null;
        this.frame = null;
        this.ref = (originalRef) => (el) => {
            this.el = el;
            (originalRef || noop)(el);
        };
        this.onDocMouseMove = (event) => {
            const { el } = this;
            if (!el) {
                return;
            }
            cancelAnimationFrame(this.frame);
            this.frame = requestAnimationFrame(() => {
                const { left, top } = el.getBoundingClientRect();
                const posX = left + window.scrollX;
                const posY = top + window.scrollY;
                this.setState({
                    docX: event.pageX,
                    docY: event.pageY,
                    posX,
                    posY,
                    elH: el.offsetHeight,
                    elW: el.offsetWidth,
                    elX: event.pageX - posX,
                    elY: event.pageY - posY
                });
            });
        };
        this.onMouseEnter = (originalOnMouseMove) => (event) => {
            if (this.props.whenHovered) {
                this.bindEvents();
            }
            (originalOnMouseMove || noop)(event);
        };
        this.onMouseLeave = (originalOnMouseMove) => (event) => {
            if (this.props.whenHovered) {
                this.unbindEvents();
            }
            (originalOnMouseMove || noop)(event);
        };
    }
    componentDidMount() {
        if (!this.props.whenHovered) {
            this.bindEvents();
        }
    }
    componentWillUnmount() {
        this.unbindEvents();
    }
    bindEvents() {
        document.addEventListener('mousemove', this.onDocMouseMove);
    }
    unbindEvents() {
        document.removeEventListener('mousemove', this.onDocMouseMove);
    }
    render() {
        let { bond } = this.props;
        if (bond) {
            if (typeof bond === 'boolean') {
                bond = 'bond';
            }
            const bondObject = {
                ref: this.ref()
            };
            if (!this.props.whenHovered) {
                bondObject.onMouseEnter = this.onMouseEnter();
                bondObject.onMouseLeave = this.onMouseLeave();
            }
            return renderProp(this.props, {
                ...this.state,
                [bond]: bondObject
            });
        }
        else {
            const element = renderProp(this.props, this.state);
            let newProps = {
                ...element.props,
                ref: this.ref(element.ref)
            };
            if (!this.props.whenHovered) {
                const { onMouseEnter, onMouseLeave } = element.props;
                newProps.onMouseEnter = this.onMouseEnter(onMouseEnter);
                newProps.onMouseLeave = this.onMouseLeave(onMouseLeave);
            }
            return cloneElement(element, newProps);
        }
    }
}
const MouseSensorWithBond = (props) => h(MouseSensor, {
    bond: true,
    ...props
});
export const withMouse = faccToHoc(MouseSensorWithBond, 'mouse');
