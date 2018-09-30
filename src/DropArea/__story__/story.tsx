import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {DropArea} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('UI/DropArea', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/DropArea.md')}))
  .add('Example', () =>
    <DropArea
      onUri={action('onUri')}
      onText={action('onText')}
      onFiles={action('onFiles')}
    >
      <div style={{
        border: '1px solid tomato',
        height: 100
      }}>
        Drop here!
      </div>
    </DropArea>
  )
