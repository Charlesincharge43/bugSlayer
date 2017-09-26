// WHEN YOU GET BCK TO THIS:
// INCLUDE THIS CODE:   .. this is a function that makes an array of words and their indices given a string
// bug like this is due to immutability.  Easy to fix.. just make a new object.. don't refer
// to the uninitWord one .. that'l just be the same one each time
//
// const makeWordsArr = function(text){
//   const uninitWord = {idx: undefined, word: ''}
//   const wordsArr = [uninitWord]
//   for (let i = 0; i < text.length; i++){
//     const lastWord = wordsArr[wordsArr.length - 1]
//     if (text[i] === ' '){
//       if (lastWord.idx){
//         wordsArr.push(uninitWord)
//       }
//     } else {
//       if (!lastWord.idx) {
//         lastWord.idx = i
//       }
//       lastWord.word = lastWord.word.concat(text[i])
//     }
//   }
//   return wordsArr
// }
//
// makeWordsArr('   I love  coding  ')

const dbCodes =
[
  {
    singleFile: true, // determine if you actually see anyhting related to the fs..
    entry: {
      run: ,
      test:
    },
    files: {
      "path": "test",
      "name": "test",
      "type": "directory",
      "children": [
        {
          "path": "test/code.js",
          "name": "code.js",
          "type": "file",
          "content": `console.log('hello world')`,
          "extension": ".js"
        },
        {
          "path": "test/code.test.js",
          "name": "code.test.js",
          "type": "file",
          "content": `console.log('hello world')`,
          "extension": ".js"
        },
      ]
    },
    filesSol: {
      //dont worry about this for now
    },
    explanation: ``
  },
]

export default dbCodes
