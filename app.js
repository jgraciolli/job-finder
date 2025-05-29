const express = require('express')
const app = express()
const PORT = 3000
const db = require('./db/connection')

//start server
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

//connect database
db.authenticate()
    .then(console.log('Conectou com sucesso!'))
    .catch(err => {
        console.log('Deu errinhonn')
    })

app.get('/', (req, res) => {
    res.send('Pagina testezaothefatinhon')
})

