import Graphs from './graphs';
import Interface from './interface/components';
import React from 'react';

React.render(<Interface/>, document.getElementById('module-2d'));
Graphs('left-plotter', 'right-plotter');
