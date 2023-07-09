const picturesContainer = document.querySelector('.pictures');
const createPictures = (contentArray) => {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesFragment = document.createDocumentFragment();

  contentArray.forEach(({ id, url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const pictureImage = pictureElement.querySelector('.picture__img');
    pictureImage.src = url;
    pictureImage.alt = description;
    pictureImage.dataset.photoId = id;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.appendChild(pictureElement);
  });

  picturesContainer.append(picturesFragment);
};

export { createPictures, picturesContainer };
