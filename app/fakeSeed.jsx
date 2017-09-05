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
