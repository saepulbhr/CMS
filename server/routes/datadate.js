var express = require('express');
var router = express.Router();
var Datadate = require('../models/datadate')

router.post('/search', (req, res) => {
    // const { letter, frequency } = req.body;

    let temp = {}
    if (req.body.letter) {
    } temp.letter = req.body.letter;

    if (req.body.frequency) {
        temp.frequency = req.body.frequency
    }

    Datadate.find(temp)
        .then(data => {
            res.json(
                data
            )
        }).catch(err => {
            res.json({
                error: true,
                message: err.message
            })
        })
    });

    router.get('/', (req, res) => {
        Datadate.find({}, (err, data) => {
            if (err) {
                res.status(401).json({
                    error: true,
                    message: 'Error'
                })
            }
            res.status(200).json(
                data
            )
        })
    });

    router.put('/:id', (req, res) => {
        const { letter, frequency } = req.body
        Datadate.findOneAndUpdate(
            { _id: req.params.id },
            { letter: letter, frequency: frequency }, { new: true }
        ).then(data => {
            res.status(201).json({
                success: true,
                message: 'data have been updated',
                data
            })
        }).catch(err =>{
            res.status(401).json({
                success: false,
                message: 'data cant updated'
            })
        })
    });

    router.post('/add', (req, res) => {
        const { letter, frequency } = req.body;
        Datadate.create({
            letter: letter,
            frequency: frequency
        }, (err, data) => {
            if (err) {
                res.status(401).json({
                    error: true,
                    message: "error"
                })
            }
            data.save((err) => {
                res.status(201).json({
                    success: true,
                    message: "data have been added",
                    data: {
                        _id: data._id,
                        letter: letter,
                        frequency: frequency
                    }
                })
            })
        })
    })

    router.delete('/:id', (req, res) => {
        Datadate.findOneAndDelete({
            _id: req.params.id
        })
            .then(data => {
                res.status(201).json({
                    success: true,
                    message: 'data have been deleted',
                    data
                })
            })
            .catch(err=>{
                res.status(401).json({
                    success:false,
                    message: 'delete failed'
                })
            })
    })

    router.get('/:id', (req, res) => {
        Datadate.findById(
            { _id: req.params.id }
        )
            .then(data => {
                res.status(201).json({
                    success: true,
                    message: 'data found',
                    data
                })
            })
            .catch(err=>{
                res.status(401).json({
                    success: false,
                    message: 'data not found'
                })
            })
    })



module.exports = router