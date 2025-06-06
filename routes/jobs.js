const express = require('express')
const router = express.Router()
const Job = require('../models/Job')

router.get('/view/:id', (req, res) => { 
    const id = req.params.id

    Job.findByPk(id)
    .then((job) => {    
        res.render('view', {job})
    })
    .catch(err => console.log(err))
})

router.get('/add', (req, res) => {
    res.render('add')
})

router.post('/add', (req, res) => {  
    let {title, description, salary, company, email, new_job} = req.body

    Job.create({
        title, 
        description, 
        salary, 
        company, 
        email, 
        new_job
    })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

module.exports = router