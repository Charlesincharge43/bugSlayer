const arr = require('../docker/compilers')
const {resolve} = require('path')
const DockerSandbox = require('./DockerSandbox');

module.exports = function runSandBox({code, file_name = arr.compilerArray[language][1], language = 4, files}) {//js default: file.js
  function random(size) {
    // returns a crypto-safe random
    return require("crypto").randomBytes(size).toString('hex')
  }

  // details of this are present in DockerSandbox.js
  let options = {
    timeout_value: 20,
    path: resolve(__dirname, '../docker') + '/', // current working path
    folder: 'temp/' + random(10), // folder in which the temporary folder will be saved
    vm_name: 'bug_slayer_docker_img', // name of virtual machine that we want to execute
    compiler_name: arr.compilerArray[language][0],
    file_name: file_name,
    code,
    files,
    output_command: arr.compilerArray[language][2],
    languageName: arr.compilerArray[language][3],
    e_arguments: arr.compilerArray[language][4],
    stdin_data: '',
  }

  // console.log('code for sandbox ',code)

  // everything written in the sandbox library is non-promise async, so it needs to be promisified
  function promisifiedRunSandBox(options) {
    const sandboxInst = new DockerSandbox(options)
    return new Promise(function(resolve, reject) {
      // data will contain the output of the compiled/interpreted code
      // the result maybe normal program output, list of error messages or a Timeout error
      sandboxInst.run(function(data, exec_time, err) {
        console.log('****data is ', data)
        return resolve({output: data, langid: language, code, errors: err, time: exec_time})
      })
    })
  }

  return promisifiedRunSandBox(options)
}
