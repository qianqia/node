var express = require('express');

//可使用 express.Router 类创建模块化、可挂载的路由句柄。

var router = express.Router();

//快速链接服务器
var mongodb=require('mongodb').MongoClient;
var db_id='mongodb://localhost:27017/boke';

/* GET users listing. */

router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});


//注册
router.post('/use', function(req, res, next) {
	
		var user=req.body['user'];
		var pwd=req.body['pwd'];
		var email=req.body['email'];

		
		
		//插入数据
		function insertData(db){
			var collect=db.collection('message');
			var data=[{user:user,pwd:pwd,email:email}];
			collect.insert(data,function(err,relsult){
				if(err){
					console.log(err);
				}else{
					
				}
			})
			
		}
		//链接数据库
		mongodb.connect(db_id,function(err,db){
			if(err){
				console.log(err)
			}else{
				insertData(db)
				res.redirect('/')
				db.close();
			}
		})
		
	
});
//登陆
router.post('/check', function(req, res, next) {
		//查询数据
		function loginData(db,callback){
			var collect=db.collection('message');
			var data={user:req.body['user'],pwd:req.body['pwd']};
			
//			collect.find(data).toArray(function(err,item){
//				callback(item);
////				console.log(item)
//			})
			
			collect.find(data,function(err,relsult){
				if(err){
					console.log(err);
				}else{
					callback(relsult)
					
				}
			})
			
		}
		
		//链接数据库
		mongodb.connect(db_id,function(err,db){
			if(err){
				console.log(err)
			}else{		
				loginData(db,function(relsult){
					relsult.toArray(function(err,item){
						if(item.length>0){
							
							req.session.user=item[0].user;
							
							res.redirect('/')
							db.close();
						}else{
							res.render('login', {num:'<h1>密码或账号错误</h1>'});
						}
					})
				});				
			}	
		})
		
	
});

//插入留言

router.post('/liuyan', function(req, res, next) {
	   var ses=req.session.user;
	   if(ses){
	   		var baioti=req.body['biaoti'];
			var con=req.body['con'];
			//插入数据
			function liuyanData(db){
				var collect=db.collection('luyan');
				var data=[{biaoti:baioti,con:con}];
				collect.insert(data,function(err,relsult){
					if(err){
						console.log(err);
					}else{
						
					}
				})
				
			}
			//链接数据库
			mongodb.connect(db_id,function(err,db){
				if(err){
					console.log(err)
				}else{
					liuyanData(db)
//					res.render('content');
//					res.send('留言成功')
					res.redirect('/message')
					db.close();
				}
			})
	   }else{
	   		res.send('session过期');
	   }
		
		
	
});
	



module.exports = router;
