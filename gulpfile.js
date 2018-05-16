/**
 * gulp处理ws-ts生成后的lib文件夹
 * 1. 将src里的所有文件全部复制出来
 * 2. 将package.json 和 README.MD两个文件复制至lib
 */
const path = require("path");
const gulp = require("gulp");
const addSrc = require("gulp-add-src");
const vinylPaths = require("vinyl-paths");
const fs = require("fs");

// 操作目录
const destination = "./lib";
// 类型文件夹的目录
const interface_path = path.resolve(__dirname, "lib/interfaces");
// 替换字符
const replace_file = (file_path, target) => {
  fs.readFile(file_path, (err, data) => {
    if (!err) {
      if (data.indexOf("@interfaces") != -1) {
        console.log(`替换 => ${file_path}`);
        let newSource = data.toString().replace("@interfaces", target);
        fs.writeFile(file_path, newSource, err => {
          if (err) {
            console.error(err);
          }
        });
      }
    } else {
      console.error(err);
    }
  });
};

gulp.task("copy", () => {
  return gulp
    .src("./lib/src/**/*.*")
    .pipe(gulp.dest(destination))
    .pipe(addSrc(["./package.json", "./README.MD"]))
    .pipe(gulp.dest(destination));
});

gulp.task("relative", () => {
  return gulp.src("./lib/**/*.d.ts").pipe(
    vinylPaths(file_path => {
      // 相对于类型目录的绝对路径值,本文件夹内不做处理
      if (file_path.indexOf("interfaces") == -1) {
        let relative_path = path.relative(
          path.dirname(file_path),
          interface_path
        );
        // 替换文件内部的字符
        replace_file(file_path, relative_path);
      }
      return Promise.resolve();
    })
  );
});
