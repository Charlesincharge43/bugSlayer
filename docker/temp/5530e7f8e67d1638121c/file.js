var num1_1 =  6
var num1_2 =  7
var num1_3 =  12
var num1_4 =  3
var num2_1 =  13
var num2_2 =  4
var num2_3 =  10
var num2_4 =  11
var num2_5 =  2
var num2_6 =  3

  
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
  console.log('#SPECIALTAG123#DONTDISPLAYBELOW#')
  var firstArray = [[num1_1, num1_2],[num1_3,[num1_4]]]
  var secondArray = [[[num2_1, num2_2, num2_3],[num2_4]],[num2_5],num2_6]
  console.log('#SPECIALTAG123#ToTest#::flattenArray(',firstArray ,')::', flattenArray(firstArray))
  console.log('#SPECIALTAG123#ToTest#::flattenArray(',secondArray ,')::', flattenArray(secondArray))
  