//check if member at ID even exists
function redirectGuardOrMember() {
  console.log("Redirecting");
  queryPublicSheet();
}

// Make sure the client is loaded and sign-in is complete before calling this method.
function queryPrivateSheet() {
  var params = {
    spreadsheetId: DestinationGooglePrivateSpreadsheetId,
    ranges: DestinationGooglePrivateSheetRange,
    valueRenderOption: "FORMATTED_VALUE",
    dateTimeRenderOption: "SERIAL_NUMBER"
  };
  console.debug("querying private sheet");
  var request = gapi.client.sheets.spreadsheets.values.batchGet(params);
  request.then(
    function (response) {
      // Handle the results here (response.result has the parsed body).
      console.log(response.result);
      // MemberId is in second field (1)
      updateInputForms(response.result, 1);
      // updateImagesPrivate(response.result); removed due to it not working properly
    },
    function (reason) {
      console.error("error: " + reason.result.error.message);
    }
  );
}
//
function queryPublicSheet() {
  var params = {
    spreadsheetId: DestinationGooglePublicSpreadsheetId,
    ranges: DestinationGooglePublicSheetRange,
    valueRenderOption: "FORMATTED_VALUE",
    dateTimeRenderOption: "SERIAL_NUMBER"
  };
  console.debug("querying public sheet");
  var request = gapi.client.sheets.spreadsheets.values.batchGet(params);
  request.then(
    function (response) {
      // Handle the results here (response.result has the parsed body).
      console.log(response.result);
      // MemberId is in firstfield (0)
      updateInputForms(response.result, 0);
    },
    function (reason) {
      console.error("error: " + reason.result.error.message);
    }
  );
}
// populate input forms  code
function updateInputForms(result, memberIdField) {
  clearTable();
  // i, j query matrix
  // g output row matrix (future improvement: more output rows)
  var i = 0,
    j = 0,
    g = 0;
  var isRegisteredMember = false;
  // loop through all the ranges (future improvement: request multiple ranges so we don�t need to load the full spreadsheet/full range)
  for (var range = 0; range < result.valueRanges.length; range++) {
    // loop through all the google sheet rows within the range
    for (
      var row = 0;
      row < result.valueRanges[range].values.length;
      row++, i++
    ) {
      // check if the memberId matches the memberIdField field
      if (
        queryString("memberId") != null &&
        result.valueRanges[range].values[row][memberIdField] ==
          queryString("memberId")
      ) {
        g++;
        isRegisteredMember = true;
        console.debug("Matched Memberid and Field");
      }
      // loop through all the google sheet columns in this row and range
      for (
        var col = 0, j = 0;
        col < result.valueRanges[range].values[row].length;
        col++, j++
      ) {
        // write headers
        if (row == 0) {
          document.getElementById(0 + ":" + j).value =
            result.valueRanges[range].values[row][col];
        }
        // write values if queryString Memberid matches the first field in the row
        if (
          queryString("memberId") != null &&
          result.valueRanges[range].values[row][memberIdField] ==
            queryString("memberId")
        ) {
          document.getElementById(g + ":" + j).value =
            result.valueRanges[range].values[row][col];
        }
      }
    }
  }
  // redirect if its a member and does not have any memerbId registered fixme: this should not be done here
  if (
    queryString("memberId") != null &&
    getCookie("roles") != "guard" &&
    !isRegisteredMember
  ) {
    console.debug("Requesting new Form");
    var url =
      "https://docs.google.com/forms/d/e/" +
      encodeURIComponent(DestinationGoogleFormId) +
      "/viewform?usp=pp_url&entry." +
      encodeURIComponent(DestinationGoogleFormEntryId) +
      "=" +
      encodeURIComponent(queryString("memberId"));
    window.location.href = url;
  }

  //update Qr image to reflect card URL
  if (queryString("memberId") != null && isRegisteredMember) {
    console.debug("Updateing QR with current page");
    updateQRCode(1, window.location.href); //update with current page
  }
}

// populate qr image with link of form
// removed function below, as googles internal "continue edit on form" makes this feature more confusing than useful (sadly)
function updateImagesPrivate(result) {
  // i, j query matrix
  // g output row matrix (future improvement: more output rows)
  var i = 0,
    j = 0,
    g = 0;
  // loop through all the ranges (future improvement: request multiple ranges so we don�t need to load the full spreadsheet/full range)
  for (var range = 0; range < result.valueRanges.length; range++) {
    // loop through all the google sheet rows within the range
    for (
      var row = 0;
      row < result.valueRanges[range].values.length;
      row++, i++
    ) {
      // check if queryString Memberid matches the second field [1] in the row
      if (
        queryString("memberId") != null &&
        result.valueRanges[range].values[row][1] == queryString("memberId")
      ) {
        g++;
        // check if queryString Memberid matches the second [1] field and update QR Code and link
        updateQRCode(g, result.valueRanges[range].values[g][4]); //CAREFUL, This link has sensitive Data in it
      }
    }
  }
}
