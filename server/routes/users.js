var express = require('express');
var router = express.Router();
const Users = require('../models/users');
const helper = require('../helper/util');
const auth = require('../helper/auth');


// register
router.post('/register', (req, res) => {
  const { email, password, retypepassword } = req.body;
  let response = {
    status: true,
    message: '',
    data: null
  }
  if (password == retypepassword) {
    let user = new Users({ email, password });
    user.save((err) => {
      response.message = "create success",
        response.data = {
          user,
          token: user.token
        }
      console.log(user)
      res.json(response)
    })
  } else {
    response.status = false,
      response.message = '',
      res.json(response);
  }
});

router.post('/login', function (req, res, next) {
  const { email, password } = req.body;
  let response = {
    status: true,
    message: "",
    data: null
  }
  Users.findOne({ email }, (err, user) => {
    if (!user) {
      response.status = false;
      response.message = "email doesn't exist";
      return res.json(response);
    }
    user.comparePassword(password, (isValid) => {
      if (isValid) {
        response.message = "user is valid"
        user.password = undefined;
        // console.log(user);
        response.data = {
          user,
          token: user.generateToken()
        }
        res.json(response);
      } else {
        response.status = false;
        response.message = "password wrong";
        res.json(response);
      }
    })
  })
});

router.post('/check', (req, res) => {
  const token = req.body.token; function auth() {
    $.ajax({
      url: `${api}/check`,
      method: "POST",
      data: {
        token: localStorage.getItem('token')
      }
    }).done((data) => {
      if (!data.valid) {
        window.location = '/login'
      }
    })
  }
  try {
    let data = Users.decodeToken(token);
    if (data) {
      Users.findOne({ email: data.email }, (err, data) => {
        if (!data) {
          res.json({ valid: false })
        } else {
          res.json({ valid: true })
        }
      })
    } else {
      res.json({ valid: false })
    }
  }
  catch (err) {
    res.json({ valid: false })
  }
});

router.post('/logout', (req, res) => {
  
})

module.exports = router;