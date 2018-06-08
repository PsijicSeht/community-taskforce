const express = require('express')
const router = express.Router({ mergeParams: true })
const City = require('../models/City')
const Issue = require('../models/Issue')




router.get('/', (req,res, next)=>{
    City.findOne({name:req.params.cityName})
    .then((city)=>{
        const cityName = city.name
        const issues = city.issues
        res.render('issues/index', 
        {
            issues:issues,
            cityName: cityName
        })
    })
})



router.get('/new', (req,res)=>{
    cityName = req.params.cityName
    res.render('issues/new',{cityName})
})

router.post('/', (req,res)=>{
    newIssue = new Issue(req.body)
    cityName = req.params.cityName
    City.findOne({name:cityName})
    .then((city)=>{
        city.issues.push(newIssue)
        return city.save()
    })
    .then(()=>{
        res.redirect(`/cities/${cityName}/issues`)
    })
})

router.get('/:issue', (req,res)=>{
    City.findOne({name:req.params.cityName})
    .then((city)=>{
       issueIndex = req.params.issue
       issue = city.issues[issueIndex]
       res.render(`issues/show`,{issue})
    })
})

router.get('/:issue/edit', (req,res)=>{
    cityName = req.params.cityName
    City.findOne({name:req.params.cityName})
    .then((city)=>{
       issueIndex = req.params.issue
       issue = city.issues[issueIndex]
       res.render(`issues/edit`,{issue, cityName,issueIndex})
    })
})

router.put('/:issue/', (req,res)=>{
    const cityName = req.params.cityName
    const issueIndex = req.params.issue
    City.findOne({name:req.params.cityName})
    .then((city)=>{
       
    //    let  issue = city.issues[issueIndex]
        city.issues[issueIndex] = req.body

       console.log(issueIndex)
       console.log(city.issues)
       console.log(issue)
    //    console.log(city)
    //    console.log(req.body)
    //    console.log(issue._id)
       return city.save()

    })
    .then((saved)=>{
        console.log(saved)
        res.redirect(`/cities/${cityName}/issues/${issueIndex}`)
    })
    .catch((err)=>{
        console.log(err, "Error")
    })
})
module.exports=router