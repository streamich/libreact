import { Component } from 'react';
import { LocationSensor } from '../LocationSensor';
import { Provider, Consumer } from '../context';
import { h, ns } from '../util';
import renderProp from '../util/renderProp';
import { Link } from '../Link';
import { go } from './go';
export { go };
export class Router extends Component {
    constructor() {
        super(...arguments);
        this.matches = 0;
        this.inc = () => {
            this.matches++;
        };
    }
    renderProvider(route) {
        const { children, fullRoute } = this.props;
        this.matches = 0;
        const element = h(Provider, {
            name: ns(`route/${this.props.ns}`),
            value: {
                go: this.props.onGo,
                fullRoute: this.props.fullRoute || route,
                route,
                inc: this.inc,
                count: () => this.matches,
                parent: this.props.parent
            }
        }, renderProp(this.props));
        return element;
    }
    render() {
        const { props } = this;
        const { children, route } = props;
        if (typeof route === 'string') {
            return this.renderProvider(route);
        }
        return h(LocationSensor, null, ({ pathname }) => this.renderProvider(pathname));
    }
}
Router.defaultProps = {
    onGo: go
};
export function createMatcher(match, exact) {
    let matcher;
    if (typeof match === 'function') {
        return match;
    }
    let regex;
    if (typeof match === 'string') {
        regex = new RegExp(`^(${match}${exact ? '$' : ''})`);
    }
    else {
        regex = match;
    }
    return (route) => {
        const matches = route.match(regex);
        if (!matches) {
            return null;
        }
        return {
            length: (matches && matches[1]) ? matches[1].length : 0,
            matches
        };
    };
}
export class Route extends Component {
    render() {
        return h(Consumer, { name: ns(`route/${this.props.ns}`) }, (context) => {
            const { fullRoute, route, go, inc, count, parent } = context;
            const { children, exact, match, preserve, min, max } = this.props;
            const matchCount = count();
            if ((matchCount >= min) && (matchCount <= max)) {
                const matchResult = createMatcher(match, exact)(route);
                if (matchResult) {
                    inc();
                    matchResult.parent = parent;
                    const { matches, length } = matchResult;
                    let newRoute = route;
                    if (!preserve && length) {
                        newRoute = newRoute.substr(length);
                    }
                    return h(Router, {
                        fullRoute: route,
                        route: newRoute,
                        parent: matchResult
                    }, renderProp(this.props, {
                        go,
                        match: route.substr(0, length),
                        matches,
                        route: newRoute,
                        fullRoute,
                        parent
                    }));
                }
            }
            return null;
        });
    }
}
Route.defaultProps = {
    match: /.+/,
    min: 0,
    max: Infinity
};
export const Route404 = (props) => h(Route, {
    max: 0,
    ...props
});
export class Go extends Component {
    render() {
        return h(Consumer, { name: ns(`route/${this.props.ns}`) }, ({ fullRoute, route, go, inc, count, parent }) => {
            const { exact, match } = this.props;
            const matcher = createMatcher(match, exact);
            const isActive = !!matcher(fullRoute);
            return h(Link, {
                ...this.props,
                isActive,
                onGo: go
            });
        });
    }
}
