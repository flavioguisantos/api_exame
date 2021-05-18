const mysql = require('mysql2/promise')
require('dotenv').config()

const connectDB = async () => {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection
    }

    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_HOST_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATA
    })

    try {
        global.connection = connection
        return connection
    } catch (error) {
        console.log('erro ao conectar no MySQL!')
        return error
    }
}

module.exports = connectDB
