// 根据相机高度获取缩放级别
function getLevel(height) {
    if (height > 48000000) return 0;
    else if (height > 24000000) return 1;
    else if (height > 12000000) return 2;
    else if (height > 6000000) return 3;
    else if (height > 3000000) return 4;
    else if (height > 1500000) return 5;
    else if (height > 750000) return 6;
    else if (height > 375000) return 7;
    else if (height > 187500) return 8;
    else if (height > 93750) return 9;
    else if (height > 46875) return 10;
    else if (height > 23437.5) return 11;
    else if (height > 11718.75) return 12;
    else if (height > 5859.38) return 13;
    else if (height > 2929.69) return 14;
    else if (height > 1464.84) return 15;
    else if (height > 732.42) return 16;
    else if (height > 366.21) return 17;
    else return 18;
}

export { getLevel };


// 视图控制工具
export const viewerControl = {
    // 飞行到指定位置
    flyTo(viewer, lon, lat, height = 50000) {
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            duration: 2
        });
    },
    
    // 获取当前视图范围
    getViewExtent(viewer) {
        return viewer.camera.computeViewRectangle();
    }
};

// WMS 工具
export const wmsUtils = {
    // 更新图层参数
    updateLayerParams(layer, params) {
        Object.assign(layer.imageryProvider.parameters, params);
    },
    
    // 设置图层透明度
    setOpacity(layer, opacity) {
        layer.alpha = opacity;
    }
};