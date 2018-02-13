const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const ejs = require('ejs');
const router = express.Router();
const viz = require('viz.js');
const makeGraph = require('./makeGraph.js');
const modual = require('../public/javascripts');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req);
	res.render('index.ejs');
});
router.get('/graph', function(req, res, next) {
        console.log("graphに来た");
	makeGraph.makegraph().then(
		function(graphInfo){
			console.log("enter aaaa");
        		res.set('Content-Type', 'image/svg+xml');
			console.log(graphInfo);
      			res.send(viz(graphInfo));
		},function(error){
		
		}
	);
});

router.post('/',function(req,res){

	const body=req.body.events[0];
  console.log(body);

  switch (body.type){
    case 'beacon':
      modual.beacon.beaconEvents(body);
      break;

    case 'follow':
      modual.follow.followEvents(body);
      break;

    case 'message':
      modual.message.messageEvents(body);
      break;

    default:
      console.log("新しいtypeです");
      break;
  }

	const response = {};
	res.send(JSON.stringify(response));
});

module.exports = router;
