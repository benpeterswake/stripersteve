'use strict';

console.log('Loading function');

var AWS = require('aws-sdk')
var ses = new AWS.SES()

var RECEIVERS = ['striperstevellc@gmail.com'];
var SENDER = 'striperstevellc@gmail.com'; // Amazon SES

exports.handler = (event, context, callback) => {
    console.log('Received event:', event);
    sendEmail(event, function (err, data) {
        var response = {
            "isBase64Encoded": false,
            "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://d3kbsxvq7os3rv.cloudfront.net' },
            "statusCode": 200,
            "body": "{\"result\": \"Success.\"}"
        };
        callback(err, response);
    });
};

function sendEmail (event, done) {

    var data = event;

    var params = {
        Destination: {
            ToAddresses: RECEIVERS
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Name: ' + data.name + '\nEmail: ' + data.email +'\nPhone: ' + data.phone + '\nMessage: ' + data.message,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Contact Form inquiry: ' + data.name,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    ses.sendEmail(params, done);
}