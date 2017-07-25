const R = require('ramda')

const addParentsCG = function(adjList) {
  const adjListwithParents = R.clone(adjList)// deep clone
  for (const key in adjList) {
	adjListwithParents[key].parents = adjListwithParents[key].parents || []
    for (const child of adjListwithParents[key].children) {
      if (!adjListwithParents[child].parents) adjListwithParents[child].parents = [key]
      else adjListwithParents[child].parents.push(key)
    }
  }
  return adjListwithParents
}

// let workingtest = { a: { parents: [], children: [ 'b', 'c' ] },
//   b: { parents: [ 'a' ], children: [ 'e', 'd' ] },
//   c: { parents: [ 'a', 'z' ], children: [ 'd', 'f', 'h' ] },
//   e: { parents: [ 'b' ], children: [ 'h' ] },
//   d: { parents: [ 'b', 'c' ], children: [] },
//   f: { parents: [ 'c' ], children: [ 'g' ] },
//   h: { parents: [ 'c', 'e' ], children: [] },
//   g: { parents: [ 'f' ], children: [] },
//   z: { parents: [], children: [ 'c' ] } }
//
// /*
//
//   */
//
// // console.log(addParentsCG(test))

const topologicalSortCG = function(adjListwithParents) {
  adjListwithParents = R.clone(adjListwithParents) // deep clone because you need to use adjListwithParents later
  const sorted = []
  const queue = [] // no incoming edges (no parents)
  for (const vertex in adjListwithParents) { // initialize the queue with root nodes
    if (!adjListwithParents[vertex].parents.length) queue.push(vertex)
  }
  while (queue.length) {
    const currentVertex = queue.shift()
    // console.log('on currentVertex, ', currentVertex, ', which is shifted from the queue ')
    // console.log('queue is now ', queue)
    sorted.push(currentVertex)
    // console.log('sorted array is now ', sorted)
    const currentVertexObj = adjListwithParents[currentVertex]
    // console.log('looking at children of ', currentVertex)
    for (const child of currentVertexObj.children) {
      // console.log('looking at child ', child)
      const childVertexObj = adjListwithParents[child]
      // console.log('parents of ', child, ' is ', childVertexObj.parents)
      childVertexObj.parents.splice(childVertexObj.parents.indexOf(child), 1)// cut off edge -- consider maybe using Objects to store info about parents/children next time maybe?
      // console.log('cut off child ', child, ' connection with parent ', currentVertex)
      // console.log('parents of ', child, ' should now consist of ', childVertexObj.parents)
      if (!childVertexObj.parents.length) {
        // console.log('child ', child, ' no more parents, so pushing to queue')
        queue.push(child)
        // console.log('queue has child added')
        // console.log('queue now looks like ', queue)
      }
    }
  }
  return sorted
}

module.exports = {
  addParentsCG,
  topologicalSortCG,
}

/* ------------------------------------------------------------------------------
addParentsCG... takes composeGraph, something like this:

{
  code1: {
    content: code1content,
    children: ['code2', 'code3']
  },
  code2: {
    content: code2content,
    children: ['code4']
  },
  code3: {
    content: code3content,
    children: []
  },
  code4: {
    content: code3content,
    children: []
  }
}

and turns it into this

{
  code1: {
    content: code1content,
    parents: [],
    children: ['code2', 'code3']
  },
  code2: {
    content: code2content,
    parents: ['code1'],
    children: ['code4']
  },
  code3: {
    content: code3content,
    parents: ['code1'],
    children: []
  },
  code4: {
    content: code3content,
    parents: ['code2'],
    children: []
  }
}

topologicalSortCG... takes a modified composeGraph with parent info
returned from addParentsCG (like above)..
and returns an array of vertices in order of the promises you should run to
make sure everything has their dependencies
e.g.: [code1, code2, code3, code4]

*/
