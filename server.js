const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const userRouter = require('./users/userRouter')

const server = express();
server.use(express.json());
server.use(morgan('dev'));
server.use(helmet())
server.use(logger)

server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}${req.method} ${req.url}]`
  );
  next()
}
module.exports = server;
