import keyMirror from 'keymirror';
import globalExport from './global_export';

var constants = keyMirror({
  SLIDER_SLIDE: null,
  SLIDER_SET: null
});

globalExport(constants, 'actions.Slider');
export default constants;