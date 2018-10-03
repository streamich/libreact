import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Prompt} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Generators/Prompt', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Prompt.md')}))
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
