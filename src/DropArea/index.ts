import * as React from 'react';
import {render} from 'react-universal-interface';
import {noop} from '../util';

export interface IDropAreaProps {
  onFiles?: (files: File[], event?) => void;
  onText?: (text: string, event?) => void;
  onUri?: (url: string, event?) => void;
}

export interface IDropAreaState {
}

export class DropArea extends React.Component<IDropAreaProps, IDropAreaState> {
  static defaultProps = {
    onFiles: noop,
    onText: noop,
    onUrl: noop,
  };

  mounted = true;

  coponentWillUnmount () {
    this.mounted = false;
  }

  onDragOver = (originalDragOver) => (event) => {
    (originalDragOver || noop)(event);
    event.preventDefault();
  };

  onDragEnter = (originalDragEnter) => (event) => {
    (originalDragEnter || noop)(event);
    event.preventDefault();
  };

  onDrop = (originalDrop) => (event) => {
    (originalDrop || noop)(event);
    event.preventDefault();

    this.process(event.dataTransfer, event);
  };

  onPaste = (originalOnPaste) => (event) => {
    (originalOnPaste || noop)(event);

    this.process(event.clipboardData, event);
  };

  process (dataTransfer: DataTransfer, event) {
    const uri = dataTransfer.getData('text/uri-list');

    if (uri) {
      this.props.onUri(uri, event);
      return;
    }

    if (dataTransfer.files && dataTransfer.files.length) {
      this.props.onFiles(Array.from(dataTransfer.files), event);
      return;
    }

    if (dataTransfer.items && dataTransfer.items.length) {
      dataTransfer.items[0].getAsString((text) => {
        if (this.mounted) {
          this.props.onText(text, event);
        }
      });
    }
  }

  render () {
    const element = render(this.props, {});
    const {props} = element;

    return React.cloneElement(element, {
      ...props,
      onDragOver: this.onDragOver(props.onDragOver),
      onDragEnter: this.onDragEnter(props.onDragEnter),
      onDrop: this.onDrop(props.onDrop),
      onPaste: this.onPaste(props.onPaste),
    });
  }
}
