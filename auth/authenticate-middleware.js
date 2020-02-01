/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler

  check req.headers.authorization for token
*/
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  if(req.headers && req.headers.authorization) {

    const validity = jwt.verify(req.headers.authorization, process.env.SECRET);

    if(validity) {
      next();
    } else {
      res.status(401).json({ message: `i see you trying to be funny` })
    }
  } else {
    res.status(400).json({ message: `check your creds son, cause they dont EXIST` })
  }

};