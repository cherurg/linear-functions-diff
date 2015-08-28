import constants from '../constants';
import globalImport from '../interface/constants/global_import';
import SliderConstants from '../interface/constants/Slider';
import Dispatcher from '../interface/dispatcher';


let dashedLine = (plot,...props) => {
  let line = plot.addLine(...props);
  line.el.attr('stroke-dasharray', '10, 10');
  return line;
};

let getBorders = (plot, func) => {
  let {top, bottom} = plot.plot.pure;
  let points = func.getPoints();

  let leftPoint;
  if (points[0].y > top) {
    let point;
    for (point of points) if (point.y < top) break;
    leftPoint = point;

  } else if (points[0].y < bottom) {
    let point;
    for (point of points) if (point.y > bottom) break;
    leftPoint = point;

  } else {
    leftPoint = points[0];
  }

  let rightPoint;
  if (points[points.length - 1].y > top) {
    let point;
    for (point of points.reverse()) if (point.y < top) break;
    rightPoint = point;

  } else if (points[points.length - 1].y < bottom) {
    let point;
    for (point of points.reverse()) if (point.y > bottom) break;
    rightPoint = point;

  } else {
    rightPoint = points[points.length - 1];
  }

  let offset = rightPoint.x - leftPoint.x;
  offset /= 20;

  return {
    left: leftPoint.x + offset,
    right: rightPoint.x - offset
  };
};

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
  let pointLeft = plotterLeft.addPoint((x1 + x2) / 2, func((x1 + x2) / 2), {
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