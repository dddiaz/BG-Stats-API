//Get 24hr average
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

	    // collection.find().sort({"date":-1}).limit(1).toArray(function(err,docs){
	    // 	if(err){
	    // 		context.fail();
	    // 	} else {
	    // 		console.log('Fetched:', docs);
	    // 		context.done(null,docs)
	    // 	//     context.done(null, {"Hello":"World"});
	    // 	}
	    // });

		var d1 = new Date('2015-20-12T12:00:00.000Z');
		var d2 = new Date('2015-20-12T13:00:00.000Z');

		//d2 = d2.setHours(d2.getHours() - 3);

		//var isoD1 = new Date(d1.toISOString());
		//var isoD2 = new Date(d2.toISOString());

		//d1 = d1.toISOString();
		//d2 = d2.toISOString();



		// collection.aggregate({
		// 	date: {
		// 		$gte : d2,
		// 		$lt: d1
		// 	}
		// }).toArray(function(err,docs){
		// 	if(err){
		// 		contect.fail();
		// 	} else{
		// 		//average over array
		// 		var sum = 0;
		// 		console.log(docs.length);
		// 		if(docs.length == 0){
		// 			context.done(null,{"3HrAvg":0})
		// 		}
		// 		for( var i = 0; i < docs.length; i++ ){
		// 			console.log(docs[i]);
		// 		    sum += parseInt( docs[i].sgv, 10 ); //don't forget to add the base
		// 		}

		// 		var avg = sum/docs.length;
		// 		console.log("3 hr average is: " + avg);
		// 		context.done(null,{"3HrAvg":avg});
		// 	}
		// });

		//http://stackoverflow.com/questions/32140518/mongo-date-aggregation-predefined-ranges

		// var now = new Date(),
		// oneHour = ( 1000 * 60 * 60)
	 //    oneDay = ( 1000 * 60 * 60 * 24 ),
	 //    t0 = new Date(now.valueOf());
	 //    t1hours = new Date(now.valueOf() - oneHour),
	 //    t24hours = new Date( now.valueOf() - oneDay ),
	 //    t48hours = new Date( t24hours.valueOf() - oneDay );

	 //    collection.aggregate([
		//     { "$group": {
		//         "_id": null,
		//         "1hours": {
		//             "$sum": {
		//                 "$cond": [
		//                 	//condition to test
		//                     {"$and":[
		//                           { "$gt": [ t24hours, "$date" ] },
		//                           { "$lte": [ t48hours, "$date" ] }
		//                     ]},
		//                     1,
		//                     0
		//                 ]
		//             }
		//         }//,
		//         // "48hours": {
		//         //     "$sum": {
		//         //         "$cond": [
		//         //             "$and": [
		//         //                   { "$gt": [ 24hours, "$datefield" ] },
		//         //                   { "$lte": [ 48hours, "$datefield" ] }
		//         //             ],
		//         //             1,
		//         //             0
		//         //         ]
		//         //     }
		//         // }//,
		//         // "gt48hours": { 
		//         //     "$sum": {
		//         //         "$cond": [
		//         //             { "$gt": [ 48hours, "$datefield" ] },
		//         //             1,
		//         //             0
		//         //         ]
		//         //     }
		//         // }
		//     }}
		// ]).toArray(function(err,docs){
		// 	if(err){
		// 		context.fail();
		// 	} else{
		// 		console.log(docs.length);
		// 		if(docs.length == 0){
		// 			context.done(null,{"3HrAvg":0})
		// 		}
		// 		console.log(JSON.stringify(docs, null, 4));
		// 		console.log("24 hr average is: " + docs[0]);
		// 		context.done(null,{"3HrAvg":docs});
		// 	}
		// });//end aggregate

		collection.find({ 
			$where: function () { 
				return Date.now() - this._id.getTimestamp() < (24 * 60 * 60 * 1000)  
			}  
		}).toArray(function(err,docs){
			if (err){
				context.fail();
			}
			else {
				//console.log(docs.length);
				if(docs.length == 0){
					context.done(null,{"3HrAvg":0})
				}
				//console.log(JSON.stringify(docs, null, 4));
				//calculate average
				var sum = 0;
				for( var i = 0; i < docs.length; i++ ){
					//console.log(docs[i]);
					//console.log(parseInt( docs[i].sgv, 10 ));
				    sum += parseInt( docs[i].sgv, 10 ); //don't forget to add the base
				}
				var avg = sum/docs.length;
				console.log(avg)
				context.done(null,{"24HrAvg":avg})
			}
		});

		}
	});
	//Can also be context.succeed or .fail or context.getRemainingTimeInMillis()
};