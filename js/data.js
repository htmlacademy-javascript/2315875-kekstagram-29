import { createRandomIdFromRangeGenerator } from './util.js';
import { getRandomArrayElement } from './util.js';
import { getRandomInteger } from './util.js';

const descriptions = ['Наконец-то отпуск', 'Я сказала ДА!', 'Новый член семьи', 'Вдохновляет', 'Завораживает'];
const messages = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const names = ['Александр', 'Ирина', 'Арсений', 'Светлана'];

const generateRandomCommentId = createRandomIdFromRangeGenerator(0, 999999);

const createComment = () => ({
  id: generateRandomCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names),
});

const generateRandomId = createRandomIdFromRangeGenerator(1, 25);

const createPost = () => ({
  id: generateRandomId(),
  url: `photos/${generateRandomId()}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComment)
});

const createPosts = () => Array.from({ length: 25 }, createPost);

export { createPosts };
