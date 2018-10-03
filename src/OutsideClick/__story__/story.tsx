import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {OutsideClick} from '..';
import ShowDocs from '../../ShowDocs'


storiesOf('UI/OutsideClick', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/OutsideClick.md')}))
  .add('FaCC', () =>
    h(OutsideClick, {onClick: action('onClick')},
      h('div', {style: {
        width: 300,
        height: 300,
        border: '1px solid red'
      }})
    )
  )
