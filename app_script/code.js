// Follow up status codes
var NO_FOLLOW_UP = 'NO_FOLLOW_UP';
var MAIL_SENT = 'MAIL_SENT';

// Database Path
var urlProductDB = 'https://docs.google.com/spreadsheets/d/1FUozxo1rJIrCHqNhdvFAq34koczHUZXsWRTOL3bdLgM/edit#gid=0';
var urlOrderLog = 'https://docs.google.com/spreadsheets/d/1Ardeg4G8hYElAUNvuw2vozt9hds01DPxflST3xiT0FU/edit#gid=0';
var urlMailTemplate = 'https://docs.google.com/spreadsheets/d/16OB_AoHdyvDi62JXKLaSVtPTBJnmpGrWamLTz-L_beo/edit#gid=0';

// Global Variables
var maxNumProducts = 3;
var maxNumTemplates = 1;
var maxNumLog = 100;

//Utility Functions
function array2numMapping(arr) { return arr[0]; }

// Function returns product Info for array of SKU's
// param: productSKU : Array
function getProductInfo(listProductSKU)
{
  var ss = SpreadsheetApp.openByUrl(urlProductDB);
  var sheet_0 = ss.getSheets()[0];
  var dataAll = sheet_0.getRange("A2:E"+parseInt(maxNumProducts+1)).getDisplayValues();
  var dataSKU = dataAll.map(array2numMapping);
  
  var res = [];
  for(var sku in listProductSKU) // While products in DB
  {
    var i = dataSKU.indexOf(listProductSKU[sku]) ;
    if(i == -1)
      break;
    
    var product = {
      productSKU : dataAll[i][0],
      productASIN : dataAll[i][1],
      productBrand : dataAll[i][2],
      productName : dataAll[i][3],
      productImage : dataAll[i][4]
    };
    res.push(product);
  }
  return res;
}

// Function returns product Info for array of SKU's
// param: productSKU : Array
function getTemplates(listTemplates)
{
  var ss = SpreadsheetApp.openByUrl(urlMailTemplate);
  var sheet_0 = ss.getSheets()[0];
  var dataAll = sheet_0.getRange("A2:C"+parseInt(maxNumTemplates+1)).getDisplayValues();
  var dataID = dataAll.map(array2numMapping);
  
  var i = 0 ;
  var res = [];
  for(var templateID in listTemplates)// While products in DB
  {
    var i = dataID.indexOf(listTemplates[templateID]) ;
    if(i == -1)
      break;
    
    var template = {
      templateID : dataAll[i][0],
      templateSubject : dataAll[i][1],
      templateBody : dataAll[i][2]
    };
    res.push(template);
  }
  return res;
}

function followUpSingle(data) 
{
  
  var order_id = data['order_id'];
  var buyer_name = data['buyer_name'];
  var buyer_email = data['buyer_email'];
  var product_sku = data['product_sku'];
  var tracking_number = data['tracking_number'];
  var email_template_id = data['email_template_id'];
  
  // Error Handling
  if(!order_id || !buyer_name || !buyer_email || !product_sku || !email_template_id)
    return 'Insufficient Data';
    
    
  // Load Order Log Sheet
  var ss = SpreadsheetApp.openByUrl(urlOrderLog);
  var sheet_0 = ss.getSheets()[0];
  
  // Load Product and Template
  var prodInfo = getProductInfo([product_sku])[0];
  var template = getTemplates([email_template_id])[0];
  
  // Create Email
  var subject = template.templateSubject.replace("$$order_id$$",order_id);
  var content = template.templateBody ;
  
  content = content.replace("$$product_asin$$",prodInfo.productASIN);
  content = content.replace("$$product_brand$$",prodInfo.productBrand);
  content = content.replace("$$product_name$$",prodInfo.productName);
  content = content.replace("$$product_image$$",prodInfo.productImage);
  content = content.replace("$$buyer_name$$",buyer_name);
  content = content.replace("$$order_id$$",order_id);
  
  // Add to the log if dose not exist
  var dataAll = sheet_0.getRange("A2:F"+parseInt(maxNumLog+1)).getDisplayValues();
  var dataID = dataAll.map(array2numMapping);
  var index = dataID.indexOf(order_id);
  
  if(index == -1)
  {
    // Send mail
    GmailApp.sendEmail(buyer_email, subject, 'Sample', {htmlBody: content});
    
    var row = [order_id,buyer_name,buyer_email,tracking_number,product_sku,MAIL_SENT];
    sheet_0.appendRow(row);
  }
  
  return 'Mail sent for order ID : ' + order_id + ' content\n' + content;
}

// Function for single update
function doGet(e)
{
  var data = JSON.parse(e['parameter']['data']);
  
  var responce = followUpSingle(data);
  return HtmlService.createHtmlOutput(responce);
}

