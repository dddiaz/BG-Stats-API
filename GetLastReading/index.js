//GetLastReading

console.log('Loading event');

exports.handler = function(event, context) {

	//Can also be context.succeed or .fail or context.getRemainingTimeInMillis()
    context.done(null, {"Hello":"World"});  // SUCCESS with message
};