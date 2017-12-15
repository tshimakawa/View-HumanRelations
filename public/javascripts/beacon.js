const request = require("request");
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'attend_admin',
  password : 'light12345',
  database : 'LineBeaconSystem'
});

let options = {};

exports.beaconEvents = function(eventInfo){
  console.log("Entered beacons.js");
  const beaconID = eventInfo.beacon.hwid;
  const userID = eventInfo.source.userId;
  const replyToken = eventInfo.replyToken;
  connection.query(`SELECT name FROM user WHERE userID="${userID}"`,function(error,result_name,fields){
    if(error){
      throw error;
    }else{
      const userName = result_name[0].name;
      connection.query(`SELECT room FROM room_beacon WHERE beaconID="${beaconID}"`,function(error,result_room,fields){
        if(error){
          throw error;
        }else{
          const room = result_room[0].room;
          if(eventInfo.beacon.type == 'enter'){
            connection.query(`INSERT INTO userLocation(userID,room) VALUES("${userID}","${room}")`,function(error,result,fields){
              if(error){
                throw error;
              }else{
                options = {
                  url: 'https://api.line.me/v2/bot/message/reply',
                  headers: {
                    'Content-Type':'application/json',
                    'Authorization':'Bearer {0TFlC+RkUreO3Vo2NnuIpRZMHUQ+5FgGEmlWhSbU6QjjAZcBT5in0wcBDdZP7AQne1nSJ5pesVigCvVE2hZSGlieFoZL4YpUnfImwzrXrKjlqjogGqEQw62+/fCKDJgyeIFL86s6ewFpDjmzrMfGGgdB04t89/1O/w1cDnyilFU=}'},
                  json: true,
                  body: {
                    replyToken:replyToken,
                    messages:[{
                      type:"text",
                      text:`${userName}が${room}に入室しました`
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
            });
          }else if(eventInfo.beacon.type == 'leave'){
            connection.query(`INSERT INTO userLocation(userID,room) VALUES("${userID}","外出")`,function(error,result,fields){
              if(error){
                throw error;
              }else{
                options = {
                  url: 'https://api.line.me/v2/bot/message/reply',
                  headers: {
                    'Content-Type':'application/json',
                    'Authorization':'Bearer {0TFlC+RkUreO3Vo2NnuIpRZMHUQ+5FgGEmlWhSbU6QjjAZcBT5in0wcBDdZP7AQne1nSJ5pesVigCvVE2hZSGlieFoZL4YpUnfImwzrXrKjlqjogGqEQw62+/fCKDJgyeIFL86s6ewFpDjmzrMfGGgdB04t89/1O/w1cDnyilFU=}'},
                  json: true,
                  body: {
                    replyToken:replyToken,
                    messages:[{
                      type:"text",
                      text:`${userName}が${room}から退室しました`
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
            });
          }
        }
      });
    }
  });
}
