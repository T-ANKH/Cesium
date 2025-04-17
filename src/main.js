// 初始化 viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: new Cesium.EllipsoidTerrainProvider(),
    baseLayerPicker: false,
    geocoder: true, // 恢复搜索功能
    infoBox: false,
    sceneModePicker: true,
    navigationHelpButton: true,
    animation: false,
    timeline: false,
    fullscreenButton: true
});

// 添加 WMS 图层
viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
    url: 'http://47.97.56.49:8081/geoserver/sf/wms',
    layers: 'sf:sfdem',
    parameters: {
        service: 'WMS',
        format: 'image/png',
        transparent: true,
        version: '1.1.1',
        srs: 'EPSG:4326'
    }
}));

// 设置默认视角
viewer.camera.setView({
    destination: Cesium.Rectangle.fromDegrees(
        -103.87100615361031,
        44.37021187004214,
        -103.62932676908184,
        44.50162561960653
    )
});

// 点击事件，弹出信息框
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function(click) {
    const position = click.position;
    const ray = viewer.camera.getPickRay(position);
    const cartesian = viewer.scene.globe.pick(ray, viewer.scene);

    if (cartesian) {
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const lon = Cesium.Math.toDegrees(cartographic.longitude);
        const lat = Cesium.Math.toDegrees(cartographic.latitude);

        // 构建 GetFeatureInfo 请求
        const viewerRect = viewer.camera.computeViewRectangle();
        const bbox = [
            Cesium.Math.toDegrees(viewerRect.west),
            Cesium.Math.toDegrees(viewerRect.south),
            Cesium.Math.toDegrees(viewerRect.east),
            Cesium.Math.toDegrees(viewerRect.north)
        ].join(',');

        const params = {
            SERVICE: 'WMS',
            VERSION: '1.1.1',
            REQUEST: 'GetFeatureInfo',
            LAYERS: 'sf:sfdem',
            QUERY_LAYERS: 'sf:sfdem',
            INFO_FORMAT: 'application/json',
            FEATURE_COUNT: 1,
            X: Math.round(position.x),
            Y: Math.round(position.y),
            SRS: 'EPSG:4326',
            WIDTH: viewer.canvas.clientWidth,
            HEIGHT: viewer.canvas.clientHeight,
            BBOX: bbox
        };

        const url = `http://47.97.56.49:8081/geoserver/sf/wms?${new URLSearchParams(params)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.features && data.features.length > 0) {
                    const feature = data.features[0];
                    document.getElementById('nameValue').textContent = feature.properties.NAME || '';
                    document.getElementById('codeValue').textContent = feature.properties.CODE || '';
                    const infoBox = document.getElementById('customInfoBox');
                    infoBox.style.display = 'block';
                    infoBox.style.left = `${position.x + 10}px`;
                    infoBox.style.top = `${position.y - infoBox.offsetHeight - 10}px`;
                } else {
                    // 没有要素时隐藏信息框
                    document.getElementById('customInfoBox').style.display = 'none';
                }
            })
            .catch(error => {
                document.getElementById('customInfoBox').style.display = 'none';
                console.error('查询失败:', error);
            });
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);