
'use strict';

var AWS_ACCESS_KEY_ID = 'AKIAJWY7K7I7WDQRR5RA';
var AWS_SECRET_ACCESS_KEY = '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';
var amazon_mws_path = '../amz_mws/lib/amazon-mws';

// require(['../amz_mws/lib/amazon-mws'], function (foo) {
//     console.log('loaded');
//     console.log(foo);
// });

define(['require', amazon_mws_path], function (require) {
    var namedModule = require(amazon_aws_path)(AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY);
    console.log(namedModule);

});

// var amazonMws = require('../lib/amazon-mws')(AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY);

// console.log(amazonMws);


// var orderRequest = function () {
//     amazonMws.orders.search({
//         'Version': '2013-09-01',
//         'Action': 'ListOrders',
//         'SellerId': 'SELLER_ID',
//         'MWSAuthToken': 'MWS_AUTH_TOKEN',
//         'MarketplaceId.Id.1': 'MARKET_PLEACE_ID_1',
//         'LastUpdatedAfter': new Date(13, 12, 2016)
//     }, function (error, response) {
//         if (error) {
//             console.log('error ', error);
//             return;
//         }
//         console.log('response', response);
//     });
// };

// orderRequest();