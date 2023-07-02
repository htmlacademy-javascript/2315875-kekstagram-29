const createPictures = function (content) {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const picturesFragment = document.createDocumentFragment();
  const pictureElement = pictureTemplate.cloneNode(true);

  content.forEach(({ url, description, likes, comments }) => {
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.appendChild(pictureElement);
  });

  picturesContainer.append(picturesFragment);
};

export { createPictures };
