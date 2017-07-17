const dbCodes =
[
    { starting:
`
function checkEmptyArray(arr){
  if(arr === []){
    return true
  }
  return false
}
`,
      solution:
`
function checkEmptyArray(arr){
  if(arr.length){
    return true
  }
  return false
}
`,
      explanation: 'cannot do arr === [] you IDIOT'
  },
  { starting:
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
    solution:
`
var foo = 1;
bar = function () {
	if (!foo) {
		var foo = 10;
	}
	return foo;
}
bar();
`,
    explanation: 'look up hoisting'
  },
]

export default dbCodes
