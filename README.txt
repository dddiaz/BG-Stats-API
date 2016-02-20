README.txt

BG Stats API

Objective: Use AWS API Gateway and AWS Lambda to create an API to querry a MONGODB with BG values (From Nightscout).

WorkFlow Notes:
http://radify.io/blog/aws-lambda-workflow/

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

