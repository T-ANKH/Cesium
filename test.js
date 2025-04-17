// 在 Cesium Viewer 中加载 3D 模型
const position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 500);
const modelEntity = viewer.entities.add({
    position: position,
    model: {
        uri: 'https://cesium.com/downloads/cesiumjs/releases/1.127/Apps/SampleData/models/CesiumAir/Cesium_Air.glb', // Cesium 提供的示例模型
        scale: 2.0, // 调整模型的缩放比例
        minimumPixelSize: 128, // 设置模型的最小像素大小
        maximumScale: 20000, // 设置模型的最大缩放比例
        show: true, // 确保模型可见
    }
});

// 定位到第一个模型
viewer.flyTo(modelEntity);

// 添加3D 模型
const secondModelPosition = Cesium.Cartesian3.fromDegrees(-122.4194, 37.7749, 300); // 旧金山位置
const secondModelEntity = viewer.entities.add({
    position: secondModelPosition,
    model: {
        uri: 'https://cesium.com/downloads/cesiumjs/releases/1.127/Apps/SampleData/models/CesiumMan/Cesium_Man.glb', // Cesium 提供的示例模型
        scale: 1.5, // 调整模型的缩放比例
        minimumPixelSize: 64, // 设置模型的最小像素大小
        maximumScale: 10000, // 设置模型的最大缩放比例
        show: true, // 确保模型可见
    }
});

// 定位到第二个模型
viewer.flyTo(secondModelEntity);

// 监听键盘事件
document.addEventListener('keydown', function (event) {
    if (event.key === '1') {
        // 切换到第一个模型
        viewer.flyTo(modelEntity);
    } else if (event.key === '2') {
        // 切换到第二个模型
        viewer.flyTo(secondModelEntity);
    }
});