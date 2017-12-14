const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const router = express.Router();

const modual = require('../public/javascripts');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
console.log(req);
  res.render('index', { title: 'Express' });
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

    default:
      console.log("新しいtypeです");
  }

	const response = {};
	res.send(JSON.stringify(response));
});

module.exports = router;
