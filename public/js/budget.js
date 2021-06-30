// Entertainment expense
const entExp = document.querySelector('').value
// hotel Expense
const hotelExp = document.querySelector('').value
// food expense
const foodExp = document.querySelector('').value
// misc expenses
const miscExp = document.querySelector('').value
// tansportation expense
const transExp = document.querySelector('').value


// push the sum of the expenses into this variable. 
let tripExp = []


// trip expense array. use sum() to make total.
const expArr = []

var sumArray = function(expArr) {
    var result = 0;
  
    for (var i = 0; i < expArr.length; i++) {
      var currentNumber = arr[i];
      result += currentNumber;
    }
  
    return result;
    
  };