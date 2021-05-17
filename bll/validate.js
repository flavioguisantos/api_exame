const IdalExame = require('../model/IdalExame')
const dalExame = require('../model/dalExame')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWTsecret = 'exameFlavioGuilherme'
const { body } = require('express-validator')
const { validationResult } = require('express-validator')

async function insertValidate(req, res) {
    console.log(params)

    const listResult = await IdalExame.resultInsert(params)
    return listResult
}

async function listResultValidate(req, res) {
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

async function authenticate(req, res) {
    if (req.body.user == undefined || req.body.password == undefined) {
        res.send({
            err: "Parametros inválidos, esperado: {user: '', password: ''}"
        })
    } else {
        const resultAuthenticate = await IdalExame.authenticate(
            req.body.user,
            req.body.password
        )
        if (resultAuthenticate.status == 'authenticated') {
            res.send({
                token: await jwt.sign(
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

async function validateToken(params) {
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

async function auth(req, res, next) {
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

const processingExame = async (params) => {
    await IdalExame.resultInsert(params)
    return processingSearch(params)
}

module.exports = {
    insertValidate,
    listResultValidate,
    authenticate,
    validateToken,
    auth,
    processingExame,
    processingSearch
}
