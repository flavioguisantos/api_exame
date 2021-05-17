const connection = require('../model/connection')

test('Verifica se conectou na porta 3306', async () => {
    const conn = await connection()
    expect(conn.config.port).toBe('3306')
    conn.end()
})
