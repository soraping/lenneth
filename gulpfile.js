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
const common_path = path.resolve(__dirname, "lib/common");
const services_path = path.resolve(__dirname, "lib/services");

// 替换字符
const replace_file = file_path => {
  fs.readFile(file_path, (err, data) => {
    if (!err) {
      let relative_interface_path = path.relative(
        path.dirname(file_path),
        interface_path
      );
      let relative_common_path = path.relative(
        path.dirname(file_path),
        common_path
      );
      let relative_services_path = path.relative(
        path.dirname(file_path),
        services_path
      );

      let newSource = data
        .toString()
        .replace("@interfaces", relative_interface_path);
      newSource = newSource.replace("@common", relative_common_path);
      newSource = newSource.replace("@services", relative_services_path);
      fs.writeFile(file_path, newSource, err => {
        if (err) {
          console.error(err);
        }
      });
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
        // 替换文件内部的字符
        replace_file(file_path);
      }
      return Promise.resolve();
    })
  );
});
