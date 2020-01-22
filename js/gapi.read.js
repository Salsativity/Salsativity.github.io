// Make sure the client is loaded and sign-in is complete before calling this method.
function querySheet() {
     var request = gapi.client.sheets.spreadsheets.values.Get({
      "spreadsheetId": DestinationGoogleSpreadsheetId,
      "ranges": [ DestinationGoogleSheetRange ]
      "valueRenderOption": "FORMATTED_VALUE",
      "dateTimeRenderOption": 'SERIAL_NUMBER'
    })
    request.then(function(response) {
                // Handle the results here (response.result has the parsed body).
                 console.log(response.result);
                populateSheet(response.result);
              },
              function(reason) {
                  console.error('error: ' + reason.result.error.message);
              });
}
function populateSheet(result) {
  var i=0, j=0;
  for(var range = 0; range < result.valueRanges.length; range++) {
      for(var row=0; row<result.valueRanges[range].values.length; row++, i++) {
          for(var col=0, j=0; col<result.valueRanges[range].values[row].length; col++, j++) {
              document.getElementById(i+":"+j).value = result.valueRanges[range].values[row][col];
          }
      }
  }
}
