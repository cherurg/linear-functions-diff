import constants from '../constants';
import SliderConstants from '../interface/constants/Slider';
import Dispatcher from '../interface/dispatcher';
import GraphConstants from '../constants';
import dashedLine from './dashed-line';
import getBorders from './get-borders';
import CheckboxesStore from '../interface/stores/Checkboxes';
import CheckboxConstants from '../interface/constants/Checkbox';

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

  let point = plotterLeft.addPoint(GraphConstants.getMean(), func(GraphConstants.getMean()), {
    color: '#ff0000',
    size: 5,
    zoom: false
  });
  let funcLeft = plotterLeft.addFunc(func);

  var lineLeft;
  var lineRight;
  let drawDashedLine = () => {
    let borders = getBorders(plotterLeft, point);
    let [x1, y1, x2, y2] = [borders.left, func(borders.left), borders.right, func(borders.right)];
    lineLeft = dashedLine(plotterLeft, x1, y1, x2, y2);
    let linearFunction = (x) => (y2 - y1) / (x2 - x1) * x + y1 - (y2 - y1) / (x2 - x1) * x1;
    lineRight = plotterRight.addFunc((x) => Math.abs(linearFunction(x) - func(x)), {
      left: x1,
      right: x2
    });
  };
  let updateDashedLine = () => {
    let borders = getBorders(plotterLeft, point);
    let [x1, y1, x2, y2] = [borders.left, func(borders.left), borders.right, func(borders.right)];
    lineLeft.X1(x1);
    lineLeft.X2(x2);
    lineLeft.Y1(y1);
    lineLeft.Y2(y2);
    let linearFunction = (x) => (y2 - y1) / (x2 - x1) * x + y1 - (y2 - y1) / (x2 - x1) * x1;
    lineRight.Func((x) => Math.abs(linearFunction(x) - func(x)));
    lineRight.Left(x1);
    lineRight.Right(x2);
    plotterRight.redraw();
  };
  let removeDashedLine = () => {
    plotterLeft.remove(lineLeft);
    plotterRight.remove(lineRight);
  };
  if (CheckboxesStore.isChecked(CheckboxesStore.names.EnableDashedLine)) {
    drawDashedLine();
  }
  Dispatcher.register((event) => {
      switch(event.actionType) {
        case SliderConstants.SLIDER_SLIDE:
          if (event.name === SliderConstants.names.pointPosition) {
            point.X(event.value);
            point.Y(func(event.value));

            if (CheckboxesStore.isChecked(CheckboxesStore.names.EnableDashedLine)) {
              updateDashedLine();
            }

            plotterLeft.redraw();
          }
          break;

        case CheckboxConstants.CHECKBOX_TOGGLE:
          if (CheckboxesStore.isChecked(CheckboxesStore.names.EnableDashedLine)) {
            drawDashedLine();
          } else {
            removeDashedLine();
          }
          break;
      }
  });
};

export default graphs;