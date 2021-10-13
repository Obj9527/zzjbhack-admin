const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const table = require('./table')
const article = require('./article')

const mocks = [
  ...user,
  ...table,
  ...article
]

module.exports = {
  mocks,
}

