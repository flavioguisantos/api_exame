const db = require('../model/dalExame')

test('Consulta top 100 registros', async () => {
    let result = await db.searchFull()
    expect(result[0]['codigo_amostra']).toBe('110677')
})
