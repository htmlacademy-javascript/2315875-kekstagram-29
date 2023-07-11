import './form.js';
import './photo-scale.js';
import './photo-effects.js';
import { createPosts } from './data.js';
import { renderData } from './fullSizePicture.js';

renderData(createPosts());
