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
  var table, tr, td, i;
  table = document.getElementById("data_check_table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 1; i < tr.length; i++) {
   if(tr[i].style.display = "")
     console.log(i,'blank');
    else 
       console.log(i,'none') ;
  }
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
                var row = table.insertRow(-1);
                for (var j = 0; j < header.length; j++) 
                {
                    if(required_fields.includes(header[j]))
                    {
                       var cell = row.insertCell(-1);
                       cell.innerHTML = header[j];
                       required_cols.push(j);
                    }
                }
              
                var cell_template = row.insertCell(-1);
                var cell_check = row.insertCell(-1);
                cell_template.innerHTML = 'template_id';
                cell_check.innerHTML = 'send?';

                console.log(required_cols);

                for (var i = 1; i < rows.length; i++) 
                {
                    var row = table.insertRow(-1);
                    var cells = rows[i].split("\t");
                    for (var j in required_cols)
                    {
                       var cell = row.insertCell(-1);
                       cell.innerHTML = cells[required_cols[j]];
                    }
                    
                    // Add template id and checkbox
                    var cell_template = row.insertCell(-1);
                    var cell_check = row.insertCell(-1);
                    cell_template.innerHTML = create_template_selector('general_selector');
                    cell_check.innerHTML = '<input type="checkbox" id="myCheckbox"/><label  for="myCheckbox"></label>';
                }
                var dvCSV = document.getElementById("dvCSV");
                dvCSV.innerHTML = "";
                dvCSV.innerHTML += '<input type="text" id="myInput" onkeyup="filterRecords(1)" placeholder="Search for product names..">';
                dvCSV.appendChild(table);
                dvCSV.innerHTML += '<input type="button" id="submit" value="Submit" onclick="follow_up_bulk()" />';

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

console.log('Starting amzMagic');
