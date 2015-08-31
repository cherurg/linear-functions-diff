import React from 'react';
import Checkbox from '../Checkbox';
import Button from '../Button';
import ButtonConstants from '../../constants/button';

class LeftTop extends React.Component {
  render() {
    return (<div>
        <div style={{display: 'inline-block', paddingLeft: '1em', marginBottom: '0.5em'}}>
          <Checkbox name="EnableDashedLine">Построить хорду</Checkbox>
        </div>
        <div className="zoom-buttons" style={{marginLeft: '30px', display: 'inline-block'}}>
          <Button
            className="waves-effect btn-flat"
            style={{marginLeft: '0.5em', color: 'black'}}
            name={ButtonConstants.ZOOM_FULL_OUT}>
            Отдалить
          </Button>
          <Button
            className="waves-effect btn-flat"
            name={ButtonConstants.ZOOM_OUT}>
            <img className="button-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAttJREFUSImtlL9PVFkUxz/nvjfOEiao+CMbwjabGEpja7IOKgUsoUB4aMdAiEaFv4CNtBAbE80UFjrTLT4sdnETGpFJqDYaC5s10XKjiRiLJzrge+dYsLMZxpnMQPxWN+ec+/28d+69R2ig7PBUt5eKB8FOGq4TKGO8Fmdrq4uFdcAa7a2W1AbOX5j4WX1dMNwZwZbF3FMV3jmzNqAHYcCgQ9Abqw+Kv+8J0Ds2OQKW99QW4nbLl4rFcr1NZy/mTqPcAXmZjjK5lZXbW00BvWOTI47klqj8+nip8KLZlwVBcGCD9nsGncfYHArDMKlX52CnLWD5Vs0BwjDcPsrmuIjIe8vMNqpzAOrrgqe20Kp5FSRR0wmcTmeHp7rrArLDU92GOxO3W34v5hWVwuJbcEXPT67UBXipeFCw5UYH2ooSJ4uYDtUFgJ0Uc0/3aw5wPImeq+NENjvn1+Z8w3Wa8K4S6AsuH1TZ+qOZqaqbW1u6X4Kds+gdHY/oenMI2NgFAMr/PSIAPhzm0+EP7rdmgCSV+md3xLUR+9+02cd4DfRUAs/u3v0CrDcDVKvv0mRXrFYuPch/rM05cbaGMLAXw1ppbAMCT+rl3OpiYd2g4+zF3Ol9+gvojFMt1AUAJugNlDtBEBzYq/u50dx1c0SPl4orjQDsTEV5uUH7vSAIvFbNz49N9IHcVLyrjWpcZZGOMjmDzg3JPMoG4z828ZZzo7lpU5Zx/OCh843+fte4DoLAe2+ZWZxOgysmThaPJ9HzyqTsuzTZpbENgM6YI1K8qx46DzII9tcR27wQhuF2Q0BF2eGpbs9PrmA6pI4TKBG4NhxlgSdOtVDpeX//THq7I3oIMmimj47yaaQaUhewC5ad8+l6c4jYL5fCb+95M0hTQKuqhqiyfEw+joZhuP3dALUQsD+P2GbrV7IVvXr1d9Lz0y8Pk/TWKZChz5L693v6/6/+/pl071juGiBfAXKhQWr5Iw07AAAAAElFTkSuQmCC"/>
          </Button>
          <Button
            className="waves-effect btn-flat"
            style={{marginLeft: '0.5em'}}
            name={ButtonConstants.ZOOM_IN}>
            <img className="button-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAxlJREFUSImtlL1rW2cUh5/3vZJVY+EmjhOKcCkUgsfQoUugkeV4sGs82NZVsukD09DW/gtS4tWGDoUGDRlSaarl6wytUvASxwJPxSVDS2khgS4lgTh4UJzKju45HVwFWb4XucG/8Zzz/p5z3i9DiJLTc0NOtDkJekmxA0AD5YmxurlRKW0BGra2XaYzcHUm/6FEZFmxVwxaNWq3xfDcqvYCwxgmFPoNcmtjtbzyvwAjmcIsaNERXW72abFWLjeCFqWu5S4j3AbzZ6wez62vf7vfFTCSKcxa/G+MmE8frJV+7daZ67o9O/TdVRg4z96U53l+UJ2Fw20BLZ7UHMDzvINB9rLGGPNC4zfD6iyARGTZEV0OM0+lc7+nZgofBEB8UcljZT45PTcUCEhOzw0p9kqzT4thXRhMj0T9YxcCoOaVn4EtOxH/RiDAiTYnDVoNO9CTyLemgspUIAD0klG7/bbmABf8+iOxXEwmFyOduYhiB9TwvBUYcz97V8z+Dx11CUdYGc1k30wpYhc3176rweFZjKSzdRJPzwA7RwBA479HBMDuWV6d3bVftRc1DStW7dcWnrVifjT6x9EebC/NyLFtjqA8AYZbgV/u3HkNbLUXjabzDd+R7Y1K+a9OA4Cx64VEU7RRWy2+7MxZY3UTw0TQwpNKmjph4GFQzm5USlsK/alructv6W9AFqxIKRAAqEFuIdx2Xbcn0MLqUlRiu0Gp0XTuS7XUH6yV10Poh0q5+e9B/UH2smH/SqeuZvJjKlR9az6urd79LWwCAGL1eE5hYMfE7yfd7HtdvM1oOjevQhXLOw6yFDb9kefvuq7zQuM3sTIPtuxbU7ng1x+1Jhq7XkhIUydAFtRSF5zPHWQJzCToT+d0b8bzvINQQEvJ6bkhJ+LfQGVKLBcR6mB7sTQMPLQipdaej48vxA766/fATKrK/UFezbZDAgFHYMnFCImnZ2hGGjXv+D3vBukKOKnaISJUz5uXac/zDk4N0AkB/fGc7rnOaQIeP/7ZH37/k3t+bP8jMFP/mOjfp+n/RuPjC7GRTO4LwPwL37tf7gzygQkAAAAASUVORK5CYII="/>
          </Button>
        </div>
      </div>
    );
  }
}

export default LeftTop;