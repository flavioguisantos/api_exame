const db = require('./dalExame')
const bcrypt = require('bcryptjs')

const resultWhere = async (id) => await db.searchWhere(id)

const resultFull = async () => await db.searchFull()

const resultInsert = async (params) => {
    const result = await db.insertExame(params)
    if (result.insertId != 0) {
        return 'success'
    } else {
        return 'fail'
    }
}

const authenticate = async (user, password) => {
    let resultDb = await db.authenticate(user, password)
    const result = resultDb
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
