const request = require("request");

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'attend_admin',
  password : 'light12345',
  database : 'LineBeaconSystem'
});

const options = {};

exports.beaconEvents = function(eventInfo){
  const beaconID = eventInfo.beacon.hwid;
  const userID = eventInfo.source.userId;
  connection(`SELECT name FROM user WHERE userID="${userID}"`,function(error,result_name,fields){
    if(error){
      throw error;
    }else{
      const userName = result_name[0].name;
      connection(`SELECT room FROM room_beacon WHERE beaconID="${beaconID}"`,function(error,result_room,fields){
        if(error){
          throw error;
        }else{
          const room = result_room[0].room;
          if(eventInfo.beacon.type == 'enter'){
            options = {
              url: 'https://api.line.me/v2/bot/message/reply',
              headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer {0TFlC+RkUreO3Vo2NnuIpRZMHUQ+5FgGEmlWhSbU6QjjAZcBT5in0wcBDdZP7AQne1nSJ5pesVigCvVE2hZSGlieFoZL4YpUnfImwzrXrKjlqjogGqEQw62+/fCKDJgyeIFL86s6ewFpDjmzrMfGGgdB04t89/1O/w1cDnyilFU=}'},
              json: true,
              body: {
                replyToken:eventInfo.replyToken,
                messages:[{
                  type:"text",
                  text:`"${userName}が"${room}"に入室しました`
                }]
              }
            };
          }else if(eventInfo.beacon.type == 'leave'){
            options = {
              url: 'https://api.line.me/v2/bot/message/reply',
              headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer {0TFlC+RkUreO3Vo2NnuIpRZMHUQ+5FgGEmlWhSbU6QjjAZcBT5in0wcBDdZP7AQne1nSJ5pesVigCvVE2hZSGlieFoZL4YpUnfImwzrXrKjlqjogGqEQw62+/fCKDJgyeIFL86s6ewFpDjmzrMfGGgdB04t89/1O/w1cDnyilFU=}'},
              json: true,
              body: {
                replyToken:eventInfo.replyToken,
                messages:[{
                  type:"text",
                  text:`"${userName}が"${room}"から退室しました`
                }]
              }
            };
          }

          request.post(options, function(error, response, body){
              if (!error && response.statusCode == 200) {
                  console.log('success!');
              } else {
                  console.log(response.body);
              }
          });

        }
      });
    }
  });
}
