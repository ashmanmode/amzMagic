function filterRecords(column_num) {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("data_check_table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[column_num];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

function create_template_selector(id_name)
{
  var html = '<div class="input-field col s12"><select id='+id_name+'><option value="" disabled selected>Choose your option</option>';
  
  for (var i = 0; i < listTemplates.length; i++) 
  {
    html += '<option value="'+i.toString()+'">'+listTemplates[i]+'</option>';
  }
  html += '</select></div>';
  return html;
}

function follow_up_bulk()
{
  console.log("Doing bulk follow up");
  // Declare variables 
  var table, tr, e, template_id, is_send, i, json;
  table = document.getElementById("data_check_table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  var upload_json = '[';
  for (i = 1; i < tr.length; i++) 
  {
    if(tr[i].getElementsByTagName("td")[display_fields.length].innerHTML == 'Already Sent')
      continue;
    e = tr[i].getElementsByTagName("td")[display_fields.length].children[0].children[0];
    template_id = e.options[e.selectedIndex].text;
    is_send = tr[i].getElementsByTagName("td")[display_fields.length+1].children[0].checked;

    if(is_send)
    {
      if(!listTemplates.includes(template_id))
      {
         document.getElementById("message").innerHTML = '&nbsp;&nbsp;You must select mail template for follow up.';
         return;
      }

      json = ''
      json += '{';
      json += '"order_id":"'+table_data[i-1][0]+'",';
      json += '"buyer_email":"'+table_data[i-1][1]+'",';
      json += '"buyer_name":"'+table_data[i-1][2]+'",';
      json += '"product_sku":"'+table_data[i-1][3]+'",';
      json += '"tracking_number":"'+table_data[i-1][4]+'",';
      json += '"email_template_id":"'+template_id+'"';
      json += '} ';
      upload_json += json + ',';
    }
  }

  upload_json = upload_json.slice(0,-1) + ']';
  if(upload_json == ']')
  {
    document.getElementById("message").innerHTML = '&nbsp;&nbsp;Select record to send mails.';
    return;
  }

  var send_url = 'https://cors.io/?https://script.google.com/macros/s/AKfycbyKkqSxd9OTBvG6xP_1PCrTeAnVFj7XN9CoJruABe1D5UFjZLEn/exec?'
  send_url += 'request_type=bulk&data=' + upload_json;

  console.log(send_url);
  document.getElementById("message").innerHTML = '&nbsp;&nbsp;Processing';
  document.getElementById("message").style.color = 'black';

  // Send http request // uncomment to send
  // $.get(send_url, function(data, status){
  //       console.log("Data: " + data + "\nStatus: " + status);
  //       if (status) {
  //         console.log('MAIL SENT');
  //         document.getElementById("message").innerHTML = '&nbsp;&nbsp;Success';
  //         document.getElementById("message").style.color = 'green';
  //       }
  //       else
  //       {
  //         console.log('FAILED! Please try again.');
  //         document.getElementById("message").innerHTML = '&nbsp;&nbsp;FAILED';
  //       }
  //   });
}

function fileUpload() 
{
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) 
    {
        if (typeof (FileReader) != "undefined") 
        {
            var reader = new FileReader();
            reader.onload = function (e) 
            {
                var table = document.createElement("table");
                table.id = "data_check_table";
                var rows = e.target.result.split("\n");

                var header = rows[0].split("\t");
                var required_cols = [] ;
                var display_cols = [];
                var row = table.insertRow(-1);
                for (var j = 0; j < header.length; j++) 
                {
                    if(display_fields.includes(header[j]))
                    {
                       var cell = row.insertCell(-1);
                       cell.innerHTML = header[j];
                       display_cols.push(j);
                    }
                    if(required_fields.includes(header[j]))
                      required_cols.push(j);
                }
              
                var cell_template = row.insertCell(-1);
                var cell_check = row.insertCell(-1);
                cell_template.innerHTML = 'template_id';
                cell_check.innerHTML = 'send?';

                console.log(display_cols);
                console.log(required_cols);

                for (var i = 1; i < rows.length; i++) 
                {
                    var row = table.insertRow(-1);
                    var cells = rows[i].split("\t");
                    var already_sent = false;
                    var time_hai_aur = false;

                    // If this order ID already taken then say sent mail
                    if(prev_orders.includes(cells[display_cols[0]]))
                    {
                       console.log('already sent '+cells[display_cols[0]]);
                       row.style.color = '#ABEBC6';
                       already_sent = true;
                    }


                    for (var j in display_cols)
                    {
                       var cell = row.insertCell(-1);
                       cell.innerHTML = cells[display_cols[j]];

                       if(j==display_cols.length-1)
                       {
                         var d = new Date(cells[display_cols[j]].split("T")[0]);
                         var today = new Date()
                         if(d <= today)
                         {
                          cell.innerHTML = d.toDateString();
                          if(!already_sent)
                            row.style.color = 'black';
                         }
                         else
                         {
                          cell.innerHTML = "Time hai aur!";
                          row.style.color = '#F1948A';
                          time_hai_aur = true;
                         }
                       }
                    }

                    // Only to send data to server
                    var data = [];
                    for(var j in required_cols)
                      data.push(cells[required_cols[j]]);
                    table_data.push(data)
                    
                    // Add template id and checkbox
                    var cell_template = row.insertCell(-1);
                    var cell_check = row.insertCell(-1);
                    cell_template.innerHTML = create_template_selector('general_selector');
                    cell_check.innerHTML = '<input type="checkbox"/>';

                    if(already_sent)
                    {
                      cell_check.innerHTML = "";
                      cell_template.innerHTML = 'Already Sent';
                    }

                    if(time_hai_aur)
                    {
                      cell_check.innerHTML = "";
                      cell_template.innerHTML = 'Send Later';
                    }
                }
                var dvCSV = document.getElementById("dvCSV");
                dvCSV.innerHTML = "";
                dvCSV.innerHTML += '<input type="text" id="myInput" onkeyup="filterRecords(1)" placeholder="Search for product names..">';
                dvCSV.appendChild(table);
                dvCSV.innerHTML += '<input type="button" id="submit" value="Submit" onclick="follow_up_bulk()" />';
                dvCSV.innerHTML += '<label id="message" style="color:red"></label>';

            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else 
    {
        alert("Please upload a valid CSV file.");
    }
}

function load_prev_order_list()
{
  var send_url = 'https://cors.io/?https://script.google.com/macros/s/AKfycbyKkqSxd9OTBvG6xP_1PCrTeAnVFj7XN9CoJruABe1D5UFjZLEn/exec?request_type=prev_sent_list';
  $.get(send_url, function(data, status){
        if (status) 
        {
          //console.log("Data: " + data + "\nStatus: " + status);
          json_obj = JSON.parse(data);
          if(json_obj.status=="success")
          {
            console.log('Loaded prev orders '+json_obj.responce);
            var form = '<input type="file" id="fileUpload" /><input type="button" id="upload" value="Upload" onclick="fileUpload()" /><hr /><div id="dvCSV"></div>';
            document.getElementById("container").innerHTML = form;
            prev_orders =  json_obj.responce.split(',')
          }
        }
        else
        {
          console.log('Download FAILED! Please try again.');
          var form = '<input type="file" id="fileUpload" /><input type="button" id="upload" value="Upload" onclick="fileUpload()" /><hr /><div id="dvCSV"></div>';
            document.getElementById("container").innerHTML = form;
        }
    });
}


var prev_orders = [];
var table_data = [];

console.log('Starting amzMagic');
load_prev_order_list();