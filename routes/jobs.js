const express = require('express')
const router = express.Router()
const Job = require('../models/Job')

router.get('/getAll', (req, res) => {
    console.log('Found all jobs')
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

router.post('/add/test', (req, res) => {
    console.log(req.body)   
})

module.exports = router