const {TEXT, ARRAY} = require('sequelize')

module.exports = db => db.define('problems', {
  starting: TEXT,
  appending: TEXT,
  solution: TEXT,
  explanation: TEXT,
  tags: ARRAY(TEXT),
})
