import _ from 'lodash';

class Zoom {

  factor = 4/5;

  constructor(plotMain, plot, center, initial) {
    this.plotMain = plotMain;
    this.plot = plot;
    this.center = center;
    this.initial = initial;
  }

  zoomIn() {
    let {left, right, top, bottom} = this.plotMain.plot.pure;
    let factor = this.factor;

    let semiHorizontal = (right - left) / 2;
    let meanX = this.center.x;
    left = meanX - semiHorizontal * factor;
    right = meanX + semiHorizontal * factor;
    this.plotMain.plot.x.domain([left, right]);

    let semiVertical = (top - bottom) / 2;
    let meanY = this.center.y;
    bottom = meanY - semiVertical * factor;
    top = meanY + semiVertical * factor;
    this.plotMain.plot.y.domain([bottom, top]);

    this.plotMain.redraw();


    this.plot.plot.x.domain([left, right]);
    this.plot.plot.y.domain([-0.1*(top - bottom), 0.9*(top - bottom)]);

    this.plot.redraw();
  }

  zoomOut() {
    let {left, right, top, bottom} = this.plotMain.plot.pure;
    let factor = 1 / this.factor;

    let semiHorizontal = (right - left) / 2;
    let meanX = this.center.x;
    left = meanX - semiHorizontal * factor;
    right = meanX + semiHorizontal * factor;
    this.plotMain.plot.x.domain([left, right]);

    let semiVertical = (top - bottom) / 2;
    let meanY = this.center.y;
    bottom = meanY - semiVertical * factor;
    top = meanY + semiVertical * factor;
    this.plotMain.plot.y.domain([bottom, top]);

    this.plotMain.redraw();


    this.plot.plot.x.domain([left, right]);
    this.plot.plot.y.domain([-0.1*(top - bottom), 0.9*(top - bottom)]);

    this.plot.redraw();
  }

  zoomFullOut() {
    let {left, right, top, bottom} = this.initial;

    this.plotMain.plot.x.domain([left, right]);
    this.plotMain.plot.y.domain([bottom, top]);
    this.plotMain.redraw();

    this.plot.plot.x.domain([left, right]);
    this.plot.plot.y.domain([bottom, top]);
    this.plot.redraw();
  }
}

export default Zoom;