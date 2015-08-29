export default (plot, ...props) => {
  let line = plot.addLine(...props);
  line.el.attr('stroke-dasharray', '10, 10');
  return line;
};