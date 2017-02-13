
var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');



//CSS tasks
gulp.task('minify-css',function(){
	return gulp.src('/Users/elastic/Projects/music/static/build/css/*.css')
		.pip(minifyCSS())
		.pip(gulp.dest('/Users/elastic/Projects/music/static/build/css/'))
});

//JS
gulp.task('uglify',function(){
	return gulp.src('/Users/elastic/Projects/music/static/build/js/*.js)
		.pip(uglify())
		.pip(gulp.dest('/Users/elastic/Projects/music/static/build/js'))
});

gulp.task('minify',['minify-css','uglify']);
