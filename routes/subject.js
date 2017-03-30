'use strict';

let express = require('express');
let moment = require('moment');
let content = require('../data/content.js');
let subject = require('../data/subject.js');
let utils = require('../data/utils.js');
let audit = require('../data/audit');

let logger = require('winston');

// eslint-disable-next-line
let router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/search');
});

router.get('/:id/:page', function(req, res) {
    let page = req.params.page;
    let prisonNumber = req.params.id;
    
    audit.record('VIEW', req.user.email, {page: page, prisonNumber: prisonNumber});

    subject.details(prisonNumber, function(err, data) {
        if (err) {
            renderErrorPage(res, err);
            return;
        }

        if (data.dob) {
            const dob = moment(data.dob);
            data.age = utils.getAgeFromDOB(dob);
            data.dob = dob.format('DD/MM/YYYY');
        }
        
        
        let summary = data;
        let ids = {
          prisonNumber: prisonNumber,
          personIdentifier: data.personIdentifier
        };
        
        subject[page](ids, function(err, details) {
            if (err) {
                renderErrorPage(res, err);
                return;
            }
            let data = {subject: summary, details: details, noResultsText: content.view.subject[page]};
            renderPage(res, {page: page, data: data});
        });        
    });
});


router.get('/:id', function(req, res) {
   res.redirect('/subject/' + req.params.id + '/aliases'); 
});

module.exports = router;

function renderPage(res, obj) {
    res.render('subject/'+obj.page, {
        data: obj.data,
        content: content.view.subject,
        nav: getNavigation(obj.page)
    });
}

function renderErrorPage(res, err) {
    logger.error('Error getting subject details: ' + err);
    res.render('subject/error', {
        content: content.view.subject,
        title: content.errMsg.INVALID_ID,
        err: {
            title: content.errMsg.INVALID_ID
        }
    });
}

function getNavigation(page) {
    let nav = {
      aliases: {title: 'Aliases'},  
      movements: {title: 'Movements'},  
      hdcinfo: {title: 'HDC history'},  
      offences: {title: 'Offences'},  
      addresses: {title: 'Addresses'}
    };
    
    nav[page].active = true;
    
    return nav;
}
