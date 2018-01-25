import {h} from '../util';
import {ViewportObserverSensor, IViewportObserverSensorProps, IViewportObserverSensorState} from '../ViewportObserverSensor';
import {loadable} from '../loadable';

let Sensor: any = ViewportObserverSensor;

if (('IntersectionObserver' in window)) {
  const loader = () => import('../ViewportScrollSensor').then((module) => module.ViewportScrollSensor);

  Sensor = loadable({loader});
  Sensor.load();
}

export const ViewportSensor: React.StatelessComponent<IViewportObserverSensorProps> = (props) => {
  return <Sensor {...props} />
};
