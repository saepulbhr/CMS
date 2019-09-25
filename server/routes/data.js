var express = require('express');
var router = express.Router();
var Data = require('../models/data')

router.post('/search', (req, res) => {
    // const { letter, frequency } = req.body;

    let temp = {}
    if (req.body.letter) {
    } temp.letter = req.body.letter;

    if (req.body.frequency) {
        temp.frequency = req.body.frequency
    }

    Data.find(temp)
        .then(data => {
            res.json(
                data
            )
        })
        .catch(err => {
            res.json({
                error: true,
                message: err.message
            });
        });
});

router.get('/', (req, res) => {
    Data.find({}, (err, data) => {
        if (err) {
            res.status(204).json({ error: true, message: 'Data not found' })
        }
        res.status(200).json(data)
    })
})

router.post('/', (req, res) => {
    let data = new Data({
        letter: req.body.letter,
        frequency: req.body.frequency
    })
    data.save()
        .then(respon => {
            res.status(201).json({
                success: true,
                message: "data have been added",
                data: {
                    _id: respon._id,
                    letter: respon.letter,
                    frequency: respon.frequency
                }
            })
        }).catch(err => {
            res.status(204).json({
                status: false,
                message: 'adding have been failed',
                data: {
                    _id: '',
                    letter: '',
                    frequency: ''
                }
            })
        })
});

router.put('/:id', (req, res) => {
    Data.findOneAndUpdate(
        { _id: req.params.id },
        { letter: req.body.letter, frequency: req.body.frequency }, { new: true }
    ).then(data => {
        res.status(201).json({
            success: true,
            message: 'data have been update',
            data
        })
    }).catch(err => {
        res.status(204).json({
            status: false,
            message: 'updated failed',
        })
    })
})

router.delete('/:id', (req, res) => {
    Data.findOneAndDelete({
        _id: req.params.id
    })
        .then(data => {
            res.status(201).json({
                success: true,
                message: 'data have been deleted',
                data
            })
        }).catch(err => {
            res.status(204).json({
                status: false,
                message: 'adding have been failed'
            })
        })
})

router.get('/:id', (req, res) => {
    Data.findById(
        { _id: req.params.id }
    )
        .then(data => {
            res.status(201).json({
                success: true,
                message: "data found",
                data 
            })
        })
})


module.exports = router