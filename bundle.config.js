module.exports = {
    bundle: {
        vendor: {
            scripts: [
                './bower_components/jquery/dist/jquery.min.js',
                './bower_components/Materialize/dist/js/materialize.min.js',
                './bower_components/angular/angular.min.js',
                './bower_components/angular-aria/angular-aria.min.js',
                './bower_components/angular-animate/angular-animate.min.js',
                './bower_components/angular-material/angular-material.min.js',
                './bower_components/angular-sanitize/angular-sanitize.min.js',
                './bower_components/a0-angular-storage/dist/angular-storage.min.js',
                './bower_components/angular-ui-router/release/angular-ui-router.min.js'
            ],
            styles: [
                './bower_components/Materialize/dist/css/materialize.min.css',
                './bower_components/angular-material/angular-material.min.css'
            ]
        }
    },
    //copy: './content/**/*.{png,svg}'
};