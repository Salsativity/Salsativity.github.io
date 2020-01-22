// Make sure the client is loaded and sign-in is complete before calling this method.
function querySheet() {
     var request = gapi.client.sheets.spreadsheets.values.BatchGet({
      "spreadsheetId": DestinationGoogleSpreadsheetId,
      "range": DestinationGoogleSheetRange,
      "valueRenderOption": "FORMATTED_VALUE",
      "dateTimeRenderOption": 'SERIAL_NUMBER'
    })
    request.then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                populateSheet(response.result);
              },
              function(reason) {
                  console.error('error: ' + reason.result.error.message);
              });
}
