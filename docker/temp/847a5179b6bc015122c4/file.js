var num1_1 =  7
var num1_2 =  5
var num1_3 =  11
var num1_4 =  2
var num2_1 =  7
var num2_2 =  2
var num2_3 =  18
var num2_4 =  17
var num2_5 =  8
var num2_6 =  1

  
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
  console.log('#SPECIALTAG123#DONTDISPLAYBELOW#')
  var firstArray = [[num1_1, num1_2],[num1_3,[num1_4]]]
  var secondArray = [[[num2_1, num2_2, num2_3],[num2_4]],[num2_5],num2_6]
  console.log('#SPECIALTAG123#ToTest#::flattenArray(',firstArray ,')::', flattenArray(firstArray))
  console.log('#SPECIALTAG123#ToTest#::flattenArray(',secondArray ,')::', flattenArray(secondArray))
  