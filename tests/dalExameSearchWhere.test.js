const db = require('../model/dalExame')

test('Consulta por id', async () => {
    let result = await db.searchWhere('110677')
    expect(result[0]['codigo_amostra']).toBe('110677')
})
