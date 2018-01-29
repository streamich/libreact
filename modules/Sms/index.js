import { h } from '../util';
import { stringify } from 'qs';
export const Sms = ({ phone, body, ...props }) => {
    return h('a', {
        href: `sms:${phone}?${stringify({ body })}`,
        ...props
    });
};
