const dbCodes =
[
    {
      startingCode:
  `
function flattenArray(arr){
  var newArr = [];// flattened array
  for(var i = 0; i < arr.length; i++){
    if(Array.isArray(arr[i])){
      newArr.concat(flattenArray(arr[i]))
    }
    else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

var flattenedArray = flattenArray([[1],[2,3,[4]]])
console.log(flattenedArray) // should be [1,2,3,4]
  `,


      solutionCode:
  `
  function flattenArray(arr){
    var newArr = [];// flattened array
    for(var i = 0; i < arr.length; i++){
      if(Array.isArray(arr[i])){
        newArr = newArr.concat(flattenArray(arr[i]))
      }
      else {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }
  `,


      explanation:
  `
  newArr.concat is non mutating.. you need to assign newArr to equal it
  `,


      prependingCode:
  `
  function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  console.log('var num1_1 = ', randomInt(1,20) )
  console.log('var num1_2 = ', randomInt(1,20) )
  console.log('var num1_3 = ', randomInt(1,20) )
  console.log('var num1_4 = ', randomInt(1,20) )
  console.log('var num2_1 = ', randomInt(1,20) )
  console.log('var num2_2 = ', randomInt(1,20) )
  console.log('var num2_3 = ', randomInt(1,20) )
  console.log('var num2_4 = ', randomInt(1,20) )
  console.log('var num2_5 = ', randomInt(1,20) )
  console.log('var num2_6 = ', randomInt(1,20) )
  `,


      appendingCode:
  `
  var firstArray = [[num1_1, num1_2],[num1_3,[num1_4]]]
  var secondArray = [[[num2_1, num2_2, num2_3],[num2_4]],[num2_5],num2_6]
  console.log('#ToTest#:flattenArray(',firstArray ,'):', flattenArray(firstArray))
  console.log('#ToTest#:flattenArray(',secondArray ,'):', flattenArray(secondArray))
  `,


      expected: [],
  },
    {
      startingCode:
`
function checkEmptyArray(arr){
  if(arr === []){
    return true
  }
  return false
}
`,


      solutionCode:
`
function checkEmptyArray(arr){
  if(!arr.length){
    return true
  }
  return false
}
`,


      explanation:
`
cannot do arr === [] you IDIOT
`,


      prependingCode:
`

`,


      appendingCode:
`
console.log('#ToTest#:checkEmptyArray([]):', checkEmptyArray([]))
`,


      expected: [],
  },



  { startingCode:
`
var foo = 1;
function bar() {
	if (!foo) {
		var foo = 10;
	}
	return foo;
}
bar();
`,


    solutionCode:
`
var foo = 1;
returnFirstFoo = function () {
	if (!foo) {
		var foo = 10;
	}
	return foo;
}
`,


    explanation:
`
look up hoisting
`,


  prependingCode:
`

`,


    appendingCode:
`
  console.log('#ToTest#:bar():', bar())
`,


    expected: [],
  },



  { startingCode:
`
function addBoth(num1, num2){
  return num1-num2;
}
`,


    solutionCode:
`
function addBoth(num1, num2){
  return num1+num2;
}
`,


    explanation:
`
I mean.. you have to add... can't get any more straightforward than that...
`,


  prependingCode:
`
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var num1 = randomInt(1,5)
var num2 = randomInt(4,7)
console.log('var num1 = ', num1)
console.log('var num2 = ', num2)
`,


    appendingCode:
`
  console.log('#ToTest#:addBoth(',num1,',',num2,'):', addBoth(num1, num2))
`,


    expected: [],
  },
  { startingCode:
`
function addFirstToEnd(arr, first, second, third) {
  var first = arr[0];
  return arr.push(first)
}
`,


    solutionCode:
`
function addFirstToEnd(arr, first, second, third) {
  var first = arr[0];
  return arr.push(first)
}
`,


    explanation:
`
look up hoisting
`,


  prependingCode:
`

`,


    appendingCode:
`
  console.log('#ToTest#:returnFirstFoo():', returnFirstFoo())
`,


    expected: [],
  }
]

export default dbCodes
