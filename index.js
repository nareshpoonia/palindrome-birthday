let dateInput = document.querySelector(".date-input");
let showButton = document.querySelector(".show-button");
let output = document.querySelector(".output");

// Used default params & Chaining Methods with Optional Chaining
const reverseString = (str = "") => str.split("")?.reverse()?.join("");

const checkPalindrome = (str) => reverseString(str) === str;

const convertDateToString = (date) => {
  let blankDateString = {
    day: "",
    month: "",
    year: "",
  };
  // Used ternary operator
  date.day < 10
    ? (blankDateString.day = "0" + date.day)
    : (blankDateString.day = date.day.toString());
  date.month < 10
    ? (blankDateString.month = "0" + date.month)
    : (blankDateString.month = date.month.toString());

  blankDateString.year = date.year.toString();
  return blankDateString;
};

const convertDateToAllVariation = (date) => {
  let dateStr = convertDateToString(date);
  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

const checkPalindromeForAllDateVariation = (date) => {
  let listOfPalindrome = convertDateToAllVariation(date);
  let isPalindrome = false;
  for (var i = 0; i < checkPalindrome.length; i++) {
    if (checkPalindrome(listOfPalindrome[i])) {
      isPalindrome = true;
      break;
    }
  }
  return isPalindrome;
};

const checkIfLeapYear = (year) => {
  if (year % 4 !== 0) {
    return false;
  } else if (year % 100 !== 0) {
    return true;
  } else if (year % 400 !== 0) {
    return false;
  } else return true;
};

const getNextDate = (date) => {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (checkIfLeapYear(year) === true) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else if (day > 28) {
      day = 1;
      month = 3;
    }
  }
  if (day > daysInMonth[month - 1]) {
    day = 1;
    month = month + 1;
  }
  if (month > 12) {
    month = 1;
    year = year + 1;
  }
  // Object Literal Shorthand
  return {
    day,
    month,
    year,
  };
};

const getLastDate = (date) => {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let daysInMonthLeapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day === 0) {
    if (month === 1) {
      day = 31;
      month = 12;
      year = year - 1;
    } else if (checkIfLeapYear(year) === true) {
      day = daysInMonthLeapYear[month - 2];
      month = month - 1;
    } else {
      day = daysInMonth[month - 2];
      month = month - 1;
    }
  }
  // Object Literal Shorthand
  return {
    day,
    month,
    year,
  };
};

const getNextPolindrome = (date) => {
  let counter = 0;
  let nextDate = getNextDate(date);
  while (1) {
    counter = counter + 1;
    let isPalindrome = checkPalindromeForAllDateVariation(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [counter, nextDate];
};

const getLastPolindrome = (date) => {
  let counter = 0;
  let lastDate = getLastDate(date);
  while (1) {
    counter = counter + 1;
    if (checkPalindromeForAllDateVariation(lastDate)) {
      break;
    }
    lastDate = getLastDate(lastDate);
  }
  return [counter, lastDate];
};

let date = {
  day: 1,
  month: 12,
  year: 1999,
};

showButton.addEventListener("click", () => {
  let dateString = dateInput.value;
  let splittedDate = dateString.split("-");
  // Destructuring Arrays
  const [splittedYear, splittedMonth, splittedDay] = splittedDate;

  let date = {
    day: Number(splittedDay),
    month: Number(splittedMonth),
    year: Number(splittedYear),
  };

  let isPalindrome = checkPalindromeForAllDateVariation(date);
  console.log(getLastDate(date));
  if (isPalindrome === true) {
    output.innerHTML = "Yay ! Your Birthday is Palindrome";
  } else {
    let nextPalindrome = getNextPolindrome(date);
    let lastPalindrome = getLastPolindrome(date);
    // Destructring Arrays
    const [daysCountNext] = nextPalindrome;
    const [daysCountLast] = lastPalindrome;
    // Using Template Literals
    if (daysCountNext < daysCountLast) {
      output.innerHTML = `Next Palindrome is on ${nextPalindrome[1].day}-${nextPalindrome[1].month}-${nextPalindrome[1].year} You missed it by ${nextPalindrome[0]} days`;
    } else {
      output.innerHTML = `Last Palindrome was on ${lastPalindrome[1].day}-${lastPalindrome[1].month}-${lastPalindrome[1].year} You missed it by ${lastPalindrome[0]} days`;
    }
  }
});
