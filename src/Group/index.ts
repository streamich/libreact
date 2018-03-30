import {Children} from 'react';
import {h} from '../util';

export const Group = ({as = 'div', children, separator, ...rest}) => {
    children = Children.toArray(children);

    const newChildren = [];

    if (children.length) {
        newChildren.push(children[0]);

        for (let i = 1; i < children.length; i++) {
            newChildren.push(separator);    
            newChildren.push(children[i]);    
        }
    }

    return h(as, rest, ...newChildren);
};
