const createCommentImg = (data) => {
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('social__picture');
  avatarImg.setAttribute('src', data.avatar);
  avatarImg.setAttribute('alt', data.name);
  avatarImg.setAttribute('width', 35);
  avatarImg.setAttribute('height', 35);

  return avatarImg;
};

const createCommentText = (data) => {
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = data.message;

  return commentText;
};

const createCommentItem = (data) => {
  const commentFragment = document.createDocumentFragment();
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');
  commentItem.append(createCommentImg(data));
  commentItem.append(createCommentText(data));
  commentFragment.append(commentItem);
  return commentFragment;
};

export {createCommentItem};
