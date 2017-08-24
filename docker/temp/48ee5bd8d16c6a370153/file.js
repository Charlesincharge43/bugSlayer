
  
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
  