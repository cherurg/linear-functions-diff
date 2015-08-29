import React from 'react';
import Checkbox from '../Checkbox';


class LeftTop extends React.Component {
  render() {
    return (<div>
        <div style={{display: 'inline-block', paddingLeft: '1em'}}>
          <Checkbox name="EnableDashedLine">Построить хорду</Checkbox>
        </div>
        <div style={{display: 'inline-block', paddingLeft: '2em'}}>
          <Checkbox name="ZoomGraphs">Приблизить</Checkbox>
        </div>
      </div>
    );
  }
}

export default LeftTop;