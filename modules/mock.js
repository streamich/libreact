import { Component, createElement as h } from 'react';
export const mock = ({ loading = null } = {}) => {
    let Comp;
    let cnt = 0;
    const instances = {};
    const Mock = class Mock extends Component {
        constructor(props, context) {
            super(props, context);
            this.mockId = cnt++;
            instances[this.mockId] = this;
        }
        componentWillUnmount() {
            delete instances[this.mockId];
        }
        render() {
            return Comp ? h(Comp, this.props) : (typeof loading === 'function' ? h(loading, this.props) : loading);
        }
    };
    Mock.implement = (Implementation) => {
        Comp = Implementation;
        for (const id in instances) {
            instances[id].forceUpdate();
        }
    };
    return Mock;
};
