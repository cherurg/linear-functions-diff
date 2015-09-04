import _ from 'lodash';
import SlidersStore from '../interface/stores/Sliders';

let zoom = {

  factor: SlidersStore.getSlider(SlidersStore.names.pointPosition).factor,

  constructor(plotMain, plot, center, initial) {
    this.plotMain = plotMain;
    this.plot = plot;
    this.center = center;
    this.initial = initial;
  },

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
  },

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
  },

  zoomFullOut() {
    let {left, right, top, bottom} = this.initial;

    this.plotMain.plot.x.domain([left, right]);
    this.plotMain.plot.y.domain([bottom, top]);
    this.plotMain.redraw();

    this.plot.plot.x.domain([left, right]);
    this.plot.plot.y.domain([bottom, top]);
    this.plot.redraw();
  },

  getLeft() {
    return this.plot.plot.x.domain()[0];
  },

  getRight() {
    return this.plot.plot.x.domain()[1];
  },

  getBottom() {
    return this.plot.plot.y.domain()[0];
  },

  getTop() {
    return this.plot.plot.y.domain()[1];
  },

  getXRange() {
    return this.getRight() - this.getLeft();
  },

  getYRange() {
    return this.getTop() - this.getBottom();
  },

  getXMean() {
    return (this.getRight() + this.getLeft()) / 2;
  },

  getYMean() {
    return (this.getBottom() + this.getTop()) / 2;
  }
};

export default zoom;