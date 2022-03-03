'use strict';

const express = require('express');
const content = require('../data/content');
const audit = require('../data/audit');

const logger = require('../log.js');

// eslint-disable-next-line
let router = express.Router();

router.use(function(req, res, next) {
  if (typeof req.csrfToken === 'function') {
    res.locals.csrfToken = req.csrfToken();
  }
  next();
});

router.get('/', function(req, res, next) {
  if (req.user && req.user.disclaimer) {
    res.redirect('/search');
  } else if (req.user) {
    audit.record('LOG_IN', req.user.email);
    res.render('disclaimer', {content: content.view.disclaimer});
  } else {
    res.redirect('/login');
  }
});


router.post('/', function(req, res, next) {

  if (!req.user) {
    return res.redirect('/login');
  }

  if (!req.body.disclaimer) {
    logger.info('Disclaimer not accepted');
    res.status(400);

    const err = {
      title: content.errMsg.LOGIN_ERROR,
      items: [{disclaimer: 'You must confirm that you understand the disclaimer'}],
      desc: content.errMsg.LOGIN_ERROR_DISCLAIMER
    };

    res.render('disclaimer', {err: err, content: content.view.disclaimer});

  } else {
    req.user.disclaimer = 'true';
    logger.info('Disclaimer accepted - redirecting to search', {userId: req.user.id});
    audit.record('DISCLAIMER_ACCEPTED', req.user.email);
    res.redirect('/search');

  }
});

module.exports = router;

