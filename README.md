# registration.salsativity.org

This is a static webpage used for registering and checking the registration for SPORTUNION Salsativity Courses (a non-for-profit Organisation)

## Table of Contents

- [Deployment](#Deployment)
- [Buildingblocks](#Buildingblocks)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)

## Deployment

Change any code here, when comitted the changes are viewable on (https://registration.salsativity.org):

## Buildingblocks

- Public Google Sheets table
  this contains the public viewable (linked from the private google sheets table) records:

  - memberId registered
  - payment information
  - course registrations

- Private Google Sheets table
  this contains all the infromation submitted via Form

  - app script that provides the link for editing the form
  - firstname
  - lastname
  - e-mail address

- Google Forms
  this contains all the questions for the membership and course registration

- [Google APIs](https://console.developers.google.com)
  For accessing the Google Sheets you will need to setup OAuth 2.0-Client-IDs and API for Google Sheet
  - Enable the Google Sheet API for the organisation
  - Create an API Key for the Application (limit to the referer)
  - Create an Oauth 2.0-Client-ID (limited to the exact application url)
  
- Javascript Code
  configuration for containing the matching Google Sheets Public and Private table
  `js/config/default.js`

## Usage

the content of `index.html` together represents an implementation of the userstories:

### As a non-member of the organisation i would like to become a member:

1. receive a memerbship card with a QR Code from the organisation
   ���this will contain an empty field for first/lastname and payment
2. the non-member scans the QR Code
3. Browser opens to http://register.salsativity.org?memberId=[1-9]* and is redirected to https://salsativity.github.io/?memberId=2123
4. Javascript Code checks if cookie "roles" is not set to "guard"
5. memberId=[1-9] is checked against the public google sheet and no registration is found
6. Browser is redirected to the google form
7. Google Forms is adding the entries into the private table
8. public table links the relevant fields to the private table

### Checking a Membership as participant member

As a registered member i would like to check my payment status and registration to the courses:

1. the (already registered) member scans the QR Code
2. Browser opens to http://register.salsativity.org?memberId=[1-9]* and is redirected to https://salsativity.github.io/?memberId=2123
3. Javascript Code checks if cookie "roles" is not set to "guard"
4. memberId=[1-9] is checked against the public google sheet and the id is already registered
5. Browser renders a QR Code with mailto: link that asks an email address to provide the link for editing the form
6. Browser shows payment and course registration information

### Checking a Membership at event admission

As member working at the event admission (guard) i would like to check the payment and course registration of the member showing the card

#### in preperation to the event the guard opens http://register.salsativity.org:

1. presses the "login" button
2. selects the google account of the organisation to login (which should be alrady registered on his/her smartphone
3. presses the "guard" button
4. makes shure he/she has access to the Private Google Sheets table

#### at the event:

1. the member provides the guard with a QR Code (either via smartphone or membership card)
2. the guard scans the QR Code
3. Browser opens to http://register.salsativity.org?memberId=[1-9]* and is redirected to https://salsativity.github.io/?memberId=2123
4. Javascript Code checks if cookie "roles" is set to "guard"
5. memberId=[1-9] is checked against the private google sheet and the id is already registered
6. the guard is displayed the information from the private sheet including a QR Code to scan for the member in order to change the course registration

## Support

Please [open an issue](https://github.com/Salsativity/Salsativity.github.io/issues/new) for support.

## Contributing

Use [Codesandbox.io](https://codesandbox.io/) to edit or test code. Testing login/logout, you will have to update the Google API OAuth 2.0-Client-IDs to match the [....].codesandbox.io and [....].csb.app URL

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/Salsativity/Salsativity.github.io/compare/).
