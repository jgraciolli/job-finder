const express = require('express')
const router = express.Router()
const Job = require('../models/Job')

router.get('/add', (req, res) => {
    res.render('add')
})

router.post('/add', (req, res) => {
    console.log(req.body)
    let {title, description, salary, company, email, new_job} = req.body
    console.log({title, description, salary, company, email, new_job})

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

router.get('/view/:id', (req, res) => {
    res.render('view')
})

module.exports = router