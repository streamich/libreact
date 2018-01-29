import { Media } from '../Media';
import renderProp from '../util/renderProp';
export class Video extends Media {
    constructor() {
        super(...arguments);
        this.el = null;
        this.video = null;
    }
    render() {
        this.video = super.render();
        return renderProp(this.props, this, this.state) || this.video;
    }
}
