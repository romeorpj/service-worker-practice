"use strict";

// !## Check for indexedDB support:
window.indexedDB =
	window.indexedDB ||
	window.mozindexedDB ||
	window.webkitIndexedDB ||
	window.msIndexedDB;
if (!window.indexedDB) {
	("log error message");
}

// !## Open database
// - if you're updating the database, change the version number
// - probably dont want to use global variables in production

let request = window.indexedDB.open("QuizQuestDatabase", 1),
	db,
	transaction,
	oStore,
	index;
