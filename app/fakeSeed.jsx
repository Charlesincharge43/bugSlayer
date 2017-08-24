const dbCodes =
[
    {
      startingCode:
  `
//this function takes in a nested array and returns a flattened version of it
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
console.log(flattenedArray) // should be [1,2,3,4]... but I'm getting an empty array.  wtf
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


      preRunCode:
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

      prependingCode:
  `
  `,

      appendingCode:
  `
  var firstArray = [[num1_1, num1_2],[num1_3,[num1_4]]]
  var secondArray = [[[num2_1, num2_2, num2_3],[num2_4]],[num2_5],num2_6]
  console.log('#SPECIALTAG123#ToTest#::flattenArray(',firstArray ,')::', flattenArray(firstArray))
  console.log('#SPECIALTAG123#ToTest#::flattenArray(',secondArray ,')::', flattenArray(secondArray))
  `,


      expected: [null],
  },
  {
  startingCode:
`
function Cat(name){
  this.name= name;
}

Cat.prototype.meow = function () {
  console.log(this.name, 'says meoooowwww');
}

Cat.prototype.delayedMeow = function(milliseconds){
  setTimeout(function(){
    this.meow()
  }, milliseconds)
}

var newCat = new Cat('Garfield');
newCat.delayedMeow(300)
`,
  solutionCode:
`
function Cat(name){
  this.name= name;
}

Cat.prototype.meow = function () {
  console.log(this.name, 'says meoooowwww');
}

Cat.prototype.delayedMeow = function(milliseconds){
  setTimeout(() => this.meow(), milliseconds)
}

var newCat = new Cat('Garfield');
newCat.delayedMeow(300)
`,


  explanation:
`

`,


  preRunCode:
`

`,

prependingCode:
`
`,

  appendingCode:
`
  setTimeout(()=>{
    console.log('#SPECIALTAG123#asyncBelowFlag#::1')
    newCat.delayedMeow(300)
  },0)
  console.log('#SPECIALTAG123#ToTest#::newCat.delayedMeow STDOUT::#asyncBelowFlag#:1')
`,


  expected: [{tobe: 'Garfield says meoooowwww'}],
},
//   {
//     startingCode:
// `
// // I wrote this function to compare the runtimes of an array of functions passed in.
// // But something's wrong... my instructor told me that multiply1 should be way faster
// // (almost by a factor of 10) than multiply2, but the runtimes of both are almost the same.
// // What am I doing wrong????
//
// function CompareRunTimes (args){
//   this.fastest = null;
//   this.args = args;
//   this.sorted = [];
// }
//
// CompareRunTimes.prototype.compare = function (fns){
//   var runTimes = [];
//   var getStartTime = Date.now();
//   for(var i = 0; i < fns.length; i++){
//     for(var j = 0; j < 500; j++){
//       for(var k = 0; k < 500; k++){
//         fns[i].call(null, this.args);
//       }
//     }
//     var elapsedTime = Date.now() - getStartTime;
//     runTimes.push({function: fns[i], runTime: elapsedTime });
//   }
//   this.sorted = runTimes.sort((a,b) => a.runTime - b.runTime);
//   this.fastest = this.sorted[0];
//   return runTimes;
// }
//
// function multiply1(num, multiplier){
//   return num * multiplier;
// }
//
// function multiply2(num, multiplier){
//   var sum = 0;
//   for(var i = 0; i < multiplier; i++){
//     sum += num;
//   }
//   return sum
// }
//
// var c = new CompareRunTimes([5,150])
// c.compare([multiply1, multiply2])
// console.log('Array of runtimes: ', c.sorted)
// console.log('')
// console.log('fastest function is:')
// console.log(c.fastest.function)
// console.log('... with a runtime of ', c.fastest.runTime,' milliseconds')
// `,
//
//
//     solutionCode:
// `
// function CompareRunTimes (args){
//   this.fastest = null;
//   this.args = args;
//   this.sorted = [];
// }
//
// CompareRunTimes.prototype.compare = function (fns){
//   var runTimes = [];
//   for(var i = 0; i < fns.length; i++){
//     var start = Date.now();
//     for(var j = 0; j < 500; j++){
//       for(var k = 0; k < 500; k++){
//         fns[i].call(null, this.args);
//       }
//     }
//
//     var elapsedTime = Date.now() - start;
//     runTimes.push({function: fns[i], runTime: elapsedTime });
//   }
//   this.sorted = runTimes.sort((a,b) => a.runTime - b.runTime);
//   this.fastest = this.sorted[0];
//   return runTimes;
// }
//
// function multiply1(num, multiplier){
//   return num * multiplier;
// }
//
// function multiply2(num, multiplier){
//   var sum = 0;
//   for(var i = 0; i < multiplier; i++){
//     sum += num;
//   }
//   return sum
// }
//
// c = new CompareRunTimes([5,150])
// c.compare([multiply1, multiply2])
// `,
//
//
//     explanation:
// `
//   Assigning a variable to an invoked function and referring to it again later will not invoke it again dynamically!
//   It simply assigns it to the value returned by the invoked function.
// `,
//
//
//     preRunCode:
// `
//
// `,
//
//       prependingCode:
// `
// `,
//
//
//     appendingCode:
// `
// console.log('#SPECIALTAG123#ToTest#::c.fastest.function::', c.fastest.function.toString())
// console.log('#SPECIALTAG123#ToTest#::c.compare([multiply1, multiply2])[0].runTime::', c.compare([multiply1, multiply2])[0].runTime)
// console.log('#SPECIALTAG123#ToTest#::c.compare([multiply1, multiply2])[1].runTime::', c.compare([multiply1, multiply2])[1].runTime)
// `,
//
//
//     expected: [null, {within: {proportion: 0.2}}, {within: {proportion: 0.2}}],
// },

{
startingCode:
`
function BinarySearchTree (val) {
  this.value = val;
}

BinarySearchTree.prototype.insert = function (val) {
  if (val < this.value) {
    if (this.left) this.left.insert(val)
    else this.left = new BinarySearchTree(val);
  }
  else {
    if (this.right) this.right.insert(val)
    else this.right = new BinarySearchTree(val);
  }
  return this;
};

BinarySearchTree.prototype.breadthFirstForEach = function(func) {
  var queue = [this];
  while (queue !== []) {
    var currentNode = queue.shift();
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
      func(currentNode.value);
  }
}

var bst = new BinarySearchTree(10)
bst.insert(2).insert(12).insert(5).insert(11).insert(20).insert(17)

var bstBreadthFirstArr = []
bst.breadthFirstForEach(el => bstBreadthFirstArr.push(el))

console.log(bstBreadthFirstArr) // should equal [ 10, 2, 12, 5, 11, 20, 17 ] ..
// why is this not working???  :(
`,
solutionCode:
`
function BinarySearchTree (val) {
  this.value = val;
}

BinarySearchTree.prototype.insert = function (val) {
  if (val < this.value) {
    if (this.left) this.left.insert(val)
    else this.left = new BinarySearchTree(val);
  }
  else {
    if (this.right) this.right.insert(val)
    else this.right = new BinarySearchTree(val);
  }
  return this;
};

BinarySearchTree.prototype.breadthFirstForEach = function(func) {
  var queue = [this];
  while (queue.length) {
    var currentNode = queue.shift();
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
      func(currentNode.value);
  }
}

var bst = new BinarySearchTree(10)
bst.insert(2).insert(12).insert(5).insert(11).insert(20).insert(17)
var bstBreadthFirstArr = []
bst.breadthFirstForEach(el => bstBreadthFirstArr.push(el))
`,


explanation:
`

`,


preRunCode:
`
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var argsSet = new Set();
while (argsSet.size <= 7){
  argsSet.add(randomInt(1, 20))
}
console.log('var inputsArr = ', [...argsSet])
`,

prependingCode:
`
`,

appendingCode:
`
console.log('\\n*****************')
let first = true;
for (let item of inputsArr){
  if (first) {
    var forTestbst2 = new BinarySearchTree(item);
    console.log('Making a new binary search tree: var bst2 = new BinarySearchTree(', item, ')');
    first = false;
  }
  else {
    console.log('inserting number ', item, ' into bst2')
    forTestbst2.insert(item)
  }
}

console.log('making new breadthFirstArr')
var forTestbst2BreadthFirstArr = []
console.log('invoke forTestbst2.breadthFirstForEach with callback (el) => bstBreadthFirstArr.push(el)')
forTestbst2.breadthFirstForEach(el => forTestbst2BreadthFirstArr.push(el))
console.log('#SPECIALTAG123#ToTest#::forTestbst2BreadthFirstArr::', forTestbst2BreadthFirstArr)
`,


expected: [null],
},
{
startingCode:
`
function physicsHelperTool(eq){
  switch(eq) { // reminder, switch statements are not that much different from if/else.. they are another
    // way of writing conditionals: https://www.w3schools.com/jsref/jsref_switch.asp
    case 'Newtons_second':
      function helperFunction(mass, acc){
        return mass * acc;
      }
      break;
    case 'Friction':
      function helperFunction(mu, normal){
        return mu * normal
      }
      break;
    case 'Eq_Motion_Velocity':
      function helperFunction(initV, acc, time){
        return initV + acc * time
      }
      break;
    case 'Eq_Motion_Distance':
      function helperFunction(initDist, initV, acc, time){
        return initDist + initV * time + 0.5 * acc * Math.pow(time, 2)
      }
      break;
    default:
      throw new Error('no equation specified')
  }
  return helperFunction;
}

var physicsEquation;
physicsEquation = physicsHelperTool('Eq_Motion_Distance')
console.log(physicsEquation(0, 0, -9.8, 5)) //this works fine

physicsEquation = physicsHelperTool('Newtons_second')
console.log(physicsEquation(20, 9.8)) //help!  for some reason this is giving me NaN???
`,
solutionCode:
`
function physicsHelperTool(eq){
  var helperFunction;
  switch(eq) {
    case 'Newtons_second':
      helperFunction = function (mass, acc){
        return mass * acc;
      }
      break;
    case 'Friction':
      helperFunction = function (mu, normal){
        return mu * normal
      }
      break;
    case 'Eq_Motion_Velocity':
      helperFunction = function (initV, acc, time){
        return initV + acc * time
      }
      break;
    case 'Eq_Motion_Distance':
      helperFunction = function (initDist, initV, acc, time){
        return initDist + initV * time + 0.5 * acc * Math.pow(time, 2)
      }
      break;
    default:
      throw new Error('no equation specified')
  }
  return helperFunction;
}

`,


explanation:
`

`,


preRunCode:
`
function randomNum(min, max) {
    return (Math.random() * (max - min + 1) + min).toFixed(2)
}
var randomNums = [
  randomNum(0,20),
  randomNum(0,20),
  randomNum(0,20),
  randomNum(0,20),
  randomNum(0,20),
  randomNum(0,20),
  randomNum(0,20),
  randomNum(0,20),
  randomNum(0,20),
  randomNum(0,20),
  randomNum(0,20),
]
console.log('var randomNums = ',randomNums)
`,

prependingCode:
`
`,

appendingCode:
`
randomNums = randomNums.map(Number)
console.log('#SPECIALTAG123#ToTest#::physicsHelperTool("Eq_Motion_Distance")(',
randomNums[0],',',randomNums[1],',',randomNums[2],',',randomNums[3],')::',
physicsHelperTool("Eq_Motion_Distance")(randomNums[0],randomNums[1],randomNums[2],randomNums[3]))

console.log('#SPECIALTAG123#ToTest#::physicsHelperTool("Eq_Motion_Velocity")(',
randomNums[4],',',randomNums[5],',',randomNums[6],')::',
physicsHelperTool("Eq_Motion_Velocity")(randomNums[4],randomNums[5],randomNums[6]))

console.log('#SPECIALTAG123#ToTest#::physicsHelperTool("Friction")(',
randomNums[7],',',randomNums[8],')::',
physicsHelperTool("Friction")(randomNums[7],randomNums[8]))

console.log('#SPECIALTAG123#ToTest#::physicsHelperTool("Newtons_second")(',
randomNums[9],',',randomNums[10],')::',
physicsHelperTool("Newtons_second")(randomNums[9],randomNums[10]))
`,


expected: [null, null, null, null],
},
//     {
//       startingCode:
// `
// function checkEmptyArray(arr){
//   if(arr === []){
//     return true
//   }
//   return false
// }
// `,
//
//
//       solutionCode:
// `
// function checkEmptyArray(arr){
//   if(!arr.length){
//     return true
//   }
//   return false
// }
// `,
//
//
//       explanation:
// `
// cannot do arr === [] you IDIOT
// `,
//
//
//       preRunCode:
// `
//
// `,
//
//       prependingCode:
// `
// `,
//
//
//       appendingCode:
// `
// console.log('#SPECIALTAG123#ToTest#::checkEmptyArray([])::', checkEmptyArray([]))
// `,
//
//
//       expected: [null],
//   },



//   { startingCode:
// `
// var foo = 1;
// function bar() {
// 	if (!foo) {
// 		var foo = 10;
// 	}
// 	return foo;
// }
// bar();
// `,
//
//
//     solutionCode:
// `
// var foo = 1;
// returnFirstFoo = function () {
// 	if (!foo) {
// 		var foo = 10;
// 	}
// 	return foo;
// }
// `,
//
//
//     explanation:
// `
// look up hoisting
// `,
//
//
//   preRunCode:
// `
//
// `,
//
//    prependingCode:
// `
// `,
//
//     appendingCode:
// `
//   console.log('#SPECIALTAG123#ToTest#::bar()::', bar())
// `,
//
//
//     expected: [null],
//   },

  { startingCode:
`
//assume contents of groceryList.txt are : 'bok choi: 10 apples: 5 detergent: 1 protein shake: 3'
const groceryListFilePath = '/tmp/groceryList.txt';

function doubleNumbers (str) {
  let stringSplit = str.split(' ');
  let stringSplitNumChanged = stringSplit.map(element => {
    if(!isNaN(element)){
      return element*2;
    }
    return element;
  })
  return stringSplitNumChanged.join(' ');
}

// printStringDoubledNums should take in a filepath, read the file, double all the numbers
// and then console log the new string with doubled numbers
function printStringDoubledNums(filepath){
  // promisifiedReadFile is made available for the purposes of this problem (no need to write it)
  let stringwithDoubledNumbers = doubleNumbers(promisifiedReadFile(filepath));
  console.log(stringwithDoubledNumbers)
}

printStringDoubledNums(groceryListFilePath)
// should console log: 'bok choi: 20 apples: 10 detergent: 2 protein shake: 6'
`,


    solutionCode:
`
const groceryListFilePath = '/tmp/groceryList.txt';
//contents should read: 'bok choi: 10 apples: 5 detergent: 1 protein shake: 3'


function doubleNumbers (str) {
  let stringSplit = str.split(' ');
  let stringSplitNumChanged = stringSplit.map(element => {
    if(!isNaN(element)){
      return element*2;
    }
    return element;
  })
  return stringSplitNumChanged.join(' ');
}

function printStringDoubledNums(filepath){
  return promisifiedReadFile(filepath)
    .then(fileContents => console.log(doubleNumbers(fileContents)))
    .catch(console.error)
}

printStringDoubledNums(groceryListFilePath)
`,


    explanation:
`

`,


  preRunCode:
`
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomNums = [
  randomInt(0,20),
  randomInt(0,20),
  randomInt(0,20),
];

const $SPECIALVAR123$groceryListTestVal = 'potatoes: '+ randomNums[0]+ ' oranges: '+ randomNums[1]+ ' greek yogurt: '+ randomNums[2];

console.log('const $SPECIALVAR123$groceryListTestVal = "'+$SPECIALVAR123$groceryListTestVal+'"')
`,

prependingCode:
`
const promisifiedReadFile = (input) => {
  let asdf;
  try {
    asdf = $SPECIALVAR123$groceryListTestVal
  } finally {
    const fileContentsHash = {
      '/tmp/groceryList.txt': 'bok choi: 10 apples: 5 detergent: 1 protein shake: 3',
      '$SPECIALVAR123$groceryListTestKey': asdf,
    }
    let resolvedValue = fileContentsHash[input];

    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve(resolvedValue)
      },100)
    })
  }
}
`,

    appendingCode:
`
  //doesn't work fuckkkk...


  console.log('#SPECIALTAG123#ToTest#::printStringDoubledNums STDOUT::#asyncBelowFlag#:1')
  console.log('#SPECIALTAG123#ToTest#::printStringDoubledNums STDOUT::#asyncBelowFlag#:2')


setTimeout(()=>{
  console.log('#SPECIALTAG123#asyncBelowFlag#::1')
  printStringDoubledNums('/tmp/groceryList.txt')
}, 200)
setTimeout(()=>{
  console.log('#SPECIALTAG123#asyncBelowFlag#::2')
  printStringDoubledNums('$SPECIALVAR123$groceryListTestKey')
}, 400)
`,


    expected: [null, null],
  },
  { startingCode:
`
function Zipper(list1, list2, name){
  this.name;
  this.list1 = list1;
  this.list2 = list2;
  this.zipped = [];
}

Zipper.prototype.zip = function (){
  this.list1.forEach(function(list1El, idx) {
    this.zipped.push(list1El);
    if (this.list2[idx]) this.zipped.push(this.list2[idx]);
  })
  return this.zipped;
}

var newZip = new Zipper([1,2,3,4,5], ['a','b','c','d'], 'Numbers and Letters');
console.log(newZip.zip()) // should give me [1, 'a', 2, 'b', 3, 'c', 4, 'd', 5]
`,


    solutionCode:
`
function Zipper(list1, list2, name){
  this.name;
  this.list1 = list1;
  this.list2 = list2;
  this.zipped = [];
}

Zipper.prototype.zip = function (){
  this.list1.forEach((list1El, idx) => {
    this.zipped.push(list1El);
    if (this.list2[idx]) this.zipped.push(this.list2[idx]);
  })
  return this.zipped;
}

var newZip = new Zipper([1,2,3,4,5], ['a','b','c','d'], 'Numbers and Letters');
`,


    explanation:
`

`,


  preRunCode:
`

`,

prependingCode:
`
`,

    appendingCode:
`
  console.log('\\n*****************')
  console.log('making a new Zipper instance with args: ')
  console.log('assigning the value of newZip.zip() to variable fruits_and_veggies...')
  newZip = new Zipper(['apples', 'oranges', 'cherries', 'bananas'], ['lettuce', 'bok choi', 'broccoli'], 'fruits and veggies');
  var fruits_and_veggies = newZip.zip()
  console.log('#SPECIALTAG123#ToTest#::fruits_and_veggies.toString()::', fruits_and_veggies.toString())
`,


    expected: [null],
  },

  { startingCode:
  `
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = () => {
  console.log('sup. my name is ', this.name, '\\n');
};

Person.prototype.sayGoodBye = () => {
  console.log('peace \\n')
}

function Student(name, age, major) {
  Person.call(name, age);
  this.major = major;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.constructor = Student;

Student.prototype.sayMajor = () => {
  console.log('I study ', this.major, '\\n')
}

const akshay = new Student('Akshay', 19, 'Computer Science');
akshay.sayHello();//name is undefined??
akshay.sayMajor();//major is undefined??
akshay.sayGoodBye();
  `,


      solutionCode:
  `
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  Person.prototype.sayHello = function(){
    console.log('sup. my name is ', this.name, '\\n');
  };

  Person.prototype.sayGoodBye = function(){
    console.log('peace \\n')
  }

  function Student(name, age, major) {
    Person.call(this, name, age);
    this.major = major;
  }

  Student.prototype = Object.create(Person.prototype);

  Student.prototype.constructor = Student;

  Student.prototype.sayMajor = function(){
    console.log('I study ', this.major, '\\n')
  }

  const akshay = new Student('Akshay', 20, 'Computer Science');
  akshay.sayHello();
  akshay.sayMajor();
  akshay.sayGoodBye();
  `,


      explanation:
  `

  `,


    preRunCode:
  `
  var majors = [
    'Psychology',
    'Computer Science',
    'Literature',
    'Biology',
    'History',
    'Chemistry',
    'Statistics',
    'Economics'
    ];

  var students = [
    'Charles',
    'Nishant',
    'Jacob',
    'Nick',
    'Connie',
    'Gabi',
    'Alex',
    'Ellie',
    'Akshay',
    'Camden',
    'Kevin',
    'Willy',
    'Tim',
    'Ben',
    'Collin'
  ]

  function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var chosenMajor = majors[randomInt(1,majors.length-1)]
  var chosenStudent = students[randomInt(1,students.length-1)]
  var chosenAge = randomInt(18,30)

  console.log('const $SPECIALVAR123$chosenMajor = "'+chosenMajor+'"')
  console.log('const $SPECIALVAR123$chosenStudent = "'+chosenStudent+'"')
  console.log('const $SPECIALVAR123$chosenAge = "'+chosenAge+'"')
  `,

    prependingCode:
  `
  `,

      appendingCode:
  `
  const $SPECIALVAR123$student = new Student($SPECIALVAR123$chosenStudent, $SPECIALVAR123$chosenAge, $SPECIALVAR123$chosenMajor);
  console.log('#SPECIALTAG123#ToTest#::testStudent.sayHello() STDOUT::#asyncBelowFlag#:1')
  console.log('#SPECIALTAG123#ToTest#::testStudent.sayMajor() STDOUT::#asyncBelowFlag#:2')
  console.log('#SPECIALTAG123#ToTest#::testStudent.sayGoodBye() STDOUT::#asyncBelowFlag#:3')
  console.log('#SPECIALTAG123#asyncBelowFlag#::1')
  $SPECIALVAR123$student.sayHello();
  console.log('#SPECIALTAG123#asyncBelowFlag#::2')
  $SPECIALVAR123$student.sayMajor();
  console.log('#SPECIALTAG123#asyncBelowFlag#::3')
  $SPECIALVAR123$student.sayGoodBye();

  `,


      expected: [null],
  },


//empty code template
//   { startingCode:
// `
//
// `,
//
//
//     solutionCode:
// `
//
// `,
//
//
//     explanation:
// `
//
// `,
//
//
//   preRunCode:
// `
//
// `,
//
//   prependingCode:
// `
// `,
//
//     appendingCode:
// `
//
// `,
//
//
//     expected: [null],
//   },

]

export default dbCodes
