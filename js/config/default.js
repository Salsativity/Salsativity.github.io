var DestinationGoogleFormId = "1FAIpQLSdRMaP6VyoXWRKy4soR_RtRLL4DibFikwAYQFhb1lh2_GKx7A" // google sheet id from URL https://docs.google.com/forms/d/[...]/edit
var DestinationGoogleFormEntryId = "191679324" // thats the fieldId for the memberId //press the three vertical dashes in google forms and click on "link für Formalr mit Beispielwerten abrufen"
var DestinationGooglePrivateSpreadsheetId = "17-hjfI9oEAsSmAEZcIkKfoMzpaTGIuJd3wVV5X6zMYY" // google spreadsheets id from URL https://docs.google.com/spreadsheets/d/[....]/edit
var DestinationGooglePrivateSheetRange = [ "Formularantworten 1!B:G" ]
var DestinationGooglePublicSpreadsheetId = "1QqKgOTHMOSraR3KsF6eipUMU2KUeGG_HarmyRy8GuTE" // google spreadsheets id from URL https://docs.google.com/spreadsheets/d/[....]/edit that has the importrange setup to only import public data
var DestinationGooglePublicSheetRange = [ "Tabellenblatt1!A:G" ]
var ContactDomain = "salsativity.org"
var ContactAddress = "anmeldungen"
var GoogleApiKey = 'AIzaSyBlGosN-bpWSGekqiZ0GzlLxxsZcW0zlMg';  // this key is restricted to referer salsativity.github.io
var GoogleClientId = '43003984043-u7tnn8lve8psj8ogpv6h8vurm4pftah8.apps.googleusercontent.com';  // this ClientId is restricted to internal salsativity users only
      // TODO: Authorize using one of the following scopes:
      //   'https://www.googleapis.com/auth/spreadsheets'
      //   'https://www.googleapis.com/auth/spreadsheets.readonly'
var GoogleApiPermissionScope = 'https://www.googleapis.com/auth/spreadsheets.readonly';