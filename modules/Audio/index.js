import { cloneElement, Children } from 'react';
import { Media } from '../Media';
export class Audio extends Media {
    constructor() {
        super(...arguments);
        this.tag = 'audio';
    }
    render() {
        const { children } = this.props;
        const audio = super.render();
        const markup = children(this, this.state);
        return cloneElement(markup, null, ...[
            ...Children.toArray(markup.props.children),
            audio
        ]);
    }
}
