'use strict';
var express = require('express');
var router = express.Router();
var twitterSearch = require('../logic/twitterSearch');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');
});

router.post('/search', function (req, res) {
    twitterSearch(req.body.search, function (data) {
        console.log("Route file is working");
        //console.log(data);
        res.json(data.statuses);
    });
});

module.exports = router;
