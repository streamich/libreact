import { h } from '../util';
import { stringify } from 'qs';
export const Mailto = ({ email, subject = '', cc, bcc, body = '', ...props }) => {
    const query = stringify({
        subject,
        cc: cc && cc.join(', '),
        bcc: bcc && bcc.join(', '),
        body
    });
    return h('a', {
        href: `mailto:${email}?${query}`,
        ...props
    });
};
