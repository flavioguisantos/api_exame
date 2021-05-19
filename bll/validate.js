const IdalExame = require('../model/IdalExame')
const dalExame = require('../model/dalExame')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
require('dotenv').config()
const JWTsecret = 'exameFlavioGuilherme'

const insertValidate = async (req, res) => {
    const listResult = await IdalExame.resultInsert(params)
    return listResult
}

const listResultValidate = async (req, res) => {
    if (req.body.codigo_amostra) {
        //retorna o registro com base no id
        const codigo_amostra = req.body.codigo_amostra
        const result = await IdalExame.resultWhere(codigo_amostra)
        const resultProcess = await processingSearch(result[0])
        res.send(resultProcess)
    } else {
        // retorna a lista com top 100
        const listResult = await IdalExame.resultFull()
        const resultAll = await processingAllSearch(listResult)
        res.send(resultAll)
    }
}

const processingAllSearch = (listResult) => {
    const promise = listResult.map(async (r) => {
        return new Promise((resolve, reject) => {
            return resolve(processingSearch(r))
        })
    })
    return Promise.all(promise).then((r) => r)
}

const authenticate = async (req, res) => {
    if (req.body.user == undefined || req.body.password == undefined) {
        res.send({
            err: "Parâmetros inválidos, esperado: {user: '', password: ''}"
        })
    } else {
        const resultAuthenticate = await IdalExame.authenticate(
            req.body.user,
            req.body.password
        )
        if (resultAuthenticate.status == 'authenticated') {
            res.send({
                token: jwt.sign(
                    {
                        id: resultAuthenticate.id,
                        user: resultAuthenticate.user
                    },
                    JWTsecret,
                    { expiresIn: process.env.expiresIn }
                )
            })
        } else {
            res.send({ err: 'Credenciais inválidas!' })
        }
    }
}

const validateToken = async (params) => {
    if (params != undefined) {
        const bearer = params.split(' ')
        var token = bearer[1]
        jwt.verify(token, JWTsecret, (err, data) => {
            if (err) {
                resultValidate = 'not authenticate'
            } else {
                resultValidate = 'authenticate'
            }
        })
    } else {
        resultValidate = 'not authenticate'
    }
    return resultValidate
}

const auth = async (req, res, next) => {
    const authToken = req.headers['authorization']
    const result = await validateToken(authToken)
    if (result == 'authenticate') {
        next()
    } else {
        res.status(401).json({ err: 'Token inválido!' })
    }
}

const processingSearch = async (params) => {
    const corte = await dalExame.searchCorte()
    const valueCorte = corte[0]
    let result = {}

    Object.keys(params).map((keyRequest) => {
        Object.keys(valueCorte).map((keyBanco) => {
            if (keyRequest === keyBanco) {
                const maiorQueReferencia =
                    params[keyRequest] >= valueCorte[keyBanco]
                result[keyRequest] = {
                    maiorQueReferencia,
                    valor: params[keyRequest],
                    positivo:
                        keyRequest !== 'cocaina' ? maiorQueReferencia : null
                }
            }
        })
    })

    result.cocaina.positivo =
        result.cocaina.maiorQueReferencia &&
        (result.benzoilecgonina.valor >= valueCorte.benzoilecgonina ||
            result.cocaetileno.valor >= valueCorte.cocaetileno ||
            result.norcocaina.valor >= valueCorte.norcocaina)

    return [params['codigo_amostra'], result]
}

const processingExame = async (req, res) => {
    let result = await IdalExame.resultInsert(req.body)
    if (result == 'success') {
        res.send(await processingSearch(req.body))
    } else {
        res.send({ err: 'Já existe amostra cadastrada com esse código!' })
    }
}

const insertValidationRules = () => {
    return [
        //validação dos dados
        body('codigo_amostra')
            .notEmpty()
            .withMessage('O campo codigo_amostra é obrigatório'),
        body('codigo_amostra')
            .isLength({ max: 8 })
            .withMessage('O codigo_amostra aceita no máximo 8 caracteres'),
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
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors
    })
}

module.exports = {
    insertValidate,
    listResultValidate,
    authenticate,
    validateToken,
    auth,
    processingExame,
    processingSearch,
    insertValidationRules,
    validate
}
