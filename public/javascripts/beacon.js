const request = require("request");

exports.beaconEvents = function(eventInfo){
  if(eventInfo.beacon.type == 'enter'){
    const options = {
      url: 'https://api.line.me/v2/bot/message/reply',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer {0TFlC+RkUreO3Vo2NnuIpRZMHUQ+5FgGEmlWhSbU6QjjAZcBT5in0wcBDdZP7AQne1nSJ5pesVigCvVE2hZSGlieFoZL4YpUnfImwzrXrKjlqjogGqEQw62+/fCKDJgyeIFL86s6ewFpDjmzrMfGGgdB04t89/1O/w1cDnyilFU=}'},
      json: true,
      body: {
        replyToken:eventInfo.replyToken,
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
  }else if(eventInfo.beacon.type == 'leave'){
    const options = {
      url: 'https://api.line.me/v2/bot/message/reply',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer {0TFlC+RkUreO3Vo2NnuIpRZMHUQ+5FgGEmlWhSbU6QjjAZcBT5in0wcBDdZP7AQne1nSJ5pesVigCvVE2hZSGlieFoZL4YpUnfImwzrXrKjlqjogGqEQw62+/fCKDJgyeIFL86s6ewFpDjmzrMfGGgdB04t89/1O/w1cDnyilFU=}'},
      json: true,
      body: {
        replyToken:eventInfo.replyToken,
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
}
