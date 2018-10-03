import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {GeoLocationSensor, withGeoLocation} from '..';
import ShowDocs from '../../ShowDocs'

const Print = ({geoLocation}) =>
  <pre style={{fontFamily: 'monospace'}}>
    {JSON.stringify(geoLocation, null, 4)}
  </pre>;

const Hoc = withGeoLocation(Print);

storiesOf('Sensors/GeoLocationSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/GeoLocationSensor.md')}))
  .add('FaCC', () =>
    <GeoLocationSensor>{(state) =>
      <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(state, null, 4)}</pre>
    }</GeoLocationSensor>
  )
  .add('HOC', () => <Hoc />);
