var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var db_id='mongodb://localhost:27017/boke';
/* GET home page. */

router.get('/', function(req, res, next) {
	function cData(db,callback){
			var collect=db.collection('html');
//			collect.find(data).toArray(function(err,item){
//				callback(item);
////				console.log(item)
//			})
			
			collect.find({},function(err,relsult){
				if(err){
					console.log(err);
				}else{
					callback(relsult);
					
					
				}
			})
			
		}
		//链接数据库
		
		mongodb.connect(db_id,function(err,db){
			if(err){
				console.log(err)
			}else{		
				
				cData(db,function(relsult){
					relsult.toArray(function(err,infor){
			res.render('index', {user:req.session.user,infor:infor});
				console.log(infor)
//							res.render('message',{item:item});
//							res.render('message',{item:item,use:u})
							db.close();
					})
				});				
			}	
		})
  
});

router.get('/form', function(req, res, next) {
  res.render('form', {});
});

router.get('/login', function(req, res, next) {
  res.render('login', {num:''});
});

router.get('/quit', function(req, res, next) {
	req.session.user=undefined;
	res.redirect('/');
});

//点击留言时获得的数据
router.get('/message', function(req, res, next) {
//	res.send('respond with a resource');
	function conData(db,callback){
			var collect=db.collection('luyan');
//			collect.find(data).toArray(function(err,item){
//				callback(item);
////				console.log(item)
//			})
			
			collect.find({},function(err,relsult){
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
				
				conData(db,function(relsult){
					relsult.toArray(function(err,item){
							
						res.render('message',{item:item});	
						db.close();
					})
				});				
			}	
		})
});


module.exports = router;
