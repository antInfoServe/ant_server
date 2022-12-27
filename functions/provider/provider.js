const { orgServiceFactory } = require('../service/orgService')
const { schemaValidatorFactory } = require('../utils/schemaValidator')
const { apiErrorFactory } = require('../utils/apiError')
const { orgRepoFactory } = require('../repository/orgRepo')
const { getAuth, db, Timestamp } = require('../utils/firebase')
const { loggerFactory } = require('../utils/logger')
const { userServiceFactory } = require('../service/userService')
const { orgSchema } = require('../schema/orgSchema/orgSchema')
const { configSchema } = require('../schema/orgSchema/configSchema')
const { templateSchema } = require('../schema/orgSchema/templateSchema')

const Ajv = require('ajv')
const Container = require('../utils/container')
const { ControllerFactory } = require('../controller/controller')

const c = new Container()

const ajv = new Ajv({ allErrors: true })
require("ajv-formats")(ajv, ['email', 'uri'])
require("ajv-errors")(ajv)



c.setFactory('orgService', orgServiceFactory)
c.setFactory('schemaValidator', schemaValidatorFactory)
c.setFactory('apiError', apiErrorFactory)
c.setFactory('logger', loggerFactory)
c.setFactory('orgRepo', orgRepoFactory)
c.setFactory('userService', userServiceFactory)
c.setSchema('orgSchema', orgSchema)
c.setSchema('configSchema', configSchema)
c.setSchema('templateSchema', templateSchema)
c.setModule('getAuth', getAuth)
c.setModule('db', db)
c.setModule('Timestamp', Timestamp)
c.setModule('ajv', ajv)

const controller = ControllerFactory(c.getContainer())

module.exports = {
    controller
}