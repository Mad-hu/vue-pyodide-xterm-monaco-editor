

## vue-pyodide-xterm-monaco-editor, 使用vue3开发的在线运行python程序编辑器demo，通过pyodide，你可以浏览器上运行pygame、matplotlib等程序。希望这个demo可以帮到你

<p>运行matplotlib，可以在左侧GUI位置看到图像输出，我认为这不是最好的</p>
<img src="./imgs/matplotlibdemo.png" width="100%" />
<br>
<p>运行pygame，你可以使用一个独立的窗口运行pygame，我认为这样更符合native的行为</p>
<img src="./imgs/pygametestspritedemo.png" width="100%" />
<br>
<p>python库管理，这里你可以尽可能的尝试各种可能</p>
<img src="./imgs/package-manager.png" width="100%" />
<br>

## 环境

- 项目需要nodejs > 20
- [pyodide release](https://github.com/pyodide/pyodide/releases)你需要将pyodide解压到client/public/pyodide文件夹下

## 命令行

```bash
// 克隆项目
git clone https://github.com/Mad-hu/vue-pyodide-xterm-monaco-editor.git
cd vue-pyodide-xterm-monaco-editor

// 安装依赖和启动文件服务
cd fs-server
npm install 
npm run start

// 安装依赖和启动web服务
cd ../client
npm install
npm run start
```

## 文件结构
- client: vue3 web项目目录
- fs-server: nodejs文件服务目录
- python-code: web项目中加载的python工程目录
    - course: 存放所有python工程
    - zip: 存放对应python工程的压缩包
  
## Maintainers

- [Mad-hu](https://github.com/Mad-hu)

## Reference Documentation
- [pyodide.org](https://pyodide.org/en/stable/usage/quickstart.html)

## License

MIT © 