const express = require('express');
const router = express.Router();
const Maps = require('../models/maps');

router.post('/search', (req, res) => {

    let temp = {}
    if (req.body.title) {
        temp.title = req.body.title
    }
    if (req.body.lat) {
        temp.lat = req.body.lat
    }
    if (req.body.lng) {
        temp.lng = req.body.lng
    }

    Maps.find(temp)
        .then(data => {
            res.status(200).json(
                data
            )
        })
        .catch(err => {
            res.status(401).json({
                status: true,
                message: 'maps not found'
            })
        })
});

router.get('/', (req, res) => {
    Maps.find({}, (err, data) => {
        if (err) {
            res.status(401).json({
                message: 'Data not found'
            })
        }
        res.status(200).json(
            data
        )
    })
});

router.put('/:id', (req, res) => {
    const { title, lat, lng } = req.body
    Maps.findOneAndUpdate(
        { _id: req.params.id },
        { title: title, lat: lat, lng: lng },
        { new: true }
    )
        .then(data => {
            res.status(201).json({
                success: true,
                message: 'data have been updated',
                data
            })
        })
        .catch(err =>{
            res.status(401).json({
                success: false,
                message: 'data can not update'
            })
        })
})

router.post('/', (req, res) => {
    const { title, lat, lng } = req.body
    Maps.create({
        title: title,
        lat: lat,
        lng: lng
    }, (err, data) => {
        if (err) {
            res.status(401).json({
                error: true,
                message: 'Not Found'
            })
        }
        data.save((err) => {
            res.status(201).json({
                success: true,
                message: "data have been added",
                data: {
                    _id: data._id,
                    title: title,
                    lat: lat,
                    lng: lng
                }
            })
        })
    })
});

router.delete('/:id', (req, res) => {
    Maps.findByIdAndDelete(
        { _id: req.params.id }
    ).then(data => {
        res.status(201).json({
            success: true,
            message: 'data have been deleted',
            data

        })
    }).catch(err =>{
        res.status(401).json({
            success: false,
            message: 'data can not delete'
        })
    })
});

router.get('/:id', (req, res) => {
    Maps.findById(
        { _id: req.params.id }
    ).then(data => {
        res.status(201).json({
            success: true,
            message: 'data found',
            data
        })
    }).catch(err=>{
        res.status(401).json({
            success:false,
            message: 'data not found'
        })
    })
});

module.exports = router