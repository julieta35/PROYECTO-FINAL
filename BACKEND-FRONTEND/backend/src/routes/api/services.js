const express = require("express");
const router = express.Router();
const async = require("async")

// Load User model
const Service = require("../../models/Service");
const Category = require("../../models/Category")

router.get("/all", (req, res) => {
    Service.find({ Category:  req.query.Category })
    .then(services => {
        res.status(200).json(services)
    })
    .catch(e => console.log(e))
})

router.get("/one/:_id", (req, res) => {
    Service.findOne({ _id:  req.query._id })
    .then(service => {
        res.status(200).json(service)
    })
    .catch(e => console.log(e))
})

router.post('/create', (req, res) => {
    async.waterfall([
        (done) => {
                Service.findOne({ name: req.body.name, Category: req.body.Category })
                .then(service => done(service))
                .catch(e => console.log(e.message))
        },
        (service, done) => {
                if(service){
                    res.sendStatus(400).json({ message: 'the Service already exist!' })
                    done(null)
                } else {
                    // Categ
                    const newService = new Service({
                        name: req.body.name, 
                        prize: req.body.prize, 
                        city: req.body.city, 
                        Category: req.body.Category  
                    });

                    done(newService)
                
                }   

               
        },
        (newService, done) => {
            Category.findOne({ _id: newService.Category })
            .then(category => {
                if(category.Service.length != 0){
                    let verify = category.Service.find(item => item === newService._id.toString())

                    if(verify){
                        Category.findOneAndUpdate(newService.Category, { $push: { "Service" : newService._id } }, { new :true }).exec()
                        done(newService)
                    } else {
                        done(null)
                    }
                } else {
                    Category.findOneAndUpdate(newService.Category, { $push: { "Service" : newService._id } }, { new :true }).exec()

                    done(newService)
                }
                
            })
            .catch(e => console.log(e.message))
        },
        (newService, done) => {
            newService
                .save()
                .then(service => res.json(service))
                .catch(err => console.log(err));
        }
    ], (err) => {
     if(err) throw err;
     res.sendStatus(200).json({ message: 'The service was created' })
    })
    
})

router.post('/delete/:_id', (req, res) => {
    Service.deleteOne({ _id: req.params._id })
    .then(service => {
        res.send(200).json({ message: 'the service was delete' })
    })
})

module.exports = router;