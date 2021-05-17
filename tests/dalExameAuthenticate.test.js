const db = require("../model/dalExame")

test('faz autenticação do usuário', async () => {
    let result = await db.authenticate("110677", "110677")
    let user =  result[0]["user"]
    expect(user).toBe("110677")
})