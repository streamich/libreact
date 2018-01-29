import { Provider, Consumer } from 'freestyler-context';
import faccToHoc from '../util/faccToHoc';
const withContext = faccToHoc(Consumer, '');
export { Provider, Consumer, withContext };
