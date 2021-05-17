const express = require('express')
const cors = require('cors')
const routes = require('./controllers/routes')
const app = express()

app.use(express.urlencoded({ extended: false }))

app.use(express.json())
app.use(cors())
app.use(routes)

//app.listen(3000, () => {
//    console.log('Express started at http://localhost:3000/')
//})

var port_number = app.listen(process.env.PORT || 3000);
app.listen(port_number, () => {
    console.log('Express started at  ' + process.env.IP + ':' + port_number)
})

