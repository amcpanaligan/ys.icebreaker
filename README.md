# ys.icebreaker
I want to learn more about angular-material directives as well as Firebase cloud services. Here I developed an icebreaker app that implements angular, materialize, firebase, and angularFire. The Firebase cloud used in this app is hosted on my personal account. Firebase is a REAL TIME (syncs real time to anyone connected) 'NOSQL' database that stores your data as JSON. Cool!

What's different?
 * You are now allowed to add, and view icebreaker questions (Through the list view), thanks to Firebase!
 * No repeating question

How it works
 * Retrieves data from Firebase to your browser's localstorage.
 * Randomizer queries from the questions saved to the browser's localstorage, meaning different browsers can have different remaining questions. However, adding/removing a question syncs to all clients, automatically adding/removing that question to every client's localstorage.

This app uses:
 * angular
 * Materialize
 * angular-material
 * angular-ui-router
 * a0-angular-storage
 * Firebase
 * angularFire

Try it on your own machine. Browse to the project's root directory and:
 * npm install (To install gulp components)
 * bower install (To install js and css components)
 * gulp min-js (To minify source js files)
 
You can also use 'gulp concat-js' to 'concat' all js files rather than minifying it. The 'concat' version is useful for debugging/development. Using the concat version requires you to change the source file in index.html to 'main.js'. By default the app uses the min source file named 'main.min.js'.

P.S. You will be needing an http server to run the app. Try downloading 'http-server' using npm.

Using http-server:
 * Go to the project's root directory (cd path/to/the/project)
 * http-server
 * Your app should be accessible via: http://localhost:8080/app/index.html
