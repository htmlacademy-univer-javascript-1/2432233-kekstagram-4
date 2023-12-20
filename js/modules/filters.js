import { renderThubmnails } from './rendering-thumbnails.js';
import { RENDER_DELAY, COUNT_RANDOM_PICTURES } from './constants.js';
import { debounce, shuffle, sortElementsByComments } from './util.js';

const filterBlock = document.querySelector('.img-filters');
const defaultBtn = filterBlock.querySelector('#filter-default');
const randomBtn = filterBlock.querySelector('#filter-random');
const discussedBtn = filterBlock.querySelector('#filter-discussed');

function setDefaultButton (pictures) {
  defaultBtn.addEventListener('click', () => {
    randomBtn.classList.remove('img-filters__button--active');
    discussedBtn.classList.remove('img-filters__button--active');
    defaultBtn.classList.add('img-filters__button--active');

    const debounceFunc = debounce(
      () => renderThubmnails(pictures),
      RENDER_DELAY);

    debounceFunc();
  });
}

function setRandomButton (pictures) {
  randomBtn.addEventListener('click', () => {
    defaultBtn.classList.remove('img-filters__button--active');
    discussedBtn.classList.remove('img-filters__button--active');
    randomBtn.classList.add('img-filters__button--active');

    const debounceFunc = debounce(
      () => renderThubmnails(shuffle(pictures).slice(0, COUNT_RANDOM_PICTURES)),
      RENDER_DELAY);

    debounceFunc();
  });
}
function setDiscussedButton (pictures) {
  discussedBtn.addEventListener('click', () => {
    defaultBtn.classList.remove('img-filters__button--active');
    randomBtn.classList.remove('img-filters__button--active');
    discussedBtn.classList.add('img-filters__button--active');

    const debounceFunc = debounce(
      () => renderThubmnails(pictures.slice().sort(sortElementsByComments)),
      RENDER_DELAY);

    debounceFunc();
  });
}

function showFilters () {
  filterBlock.classList.remove('img-filters--inactive');
}

export { showFilters, setDefaultButton, setRandomButton, setDiscussedButton };
