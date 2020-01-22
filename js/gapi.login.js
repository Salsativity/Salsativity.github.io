// Make sure the client is initalized and ready for login
function gapiLoadClient() {
      gapi.load('client:auth2', initClient);
}

function initClient() {
      gapi.client.init({
        'apiKey': GoogleApiKey,
        'clientId': GoogleClientId,
        'scope': GoogleApiPermissionScope,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
}

function updateSignInStatus(isSignedIn) {
      if (isSignedIn) {
        querySheet();
      }
}

function SignInClick(event) {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: GoogleApiPermissionScope})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
//    gapi.auth2.getAuthInstance().signIn();
}

function signOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}
