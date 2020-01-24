// Make sure the client is loaded and sign-in is complete before calling this method.
function queryPrivateSheet() {
     var params = {
     "spreadsheetId": DestinationGooglePrivateSpreadsheetId,
     "ranges": DestinationGooglePrivateSheetRange,
     "valueRenderOption": "FORMATTED_VALUE",
     "dateTimeRenderOption": 'SERIAL_NUMBER'
    };
    var request = gapi.client.sheets.spreadsheets.values.batchGet(params);
    request.then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log(response.result);
                updateInputForms(response.result);
                updateImagesPrivate(response.result);
              },
              function(reason) {
                  console.error('error: ' + reason.result.error.message);
              });
}
//
function queryPublicSheet() {
     var params = {
     "spreadsheetId": DestinationGooglePublicSpreadsheetId,
     "ranges": DestinationGooglePublicSheetRange,
     "valueRenderOption": "FORMATTED_VALUE",
     "dateTimeRenderOption": 'SERIAL_NUMBER'
    };
    var request = gapi.client.sheets.spreadsheets.values.batchGet(params);
    request.then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log(response.result);
                updateInputForms(response.result);
              },
              function(reason) {
                  console.error('error: ' + reason.result.error.message);
              });
}

// populate input forms  code
function updateInputForms(result) {
  // i, j query matrix 
  // g output row matrix (future improvement: more output rows)
  var i=0, j=0; g=0; 
  // loop through all the ranges (future improvement: request multiple ranges so we don´t need to load the full spreadsheet/full range) 
  for(var range = 0; range < result.valueRanges.length; range++) {
      // loop through all the google sheet rows within the range
      for(var row=0; row<result.valueRanges[range].values.length; row++, i++) {
          // check if the memberId matches the first field
          if (queryString("memberId") != null && result.valueRanges[range].values[row][0]==queryString("memberId")) {
            g++
         }
         // loop through all the google sheet columns in this row and range
		 for(var col=0, j=0; col<result.valueRanges[range].values[row].length; col++, j++) {
              // write headers
              if (row == 0)  {
                 document.getElementById(0+":"+j).value = result.valueRanges[range].values[row][col];
             }
             // write values if queryString Memberid matches the first field in the row
             if (queryString("memberId") != null && result.valueRanges[range].values[row][0]==queryString("memberId"))  {
                 document.getElementById(g+":"+j).value = result.valueRanges[range].values[row][col];
          }
         }  
      }
  }
}

// populate qr image
function updateImagesPrivate(result) {
  // i, j query matrix 
  // g output row matrix (future improvement: more output rows)
  var i=0, j=0; g=0; 
  // loop through all the ranges (future improvement: request multiple ranges so we don´t need to load the full spreadsheet/full range) 
  for(var range = 0; range < result.valueRanges.length; range++) {
      // loop through all the google sheet rows within the range
      for(var row=0; row<result.valueRanges[range].values.length; row++, i++) {
        // check if queryString Memberid matches the second field [1] in the row
        if (queryString("memberId") != null && result.valueRanges[range].values[row][1]==queryString("memberId")) {
            g++
            // check if queryString Memberid matches the second [1] field and update QR Code and link
            document.getElementById(g+":QR-img").src = "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl="+encodeURIComponent(result.valueRanges[range].values[g][4]);
            document.getElementById(g+":QR-a").href = result.valueRanges[range].values[g][4]);
        }
      }  
  }
}
