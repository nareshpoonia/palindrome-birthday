var str = "raceedcar";

var dateInput = document.querySelector(".date-input");
var showButton = document.querySelector(".show-button");
var output = document.querySelector(".output");

function reverseString(str) {
  var splittedString = str.split("");
  var reversedString = splittedString.reverse();
  return splittedString.join("");
}

function checkPalindrome(str) {
  // Return true if a palindrom else returns false
  return reverseString(str) === str;
}

function convertDateToString(date) {
  // Creating a blank Date String
  // This variable will be change in the function
  var blankDateString = {
    day: "",
    month: "",
    year: "",
  };
  // if date Object has value less than 10, then it will add 0 before it
  // if we add a number to string it becomes a string
  if (date.day < 10) {
    blankDateString.day = "0" + date.day;
  }
  //   if number is greater than 0 converting it to a string
  else {
    blankDateString.day = date.day.toString();
  }
  if (date.month < 10) {
    blankDateString.month = "0" + date.month;
  } else {
    blankDateString.month = date.month.toString();
  }
  blankDateString.year = date.year.toString();
  //   returning the updated string
  return blankDateString;
}

function convertDateToAllVariation(date) {
  // converting date to a string using fuction defined earlier
  var dateStr = convertDateToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  // slice(-2), returns the last two values of the string
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateVariation(date) {
  // listOfPalindrom is an array of all date formats
  var listOfPalindrome = convertDateToAllVariation(date);
  //   Initially isPalindrome is false
  var isPalindrome = false;
  // Then we are itterating every dateformat to the checkpalindrom function
  // If any of the dateformat is palindrome it returns true
  for (var i = 0; i < checkPalindrome.length; i++) {
    if (checkPalindrome(listOfPalindrome[i])) {
      isPalindrome = true;
      break;
    }
  }
  return isPalindrome;
}

function checkIfLeapYear(year) {
  if (year % 4 != 0) {
    return false;
  } else if (year % 100 != 0) {
    return true;
  } else if (year % 400 != 0) {
    return false;
  } else return true;
}

// function to get the next date
function getNextDate(date) {
  // incrementing date by a day
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  // daysInMonth is an array having all the days in months
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //   checking if the month is February
  if (month === 2) {
    // If year is leap year last date would be 29
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
  // if day is greater than the total days in that month
  if (day > daysInMonth[month - 1]) {
    day = 1;
    month = month + 1;
  }
  if (month > 12) {
    month = 1;
    year = year + 1;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getLastDate(date) {
  // decrementing date by a day
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  // daysInMonth is an array having all the days in months
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // daysInMonthLeapYear is an array of all days in months in leap year
  var daysInMonthLeapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Check if day is 0
  if (day === 0) {
    // If month is 1, change the date to 31, month.....
    if (month === 1) {
      day = 31;
      month = 12;
      year = year - 1;
    }
    // if year is leap year
    else if (checkIfLeapYear(year) === true) {
      day = daysInMonthLeapYear[month - 2];
      month = month - 1;
    }
    // if year isn't leap year
    else {
      day = daysInMonth[month - 2];
      month = month - 1;
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPolindrome(date) {
  // Keeping counter as zero
  var counter = 0;
  // Getting next date
  var nextDate = getNextDate(date);
  // the loop will run until we get a palindrome
  while (1) {
    counter = counter + 1;
    var isPalindrome = checkPalindromeForAllDateVariation(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [counter, nextDate];
}

function getLastPolindrome(date) {
  // Keeping counter as zero
  var counter = 0;
  // Getting last date
  var lastDate = getLastDate(date);
  // the loop will run until we get a palindrome
  while (1) {
    counter = counter + 1;
    if (checkPalindromeForAllDateVariation(lastDate)) {
      break;
    }
    lastDate = getLastDate(lastDate);
  }
  return [counter, lastDate];
}

var date = {
  day: 1,
  month: 12,
  year: 1999,
};

console.log(getLastDate(date));

showButton.addEventListener("click", function () {
  var dateString = dateInput.value;
  var splittedDate = dateString.split("-");
  var date = {
    day: Number(splittedDate[2]),
    month: Number(splittedDate[1]),
    year: Number(splittedDate[0]),
  };
  var isPalindrome = checkPalindromeForAllDateVariation(date);
  console.log(getLastDate(date));
  if (isPalindrome === true) {
    output.innerHTML = "Yay ! Your Birthday is Palindrome";
  } else {
    var nextPalindrome = getNextPolindrome(date);
    var lastPalindrome = getLastPolindrome(date);
    console.log(nextPalindrome[0]);

    if (nextPalindrome[0] < lastPalindrome[0]) {
      output.innerHTML =
        "Next Palindrome is on " +
        nextPalindrome[1].day +
        "-" +
        nextPalindrome[1].month +
        "-" +
        nextPalindrome[1].year +
        " You missed it by " +
        nextPalindrome[0] +
        "days";
    } else {
      output.innerHTML =
        "Last Palindrome was on " +
        lastPalindrome[1].day +
        "-" +
        lastPalindrome[1].month +
        "-" +
        lastPalindrome[1].year +
        " You missed it by " +
        lastPalindrome[0] +
        "days";
      console.log(lastPalindrome[0]);
      console.log(nextPalindrome[0]);
    }
  }

  console.log(dateString);
});
