"use strict";

let gulp = require("gulp");
require("./webpack");
require("./watch");

gulp.task(
    "watch",
    gulp.series("watch-sass", "watch-assets", "watch-client-js", "watch-tests")
);

gulp.task("generate-assets", gulp.series("sass", "webpack"));

gulp.task("build", gulp.series("generate-assets"));

gulp.task("default", gulp.series("build"));

gulp.task("dev", gulp.series("build", "watch", "server"));
