# 项目介绍 #
- 本项目用于ceisum学习成果的展示
- 使用简单的目录配置切换展示区域
- 本项目使用`webpack`构建工具构建，使用`Cesium`作为地图引擎
# 使用教程 #
- Clone当前项目
- 执行`npm install`下载依赖
- 本地根目录新建文件`.env`，内容`CESIUM_TOKEN=你的token`,使用环境变量的方式引入token，防止泄露
- 执行`npm run build`生成`dist`文件夹
- 执行`npm run start`启动本地服务器，默认端口为`8081`，退出服务器在终端双击`ctrl+c`
## 开发 ##
- 在`src/contents`下新建自己的项目文件
- 推荐命名：`name_event.js`
- 将内容写在`export function name_event(viewer){...}`中，意思是写完后导出该函数。一个js文件对应一个导出
- 完成开发后，修改`src/json/contents.json`将自己的项目添加到目录中
- 添加格式：
    - `module` 可选，不指定模块名就直接用onclick的名字查找
    - 如果配置了`module`，则`onclick`必须为`module`下的已导出的方法名，这样方便代码复用
    - `onclick` 必须，点击后执行的函数名
    - `position` 必须，点击后视角的位置
```
    "项目名称": {
        “module”: "模块名",
        "onclick": "方法所在的js文件名",
        "position": [
            "视角坐标",  
        ]
    },
```
- 其中的`"position"`支持三种格式：
    - 第一种：`"position": [lon, lat, height]`
    - 对应使用`Cartesian3.fromDegrees` 设置 `destination`（常用于定位到某点，带高度）。
    - 第二种：`"position": [west, south, east, north]`
    - 对应使用`Rectangle.fromDegrees` 设置 `destination`（常用于定位到区域）。
    - 第三种：直接使用setView支持的对象（不建议）
## 推送 ##
- 推送前请先执行`npm run build`，生成`dist`文件夹
- 新建一个分支再推送,后续考虑找人来做`merge`
- ~~确保流程的情况下可以直接推送到main分支~~
- 推送并同步