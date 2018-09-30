import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Group} from '..';
import ShowDocs from '../../ShowDocs'

const Custom = () => <hr />;

storiesOf('UI/Group', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Group.md')}))
  .add('No group', () =>
    <div>
        <span>Hello</span>
        <span>world</span>
    </div>
  )
  .add('Using default separator', () =>
    <Group>
      <span>Hello</span>
      <span>world</span>
    </Group>
  )
  .add('Using <br> separator', () =>
    <Group separator={<br />}>
      <span>Hello</span>
      <span>world</span>
    </Group>
  )
  .add('Using <hr> separator', () =>
    <Group separator={<hr />}>
      <span>Hello</span>
      <span>world</span>
    </Group>
  )
  .add('Using custom separator', () =>
    <Group separator={<Custom />}>
      <span>Hello</span>
      <span>world</span>
    </Group>
  )
  .add('No children', () =>
    <Group separator={<Custom />}></Group>
  )