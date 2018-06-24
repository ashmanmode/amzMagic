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
                }
                var dvCSV = document.getElementById("dvCSV");
                dvCSV.innerHTML = "";
                dvCSV.appendChild(table);

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