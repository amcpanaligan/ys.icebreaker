# ys.icebreaker
Self interest development of a simple icebreaker app for ys, in conjunction with my desire to learn material design and angular-material directives.

This app uses:
 * angular
 * Materialize
 * angular-material
 * angular-ui-router
 * a0-angular-storage

Try it on your own machine. Browse to the project's root directory and:
 * npm install (To install gulp components)
 * bower install (To install js and css components)
 * gulp min-js (To minify source js files)
 
You can also use 'gulp concat-js' to 'concat' all js files rather than minifying it. Concatenated files are useful for debugging. Using the concat version requires you to change the source file in index.html to 'main.js'. By default the app uses the min source file named 'main.min.js'.

P.S. You will be needing an http server to run the app. Try downloading 'http-server' using npm.
