      // Client ID and API key from the Developer Console
      var CLIENT_ID = ;

      var APIKEY = ;


      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar";

      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');
      var addButton = document.getElementById('addToCalendar');


      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: APIKEY,
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          addToCalendar.style.display = 'block';
          listUpcomingEvents();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
          addToCalendar.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listUpcomingEvents() {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(function(response) {
          var events = response.result.items;
          appendPre('Upcoming events:');

          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + ' (' + when + ')')
            }
          } else {
            appendPre('No upcoming events found.');
          }
        });
      }

      addButton.onclick = function(){
  var userChoices = getUserInput();
  console.log(userChoices);
  if (userChoices) 
    createEvent(userChoices);
}

function getUserInput(){
  
  var date = document.querySelector("#date").value;
  var startTime = document.querySelector("#start").value;
  var endTime = document.querySelector("#end").value;
  var eventDesc = document.querySelector("#event").value;
  
  // check input values, they should not be empty
  if (date=="" || startTime=="" || endTime=="" || eventDesc==""){
    alert("All your input fields should have a meaningful value.");
    return
  }
  else return {'date': date, 'startTime': startTime, 'endTime': endTime,
               'eventTitle': eventDesc}
}


// Make an API call to create an event.  Give feedback to user.
function createEvent(eventData) {
  // First create resource that will be send to server.
    var resource = {
        "summary": eventData.eventTitle,
        "start": {
          "dateTime": new Date(eventData.date + " " + eventData.startTime).toISOString()
        },
        "end": {
          "dateTime": new Date(eventData.date + " " + eventData.endTime).toISOString()
          }
        };
    // create the request
    var request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': resource
    });
  
    // execute the request and do something with response
    request.execute(function(resp) {
      console.log(resp);
      alert("Your event was added to the calendar.");
    });
}
