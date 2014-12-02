'use strict';

var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  watch = require('gulp-watch'),
  jshint = require('gulp-jshint'),
  livereload = require('gulp-livereload');


//register nodemon task
gulp.task('nodemon', function () {
  nodemon({ script: './bin/www', env: { 'NODE_ENV': 'development' }})
    .on('restart');
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    var server = livereload();
    gulp.src(['*.js','routes/*.js', 'public/*.js'], { read: true })
        .pipe(watch({ emit: 'all' }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

    gulp.watch(['*.js','routes/*.js', 'views/**/*.*', 'public/**/*.*']).on('change', function(file) {
      server.changed(file.path);
  });
});

//lint js files
gulp.task('lint', function() {
    gulp.src(['*.js','routes/*.js', 'public/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
function getGPS() // gets the users current position
{
    navigator.geolocation.getCurrentPosition(successGPS, errorGPS
 {enableHighAccuracy : true});
}
function successGPS(position) // stores the users position to be used later
{
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var curHTML = $('#gps_coords').html() + "lat="+lat + ",lon="+lon+"<br>";
     $('#gps_coords').html(curHTML);
}

function errorGPS() // failsafe incase of fatal error
{
     alert('Cannot find Location');
}
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['lint','nodemon', 'watch']);