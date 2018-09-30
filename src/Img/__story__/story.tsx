import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Img} from '..';
import ShowDocs from '../../ShowDocs';

storiesOf('UI/Img', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Img.md')}))
  .add('<img>', () => <img src='http://placehold.it/120x120&text=image1' />)
  .add('Defaults', () => <Img src='http://placehold.it/120x120&text=image1' />)
  .add('renderError', () => <Img src='http://nononexisint.com/image.jpg' renderError={() => <div>Error...</div>} />)
  .add('renderLoad', () => <Img src='http://placehold.it/120x120&text=image1' renderLoad={(img) => <div>Loading...{img}</div>} />)
