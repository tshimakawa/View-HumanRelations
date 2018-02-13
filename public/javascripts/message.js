const request = require("request");
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'attend_admin',
  password : 'light12345',
  database : 'HITACHI_Hackathon'
});

exports.messageEvents = function(eventInfo){
  console.log("Entered message.js");
  const replyToken = eventInfo.replyToken;
  const userID = eventInfo.source.userId;
  const messageType = eventInfo.message.type;
  const messageID = eventInfo.message.id;
  const messageText = eventInfo.message.text;
  const messagelength = messageText.length;
console.log(messagelength);
  connection.query(`SELECT name,come_count,char_count FROM userInfo WHERE userID="${userID}"`,function(error,result_userInfo,fields){
    if(error){
      throw error;
    }else if(result_userInfo.length == 0){
      const replyMessage = `${messageText}さんはこのBotに登録されていません`;
      const options = {
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer {0TFlC+RkUreO3Vo2NnuIpRZMHUQ+5FgGEmlWhSbU6QjjAZcBT5in0wcBDdZP7AQne1nSJ5pesVigCvVE2hZSGlieFoZL4YpUnfImwzrXrKjlqjogGqEQw62+/fCKDJgyeIFL86s6ewFpDjmzrMfGGgdB04t89/1O/w1cDnyilFU=}'},
        json: true,
        body: {
          replyToken:replyToken,
          messages:[{
            type:"text",
            text:replyMessage
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
    }else if(result_userInfo.length == 1){
      const userName = result_userInfo[0].name;
      const come_count = result_userInfo[0].come_count + 1;
      const char_count = Number(result_userInfo[0].char_count) + Number(messagelength);
console.log(char_count);
      connection.query(`UPDATE userInfo set come_count="${come_count}",char_count="${char_count}" WHERE userID="${userID}"`,function(error,result,fields){
        if(error){
          throw error;
        }else if(result.length == 0){
          const replyMessage = `${messageText}さんはまだ現在地が登録されていません`;
          const options = {
            url: 'https://api.line.me/v2/bot/message/reply',
            headers: {
              'Content-Type':'application/json',
              'Authorization':'Bearer {0TFlC+RkUreO3Vo2NnuIpRZMHUQ+5FgGEmlWhSbU6QjjAZcBT5in0wcBDdZP7AQne1nSJ5pesVigCvVE2hZSGlieFoZL4YpUnfImwzrXrKjlqjogGqEQw62+/fCKDJgyeIFL86s6ewFpDjmzrMfGGgdB04t89/1O/w1cDnyilFU=}'},
            json: true,
            body: {
              replyToken:replyToken,
              messages:[{
                type:"text",
                text:replyMessage
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
        }else{

		const messageArray = messageText.split(/\s/);

		for(let i=0;i<messageArray.length;i++){
			const firstLetter = messageArray[i].slice(0,1);
			if(firstLetter == "@"){
				const target = messageArray[i].substr(1,messageArray[i].length-1);
				console.log(target);
				connection.query(`SELECT come_count from target_count where sender="${userName}" AND reciever="${target}"`,function(error,result_comecount,fields){
        				if(error){
          					throw error;
        				}else{
						console.log(result_comecount);
						const comecount = result_comecount[0].come_count + 1;
						console.log(comecount);
						connection.query(`UPDATE target_count set come_count="${comecount}" WHERE sender="${userName}" AND reciever="${target}"`,function(error,result,fields){
        						if(error){
          							throw error;
        						}else{
								console.log("成功");
							}
						});
				
					}
				});
			}
		}

          console.log(`"${userName}"さんは"${come_count}"回発言しました`);
	  console.log(`"${userName}"さんは現在まで"${char_count}"文字発言しました`);
          //const replyMessage = `${messageText}さんは${location}にいます`;
          //const options = {
           // url: 'https://api.line.me/v2/bot/message/reply',
            //headers: {
             // 'Content-Type':'application/json',
             // 'Authorization':'Bearer {0TFlC+RkUreO3Vo2NnuIpRZMHUQ+5FgGEmlWhSbU6QjjAZcBT5in0wcBDdZP7AQne1nSJ5pesVigCvVE2hZSGlieFoZL4YpUnfImwzrXrKjlqjogGqEQw62+/fCKDJgyeIFL86s6ewFpDjmzrMfGGgdB04t89/1O/w1cDnyilFU=}'},
           // json: true,
           // body: {
             // replyToken:replyToken,
             // messages:[{
               // type:"text",
               // text:replyMessage
             // }]
           // }
          //};
          //request.post(options, function(error, response, body){
             // if (!error && response.statusCode == 200) {
               //   console.log('success!');
              //} else {
             //     console.log(response.body);
           //   }
         // });
        }
      });
    }else{
      const replyMessage = "エラーが発生しています\n管理者に報告してください";
      const options = {
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer {0TFlC+RkUreO3Vo2NnuIpRZMHUQ+5FgGEmlWhSbU6QjjAZcBT5in0wcBDdZP7AQne1nSJ5pesVigCvVE2hZSGlieFoZL4YpUnfImwzrXrKjlqjogGqEQw62+/fCKDJgyeIFL86s6ewFpDjmzrMfGGgdB04t89/1O/w1cDnyilFU=}'},
        json: true,
        body: {
          replyToken:replyToken,
          messages:[{
            type:"text",
            text:replyMessage
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
