const scaleButtonSmall = document.querySelector('.scale__control--smaller');
const scaleButtonBig = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const zoom = (value) => {
  scaleValue.value = `${value}%`;
  imgUploadPreview.style.transform = `scale(${value / 100})`;
};

scaleButtonSmall.addEventListener('click', () => {
  const currentValue = parseInt(scaleValue.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < SCALE_MIN) {
    newValue = SCALE_MIN;
  }
  zoom(newValue);
});

scaleButtonBig.addEventListener('click', () => {
  const currentValue = parseInt(scaleValue.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > SCALE_MAX) {
    newValue = SCALE_MAX;
  }
  zoom(newValue);
});
