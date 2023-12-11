import { renderThubmnails } from './modules/rendering-thumbnails.js';
import './modules/user-form.js';
import { getData } from './modules/api.js';
import { showAlert } from './modules/util.js';

getData(
  (pictures) => {
    renderThubmnails(pictures);
  },
  showAlert,
);
