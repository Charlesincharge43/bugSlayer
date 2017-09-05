const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')

const promisifiedExec = function(input) {
  return new Promise((resolve, reject) => {
    exec(input, function(st, err) {
      if (err) reject(err)
      resolve(st)
    })
  })
}

const promisifiedWriteFile = function(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const promisifiedReadFile = function(path, utf) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, utf, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const throwErr = function(err) {
  if (typeof err === 'string') throw new Error(err)
  else if (typeof err === 'object') throw new Error(err.message)
}

const makeStFromDirTree = function(dirTree, start = true) {
  let st = ''
  const currentNode = dirTree // just to remind you dirTree technically is a *node* not the entire tree
  if (dirTree.type === 'directory') {
    if (!start) {
      st += ' && '
    }
    st += `mkdir ${dirTree.path}`
    if (dirTree.children && dirTree.children.length) {
      for (const childNode of dirTree.children) {
        st += makeStFromDirTree(childNode, false)
      }
    }
  }
  return st
}

const mkDirFromDirTree = function(dirTree) {
  const allSt = makeStFromDirTree(dirTree)
  return promisifiedExec(allSt)
}

const writeFilesFromDirTree = async function(dirTree) {
  if (dirTree.type === 'file' && dirTree.extension === '.js') {
    await promisifiedWriteFile(dirTree.path, dirTree.content)
  }
  if (dirTree.children && dirTree.children.length) {
    for (const childNode of dirTree.children) {
      await writeFilesFromDirTree(childNode)
    }
  }
}

const prependPaths = function(dirTree, prepend) { // this function is MUTATING
  const currentNode = dirTree
  dirTree.path = path.resolve(prepend, dirTree.path)
  if (dirTree.children && dirTree.children.length) {
    for (const childNode of dirTree.children) {
      prependPaths(childNode, prepend)
    }
  }
}

// this is an example object to pass in to makeStFromDirTree:
//
// {
//         "path": "app/server",
//         "name": "server",
//         "type": "directory",
//         "children": [
//           {
//             "path": "app/server/index.js",
//             "name": "index.js",
//             "type": "file",
//             "content": `console.log('hello world')`,
//             "extension": ".js"
//           },
//           {
//             "path": "app/server/asdf",
//             "name": "asdf",
//             "type": "directory",
//           },
//         ]
// }
//
// should return the following string: 'mkdir app/server && mkdir app/server/asdf'

module.exports = {
  promisifiedExec,
  promisifiedWriteFile,
  promisifiedReadFile,
  throwErr,
  mkDirFromDirTree,
  writeFilesFromDirTree,
  prependPaths,
}
