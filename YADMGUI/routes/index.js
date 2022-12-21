const express = require('express');
const Docker = require('dockerode');
const router = express.Router();
const docker = new Docker();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
