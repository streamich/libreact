import {create} from 'nano-css';
import {addon as addonRule} from 'nano-css/addon/rule';
import {addon as addonKeyframes} from 'nano-css/addon/keyframes';

const nano = create({
  pfx: 'libreact-'
});

addonRule(nano);
addonKeyframes(nano);

const {rule, keyframes} = nano;

export {
  nano,
  rule,
  keyframes,
};
