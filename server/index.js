/* eslint consistent-return:0 */

const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();

const { users } = require('./users.json');

const getSession = (req, res, next) => {
  const token = req.header('X-Auth-Token');
  const user = users.find(({ sessions }) => sessions.indexOf(token) !== -1);

  if (user) {
    req.body.user = user;

    next();
  } else {
    res.status(400).json({
      error: 'Wrong session'
    });
  }
};

app.use(bodyParser.json());

app.post('/login', ({ body }, res) => {
  if (body.password && body.username) {
    const index = users.findIndex(({ username, password }) => username === body.username && password === body.password);

    if (index >= 0) {
      const { sessions, ...user } = users[index];
      const session = crypto.createHash('md5').update((new Date()).toString()).digest('hex');

      sessions.push(session);

      users[index].sessions = sessions;

      return res.status(200).json({ session, ...user });
    }

    return res.status(400).json({
      error: 'Wrong username or password'
    });
  }

  res.status(400).json({
    error: 'Missing username or password'
  });
});

app.post('/logout', getSession, ({ body, ...req }, res) => {
  const token = req.header('X-Auth-Token');

  const index = users.findIndex(({ sessions }) => sessions.indexOf(token) !== -1);

  if (index) {
    const { sessions, ...user } = users[index];

    users[index].sessions = sessions.filter(({ session }) => session !== token);

    return res.status(200).json(user);
  }

  return res.status(400).json({
    error: 'Wrong session'
  });
});

app.post('/sign', ({ body }, res) => {
  if (body.username && body.password) {
    const index = users.findIndex(({ username }) => username);

    if (index >= 0) {
      return res.status(400).json({
        error: 'Already registered'
      });
    }

    const user = {
      id: users.reduce((acc, task) => task.id >= acc ? task.id + 1 : acc, 0),
      username: body.username,
      password: body.password
    };

    users.push({
      ...user,
      sessions: [],
      number: Math.floor((Math.random() * 100) + 1)
    });

    return res.status(200).json(user);
  }

  res.status(400).json({
    error: 'Missing username or password'
  });
});

app.post('/game', getSession, ({ body }, res) => {
  const { user } = body;

  if (user.number === parseInt(body.number, 0)) {
    return res.status(200).json(user.number);
  }

  return res.status(400).json({
    error: 'Wrong number'
  });
});

setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

const customHost = argv.host || process.env.HOST;
const host = customHost || null;
const prettyHost = customHost || 'localhost';

app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});
