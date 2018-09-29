import {Component} from 'react';
import renderProp from '../util/renderProp';
import {IUniversalInterfaceProps} from '../typing';

export interface IGoogleAuthButtonProps extends IUniversalInterfaceProps<IGoogleAuthButtonState> {
    clientId: string;
}

export interface IGoogleAuthButtonState {
    loading?: boolean;
}

export class GoogleAuthButton extends Component<IGoogleAuthButtonProps, IGoogleAuthButtonState> {
    render () {
        return renderProp(this.props, this.state);
    }
}
