import { renderThubmnails } from './rendering-thumbnails.js';
import { RENDER_DELAY, COUNT_RANDOM_PICTURES } from './constants.js';
import { debounce, shuffle, sortElementsByComments } from './util.js';
import { picturesList } from '../main.js';

const filterBlock = document.querySelector('.img-filters');
const defaultBtn = filterBlock.querySelector('#filter-default');
const randomBtn = filterBlock.querySelector('#filter-random');
const discussedBtn = filterBlock.querySelector('#filter-discussed');

defaultBtn.addEventListener('click', () => {
  randomBtn.classList.remove('img-filters__button--active');
  discussedBtn.classList.remove('img-filters__button--active');
  defaultBtn.classList.add('img-filters__button--active');

  const debounceFunc = debounce(
    () => renderThubmnails(picturesList),
    RENDER_DELAY);

  debounceFunc();
});

randomBtn.addEventListener('click', () => {
  defaultBtn.classList.remove('img-filters__button--active');
  discussedBtn.classList.remove('img-filters__button--active');
  randomBtn.classList.add('img-filters__button--active');

  const debounceFunc = debounce(
    () => renderThubmnails(shuffle(picturesList).slice(0, COUNT_RANDOM_PICTURES)),
    RENDER_DELAY);

  debounceFunc();
});

discussedBtn.addEventListener('click', () => {
  defaultBtn.classList.remove('img-filters__button--active');
  randomBtn.classList.remove('img-filters__button--active');
  discussedBtn.classList.add('img-filters__button--active');

  const debounceFunc = debounce(
    () => renderThubmnails(picturesList.slice().sort(sortElementsByComments)),
    RENDER_DELAY);

  debounceFunc();
});

function showFilters () {
  filterBlock.classList.remove('img-filters--inactive');
}

export { showFilters };
