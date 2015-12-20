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

Make sure you have a settings.js file of the format:
module.exports = {
   db: 'your mongo db'
};


TODO
restrict api acesss

http://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.html

test Stage:
Invoke URL: https://uxlmtxq0vb.execute-api.us-east-1.amazonaws.com/test