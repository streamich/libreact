import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {WidthQuery} from '..';
import {View} from '../../View';
import {WindowSizeSensor} from '../../WindowSizeSensor';
import ShowDocs from '../../ShowDocs';

storiesOf('UI/WidthQuery', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/WidthQuery.md')}))
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
  .add('100px increments', () =>
    <WindowSizeSensor>{({width}) =>
      <WidthQuery width={width}>
        <View maxWidth={100}>
          Up to 100px
        </View>
        <View maxWidth={200}>
          100px - 200px
        </View>
        <View maxWidth={300}>
          200px - 300px
        </View>
        <View maxWidth={400}>
          300px - 400px
        </View>
        <View maxWidth={500}>
          400px - 500px
        </View>
        <View maxWidth={600}>
          500px - 600px
        </View>
        <View maxWidth={700}>
          600px - 700px
        </View>
        <View>
          700px+
        </View>
      </WidthQuery>
    }</WindowSizeSensor>
  )
