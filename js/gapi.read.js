// Make sure the client is loaded and sign-in is complete before calling this method.
function querySheet() {
     var params = {
     "spreadsheetId": DestinationGoogleSpreadsheetId,
     "ranges": DestinationGoogleSheetRange,
     "valueRenderOption": "FORMATTED_VALUE",
     "dateTimeRenderOption": 'SERIAL_NUMBER'
    };
    var request = gapi.client.sheets.spreadsheets.values.batchGet(params);
    request.then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log(response.result);
                updateInputForms(response.result);
                updateImages(response.result);
              },
              function(reason) {
                  console.error('error: ' + reason.result.error.message);
              });
}
// populate html code
function updateInputForms(result) {
  // i, j query matrix 
  // g output row matrix
  var i=0, j=0; g=0; 
  for(var range = 0; range < result.valueRanges.length; range++) {
      for(var row=0; row<result.valueRanges[range].values.length; row++, i++) {
          if (queryString("memberId") != null && result.valueRanges[range].values[row][1]==queryString("memberId")) {
			  g++
	      }
		  for(var col=0, j=0; col<result.valueRanges[range].values[row].length; col++, j++) {
              // write headers
              if (row == 0)  {
                 document.getElementById(0+":"+j).value = result.valueRanges[range].values[row][col];
             }
             // write values
             if (queryString("memberId") != null && result.valueRanges[range].values[row][1]==queryString("memberId"))  {
				 document.getElementById(g+":"+j).value = result.valueRanges[range].values[row][col];
          }
         }  
      }
  }
}

// populate html code
function updateImages(result) {
     // check if we have a memberId thats matching
  var i=0, j=0; g=0; 
  for(var range = 0; range < result.valueRanges.length; range++) {
      for(var row=0; row<result.valueRanges[range].values.length; row++, i++) {
        if (queryString("memberId") != null && result.valueRanges[range].values[row][1]==queryString("memberId")) {
			g++
			document.getElementById(g+":"+j).src = "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl="+encodeURIComponent(result.valueRanges[range].values[row][col]);
        }
      }  
  }
}
