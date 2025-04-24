import {
    Ion,
    Viewer,
    Terrain,
    createOsmBuildingsAsync,
    Cartesian3,
    Math,
} from "cesium";
import "cesium/Widgets/widgets.css";
import "../src/css/main.css";
import { createContentsButton } from './components/contents-button';

// Your access token can be found at: https://cesium.com/ion/tokens.
Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxYzZjMmU1ZC1lZjM4LTQ0ZjgtYjQ4NS04ZWNkZjcwYmM4MDYiLCJpZCI6MjU0MDIwLCJpYXQiOjE3NDIxMDczNjN9.V_8DpqsGs799P8KdP9A7yetgTq7sO2X5JJt3AqkMOuw";

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
export const viewer = new Viewer("cesiumContainer", {
    terrain: Terrain.fromWorldTerrain(),

    animation: true,        // 是否创建动画小器件，用于控制视频播放
    baseLayerPicker: true,  // 是否显示图层选择器，用于切换地图数据源
    fullscreenButton: true,  // 是否显示全屏按钮，用于切换全屏模式
    geocoder: true,         // 是否显示地理编码器，用于地点搜索功能
    homeButton: true,       // 是否显示Home按钮，用于返回默认视角
    infoBox: true,          // 是否显示信息框，用于显示所选实体的属性
    sceneModePicker: true,  // 是否显示场景模式切换器，用于切换2D/3D视图
    selectionIndicator: false, // 是否显示选择指示器，用于高亮显示选中的实体
    timeline: false,         // 是否显示时间轴控件，用于时间序列数据展示
    navigationHelpButton: false, // 是否显示导航帮助按钮，用于显示操作指南
    skyBox: false,          // 是否显示天空盒，用于渲染太空背景
    scene3DOnly: false       // 是否仅使用3D场景，可提升性能
});

// Add Cesium OSM Buildings, a global 3D buildings layer.
const buildingTileset = await createOsmBuildingsAsync();
viewer.scene.primitives.add(buildingTileset);

// 创建并添加目录按钮
createContentsButton(viewer);