const authDb = require('./auth-model');
const bcryptjs = require('bcryptjs');

const reg_mw = [
  reg_check_creds,
  reg_check_preexist
]

module.exports = {
  reg_mw
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