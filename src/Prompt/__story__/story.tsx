import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Prompt} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Generators/Prompt', module)
  .add('Documentation', () => h(ShowDocs, {name: 'Prompt'}))
  .add('Basic example', () =>
    <Prompt
      show
      message='Hello world'
      default='hello back'
      onResult={console.log}
    />
  )
  .add('FaCC', () =>
    <Prompt
      show
      message='Hello world'
      default='hello back'
      onResult={console.log}
    >{(result) => <div>{result}</div>}</Prompt>
  );
