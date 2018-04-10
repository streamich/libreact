import {Media, IMediaProps, IMediaState, IMedia} from '../Media';
import renderProp from '../util/renderProp';

export interface IVideoProps extends IMediaProps<IVideo> {

}

export interface IVideoState extends IMediaState {

}

export interface IVideo extends IMedia {
  video: React.ReactElement<any>;
}

export class Video extends Media<IVideoProps, IVideoState, IVideo> implements IVideo {
  el: HTMLVideoElement = null;
  video: React.ReactElement<any> = null;

  render () {
    this.video = super.render();

    return renderProp(this.props, this as IVideo, this.state) || this.video;
  }
}
