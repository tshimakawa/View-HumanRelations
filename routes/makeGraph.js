const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'attend_admin',
  password : 'light12345',
  database : 'HITACHI_Hackathon'
});

exports.makegraph = function(){	
	console.log("enter makegraph");
	return new Promise(function(resolve,reject){
		let test = "digraph{"
		test += `graph [charset = "UTF-8",dpi="64",bgcolor = "#EDEDED",rankdir = TB,nodesep = 0.8,ranksep = 1.1];node [shape = circle,fontsize = 12];`
		getGraphInfo().then(
			function(result_userInfo){
				getTargetCount().then(
					function(result_targetCount){
						let I = [result_userInfo.length];
						let Imax = 0;
						let Imin = 10000;
						let X = [result_userInfo.length];
						let Flag = 0;

						for(let i=0;i<result_userInfo.length;i++){
							I[i] = result_userInfo[i].come_count;
							if(I[i] > Imax) Imax = I[i];
							if(I[i] < Imin) Imin = I[i];
						}

						for(let i=0;i<result_userInfo.length;i++){
							if(Imax == 0) X[i] = 1.1;
							else {
								X[i] = ((I[i] - Imin)/(Imax - Imin))*1.5 + 1.1;
								Flag = 1;
							}
						}

						for(let i=0;i<result_userInfo.length;i++){
							test += `${result_userInfo[i].name} [label = "${result_userInfo[i].name}",fontname="MS UI Gothic",width=${X[i]},hight=${X[i]}];`;
						}
				
						for(let i=0;i<result_userInfo.length;i++){
							if(i==0){
								test += `{rank=min;${result_userInfo[i].name};}`;
								test += "{rank=same;";
							}else if(i>0 && i<result_userInfo.length-1){
								test += `${result_userInfo[i].name};`;
							}else{
								test += "}";
								test += `{rank=max;${result_userInfo[i].name};}`;
							}
						}

				

//				for(let i=0;i<result_userInfo.length;i++){
//					for(let j=0;j<result_userInfo.length;j++){
//						if(i != j){
//							test += `${result_userInfo[i].name} -> ${result_userInfo[j].name};`;
//						}
//					}
//				}

						let K = [result_targetCount];
						let Kmin = 10000;
						let Kmax = 0;
						let Y = [result_targetCount];
						
						K[0] = result_targetCount[1].come_count/result_userInfo[0].come_count;
						K[1] = result_targetCount[2].come_count/result_userInfo[0].come_count;
						K[2] = result_targetCount[0].come_count/result_userInfo[0].come_count;
						K[3] = result_targetCount[6].come_count/result_userInfo[1].come_count;
						K[4] = result_targetCount[8].come_count/result_userInfo[1].come_count;
						K[5] = result_targetCount[7].come_count/result_userInfo[1].come_count;
						K[6] = result_targetCount[9].come_count/result_userInfo[2].come_count;
						K[7] = result_targetCount[11].come_count/result_userInfo[2].come_count;
						K[8] = result_targetCount[10].come_count/result_userInfo[2].come_count;
						K[9] = result_targetCount[3].come_count/result_userInfo[3].come_count;
						K[10] = result_targetCount[4].come_count/result_userInfo[3].come_count;
						K[11] = result_targetCount[5].come_count/result_userInfo[3].come_count;

						for(let i=0;i<result_targetCount.length;i++){
							if(Kmin>K[i]) Kmin = K[i];
							if(Kmax<K[i]) Kmax = K[i];
						}
						for(let i=0;i<result_targetCount.length;i++){
							if(K[i] !== K[i] || K[i] == 0) Y[i] = 0;
							else Y[i] = ((K[i] - Kmin)/Kmax - Kmin)*15 + 1;
						}

						console.log(Y);

						if(`${Y[0]}` > 0) test += `${result_userInfo[0].name} -> ${result_userInfo[1].name} [tailport = nw, headport = nw,penwidth ="${Y[0]}"];`;
						if(`${Y[1]}` != 0) test += `${result_userInfo[0].name} -> ${result_userInfo[2].name} [tailport = e, headport = n,penwidth ="${Y[1]}"];`;
						if(`${Y[2]}` != 0) test += `${result_userInfo[0].name} -> ${result_userInfo[3].name} [tailport = sw, headport = nw,penwidth ="${Y[2]}"];`;
						if(`${Y[3]}` != 0) test += `${result_userInfo[1].name} -> ${result_userInfo[0].name} [tailport = n, headport = w,penwidth ="${Y[3]}"];`;
  						if(`${Y[4]}` != 0) test += `${result_userInfo[1].name} -> ${result_userInfo[2].name} [tailport = ne, headport = nw,penwidth ="${Y[4]}"];`;
						if(`${Y[5]}` != 0) test += `${result_userInfo[1].name} -> ${result_userInfo[3].name} [tailport = sw, headport = sw,penwidth ="${Y[5]}"];`;
  						if(`${Y[6]}` != 0) test += `${result_userInfo[2].name} -> ${result_userInfo[0].name} [tailport = ne, headport = ne,penwidth ="${Y[6]}"];`;
						if(`${Y[7]}` != 0) test += `${result_userInfo[2].name} -> ${result_userInfo[1].name} [tailport = sw, headport = se,penwidth ="${Y[7]}"];`;
  						if(`${Y[8]}` != 0) test += `${result_userInfo[2].name} -> ${result_userInfo[3].name} [tailport = s, headport = e,penwidth ="${Y[8]}"];`;
  						if(`${Y[9]}` != 0) test += `${result_userInfo[3].name} -> ${result_userInfo[0].name} [tailport = ne, headport = se,penwidth ="${Y[9]}"];`;
						if(`${Y[10]}` != 0) test += `${result_userInfo[3].name} -> ${result_userInfo[1].name} [tailport = w, headport = s,penwidth ="${Y[10]}"];`;
						if(`${Y[11]}` != 0) test += `${result_userInfo[3].name} -> ${result_userInfo[2].name} [tailport = se, headport = se,penwidth ="${Y[11]}"];`;

						test += "}";
						resolve(test);
					},function(error){
						reject(error);
					}
				);
			},function(error){
				reject(error);
			}
		);
	});
}

function getGraphInfo(){
	console.log("enter getGraphInfo");
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
function getTargetCount(){
	return new Promise(function(resolve,reject){
                connection.query(`SELECT * FROM target_count`,function(error,result_targetCount,fields){
                        if(error){
                                reject(error);
                                return;
                        }else{
                                resolve(result_targetCount);
                                return;
                        }
                });
        });
}
