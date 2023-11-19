import {isEscapeKey} from './util.js';
import {COUNT_OF_COMMENTS_TO_SHOW} from './constants.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');
let allComments;
let commentsShown = 0;

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    commentsFragment.append(commentElement);
  });

  commentsList.append(commentsFragment);
};

const loadComments = () => {
  const commentsToShow = allComments.slice(commentsShown, commentsShown + COUNT_OF_COMMENTS_TO_SHOW);
  renderComments(commentsToShow);
  commentsShown += commentsToShow.length;

  if (commentsShown >= allComments.length) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }

  bigPicture.querySelector('.social__comment-count').innerHTML =`${commentsShown}
    из <span class='comments-count'>${allComments.length}</span> комментариев`;
};

const openPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.big-picture__img img').alt = picture.description;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  allComments = picture.comments;
  commentsList.innerHTML = '';
  loadComments();

  commentsLoaderButton.addEventListener('click', loadComments);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePicture = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
  allComments = [];
  commentsLoaderButton.removeEventListener('click', loadComments);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
}

closeButton.addEventListener('click', closePicture);

export { openPicture };
