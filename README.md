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

## Event Handlers

request.onupgradeneeded = (event)=>{
    <!-- !This event fires if this is the first time opening the database -->
    <!-- !Or if its a new version of the database -->
    <!-- This is where we update/add/delete our database tables stores(schema)-->

    <!-- ? Grab the database -->
    db = request.result;

    <!-- ? Create an object store -->
<!-- db.createObjectStore("StoreName",dataKey) -->
<!-- ! use key from data -> {keyPath: "unique key in data"} -->
<!-- ! auto increment key -> {autoIncrement: true} -->
    store = db.createObjectStore("StoreName", {keyPth: "qID"})

    <!-- ?Create index -->
    Index = store.createIndex(“indexName”, “propetyName its based on”, {options})
}




request.onerror = (event) => {
        console.log(`An error occurred: ${event}`);
}
    
request.onsuccess = (event) => {
    console.log(`Database open was a success: ${event}`);
    <!-- set db to the result of the open call -->
    <!-- Technically this is the conception of the database -->
    db = request.result;
};