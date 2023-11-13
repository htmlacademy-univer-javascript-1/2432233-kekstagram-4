import { createPhotoDescriptions } from './create-photo.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderThubmnails = (count) => {
  const picturesFragment = document.createDocumentFragment();
  const pictures = createPhotoDescriptions(count);

  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;

    picturesFragment.append(pictureElement);
  });

  picturesList.append(picturesFragment);
};

export { renderThubmnails };
