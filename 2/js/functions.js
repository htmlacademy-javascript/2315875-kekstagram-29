//Функция №1.
const checkStringLength = (string, length) => string.length <= length;

//Функция №2.
const checkPalindrome = (string) => {
  const solidString = string.replaceAll(' ', '');
  const normalizedString = solidString.toLowerCase();
  let reverseString = '';
  for (let index = normalizedString.length - 1; index >= 0; index--) {
    reverseString += normalizedString[index];
  }
  return reverseString === normalizedString;
};
