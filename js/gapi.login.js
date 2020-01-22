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

function loadClient() {
      gapi.load('client:auth2', initClient);
}
function updateSignInStatus(isSignedIn) {
      if (isSignedIn) {
        querySheet();
      }
}
function SignInClick() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: GoogleApiPermissionScope})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
}

function signOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}
