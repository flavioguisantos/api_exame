const validate = require('../bll/validate')
const IdalExame = require('../model/IdalExame')
const express = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const routes = express.Router()
const { body } = require('express-validator')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const JWTsecret = 'exameFlavioGuilherme'
routes.use('/api', validate.auth)

routes.post('/api/listResult', validate.listResultValidate)

routes.post('/oapi/authenticate', validate.authenticate)

routes.post(
    '/api/resultInsert',
    [
        //validação dos dados
        body('codigo_amostra')
            .notEmpty()
            .withMessage('O campo codigo_amostra é obrigatório'),
        body('codigo_amostra').isLength({ max: 8 }).withMessage('O codigo_amostra aceita no máximo 8 caracteres'),
        body('cocaina').notEmpty().withMessage('O campo cocaina é obrigatório'),
        body('anfetamina')
            .notEmpty()
            .withMessage('O campo anfetamina é obrigatório'),
        body('metanfetamina')
            .notEmpty()
            .withMessage('O campo metanfetamina é obrigatório'),
        body('mda').notEmpty().withMessage('O campo mda é obrigatório'),
        body('mdma').notEmpty().withMessage('O campo mdma é obrigatório'),
        body('thc').notEmpty().withMessage('O campo thc é obrigatório'),
        body('morfina')
            .notEmpty()
            .withMessage('O campo morfiona é obrigatório'),
        body('codeina').notEmpty().withMessage('O campo codeina é obrigatório'),
        body('heroina').notEmpty().withMessage('O campo heroina é obrigatório'),
        body('benzoilecgonina')
            .notEmpty()
            .withMessage('O campo benzoilecgonina é obrigatório'),
        body('cocaetileno')
            .notEmpty()
            .withMessage('O campo cocaetileno é obrigatório'),
        body('norcocaina')
            .notEmpty()
            .withMessage('O campo norcocaina é obrigatório')
    ],
    async (req, res) => {
        // caso encontre erros, ficará nessa variável errors
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        //se os dados forem válidos, o sistema executará aqui
        const result = await validate.processingExame(req.body)
        res.send(result)
    }
)

module.exports = routes
