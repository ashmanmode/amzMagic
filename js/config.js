
var all_fields = 
[
	"amazon-order-id","merchant-order-id","shipment-id",
	"shipment-item-id","amazon-order-item-id","merchant-order-item-id",
	"purchase-date","payments-date","shipment-date",
	"reporting-date","buyer-email","buyer-name",
	"buyer-phone-number","merchant-sku","title",
	"quantity-shipped","currency","item-price",
	"item-tax","shipping-price","shipping-tax",
	"gift-wrap-price","gift-wrap-tax","ship-service-level",
	"recipient-name","ship-address-1","ship-address-2",
	"ship-address-3","ship-city","ship-state","ship-postal-code",
	"ship-country","ship-phone-number","bill-address-1",
	"bill-address-2","bill-address-3","bill-city","bill-state",
	"bill-postal-code","bill-country","item-promotion-discount",
	"ship-promotion-discount","carrier","tracking-number",
	"estimated-arrival-date","fulfillment-center-id",
	"fulfillment-channel","sales-channel"
];


var required_fields = 
[
	"amazon-order-id", "buyer-name", "buyer-email", "sku",
	"tracking-number"
];

// Keep Estimated arrival date at last of the array
var display_fields = 
[
	"amazon-order-id", "product-name", "buyer-name", "item-price", "estimated-arrival-date"
]

var listTemplates = 
[ "crochet_01","crochet_promotional", "seller_review"] ;


// Naming Conventions ..
var CONST_already_sent = 'Already Sent';
var CONST_send_later = 'Send Later';