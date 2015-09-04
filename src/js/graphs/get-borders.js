export default (plot, point) => {
  let {left, right} = plot.plot.pure;
  let offset = (right - left) / 10 * 5;

  return {
    left: parseFloat(point.X()) - offset,
    right: parseFloat(point.X()) + offset
  };
};