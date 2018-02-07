import {isClient} from '../util';

export const ServerOnly = (props) => isClient ? null : props.children;
