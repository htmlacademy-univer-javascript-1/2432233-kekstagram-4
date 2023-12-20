import { renderThubmnails } from './modules/rendering-thumbnails.js';
import './modules/user-form.js';
import { getData } from './modules/api.js';
import { showAlert } from './modules/util.js';
import { showFilters, setDefaultButton, setDiscussedButton, setRandomButton } from './modules/filters.js';

getData(
  (pictures) => {
    renderThubmnails(pictures);

    setDefaultButton(pictures);
    setRandomButton(pictures);
    setDiscussedButton(pictures);

    showFilters();
  },
  showAlert,
);
