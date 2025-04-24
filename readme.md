*** deepseek推荐结构 ***

src/
├── regions/               # 核心目录：各区域模块化开发
│   ├── beijing/           # 北京区域（示例）
│   │   ├── entities.js    # 该区域的 Cesium 实体定义（建筑、标记等）
│   │   ├── view-config.js # 该区域的视角配置（经纬度、高度、视角方向）
│   │   └── utils.js       # 区域专用工具函数（可选）
│   ├── shanghai/          # 上海区域（示例）
│   └── ...                # 其他区域
│
├── components/            # 公共组件（如视角切换按钮、地图工具栏）
├── services/              # 全局服务（视角管理器、数据加载）
├── assets/                # 静态资源（模型、纹理、图标）
├── utils/                 # 通用工具函数（坐标系转换、数据格式化）
├── config/                # 全局配置（Cesium Token、地图默认参数）
└── app.js                 # 主入口文件（初始化 Cesium 和整合模块）