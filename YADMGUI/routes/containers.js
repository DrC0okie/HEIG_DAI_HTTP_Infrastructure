var express = require('express');
const Docker = require('dockerode');
const router = express.Router();
const docker = new Docker();


/* GET all containers. */
router.get('/', function(req, res, next) {
  docker.listContainers({all:true}).then(containers=>{
    res.render('containers',{containers});
  })
});
router.put('/run',function (req,res,next){
  const container = docker.getContainer(req.body.id);
  container.start().then(info =>{
    res.status(200).json({msg: "Container started"});
  }).catch(err=>{
    res.status(err.statusCode).json({err:err.json.message});
  });
})
router.put('/stop',function (req,res,next){
  const container = docker.getContainer(req.body.id);
  container.stop().then(info =>{
    res.status(200).json({msg: "Container started"});
  }).catch(err=>{
    res.status(err.statusCode).json({err:err.json.message});
  });
})

router.put('/runAll',function (req,res,next){
  docker.listContainers(function (err, containers) {
    containers.forEach(function (containerInfo) {
      docker.getContainer(containerInfo.Id).start(cb);
    });
  });
})
router.put('/stopAll',function (req,res,next){
  docker.listContainers(function (err, containers) {
    containers.forEach(function (containerInfo) {
      docker.getContainer(containerInfo.Id).stop(cb);
    });
  });
})

module.exports = router;
