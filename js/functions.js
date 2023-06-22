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


checkStringLength('Привет!', 10);
checkPalindrome('ДоВод');

//Функция №4

const checkMeetingTime = (timeOfBegining, timeOfEnding, timeOfMeeting, meetingDuration) => {
  const timeArray = [timeOfBegining, timeOfEnding, timeOfMeeting];
  const scheduleInMinutes = [];
  for (let i = 0; i < timeArray.length; i++) {
    const schedule = timeArray[i].split(':');
    scheduleInMinutes.push(Number(schedule[0]) * 60 + Number(schedule[1]));
  }

  const workStartTime = scheduleInMinutes[0];
  const workEndTime = scheduleInMinutes[1];
  const meetingStartTime = scheduleInMinutes[2];
  const meetingEndTime = meetingStartTime + meetingDuration;

  return (meetingStartTime >= workStartTime && meetingEndTime <= workEndTime);

};

checkMeetingTime();
