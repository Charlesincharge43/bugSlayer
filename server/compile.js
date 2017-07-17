'use strict'

const db = require('APP/db')
const {resolve} = require('path')
const arr = require('../docker/compilers');
const sandBox = require('../docker/DockerSandbox');

module.exports = require('express').Router()
  .post('/',
    (req, res, next) =>
    {
      function random(size) {
          //returns a crypto-safe random
          return require("crypto").randomBytes(size).toString('hex')
      }

      // console.log('compile route', sandBox)
      req.body.language = 4 //javascript
      req.body.stdin = ''
      let language = req.body.language;
      let code = req.body.code;
      let stdin = req.body.stdin;

      // console.log('in compile post route... this is the code from user: ', code)

      let folder = 'temp/' + random(10); //folder in which the temporary folder will be saved
      let path = resolve(__dirname, '../docker') + '/'; //current working path
      let vm_name = 'virtual_machine'; //name of virtual machine that we want to execute
      let timeout_value = 20;//Timeout Value, In Seconds

      //details of this are present in DockerSandbox.js
      let sandboxType = new sandBox(timeout_value,path,folder,vm_name,arr.compilerArray[language][0],arr.compilerArray[language][1],code,arr.compilerArray[language][2],arr.compilerArray[language][3],arr.compilerArray[language][4],stdin);


      //data will contain the output of the compiled/interpreted code
      //the result maybe normal program output, list of error messages or a Timeout error
      sandboxType.run(function(data,exec_time,err)
      {
          console.log("************* Data: received: "+ data, 'Error: ',err)
        res.send({output:data, langid: language,code:code, errors:err, time:exec_time});
      });
    })
