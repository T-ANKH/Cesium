import { Cartesian3 } from 'cesium';

export function zxx_loadmodel1(viewer) {
    // 加载第一个模型
    const modelEntity1 = loadModel(viewer,
        'https://cesium.com/downloads/cesiumjs/releases/1.127/Apps/SampleData/models/CesiumAir/Cesium_Air.glb',
        -123.0744619, 44.0503706, 500, 2.0
    );
}
export function zxx_loadmodel2(viewer) {
    // 加载第二个模型
    const modelEntity2 = loadModel(viewer,
        'https://cesium.com/downloads/cesiumjs/releases/1.127/Apps/SampleData/models/CesiumMan/Cesium_Man.glb',
        -122.4194, 37.7749, 300, 1.5
    );
}

// 动态加载 3D 模型的函数
function loadModel(viewer, uri, longitude, latitude, height, scale = 1.0) {
    const position = Cartesian3.fromDegrees(longitude, latitude, height);
    return viewer.entities.add({
        position: position,
        model: {
            uri: uri,
            scale: scale,
            minimumPixelSize: 64,
            maximumScale: 10000,
            show: true,
        }
    });
}

