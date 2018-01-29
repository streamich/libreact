import { PureComponent } from 'react';
export class Alert extends PureComponent {
    componentDidMount() {
        this.alert();
    }
    componentDidUpdate() {
        this.alert();
    }
    alert() {
        const { show, text } = this.props;
        if (show) {
            alert(text);
        }
    }
    render() {
        return null;
    }
}
