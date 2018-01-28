import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {LocationSensor} from '../../LocationSensor';
import {Translations, Translate, T, withT} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Context/translate', module)
  .add('Documentation', () => h(ShowDocs, {name: 'translate'}))
  .add('Example', () => (
    <Translations map={{
      hello: 'world'
    }}>
      <div>
        <T>{(T) =>
          <span>{T('omg')}: {T('hello')}</span>
        }</T>
      </div>
    </Translations>
  ));
