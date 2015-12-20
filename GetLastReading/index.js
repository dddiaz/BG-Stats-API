//GetLastReading

console.log('Loading event');

exports.handler = function(event, context) {
	//lets require/import the mongodb native drivers.
	var mongodb = require('mongodb');
	//We need to work with "MongoClient" interface in order to connect to a mongodb server.
	var MongoClient = mongodb.MongoClient;

	// Connection URL. This is where your mongodb server is running.
	var url = 'mongodb://diaz-bg-db-readonly:diaz-bg-db-readonlypassword@ds029605.mongolab.com:29605/heroku_233zkxnt';
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
	    //collection.find().sort({"date":-1}).limit(5).toArray(function(err,docs) {
	    //We have a cursor now with our find criteria
	    var cursor = collection.find({type:'sgv'});

	    //We need to sort by age descending
	    cursor.sort({date: -1});

	    //Limit to max 1 records
	    cursor.limit(1);

	    //Skip specified records. 0 for skipping 0 records.
	    cursor.skip(0);

	    //Lets iterate on the result
	    cursor.each(function (err, doc) {
	      if (err) {
	        console.log(err);
	        context.fail();
	      } else {
	        console.log('Fetched:', doc);
	        context.done(null, {"Hello":"World"});
	      }
	    });
	  }
	});
	//Can also be context.succeed or .fail or context.getRemainingTimeInMillis()
};