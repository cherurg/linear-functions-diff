import constants from '../constants';

let dashedLine = (plot,...props) => {
  let line = plot.addLine(...props);
  line.el.attr('stroke-dasharray', '10, 10');
  return line;
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

  let left = new Plotter(leftID, plotterOptions);
  let right = new Plotter(rightID, plotterOptions);

  let func = x => x*x;
  let leftFunc = left.addFunc(func);
  let line = dashedLine(left, -2, func(-2), 2, func(2));
};

export default graphs;