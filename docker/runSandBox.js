const arr = require('../docker/compilers')
const {resolve} = require('path')
const DockerSandbox = require('./DockerSandbox');

module.exports = function runSandBox({code, language = 4, stdin = '', timeout_value = 20}) {
  function random(size) {
    // returns a crypto-safe random
    return require("crypto").randomBytes(size).toString('hex')
  }
  let folder = 'temp/' + random(10) // folder in which the temporary folder will be saved
  let path = resolve(__dirname, '../docker') + '/' // current working path
  let vm_name = 'bug_slayer_docker_img' // name of virtual machine that we want to execute

  // details of this are present in DockerSandbox.js
  let sandboxInst = new DockerSandbox(
    timeout_value,
    path,
    folder,
    vm_name,
    arr.compilerArray[language][0],
    arr.compilerArray[language][1],
    code,
    arr.compilerArray[language][2],
    arr.compilerArray[language][3],
    arr.compilerArray[language][4],
    stdin)

  // everything written in the sandbox library is non-promise async, so it needs to be promisified
  function promisifiedRunSandBox() {
      return new Promise(function (resolve, reject) {
        // data will contain the output of the compiled/interpreted code
        // the result maybe normal program output, list of error messages or a Timeout error
          sandboxInst.run(function(data, exec_time, err) {
            return resolve({output:data, langid: language, code:code, errors:err, time:exec_time})
          })
      })
  }
  return promisifiedRunSandBox()
}
