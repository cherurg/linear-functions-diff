export default (plot, func) => {
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