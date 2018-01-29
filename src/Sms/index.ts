// Original: https://github.com/jaredpalmer/react-fns/blob/master/src/Sms.tsx
import {h} from '../util';
import {stringify} from 'qs';

export interface ISmsProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children?;
  phone: string;
  body?: string;
}

export const Sms: React.StatelessComponent<ISmsProps> = ({phone, body, ...props}) => {
  return h('a', {
    href: `sms:${phone}?${stringify({body})}`,
    ...props
  });
};
