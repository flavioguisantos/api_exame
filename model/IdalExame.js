const db = require('./dalExame')
const bcrypt = require('bcryptjs')

async function resultWhere(id) {
    let result = await db.searchWhere(id)
    return result
}

async function resultFull() {
    let result = await db.searchFull()
    return result
}

async function resultInsert(params) {
    const result = await db.insertExame(params)
    if (result && result.affectedRows) {
        return params
    } else {
        return null
    }
}

async function authenticate(user, password) {
    let resultDb = await db.authenticate(user, password)
    const result = resultDb[0]
    if (result) {
        var correct = bcrypt.compareSync(password, result.password)
        if (correct) {
            resultAuthenticate = {
                status: 'authenticated',
                id: result.id,
                user: result.user
            }
        } else {
            resultAuthenticate = {
                status: 'not authenticated'
            }
        }
    } else {
        resultAuthenticate = {
            status: 'not authenticated'
        }
    }
    try {
        return resultAuthenticate
    } catch (error) {
        return error
    }
}

module.exports = { resultWhere, resultFull, resultInsert, authenticate }
