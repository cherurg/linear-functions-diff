import _ from 'lodash';

class Zoom {

  offset = 0.05;
  zoomed = false;

  constructor(plotMain, plot, center) {
    this.plotMain = plotMain;
    this.plot = plot;
    this.center = center;
  }

  zoomIn() {
    if (this.zoomed) return;
    this.zoomed = true;

    this.past = _.clone(this.plotMain.plot.pure);

    this.plotMain.plot.y.domain([this.center.y - this.offset, this.center.y + this.offset]);
    this.plotMain.plot.x.domain([this.center.x - this.offset, this.center.x + this.offset]);
    this.plotMain.redraw();

    this.plot.plot.y.domain([-0.1*this.offset, 2*this.offset]);
    this.plot.plot.x.domain([this.center.x - this.offset, this.center.x + this.offset]);
    this.plot.redraw();
  }

  zoomOut() {
    if (!this.zoomed) return;
    this.zoomed = false;

    let {left, right, top, bottom} = this.past;

    this.plotMain.plot.y.domain([bottom, top]);
    this.plotMain.plot.x.domain([left, right]);
    this.plotMain.redraw();

    this.plot.plot.y.domain([bottom, top]);
    this.plot.plot.x.domain([left, right]);
    this.plot.redraw();
  }
}

export default Zoom;