import {h} from '../util';

export const mapProps = (mapper) => (Comp) => (props) => h(Comp, mapper(props));
