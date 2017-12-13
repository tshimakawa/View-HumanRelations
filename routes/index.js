const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const router = express.Router();

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
console.log("GET REQUEST");
console.log(req);
  res.render('index', { title: 'Express' });
});

router.post('/',function(req,res){
	console.log("POST REQUEST");
	console.log(req.body.events[0]);

	const body=req.body.events[0];
	console.log(body.replyToken);

  if(body.beacon.type == 'enter'){
    const options = {
      url: 'https://api.line.me/v2/bot/message/reply',
    	headers: {
        'Content-Type':'application/json',
  			'Authorization':'Bearer {CN0L/pbVjpdCK98GXNAv44bDywKbaM8LwyYKaAb+uc0ydiUQSn4b+Kgf30NZGQAqXgvaUlZDe83J5Y+PLwpmihSvJCyOGpDGWSJNtpSYbESDrXqtiIYMA2I0Lv8MCr8wJhpfrCGvJMwF9RbnX32BGwdB04t89/1O/w1cDnyilFU=}'},
    	json: true,
   		body: {
  			replyToken:body.replyToken,
  			messages:[{
  				type:"text",
  				text:"LineBeaconの領域に入りました！"
  			}]
  		}
  	};

  	request.post(options, function(error, response, body){
    		if (!error && response.statusCode == 200) {
      			console.log('success!');
    		} else {
      			console.log(response.body);
    		}
  	});
  }else if(body.beacon.type == 'leave'){
    const options = {
      url: 'https://api.line.me/v2/bot/message/reply',
    	headers: {
        'Content-Type':'application/json',
  			'Authorization':'Bearer {CN0L/pbVjpdCK98GXNAv44bDywKbaM8LwyYKaAb+uc0ydiUQSn4b+Kgf30NZGQAqXgvaUlZDe83J5Y+PLwpmihSvJCyOGpDGWSJNtpSYbESDrXqtiIYMA2I0Lv8MCr8wJhpfrCGvJMwF9RbnX32BGwdB04t89/1O/w1cDnyilFU=}'},
    	json: true,
   		body: {
  			replyToken:body.replyToken,
  			messages:[{
  				type:"text",
  				text:"LineBeaconの領域から出ました！"
  			}]
  		}
  	};

  	request.post(options, function(error, response, body){
    		if (!error && response.statusCode == 200) {
      			console.log('success!');
    		} else {
      			console.log(response.body);
    		}
  	});
  }

	const response = {};
	res.send(JSON.stringify(response));
});

module.exports = router;
