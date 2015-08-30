import React from 'react';
import fmt from 'rssi';
import LeftBottom from './LeftBottom';
import LeftTop from './LeftTop';
import RightTop from './RightTop';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="over-grid">
          <div className="grid">
            <LeftTop/>
          </div>
          <div className="grid">
            <RightTop/>
          </div>
        </div>
        <div className="graphs over-grid">
          <div id="left-plotter" className="grid"/>
          <div id="right-plotter" className="grid"/>
        </div>
        <div className="over-grid">
          <div className="grid">
            <LeftBottom/>
          </div>
          <div className="grid"></div>
        </div>
      </div>
    );
  }
}

export default App;