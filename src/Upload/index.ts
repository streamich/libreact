import {Component} from 'react';

export interface IUploadProps {
}

export interface IUploadState {
}

export class Upload extends Component<IUploadProps, IUploadState> {
  onDragOver = (event) => event.preventDefault();
  onDragEnter = (event) => event.preventDefault();

  onDrop = (event) => {
    event.preventDefault();
  };
}