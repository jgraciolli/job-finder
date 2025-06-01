const express = require('express')
const app = express()
const PORT = 3000
const db = require('./db/connection')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const Job = require('./models/Job')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// start server
app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`)
})

// add body-parser tool
app.use(bodyParser.urlencoded({ extended: false }))

// handlebars setup
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main'}))

// static files folder
app.use(express.static(path.join(__dirname, 'public')))

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
    let queryObj = {
        order: [
            ['createdAt', 'DESC']
        ]
    }
       
    let search = req.query.job    
    if (search) {
        queryObj.where = {
            title: {
                [Op.like]: '%' + search + '%'
            }
        }
    }
   
    Job.findAll(queryObj)
    .then((jobs) => {       
        res.render('index', {
            jobs, search
        })        
    })
    .catch(err => console.log(err))    
})

// jobs routes
app.use('/jobs', require('./routes/jobs'))