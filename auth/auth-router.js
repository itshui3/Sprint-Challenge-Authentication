const router = require('express').Router();
const authDb = require('./auth-model');
// mw
const mw = require('./auth-router-mw');

router.post('/register', ...mw.reg_mw, (req, res) => {
  const user = req.body;
  authDb.registerUser(user)
    .then( resou => {
      res.status(201).json({ message: `registered new user`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `internal error, could not register user` })
    })
});

router.post('/login', (req, res) => {
  // implement login
});

router.get('/', (req, res) => {
  res.status(200).json({ message: `auth-router available in server` })
})

module.exports = router;
