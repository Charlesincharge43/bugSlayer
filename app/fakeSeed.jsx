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
  console.log('#SPECIALTAG123#ToTest#::flattenArray(',firstArray ,')::', flattenArray(firstArray))
  console.log('#SPECIALTAG123#ToTest#::flattenArray(',secondArray ,')::', flattenArray(secondArray))
  `,


      expected: [null],
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
//     prependingCode:
// `
//
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
// WHAT IS GOING ON!!? WHY ISNT THIS FREAKING THING WORKING
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


prependingCode:
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


appendingCode:
`
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
console.log(physicsEquation(20, 9.8)) //this is giving me a weird value??
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


prependingCode:
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
//       prependingCode:
// `
//
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
//   prependingCode:
// `
//
// `,
//
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


  prependingCode:
`

`,


    appendingCode:
`
  newZip = new Zipper(['apples', 'oranges', 'cherries', 'bananas'], ['lettuce', 'bok choi', 'broccoli'], 'fruits and veggies');
  var fruits_and_veggies = newZip.zip()
  console.log('#SPECIALTAG123#ToTest#::fruits_and_veggies.toString()::', fruits_and_veggies.toString())
`,


    expected: [null],
  },
//   { startingCode:
// `
// function addFirstToEnd(arr, first, second, third) {
//   var first = arr[0];
//   return arr.push(first)
// }
// `,
//
//
//     solutionCode:
// `
// function addFirstToEnd(arr, first, second, third) {
//   var first = arr[0];
//   return arr.push(first)
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
//   prependingCode:
// `
//
// `,
//
//
//     appendingCode:
// `
//   console.log('#SPECIALTAG123#ToTest#::returnFirstFoo()::', returnFirstFoo())
// `,
//
//
//     expected: [null],
//   }
]

export default dbCodes
