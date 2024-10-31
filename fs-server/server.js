// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;
const pythonCodePath = path.resolve(__dirname, "../python-code/course");
const zipFilePath = path.resolve(__dirname, "../python-code/zip");
const host = "http://localhost:3000";
app.use(cors());
app.use("/static", express.static(pythonCodePath));
app.use("/zip", express.static(zipFilePath));

app.get("/api/getfiles", (req, res) => {
  const dirPath = req.query.path;
  if (!dirPath) {
    return res.json({
      code: 404,
      message: "path is required",
    });
  }
  const fileFolderPath = path.join(pythonCodePath, dirPath);
  if (!fs.existsSync(fileFolderPath)) {
    return res.json({
      code: 404,
      message: "Directory not found",
    });
  }

  // 获取文件夹下目录树，前端用element-plus tree组件展示
  const getFiles = (folderPath, dirPath) => {
    const files = fs.readdirSync(folderPath);
    const result = [];
    files.forEach((file) => {
      const absoluteFilePath = path.join(folderPath, file);
      const relativeFilePath = path.relative(fileFolderPath, absoluteFilePath);
      const stat = fs.statSync(absoluteFilePath);
      const relpath = `/${relativeFilePath.replace(/\\/g, "/")}`;
      const folderRelativePath = relpath.replace(/\/[^/]+$/, "");
      if (stat.isFile()) {
        result.push({
          label: file,
          type: "file",
          path: relpath,
          folderPath: folderRelativePath,
          isDirectory: false,
          filePath: `${host}/static/${dirPath}${relpath}`,
          ext: path.extname(file).slice(1),
          children: [],
          name: file.split(".")[0],
        });
      } else if (stat.isDirectory()) {
        result.push({
          label: file,
          type: "directory",
          path: relpath,
          folderPath: folderRelativePath,
          isDirectory: true,
          filePath: `${host}/static/${dirPath}${relpath}`,
          children: getFiles(absoluteFilePath, dirPath),
          name: file,
        });
      }
    });

    // 对结果进行排序，将文件夹放在顶部，文件放在文件夹下
    result.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) {
        return -1;
      } else if (!a.isDirectory && b.isDirectory) {
        return 1;
      } else {
        return a.label.localeCompare(b.label);
      }
    });

    return result;
  };

  res.json({
    code: 0,
    data: getFiles(fileFolderPath, dirPath),
  });
});

// /api/getfilezip?path=class1 将目标文件夹打包成zip文件，并存放到静态资源目录，返回静态资源目录相对路径
app.get("/api/getfilezip", (req, res) => {
  const dirPath = req.query.path;
  if (!dirPath) {
    return res.json({
      code: 404,
      message: "path is required",
    });
  }
  const filePath = path.join(pythonCodePath, dirPath);
  if (!fs.existsSync(filePath)) {
    return res.json({
      code: 404,
      message: "Directory not found",
    });
  }

  const zipPath = path.join(zipFilePath, `/${dirPath}.zip`);
  const admZip = require("adm-zip");
  const zip = new admZip();
  zip.addLocalFolder(filePath);
  zip.writeZip(zipPath);

  res.json({
    code: 0,
    data: `${host}/zip/${dirPath}.zip`,
  });
});

// /api/getproject 获取pythonCodePath下的所有文件夹名称用作/api/getfilezip的参数
app.get("/api/getproject", (req, res) => {
  const files = fs.readdirSync(pythonCodePath);
  const result = files.filter((file) => {
    return fs.statSync(path.join(pythonCodePath, file)).isDirectory();
  }
  );
  res.json({
    code: 0,
    data: result,
  });
});

// '/api/savefile' 保存文件内容 参数：path 文件相对路径，content 文件内容
app.post("/api/savefile", express.json(), (req, res) => {
  const { path, content } = req.body;
  if (!path || !content) {
    return res.json({
      code: 404,
      message: "path and content are required",
    });
  }
  const filePath = path.join(pythonCodePath, path);
  fs.writeFileSync(filePath, content);
  res.json({
    code: 0,
    message: "Save success",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
