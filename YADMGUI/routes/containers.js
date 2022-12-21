var express = require('express');
const Docker = require('dockerode');
const router = express.Router();
const docker = new Docker();


/* GET users listing. */
router.get('/', function(req, res, next) {
  docker.listContainers().then(containers=>{
    console.log(containers);
    res.render('containers',{containers});
  })
});

module.exports = router;
