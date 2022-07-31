# good reads:

1. skipWaiting() - https://bitsofco.de/what-self-skipwaiting-does-to-the-service-worker-lifecycle/

2. MDN DOCUMENTATION:
3. https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers 


## IndexedDB
1. Open database
   1. indexedDB.open("databaseName",versionNumber)
   2. an openDBRequest is returned and you can now see a DB object in chrome application

2. Generate success and error handlers for requests
   1. request.onerror = (event) => {
  // Do something with request.errorCode!
  // Error occurred while trying to open DB
};
request.onsuccess = (event) => {
  // Do something with request.result!
  // DB has been opened... after upgradeneeded
};
request.onupgradeneeded = (event) => {
  // Do something with request.result!
};


Adding an index gives you the abilitiy to search the database for data
--
# Steps for working with indexedDB (also read google doc for step by step)
## Check for indexedDB support:
window.indexedDB = window.indexedDB || window.mozindexedDB || window.webkitIndexedDB || window.msIndexedDB;
if(!window.indexedDB){"log error message"}


## Open database
let request = 
if you're updting the database, change the version number.

## indexedDB.open
- running indexedDB.open resturns a response that can be an error or success. run an event handler to handle both cases.

