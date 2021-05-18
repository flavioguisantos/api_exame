const validate = require('../bll/validate')
const express = require('express')
const routes = express.Router()
routes.use('/api', validate.auth)

routes.post('/api/listResult', validate.listResultValidate)

routes.post('/oapi/authenticate', validate.authenticate)

routes.post(
    '/api/resultInsert',
    validate.insertValidationRules(),
    validate.validate,
    validate.processingExame
)

module.exports = routes
