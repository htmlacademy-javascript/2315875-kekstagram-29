import { createPictures } from './miniatures.js';
import { createCommentItem } from './create-comment.js';
import { isEscapeKey } from './util.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const commentList = document.querySelector('.social__comments');
const closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = document.querySelector('.big-picture .big-picture__img img');
const bigPictureLikes = document.querySelector('.big-picture .likes-count');
const bigPictureSocialCaption = document.querySelector('.big-picture .social__caption');
const bigPictureShowingComments = document.querySelector('.big-picture .showing-comments');
const commentsLoader = document.querySelector('.comments-loader');
const postCommentsCount = document.querySelector('.comments-count');


const onClick = (element, func, className) => {
  element.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(className)) {
      evt.preventDefault();
      func(evt.target);
    } else {
      func();
    }
  });
};

let currentPostComments = [];
let openCommentCount = 0;
const VISIBLE_COMMENT_COUNT = 5;

const isShowCommentsLoader = (comment, count) => {
  const isShow = comment.length <= count && comment;
  if (isShow) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const commentArr = (comment, count) => {
  if (count === 0) {
    openCommentCount = count;
    while (commentList.firstChild) {
      commentList.removeChild(commentList.firstChild);
    }
  }
  bigPictureShowingComments.textContent = Math.min(comment.length, openCommentCount + VISIBLE_COMMENT_COUNT);
  comment.slice(openCommentCount, openCommentCount + VISIBLE_COMMENT_COUNT).forEach((item) => {
    commentList.appendChild(createCommentItem(item));
  });
};

const loadComments = () => {
  openCommentCount += VISIBLE_COMMENT_COUNT;
  isShowCommentsLoader(currentPostComments, openCommentCount + VISIBLE_COMMENT_COUNT);
  commentArr(currentPostComments, openCommentCount);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.removeEventListener('click', loadComments);
  closeBigPictureButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', closeBigPictureWithEsc);
};

function closeBigPictureWithEsc(evt) {
  if (isEscapeKey(evt)) {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsLoader.removeEventListener('click', loadComments);
    closeBigPictureButton.removeEventListener('click', closeBigPicture);
    document.removeEventListener('keydown', closeBigPictureWithEsc);
  }
};

const renderData = (dataCard) => {
  createPictures(dataCard);
  const openBigPicture = (data) => {
    if (!data) {
      return;
    }
    const photo = dataCard.find((item) => item.id === +data.dataset.photoId);
    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPictureImage.setAttribute('src', photo.url);

    bigPictureLikes.textContent = photo.likes;
    bigPictureSocialCaption.textContent = photo.description;
    bigPictureShowingComments.textContent = openCommentCount;
    postCommentsCount.textContent = photo.comments.length;
    currentPostComments = photo.comments;
    commentArr(currentPostComments, 0);
    isShowCommentsLoader(currentPostComments, 5);
    commentsLoader.addEventListener('click', loadComments);
    pictures.removeEventListener('click', openBigPicture);
    closeBigPictureButton.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', closeBigPictureWithEsc);
  };

  onClick(pictures, openBigPicture, 'picture__img');
};

export { renderData };
