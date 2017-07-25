const runSandBox = require('../docker/runSandBox')
const tpSort = require('../utils/topologicalSort')
const R = require('ramda')

// work on this later!

module.exports = function composeSandBox(composeGraph) { // see comments at bottom of the page to see how this works

  composeGraph = { a: { content: 'console.log("a poo")', children: [ 'b', 'c' ] }, //take this out eventually
    b: { content: 'console.log("b poo")', children: [ 'e', 'd' ] },
    c: { content: 'console.log("c poo")', children: [ 'd', 'f', 'h' ] },
    e: { content: 'console.log("e poo")', children: [ 'h' ] },
    d: { content: 'console.log("d poo")', children: [] },
    f: { content: 'console.log("f poo")', children: [ 'g' ] },
    h: { content: 'console.log("h poo")', children: [] },
    g: { content: 'console.log("g poo")', children: [] },
    z: { content: 'console.log("z poo")', children: [ 'c' ] } }

  const graphWithParents = tpSort.addParentsCG(composeGraph)// regular composeGraph with no parent info at each vertex
  console.log(graphWithParents)
  const sortedVertices = tpSort.topologicalSortCG(graphWithParents)// composeGraph with parents info at each vertex
  console.log(sortedVertices)

  function compileInOrder(sortedVerticesArr) {
    const queue = sortedVerticesArr
    const graphWithParentPromises = R.clone(composeGraph)// composeGraph this time with parents that are promises
    for(const key in graphWithParentPromises){
      graphWithParentPromises[key].parents = []
    }    // initialize it by making all parents empty arrays (promises will be pushed into them as each node is being
        // run in the queue)
    // console.log('graphWithParentPromises ',graphWithParentPromises)
    while (queue.length) {
      const currentVertex = queue.shift()
      const currentVertexObj = graphWithParentPromises[currentVertex]
      // console.log('current Vertex object ', currentVertexObj)
      // if (currentVertexObj.parents.length) {
      //   // console.log('in parent block')
      //   const parentsPromises = currentVertexObj.parents.map(parentVertex => {
      //     const parentVertexObj = graphWithParents[parentVertex]
      //     // console.log('parentVertexObj ', parentVertexObj)
      //     // console.log('parent content ', currentVertexObj.content)
      //     return runSandBox({code: parentVertexObj.content })
      //   })

        const parentsPromises = currentVertexObj.parents// basically this assumes all parents are promises that have been passed down already
        //the topologically sorted queue will ensure that children will never run before their parents
        //have been converted from an array of strings ['a','b'] to an array of promises [a promise, b promise]
        console.log('parentsPromises ',parentsPromises)
        Promise.all(parentsPromises)
          .then(resolvedArr => {
            console.log('resolvedArr ',resolvedArr)
            const prependedContent = resolvedArr.map(outputObj => outputObj ? outputObj.output : '').join('\n')
            console.log('prependedContent is ', prependedContent)
            const currentVertexPromise = runSandBox({code: prependedContent+currentVertexObj.content })
            for (const child of currentVertexObj.children) {
              child.parents.push(currentVertexPromise)
            }
          })
          .catch(console.error)
      }
    }
    // const vertexObj = composeGraph[vertex]
    // if(!vertexObj.children.length) { // base case
    //   return runSandBox(vertexObj.content)
    //     .then(resolved => ({[vertexObj.key] : resolved }))
    //     .catch(console.error)
    // }
    // else {
    //   for (let child of vertexObj.children) {
    //     return runSandBox(prependedContent+vertexObj.content)
    //     .then(resolved => {
    //       return composeSandBox(child, )
    //     })
    //     .catch(console.error)
    //
    //   }
    // }
  compileInOrder(sortedVertices)

  // return compileTraverse(workingtest)

  // let sandBoxPromise = runSandBox({code})
  // sandBoxPromise.then(resolved => res.json(resolved))
}

// composeGraph looks something like this:
// {
//   code1: {
//     key: 'code1',
//     content: code1content,
//     parents: [],
//     children: ['code2', 'code3']
//   },
//   code2: {
//     key: 'code2',
//     content: code2content,
//     parents: ['code1'],
//     children: ['code4']
//   },
//   code3: {
//     key: 'code3',
//     content: code3content,
//     parents: ['code1'],
//     children: []
//   },
//   code4: {
//     key: 'code4',
//     content: code3content,
//     parents: ['code2'],
//     children: []
//   }
// }
// the sandbox output of a parent vertex's code content (remember outputs are simply stdout/console logs)
// gets prepended to its child vertices' code content, which in turns gets compiled in a docker sandbox.
// (but it only gets compiled when all parent code outputs have been prepended)
// Only leaf vertices with no children will have their outputs saved in the return object
// One node may have multiple children! (but there is no ordering in terms of which prepended code runs first)
