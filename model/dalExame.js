const connection = require('./connection')

// retorna os registros conforme o codigo_amostra
const searchWhere = async (id) => {
    const conn = await connection()
    const sql = 'SELECT * FROM resultExame WHERE codigo_amostra = ?'
    const result = await conn.query(sql, id)

    try {
        return result[0]
    } catch (error) {
        return error
    }
}

// retorna os 100 primeiros registros
const searchFull = async () => {
    const conn = await connection()
    const result = await conn.query(
        'SELECT * FROM resultExame ORDER BY id ASC LIMIT 100'
    )

    try {
        return result[0]
    } catch (error) {
        return error
    }
}

// insere um registro
const insertExame = async (values) => {
    const {
        codigo_amostra,
        cocaina,
        anfetamina,
        metanfetamina,
        mda,
        mdma,
        thc,
        morfina,
        codeina,
        heroina,
        benzoilecgonina,
        cocaetileno,
        norcocaina
    } = values

    const conn = await connection()
    const sql = `INSERT IGNORE INTO resultExame (codigo_amostra, cocaina, anfetamina, metanfetamina, mda, mdma, thc, morfina, codeina, heroina, benzoilecgonina, cocaetileno, norcocaina) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);`

    const result = await conn.query(sql, [
        codigo_amostra,
        cocaina,
        anfetamina,
        metanfetamina,
        mda,
        mdma,
        thc,
        morfina,
        codeina,
        heroina,
        benzoilecgonina,
        cocaetileno,
        norcocaina
    ])

    try {
        return result[0]
    } catch (error) {
        return error
    }
}

// faz autenticação do usuário
const authenticate = async (user, password) => {
    const conn = await connection()
    const sql = 'SELECT * FROM users WHERE user = ?'
    const result = await conn.query(sql, user)
    try {
        return result[0][0]
    } catch (error) {
        return error
    }
}

const searchCorte = async () => {
    const conn = await connection()
    const result = await conn.query('SELECT * FROM corte')

    try {
        return result[0]
    } catch (error) {
        return error
    }
}

module.exports = {
    searchWhere,
    searchFull,
    insertExame,
    authenticate,
    searchCorte
}
