const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


function createRandomIdFromRangeGenerator(a, b) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(a, b);
    if (previousValues.length >= (b - a + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export {createRandomIdFromRangeGenerator, getRandomArrayElement, getRandomInteger, isEscapeKey};
