import './photo-scale.js';
import './photo-effects.js';
import { renderData } from './fullSizePicture.js';
import {getData} from './api.js';
import { showAlert } from './util.js';
import { setUserFormSubmit, closeModal } from './form.js';

getData()
  .then((posts) => {
    renderData(posts);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit(closeModal);
