import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('#upload-file');
const imgUpload = form.querySelector('.img-upload__overlay');
const body = document.documentElement;
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const cancelButton = document.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');
const success = document.querySelector('#success').content.querySelector('.success');
const successButton = document.querySelector('#success').content.querySelector('.success__button');
const error = document.querySelector('#error').content.querySelector('.error');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');

const HASHTAG_COUNT_MAX = 5;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const DESCRIPTION_MAX_LENGTH = 140;
const DESCRIPTION_ERROR_TEXT = 'Максимальная длина описания - 140 символов'

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const closeModal = () => {
  body.classList.remove('modal-open');
  imgUpload.classList.add('hidden');
  pristine.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openModal = () => {
  pristine.reset();
  form.reset();
  body.classList.add('modal-open');
  imgUpload.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const isInTextFieldset = () =>
  document.activeElement === hashtagsInput || document.activeElement === descriptionInput;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInTextFieldset()) {
    evt.preventDefault();
    closeModal();
  }
};

const onCancelButtonClick = () => {
  closeModal();
};

const onInputChange = () => {
  openModal();
};

const isValidHashtag = (hashtag) => VALID_HASHTAG.test(hashtag);
const isValidCount = (hashtags) => hashtags.length <= HASHTAG_COUNT_MAX;
const areUniqueTags = (hashtags) => {
  const lowerCaseTags = hashtags.map((hashtag) => hashtag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateHashtags = (string) => {
  const hashtags = string.trim().split(' ').filter((hashtag) => hashtag.trim());
  return isValidCount(hashtags) && areUniqueTags(hashtags) && hashtags.every(isValidHashtag);
};


const getHashtagError = (string) => {
  const hashtags = string.trim().split(' ').filter((hashtag) => hashtag.trim());
  if (!isValidCount(hashtags)) {
    return 'Количество хэштегов превышает допустимое';
  } else if (!hashtags.every(isValidHashtag)) {
    return 'Хэштег написан с ошибкой';
  } else if (!areUniqueTags(hashtags)) {
    return 'Хэштеги повторяются';
  }
};

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  getHashtagError
);

const validateDescription = (string) => string.length <= DESCRIPTION_MAX_LENGTH;

pristine.addValidator(
  descriptionInput,
  validateDescription,
  DESCRIPTION_ERROR_TEXT
);

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

const showSuccess = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(success);
    } else {
      const successClone = document.querySelector('.success');
      successClone.classList.remove('hidden');
    }
  };
};

const showSuccessMessage = showSuccess();

const showError = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(error);
    } else {
      const errorClone = document.querySelector('.error');
      errorClone.classList.remove('hidden');
    }
  };
};
const showErrorMessage = showError();

const hideModalMessage = () => {
  success.classList.add('hidden');
  error.classList.add('hidden');
};

const closeModalWithEsc = (evt) => {
  if (isEscapeKey(evt)) {
    hideModalMessage();
  }
};

const closeModalWithButton = () => {
  hideModalMessage();
};

const closeModalWithBody = (evt) => {
  evt.stopPropagation();
  if (evt.target.matches('.success') || evt.target.matches('.error')) {
    hideModalMessage();
  }
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValidated = pristine.validate();
  successButton.addEventListener('click', closeModalWithButton);
  errorButton.addEventListener('click', closeModalWithButton);
  document.addEventListener('keydown', closeModalWithEsc);
  document.addEventListener('click', closeModalWithBody);
  if (isValidated) {
    blockSubmitButton();
    unblockSubmitButton();
    showSuccessMessage();
  } else {
    showErrorMessage();
  }
});

uploadFile.addEventListener('change', onInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
