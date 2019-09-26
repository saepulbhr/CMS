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
      res.json(response)
    })
  } else {
    response.status = false,
      response.message = '',
      res.json(response);
  }
});

router.login('/login', (req, res) => {
  const {email, password} =req.body;
})

module.exports = router;