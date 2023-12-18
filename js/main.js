import { renderThubmnails } from './modules/rendering-thumbnails.js';
import './modules/user-form.js';
import { getData } from './modules/api.js';
import { showAlert } from './modules/util.js';
import { showFilters } from './modules/filters.js';

let picturesList;

getData(
  (pictures) => {
    picturesList = pictures;
    renderThubmnails(pictures);
    showFilters();
  },
  showAlert,
);

export { picturesList };
