function checkLength(string, maxLength) {
  return string.length <= maxLength;
}

checkLength('проверяемая строка', 20); // true
checkLength('проверяемая строка', 18); // true
checkLength('проверяемая строка', 10); // false


function checkPalindrome(string) {
  const str = string.replaceAll(' ', '').toLowerCase();
  let reverseStr = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reverseStr += str[i];
  }
  return reverseStr === str;
}

//Способ без использования цикла for
// function checkPalindrome2 (string) {
//   const str = string.replaceAll(' ', '').toLowerCase();
//   const reverseStr = str.split('').reverse().join('');
//   return reverseStr === str;
// }

checkPalindrome('топот'); // true
checkPalindrome('ДовОд'); // true
checkPalindrome('Кекс');  // false
checkPalindrome('Лёша на полке клопа нашёл '); // true


function getNubmers(string) {
  string = string.toString();
  let number = '';
  for (let i = 0; i < string.length; i++) {
    const temp = parseInt(string[i], 10);
    if (!Number.isNaN(temp)) {
      number += temp;
    }
  }
  return parseInt(number, 10);
}

getNubmers('2023 год');            // 2023
getNubmers('ECMAScript 2022');     // 2022
getNubmers('1 кефир, 0.5 батона'); // 105
getNubmers('агент 007');           // 7
getNubmers('а я томат');           // NaN
getNubmers(2023); // 2023
getNubmers(-1);   // 1
getNubmers(1.5);  // 15

//module5-task2

function checkTime(startTime, endTime, meetTime, meetDuration) {
  const [workHoursStart, workMinutesStart] = startTime.split(':');
  const [workHoursEnd, workMinutesEnd] = endTime.split(':');
  const [meetHoursStart, meetMinutesStart] = meetTime.split(':');

  if (+workHoursStart > +meetHoursStart) {
    return false;
  } else if (+workHoursStart === +meetHoursStart && +workMinutesStart > +meetMinutesStart) {
    return false;
  }

  const hoursLeft = +workHoursEnd - +meetHoursStart;
  const minutesLeft = +workMinutesEnd - +meetMinutesStart;
  const timeLeft = hoursLeft * 60 + minutesLeft;

  if (timeLeft < meetDuration) { return false; }

  return true;
}


checkTime('08:00', '17:30', '14:00', 90); // true
checkTime('8:0', '10:0', '8:0', 120);     // true
checkTime('08:00', '14:30', '14:00', 90); // false
checkTime('14:00', '17:30', '08:0', 90);  // false
checkTime('8:00', '17:30', '08:00', 900); // false
