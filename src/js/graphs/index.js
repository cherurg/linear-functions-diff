import constants from '../constants';
import SliderConstants from '../interface/constants/Slider';
import Dispatcher from '../interface/dispatcher';
import GraphConstants from '../constants';
import dashedLine from './dashed-line';
import getBorders from './get-borders';

let graphs = (leftID, rightID) => {
  let width = document.getElementById(leftID).offsetWidth - 30;
  let height = 600 / 800 * width;

  let plotterOptions = {
    width: width,
    height: height,
    left: constants.LEFT_BORDER,
    right: constants.RIGHT_BORDER,
    top: 5,
    bottom: -0.5
  };

  let plotterLeft = new Plotter(leftID, plotterOptions);
  let plotterRight = new Plotter(rightID, plotterOptions);

  let func = x => x*x;
  let funcLeft = plotterLeft.addFunc(func);
  let borders = getBorders(plotterLeft, funcLeft);
  let [x1, y1, x2, y2] = [borders.left, func(borders.left), borders.right, func(borders.right)];
  let lineLeft = dashedLine(plotterLeft, x1, y1, x2, y2);
  let pointLeft = plotterLeft.addPoint(GraphConstants.getMean(), func(GraphConstants.getMean()), {
    color: '#ff0000',
    size: 5
  });

  let linearFunction = (x) => (y2 - y1) / (x2 - x1) * x + y1 - (y2 - y1) / (x2 - x1) * x1;
  plotterRight.addFunc((x) => Math.abs(linearFunction(x) - func(x)), {
    left: x1,
    right: x2
  });

  Dispatcher.register((event) => {
    if (event.actionType === SliderConstants.SLIDER_SLIDE
      && event.name === SliderConstants.names.pointPosition) {
      pointLeft.X(event.value);
      pointLeft.Y(func(event.value));
      plotterLeft.redraw();
    }
  });
};

export default graphs;