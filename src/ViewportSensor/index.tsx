import {h} from '../util';
import {ViewportObserverSensor, IViewportObserverSensorProps, IViewportObserverSensorState} from '../ViewportObserverSensor';
import {loadable} from '../loadable';
import faccToHoc, {divWrapper} from '../util/faccToHoc';

let Sensor: any = ViewportObserverSensor;

if (('IntersectionObserver' in window)) {
  const loader = () => import('../ViewportScrollSensor').then((module) => module.ViewportScrollSensor);

  Sensor = loadable({loader});
  Sensor.load();
}

export const ViewportSensor: React.StatelessComponent<IViewportObserverSensorProps> = (props) => {
  return <Sensor {...props} />
};

const wrapper = (Comp, propName, props, state) =>
  divWrapper(Comp, propName || 'viewport', props, state.visible);

export const withViewport = faccToHoc(ViewportSensor, 'viewport', wrapper);
