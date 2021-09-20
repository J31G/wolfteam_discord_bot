const express = require('express');
require('dotenv').config();

const router = express.Router();

router.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

// Basic auth function
const isAuth = (res, req, next) => {
  // Reject helper function
  const reject = () => {
    res.setHeader('www-authenticate', 'Basic');
    res.sendStatus(401);
  };

  const { authorization } = req.headers;

  // If no auth in header, return
  if (!authorization) return reject();

  // Get our username and password
  const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':');

  // Check if basic auth is correct
  if (!(username === process.env.BASIC_AUTH_USERNAME
    && password === process.env.BASIC_AUTH_PASSWORD)) return reject();

  return next();
};

router.get('/', (req, res, next) => {
  // Get if user is auth
  isAuth(req, res, next);

  // Render page
  return res.send('test');
});
