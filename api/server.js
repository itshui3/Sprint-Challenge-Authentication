const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter); // authN mw needs to check for jwt token(ie, has logged in)

server.get('/', (req, res) => {
  res.status(200).json({ message: `status 200: welcome to the server` })
})

module.exports = server;
