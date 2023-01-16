var express = require('express');
const Docker = require('dockerode');
const compose = require('docker-compose');
const router = express.Router();
const docker = new Docker();
const path = require("path");

const staticImgName = "heig_dai_http_infrastructure-static"
const expressImgName = "heig_dai_http_infrastructure-express";

/* GET all containers. */
router.get('/', function (req, res, next) {
  docker.listContainers({ all: true }).then(containers => {
    res.render('containers', { containers });
  })
});
router.put('/run', function (req, res, next) {
  const container = docker.getContainer(req.body.id);
  container.start().then(info => {
    res.status(200).json({ msg: "Container started" });
  }).catch(err => {
    res.status(err.statusCode).json({ err: err.json.message });
  });
})
router.put('/stop', function (req, res, next) {
  const container = docker.getContainer(req.body.id);
  container.stop().then(info => {
    res.status(200).json({ msg: "Container stopped" });
  }).catch(err => {
    res.status(err.statusCode).json({ err: err.json.message });
  });
})

router.delete('/remove', function (req, res, next) {
  const container = docker.getContainer(req.body.id);
  container.remove().then(info => {
    res.status(200).json({ msg: "Container removed" });
  }).catch(err => {
    res.status(err.statusCode).json({ err: err.json.message });
  });
})

router.put('/runAll', function (req, res, next) {
  docker.listContainers({ all: true }, (err, containers) => {
    containers.forEach((containerInfo) => {
      docker.getContainer(containerInfo.Id).start()
    });
    res.status(200).json({ msg: "All container are running" });

  });
})
router.put('/stopAll', function (req, res, next) {
  docker.listContainers((err, containers) => {
    containers.forEach(containerInfo => {
      docker.getContainer(containerInfo.Id).stop();
    });
    res.status(200).json({ msg: "All container are stopped" });

  });
})

router.post('/create', function (req, res, next) {
  const type = req.body.type;
  const home = path.join(__dirname, '..');

  var nbInstance = {
    express: 0,
    static: 0,
  }
  docker.listContainers({ all: true }).then((containers) => {
    containers.forEach((container) => {
      console.log(container.Image);
      if (container.Image == staticImgName) {
        nbInstance.static += 1;
        console.log("isstatic")
      }
      if (container.Image == expressImgName) {
        nbInstance.express += 1;
        console.log("isexpress")
      }
    })
    console.log(nbInstance);
    if (type == "static") {
      nbInstance.static += 1;
    }
    if (type == "express") {
      nbInstance.express += 1;
    }
    const staticOpt = "static=" + (nbInstance.static);
    const expressOpt = "express=" + (nbInstance.express);
    compose.upAll({
      cwd: home,
      commandOptions: [["--scale", staticOpt], ["--scale",expressOpt]],
    }).then(
      () => {
        res.status(200).json({ msg: "Instance of " + type + " created" });
      },
      (err) => { console.log(err) },
    );

  });

})

module.exports = router;
