const request = require("request");

exports.messageEvents = function(eventInfo){
  console.log("Entered message.js");
  console.log(eventInfo);
}
