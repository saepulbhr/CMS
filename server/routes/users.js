var express = require('express');
var router = express.Router();
const Users = require('../models/users');
const helper = require('../helper/util');
const auth = require('../helper/auth')
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

router.get('/', (req, res) => {
  Users.find({}, (err, data) => {
    if (err) return res.send(err)
    res.json(data)
  })
})


router.post('/register', (req, res) => {
  let hash = bcrypt.hashSync(`${req.body.password}`, salt);
  let hashs = bcrypt.hashSync(`${req.body.retypepassword}`, salt)
  // console.log(hashs)

  if (hash == hashs) {
    Users.create({
      email: req.body.email,
      password: hash,
      retypepassword: hashs
    }, function (err, user) {
      if (err) {
        res.status(401).json({
          error: true,
          message: 'Error'
        })
      }
      let token = helper.token(user._id);
      user.token = token;
      user.save((err) => {
        res.status(200).json({
          data: { email: user.email },
          token: token
        })
      })
    })
  } else {
    res.status(401).json({
      message: 'Email not Found'
    })
  }
});

router.post('/login', (req, res) => {
  Users.findOne({
    email: req.body.email
  })
    .then(data => {
      if (!data) {
        res.status(304).json({
          error: true,
          message: 'Email Not Found'
        })
      } else {
        bcrypt.compare(req.body.password, data.password, function (err, respon) {
          if (err) {
            res.status(401).json({
              error: true,
              message: 'Error login'
            })
          } else {
            if (respon) {
              res.status(200).json({
                message: 'login success',
                data: { email: data.email },
                token: helper.token(data._id)
              })
            } else {
              res.status(304).json({
                error: true,
                message: 'Email & Password Failed'
              })
            }
          }
        });
      }
    }).catch(err => {
      res.status(401).json({
        error: true,
        message: 'Error login'
      })
    })
});

router.post('/check', auth, (req, res) => {
  res.status(200).json({ valid: 'true' });
});

router.post('/destroy', (req, res) => {
  const token = req.headers.authorization;

  Users.findOneAndUpdate({ 'token': token }, { 'token': '' })
    .then(() => {
      res.status(200).json({
        logut: true

      })
    })

});

module.exports = router;