import constants from '../constants';
import SlidersStore from '../interface/stores/Sliders';
import SliderConstants from '../interface/constants/Slider';
import Dispatcher from '../interface/dispatcher';
import GraphConstants from '../constants';
import dashedLine from './dashed-line';
import getBorders from './get-borders';
import CheckboxesStore from '../interface/stores/Checkboxes';
import CheckboxConstants from '../interface/constants/Checkbox';
import Zoom from './zoom';
import ButtonConstants from '../interface/constants/button';
import DropDownsStore from '../interface/stores/DropDowns';

let clearAll, _leftID, _rightID;
DropDownsStore.addChangeListener(() => {
  clearAll();
  graphs(_leftID, _rightID);
});

let graphs = (leftID, rightID) => {
  _leftID = leftID;
  _rightID = rightID;
  let width = document.getElementById(leftID).offsetWidth - 30;
  let height = 600 / 800 * width;

  let plotterOptions = {
    width: width,
    height: height,
    left: constants.LEFT_BORDER,
    right: constants.RIGHT_BORDER,
    top: 5,
    bottom: -0.5,
    ticks: 4
  };

  let plotterLeft = new Plotter(leftID, plotterOptions);
  let plotterRight = new Plotter(rightID, plotterOptions);

  let func = DropDownsStore.getCurrentFunc(DropDownsStore.names.functions);

  let point = plotterLeft.addPoint(GraphConstants.getMean(), func(GraphConstants.getMean()), {
    color: '#ff0000',
    size: 5,
    zoom: false
  });
  let funcLeft = plotterLeft.addFunc(func);

  let zoom = new Zoom(plotterLeft, plotterRight, null, plotterOptions);

  var lineLeft;
  var lineRight;
  let isDashedLineDrawn = false;
  let drawDashedLine = () => {
    isDashedLineDrawn = true;
    let borders = getBorders(plotterLeft, point);
    let [x1, y1, x2, y2] = [borders.left, func(borders.left), borders.right, func(borders.right)];
    lineLeft = dashedLine(plotterLeft, x1, y1, x2, y2);
    let linearFunction = (x) => (y2 - y1) / (x2 - x1) * x + y1 - (y2 - y1) / (x2 - x1) * x1;
    lineRight = [
      plotterRight.addShadedArea((x) => Math.abs(linearFunction(x) - func(x)), {
        left: x1,
        right: x2
      }), plotterRight.addFunc((x) => Math.abs(linearFunction(x) - func(x)), {
        left: x1,
        right: x2
      })
    ];
  };
  let updateDashedLine = () => {
    if (!isDashedLineDrawn) {
      return;
    }
    let borders = getBorders(plotterLeft, point);
    let [x1, y1, x2, y2] = [borders.left, func(borders.left), borders.right, func(borders.right)];
    lineLeft.X1(x1);
    lineLeft.X2(x2);
    lineLeft.Y1(y1);
    lineLeft.Y2(y2);
    let linearFunction = (x) => (y2 - y1) / (x2 - x1) * x + y1 - (y2 - y1) / (x2 - x1) * x1;
    for (let element of lineRight) {
      element.Func((x) => Math.abs(linearFunction(x) - func(x)));
      element.Left(x1);
      element.Right(x2);
    }
    plotterRight.redraw();
    plotterLeft.redraw();
  };
  let removeDashedLine = () => {
    isDashedLineDrawn = false;

    (function () {
      plotterLeft.elements.removeElement(lineLeft);
      lineLeft.el.remove();
    }());

    for (let element of lineRight) {
      plotterRight.elements.removeElement(element);
      element.el.forEach(f => f.remove());
    }
  };
  if (CheckboxesStore.isChecked(CheckboxesStore.names.EnableDashedLine)) {
    drawDashedLine();
  }
  let dispatcherToken = Dispatcher.register((event) => {
    switch (event.actionType) {
      case SliderConstants.SLIDER_SLIDE:
        if (event.name === SlidersStore.names.pointPosition) {
          point.X(event.value);
          point.Y(func(event.value));

          if (CheckboxesStore.isChecked(CheckboxesStore.names.EnableDashedLine)) {
            updateDashedLine();
          } else {
            plotterLeft.redraw();
          }
        }
        break;

      case CheckboxConstants.CHECKBOX_TOGGLE:
        if (event.name === CheckboxesStore.names.EnableDashedLine) {
          CheckboxesStore.isChecked(CheckboxesStore.names.EnableDashedLine) ?
            drawDashedLine() :
            removeDashedLine();
          plotterLeft.redraw();
          plotterRight.redraw();
        }
        break;

      case ButtonConstants.BUTTON_CLICK:
        if (event.name == ButtonConstants.ZOOM_IN ||
          event.name == ButtonConstants.ZOOM_OUT ||
          event.name == ButtonConstants.ZOOM_FULL_OUT) {

          zoom.center = {
            x: parseFloat(point.X()),
            y: parseFloat(point.Y())
          };

          if (event.name === ButtonConstants.ZOOM_IN) zoom.zoomIn();
          if (event.name === ButtonConstants.ZOOM_OUT) zoom.zoomOut();
          if (event.name === ButtonConstants.ZOOM_FULL_OUT) zoom.zoomFullOut();

          updateDashedLine();
        }

        break;
    }
  });

  let buttonListener = () => {
    let value = SlidersStore.getValue(SlidersStore.names.pointPosition);
    point.X(value);
    point.Y(func(value));

    if (CheckboxesStore.isChecked(CheckboxesStore.names.EnableDashedLine)) {
      updateDashedLine();
    } else {
      plotterLeft.redraw();
    }
  };
  SlidersStore.addButtonListener(buttonListener);

  clearAll = () => {
    plotterLeft.removeAll();
    plotterRight.removeAll();
    SlidersStore.removeListener('button', buttonListener);
    Dispatcher.unregister(dispatcherToken);
    document.getElementById(leftID).innerHTML = '';
    document.getElementById(rightID).innerHTML = '';
  };
};

export default graphs;