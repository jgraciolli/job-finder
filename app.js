const express = require('express')
const app = express()
const PORT = 3000
const db = require('./db/connection')
const bodyParser = require('body-parser')

// start server
app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`)
})

// add body-parser tool
app.use(bodyParser.urlencoded({ extended: false }))

// connect database
db.authenticate()
    .then(() => {
        console.log('Connected to the database')
    })
    .catch(err => {
        console.log(`Error when connecting to the database: ${err.message}`)
    })

// ---ROUTES SECTION---

// main route
app.get('/', (req, res) => {
    res.send('Main page')
})

// jobs routes
app.use('/jobs', require('./routes/jobs'))