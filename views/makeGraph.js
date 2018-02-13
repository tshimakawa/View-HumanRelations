const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'attend_admin',
  password : 'light12345',
  database : 'HITACHI_Hackathon'
});
const aaa="asdfdtfrefvds";

function makegraph(){
	document.write("tesst");
	document.write(aaa);
	let test = "digraph{"
	getGraphInfo().then(
		function(result_userInfo){
			for(let i=0;i<userInfo.length;i++){
				for(let j=0;j<userInfo.length;j++){
					test + `"${userInfo[i].name}" -> "${userInfo[j].name}";`;
				}
			}
			test + "}";
			document.write(test);
			return test;
		},function(error){
			document.write(error);
		}
	);
}

function getGraphInfo(){
	document.write("enter getGraphInfo");
	document.write(aaa);
	return new Promise(function(resolve,reject){
		connection.query(`SELECT * FROM userInfo`,function(error,result_userInfo,fields){
			if(error){
				reject(error);
				return;
			}else{
				resolve(result_userInfo);
				return;
			}
		});
	});
}
