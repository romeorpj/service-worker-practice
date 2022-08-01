"use strict";

// indexedDB.deleteDatabase(WhiskyDB);

// !## Check for indexedDB support:
// indexedDB = indexedDB || mozIndexedDB || webkitIndexedDB;

// if (!window.indexedDB) {
// 	("log error message");
// }

// !## Open database
// - if you're updating the database, change the version number
// - probably dont want to use global variables in production

let request = window.indexedDB.open("QuizQuestDatabase", 1),
	db,
	transaction,
	oStore,
	index;

// !## Request Event Handlers

request.onupgradeneeded = (event) => {
	let db = request.result;
	let oStore = db.createObjectStore("QuestionsStore", { keyPath: "qID" });
	let index = oStore.createIndex("questionText", "questionText", {
		unique: false,
	});
};

request.onerror = (event) => {
	console.log(`An error occurred: ${event}`);
};

request.onsuccess = (event) => {
	console.log(`Database open was a success: ${event.target}`);
	db = request.result;
	transaction = db.transaction("QuestionsStore", "readwrite");
	oStore = transaction.objectStore("QuestionsStore");
	index = oStore.index("questionText");

	db.onerror = (event) => {
		// This catches all errors on the database
		console.log(`An error occurred: ${event.target.errorCode}`);
	};

	// ?Put data into the store;
	oStore.put({ qID: 1, questionText: "The sky is blue", answer: "True" });
	oStore.put({ qID: 2, questionText: "The grass is green", answer: "True" });

	// Close the transaction
	transaction.oncomplete = (event) => {
		db.close();
	};
};
