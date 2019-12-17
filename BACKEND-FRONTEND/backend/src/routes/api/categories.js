const express = require("express");
const router = express.Router();

// Load User model
const Category = require("../../models/Category");


router.get("/all", (req, res) => {
    Category.find()
    .then(categories => {
        res.status(200).json(categories)
    })
    .catch(e => console.log(e))
})

router.post('/create', (req, res) => {
    Category.findOne({ name: req.body.name })
    .then(category => {
        if(category){
            res.send(400).json({ message: 'the Category already exist!' })
        } else {
            const newCategory = new Category({name: req.body.name });
            newCategory
            .save()
            .then(category => res.json(category))
            .catch(err => console.log(err));
        }
    })
})

router.post('/delete/:_id', (req, res) => {
    Category.deleteOne({ _id: req.params._id })
    .then(category => {
        res.sendStatus(200).json({ message: 'the Category was delete' })
    })
})

module.exports = router;