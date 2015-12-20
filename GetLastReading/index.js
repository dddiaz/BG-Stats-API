//GetLastReading

console.log('Loading event');

exports.handler = function(event, context) {
	//lets require/import the mongodb native drivers.
	var mongodb = require('mongodb');
	//require settings file
	var settings = require("./settings.js");
	//We need to work with "MongoClient" interface in order to connect to a mongodb server.
	var MongoClient = mongodb.MongoClient;

	// Connection URL. This is where your mongodb server is running.
	var url = settings.db;
	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	    //IMPORTANT SO CODE STOPS EXECUTING
	    context.fail();
	  } else {
	    //HURRAY!! We are connected. :)
	    console.log('Connection established to', url);

	    // do some work here with the database.
	    var collection = db.collection('entries');
	    //get last inserted record
	    //collection.find().sort({date:-1}).limit(5).toArray(function(err,docs)

	    collection.find().sort({"date":-1}).limit(1).toArray(function(err,docs){
	    	if(err){
	    		context.fail();
	    	} else {
	    		console.log('Fetched:', docs);
	    		context.done(null,docs)
	    //     context.done(null, {"Hello":"World"});
	    	}

	    });

	    //Lets iterate on the result
	    // cursor.each(function (err, doc) {
	    //   if (err) {
	    //     console.log(err);
	    //     context.fail();
	    //   } else {
	    //     console.log('Fetched:', doc);
	    //     context.done(null, {"Hello":"World"});
	    //   }
	    // });
	  }
	});
	//Can also be context.succeed or .fail or context.getRemainingTimeInMillis()
};