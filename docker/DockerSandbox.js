/*
        *File: DockerSandbox.js
        *Author: Osman Ali Mian/Asad Memon
        *Created: 3rd June 2014
        *Revised on: 25th June 2014 (Added folder mount permission and changed executing user to nobody using -u argument)
        *Revised on: 30th June 2014 (Changed the way errors are logged on console, added language name into error messages)
*/
const exec = require('child_process').exec
const fs = require('fs')
const utils = require('./utils')
const promisifiedExec = utils.promisifiedExec
const promisifiedWriteFile = utils.promisifiedWriteFile
const promisifiedReadFile = utils.promisifiedReadFile
const mkDirFromDirTree = utils.mkDirFromDirTree
const writeFilesFromDirTree = utils.writeFilesFromDirTree
const prependPaths = utils.prependPaths
const throwErr = utils.throwErr

/**
         * @Constructor
         * @variable DockerSandbox
         * @description This constructor stores all the arguments needed to prepare and execute a Docker Sandbox
         * @param {Number} timeout_value: The Time_out limit for code execution in Docker
         * @param {String} path: The current working directory where the current API folder is kept
         * @param {String} folder: The name of the folder that would be mounted/shared with Docker container, this will be concatenated with path
         * @param {String} vm_name: The TAG of the Docker VM that we wish to execute
         * @param {String} compiler_name: The compiler/interpretor to use for carrying out the translation
         * @param {String} file_name: The file_name to which source code will be written
         * @param {String} code: The actual code
         * @param {String} output_command: Used in case of compilers only, to execute the object code, send " " in case of interpretors
*/
var DockerSandbox = function({timeout_value, path, folder, vm_name, compiler_name, file_name, code, output_command, languageName, e_arguments, stdin_data, files = {}, entryFile}) {
  this.timeout_value= timeout_value
  this.path= path
  this.folder= folder
  this.vm_name= vm_name
  this.compiler_name= compiler_name
  this.file_name= file_name // for cases when there are multiple files, this will be treated as the entrypoint (node <file_name>.js) *can be actual path inside the containerMntPath
  this.code = code
  this.files = files // for the optional runOne (specific file) method .. should look like {'index.js':{code: '//code', path: '/app'}, 'index.test.js':{code: '//code', path: '/app'}}
  this.output_command= output_command
  this.langName= languageName
  this.extra_arguments= e_arguments
  this.stdin_data= stdin_data
}

/**
         * @function
         * @name DockerSandbox.run
         * @description Function that first prepares the Docker environment and then executes the Docker sandbox
         * @param {Function pointer} success ?????
*/
DockerSandbox.prototype.run = function(success) {
  this.prepare()
    .then(() => this.execute(success))
    .catch(console.error)
}

DockerSandbox.prototype.runOne = function(success) { // test run.. delete later!
  // const test =
  // {
  //         "path": "app",
  //         "name": "app",
  //         "type": "directory",
  //         "children": [
  //           {
  //             "path": "app/index.js",
  //             "name": "index.js",
  //             "type": "file",
  //             "content": `console.log('hello world')`,
  //             "extension": ".js"
  //           },
  //           {
  //             "path": "app/asdf",
  //             "name": "asdf",
  //             "type": "directory",
  //           },
  //         ]
  // }
  // this.file_name = 'app/index.js'
  this.prepareDirTree()
    .then(() => this.execute(success))
    .catch(console.error)
}

/*
         * @function
         * @name DockerSandbox.prepare
         * @description Function that creates a directory with the folder name already provided through constructor
         * and then copies contents of folder named Payload to the created folder, this newly created folder will be mounted
         * on the Docker Container. A file with the name specified in file_name variable of this class is created and all the
         * code written in 'code' variable of this class is copied into this file.
         * Summary: This function produces a folder that contains the source file and 2 scripts, this folder is mounted to our
         * Docker container when we run it.
         * @param {Function pointer} success ?????
*/
DockerSandbox.prototype.prepare = function() {
  const containerMntPath = this.path + this.folder
  const makeTempDirSt = 'mkdir ' + containerMntPath
  const copyPayloadSt = `cp ${this.path}/Payload/* ${containerMntPath}`
  const chmod777dirSt = 'chmod 777 ' + containerMntPath
  const allSt = makeTempDirSt + ' && ' + copyPayloadSt + ' && ' + chmod777dirSt
  const userCodefilePath = containerMntPath + '/' + this.file_name
  const inputFilePath = containerMntPath + '/inputFile'
  const chmod777St = `chmod 777 \'${containerMntPath}/${this.file_name}\'`

  return promisifiedExec(allSt)
    .then(() => promisifiedWriteFile(userCodefilePath, this.code))
    .then(() => {
      console.log(this.langName+' file was saved!')
      exec(chmod777St)
      return promisifiedWriteFile(inputFilePath, this.stdin_data)
    }, throwErr)
    .then(() => {
      console.log('Input file was saved!')
    }, throwErr)
    .catch(throwErr)
}

/*
         * @function
         * @name DockerSandbox.execute
         * @precondition: DockerSandbox.prepare() has successfully completed
         * @description: This function takes the newly created folder prepared by DockerSandbox.prepare() and spawns a Docker container
         * with the folder mounted inside the container with the name '/usercode/' and calls the script.sh file present in that folder
         * to carry out the compilation. The Sandbox is spawned ASYNCHRONOUSLY and is supervised for a timeout limit specified in timeout_limit
         * variable in this class. This function keeps checking for the file "Completed" until the file is created by script.sh or the timeout occurs
         * In case of timeout an error message is returned back, otherwise the contents of the file (which could be the program output or log of
         * compilation error) is returned. In the end the function deletes the temporary folder and exits
         *
         * Summary: Run the Docker container and execute script.sh inside it. Return the output generated and delete the mounted folder
         *
         * @param {Function pointer} success ?????
*/

DockerSandbox.prototype.execute = function(success) {
  let myC = 0 // variable to enforce the timeout_value
  const rmDir = function(intid) { // remove the temporary directory
    console.log('ATTEMPTING TO REMOVE: ' + this.folder + '\n------------------------------')
    exec('rm -r ' + this.folder)
    clearInterval(intid)
  }
  const containerMntPath = this.path + this.folder
  // this statement is what is executed (to run user's code)
  const st = this.path+'DockerTimeout.sh ' + this.timeout_value + 's -u mysql -e \'NODE_PATH=/usr/local/lib/node_modules\' -i -t -v  "' + containerMntPath + '":/usercode ' + this.vm_name + ' /usercode/script.sh ' + this.compiler_name + ' ' + this.file_name + ' ' + this.output_command+ ' ' + this.extra_arguments
  // this is path for the completed output file (if user code executed successfully... although completed file should appear if an error was thrown as well)
  const completedPath = containerMntPath + '/completed'
  // this is path for error output file (if user code threw an error)
  const errPath = containerMntPath + '/errors'
  // this is partial output
  const logPath = containerMntPath + '/logfile.txt'

  // log the statement in console
  console.log(st)
  // console.log('the path is: ', this.path)
  // console.log('the folder is: ', this.folder)

  // execute the Docker, This is done ASYNCHRONOUSLY.. so need the setInterval (cant do then.. because it may be infinite loop)
  exec(st)

  console.log('------------------------------')
  const intid = setInterval(() => { // Check For File named 'completed' after every 1 second
    // Displaying the checking message after 1 second interval, testing purposes only
    console.log('Checking ' + containerMntPath + ': for completion: ' + myC)
    myC = myC + 1

    promisifiedReadFile(completedPath, 'utf8')
      .then(data => {
        if (myC > this.timeout_value) { // Since the time is up, we take the partial output and return it.
          throwErr('partial')
        } else { // this is case for when output file is found (success!)
          console.log('******************  DONE ... OUTPUT FOUND')
          return promisifiedReadFile(errPath, 'utf8')
            .then(errOutput => {
              const lines = data.toString().split('*-COMPILEBOX::ENDOFOUTPUT-*')
              const output = lines[0]
              const time = lines[1]
              console.log('****Main file: \n', output, '\n****Error file: \n', errOutput)
              success(output, time, errOutput)
              rmDir(intid) // remove directory and clear interval
            })
            .catch(console.error)
        }
      }, () => { // error cb represents if no file found
        if (myC > this.timeout_value) { // Since the time is up, we take the partial output and return it.
          throwErr('partial')
        }// otherwise, do nothing
      })
      .catch(err => {
        rmDir(intid) // remove directory and clear interval
        if (err.message.match('partial')) {
          return promisifiedReadFile(logPath, 'utf8')
            .then(logdata => {
              logdata = logdata || ''
              logdata += '\nExecution Timed Out'
              // console.log('Timed Out: '+this.folder+' '+this.langName)
              return promisifiedReadFile(errPath, 'utf8')
                .then(errOutput => {
                  const lines = logdata.toString().split('*---*')
                  const output = lines[0]
                  const time = lines[1]
                  // console.log('Time: ', time)
                  success(output, time, errOutput)
                })
                .catch(throwErr)
            })
            .catch(throwErr)
        } else {
          console.log('****Warning.. should NOT be entering this block (if entered, something really messed up happened).. \n'+err)
          throwErr(err)
        }
      })
  }, 500)
}

DockerSandbox.prototype.prepareDirTree = function() {
  const dirTree = this.files
  const containerMntPath = this.path + this.folder
  const makeTempDirSt = 'mkdir ' + containerMntPath
  const copyPayloadSt = `cp ${this.path}/Payload/* ${containerMntPath}`
  const chmod777dirSt = 'chmod 777 ' + containerMntPath
  const allSt = makeTempDirSt + ' && ' + copyPayloadSt + ' && ' + chmod777dirSt

  const userCodefilePath = containerMntPath + '/' + this.file_name
  const chmod777St = `chmod 777 \'${containerMntPath}/${this.file_name}\'`
  const inputFilePath = containerMntPath + '/inputFile'
  prependPaths(dirTree, containerMntPath) // this MUTATES the dirTree so all paths are prepended with containerMntPath
  return promisifiedExec(allSt)
    .then(() => {
      return mkDirFromDirTree(dirTree)
    })
    .then(() => writeFilesFromDirTree(dirTree))
    .then(() => {
      console.log(this.langName+' file was saved!')
      exec(chmod777St)
      return promisifiedWriteFile(inputFilePath, this.stdin_data)
    }, throwErr)
    .then(() => {
      console.log('Input file was saved!')
    }, throwErr)
    .catch(throwErr)
}

module.exports = DockerSandbox
