/* exported myFunction */
/* global LocalizedMessage */

const LOCALE = Session.getActiveUserLocale();
// or SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetLocale();

function myFunction() {
  var localMessage = new LocalizedMessage(LOCALE);
  var testMessage = localMessage.messageList.sampleMessage;
  console.log(testMessage);
}
