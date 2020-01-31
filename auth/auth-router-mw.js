const authDb = require('./auth-model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const reg_mw = [
  reg_check_creds,
  reg_check_preexist
]

const log_mw = [
  log_check_creds

]

module.exports = {
  reg_mw,
  log_mw
}

function reg_check_creds(req, res, next) {
  if(req.body && req.body.username && req.body.password) {
    next();
  } else {
    res.status(400).json({ message: `missing proper credentials` })
  }
}

function reg_check_preexist(req, res, next) {
  authDb.findByUsername(req.body.username) 
    .then( resou => {
      if(!resou) {
        console.log(!resou);
        req.body.password = bcryptjs.hashSync(req.body.password, 5);
        console.log(req.body);
        next();
      } else {
        res.status(409).json({ message: `status 409: user preexists` })
      }

    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `internal error, could not check server state` })
    })
}

function log_check_creds(req, res, next) {
  if(req.body && req.body.username && req.body.password) {
    authDb.findByUsername(req.body.username)
      .then( resou => {
        if(!!resou) {
          if(bcryptjs.compareSync(req.body.password, resou.password)) {
            const payload = {
              username: req.body.username
            }
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret);
            req.token = token;
            console.log(token, 'hey');
            next();
          } else {
            res.status(401).json({ message: `you need grammarly for passwords, brah?` })
          }
        } else {
          res.status(401).json({ message: `user does not exist` })
        }
      })
  } else {
    res.status(400).json({ message: `check credentials or URL, needs a username and password to login` })
  }
  next();
}