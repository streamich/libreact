import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Translations, T, withT} from '..';
import ShowDocs from '../../ShowDocs';

const Demo = ({T}) => {
  return (
    <span>{T('foo')}: {T('hello')}</span>
  );
};

const Hoc1 = withT(Demo);

storiesOf('Context/translate', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/translate.md')}))
  .add('Example', () => (
    <Translations map={{
      hello: 'world'
    }}>
      <div>
        <T>{(T) =>
          <Demo T={T} />
        }</T>
      </div>
    </Translations>
  ))
  .add('HOC', () => (
    <Translations map={{
      foo: 'bar',
      hello: (T) => `Hello, ${T('foo')}`
    }}>
      <div>
        <Hoc1 />
      </div>
    </Translations>
  ))
  .add('Multiple namespaces', () => (
    <Translations ns='a' map={{
      foo: 'bar'
    }}>
      <Translations ns='b' map={{
        foo: 'baz'
      }}>
        <div>
          <div>
            <T ns='a'>{(T) =>
              <span>{T('foo')}</span>
            }</T>
          </div>
          <div>
            <T ns='b'>{(T) =>
              <span>{T('foo')}</span>
            }</T>
          </div>
        </div>
      </Translations>
    </Translations>
  ));
