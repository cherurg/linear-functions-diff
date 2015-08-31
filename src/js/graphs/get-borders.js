export default (plot, point) => {
  let {left, right} = plot.plot.pure;
  let offset = (right - left) / 10 * 4;

  return {
    left: parseFloat(point.X()) - offset,
    right: parseFloat(point.X()) + offset
  };
};