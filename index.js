var str = "raceedcar";

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

var date = {
  day: 12,
  month: 9,
  year: 2020,
};

console.log(reverseString(str));
console.log(checkPalindrome(str));
console.log(convertDateToString(date));
