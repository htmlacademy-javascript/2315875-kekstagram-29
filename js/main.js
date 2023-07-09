import { createPosts } from './data.js';
import { renderData } from './fullSizePicture.js';
import { onFormSubmit } from './form.js';


onFormSubmit();

renderData(createPosts());
