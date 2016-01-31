// this file encapsualtes our interaction with the redis server

// using latest version of node so promises enabled

// use to hash passwords
var bcrypt = require('bcryptjs');

// retrieves all messages, stored in a list
// Function object with two arguments resolve and reject. The first argument fulfills the promise, the second argument rejects it. We can call these functions once our operation is completed.
function getMessages(){
	return new Promise(function(resolve,reject){

	})
}

function setMessage(){
	return new Promise(function(resolve,reject){
		
	})
}

function setUser(name,password,expire,client){
	// promisify manually
	return new Promise(function(resolve,reject){
		// hash password first
		bcrypt.hash(password, 8,function(err,hash){
			if (err!==null){
				reject(err)
			}
			// MULTI commands are queued up until an EXEC is issued, and then all commands are run atomically by Redis
			// we use a redis hash to store a user name and password
			// add key if does not exist, namespace with users 
			// make sure to expire later on
			client.multi()
				.hsetnx('users:'+name,'name',name)
				.hsetnx('users:'+name,'password',hash)
				.exec(function(err){
					if (err!==null){
						reject(err)
					} else {
						resolve()
					}
				})
		});
	})
}

function validateUser(name,password,client){
	// promisify manually
	return new Promise(function(resolve,reject){
		// check if user exists
		client.hgetall('users:'+name,function(err,obj){
			if (err!==null){
				reject(err)
			}
			else if (obj === null){
				console.log('user is null')
				return
			} else {
				// check passowrd of user
				var hash = obj.password 
				bcrypt.compare(password,hash,function(err,res){
					if (err!==null){
						reject(err)
					} else {
						// res is a boolean mad available to the resolve function for further work 
						resolve(res)
					}
				})
			}
		})
	})
}

