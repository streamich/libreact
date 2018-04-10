import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Resolve} from '.';

storiesOf('Other/Resolve', module)
  .add('Example', () => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    return h(Resolve, {promise}, ({pending}) =>
      <div>{pending ? 'PENDING...' : 'RESOLVED'}</div>
    )
  });
