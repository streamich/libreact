import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {WidthQuery} from '..';
import {View} from '../../View';
import {WindowSizeSensor} from '../../WindowSizeSensor';
import ShowDocs from '../../../.storybook/ShowDocs';

storiesOf('UI/WidthQuery', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/WidthQuery.md')}))
  .add('Example', () =>
    <WindowSizeSensor>{({width}) =>
      <WidthQuery width={width}>
        <View maxWidth={300}>
          Up to 300px
        </View>
        <View>
          More than 300px
        </View>
      </WidthQuery>
    }</WindowSizeSensor>
  )
