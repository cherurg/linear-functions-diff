import globalExport from '../constants/global_export';

var Dispatcher = require('flux').Dispatcher;
let dispatcher = new Dispatcher();

globalExport(dispatcher, 'Dispatcher');
module.exports = dispatcher;