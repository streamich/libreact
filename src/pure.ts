import {shallowEqual} from 'fast-af/shallowEqual';
import {shouldUpdate} from './ShouldUpdate';

export const pure = shouldUpdate((a, b) => !shallowEqual(a, b));
