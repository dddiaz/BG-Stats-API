README.txt

BG Stats API

Objective: Use AWS API Gateway and AWS Lambda to create an API to querry a MONGODB with BG values (From Nightscout).

WorkFlow Notes:
http://radify.io/blog/aws-lambda-workflow/

CD Into directory and use node-lambda run to execute

API:
GetLastReading
GetDayAverage
Get3HrAverage
GetEstA1C

Note: When uploading to AWS lambda, increase your allocated memory to increase the cpu allocated and ensure it returns it quicly enough to the api gateway

Make sure you have a settings.js file of the format:
module.exports = {
   db: 'your mongo db'
};

To Set Up New Lambda API:
Create Folder with API Name
cd into folder
npm init
npm install mongodb
nano index.js
(Make sure node-lambda is already installed with npm install node-lamda)
node-lamda setup
nano settings.js (add db connection string as described above)


Tutorial Documentation for AWS Lambda
http://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.html

CRITICAL NOTE FOR SETTING UP API GATEWAY:
CREDIT: http://enable-cors.org/server_awsapigateway.html
CORS on AWS API Gateway
Amazon API Gateway adds support for CORS enabling through a simple button in the API Gateway console. Unfortunately that button has a partial behavior, thus setting CORS correctly only for 200 answer (so not other HTTP status codes) and ignoring JQuery header support. The best solution considered so far is about avoding to use the CORS button and set configurations manually. This can be achieved in a couple of steps:

Log into API Gateway console
Create all the REST resources that needs to be exposed with their methods before setting up CORS (if new resources/methods are created after enabling CORS, these steps must be repeated)
Select a resource
Add OPTIONS method, choose as integration type "mock"
For each Method of a resource
Go to Response Method
Add all the response method that should be supported (i.e. 200, 500, etc.)
For each response code set Response Headers to
X-Requested-With
Access-Control-Allow-Headers
Access-Control-Allow-Origin
Access-Control-Allow-Methods
Go to Integration Response, select one of the created response codes, then Header Mappings
Insert default falues for headers 
example:
X-Requested-With: '*'
Access-Control-Allow-Headers: 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with'
Access-Control-Allow-Origin: '*'
Access-Control-Allow-Methods: 'POST,GET,OPTIONS'
This operation has to be repeated for each method, including the newly created OPTIONS
Deploy the API to a stage
Check using http://client.cors-api.appspot.com/client that CORS requests have been successfully enabled

