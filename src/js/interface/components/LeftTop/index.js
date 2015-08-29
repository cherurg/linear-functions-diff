import React from 'react';
import Checkbox from '../Checkbox';


class LeftTop extends React.Component {
  render() {
    return (<div>
        <Checkbox name="EnableDashedLine">Построить хорду</Checkbox>
        <Checkbox name="ZoomGraphs">Приблизить</Checkbox>
      </div>
    );
  }
}

export default LeftTop;