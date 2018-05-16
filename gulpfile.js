/**
 * gulp处理ws-ts生成后的lib文件夹
 * 1. 将src里的所有文件全部复制出来
 * 2. 将package.json 和 README.MD两个文件复制至lib
 */
const gulp = require("gulp");
const addSrc = require("gulp-add-src");

const destination = "./lib";

gulp.task("default", () => {
  return gulp
    .src("./lib/src/**/*.*")
    .pipe(gulp.dest(destination))
    .pipe(addSrc(["./package.json", "./README.MD"]))
    .pipe(gulp.dest(destination));
});
