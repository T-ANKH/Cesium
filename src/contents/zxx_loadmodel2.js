import { Cartesian3 } from 'cesium';

export function zxx_loadmodel2(viewer) {
    // 动态加载 3D 模型的函数
    function loadModel(uri, longitude, latitude, height, scale = 1.0) {
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

    // 加载第二个模型
    const modelEntity2 = loadModel(
        'https://cesium.com/downloads/cesiumjs/releases/1.127/Apps/SampleData/models/CesiumMan/Cesium_Man.glb',
        -122.4194, 37.7749, 300, 1.5
    );
}

