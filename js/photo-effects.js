const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const effectsFieldset = document.querySelector('.effects');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const image = document.querySelector('.img-upload__preview img');

const DEFAULT_EFFECT = EFFECTS[0];
let selectedEffect = DEFAULT_EFFECT;

const hideSlider = () => {
  imgUploadEffectLevel.classList.remove('hidden');
};
const showSlider = () => {
  imgUploadEffectLevel.classList.add('hidden');
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: selectedEffect.min,
      max: selectedEffect.max,
    },
    step: selectedEffect.step,
    start: selectedEffect.max,
  });
  if (selectedEffect === DEFAULT_EFFECT) {
    showSlider();
  } else {
    hideSlider();
  }
};

const changeEffect = function (evt) {
  const target = evt.target.classList.contains('effects__radio');
  if (!target) {
    return;
  }
  selectedEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  image.className = `effects__preview--${selectedEffect.name}`;
  updateSlider();
};

const updateSliderValue = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  image.style.filter = selectedEffect === DEFAULT_EFFECT ? DEFAULT_EFFECT.style : `${selectedEffect.style}(${sliderValue}${selectedEffect.unit})`;
  effectLevelValue.value = sliderValue;
};

const resetEffects = () => {
  selectedEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
hideSlider();

effectsFieldset.addEventListener('change', changeEffect);
sliderElement.noUiSlider.on('update', updateSliderValue);
