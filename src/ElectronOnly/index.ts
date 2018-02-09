import {idx} from '../util';

const isElectron = (typeof process === 'object') && idx(process, (_) => _.versions.electron);

export const ElectronOnly = (props) => isElectron ? props.children : null;
