import {equal} from 'fast-shallow-equal';
import {shouldUpdate} from './ShouldUpdate';

export const pure = shouldUpdate((a, b) => !equal(a, b));
