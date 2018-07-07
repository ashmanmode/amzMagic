function singleFollowUp()
{
	var order_id = document.getElementById("order_id").value;
	var buyer_name = document.getElementById("buyer_name").value;
	var buyer_email = document.getElementById("buyer_email").value;
	var product_sku = document.getElementById("product_sku").value;
	var tracking_number = document.getElementById("tracking_number").value;
	var email_template_id = document.getElementById("email_template_id").value;

	// Create JSON
	var json = ''
	json += '{';
	json += '"order_id":"'+order_id+'",';
	json += '"buyer_name":"'+buyer_name+'",';
	json += '"buyer_email":"'+buyer_email+'",';
	json += '"product_sku":"'+product_sku+'",';
	json += '"tracking_number":"'+tracking_number+'",';
	json += '"email_template_id":"'+email_template_id+'"';
	json += '} ';

	var url = 'https://cors.io/?https://script.google.com/macros/s/AKfycbyKkqSxd9OTBvG6xP_1PCrTeAnVFj7XN9CoJruABe1D5UFjZLEn/exec?'

	var send_url = url+'data=' + json;
	
	console.log(send_url); 

	$.get(send_url, function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);
    });
	
}

var instance = M.Tabs.init(document.getElementById("tabs_ashish"));

$.support.cors = true;