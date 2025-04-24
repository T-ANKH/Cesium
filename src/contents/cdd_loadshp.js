import { WebMapServiceImageryProvider } from 'cesium';

/**
 * 加载WMS图层到Cesium场景
 * @param {Cesium.Viewer} viewer - Cesium的viewer实例
 */
export function cdd_loadshp(viewer) {
    // 添加 WMS 图层
    viewer.imageryLayers.addImageryProvider(new WebMapServiceImageryProvider({
        url: 'http://47.97.56.49:8081/geoserver/cesium/wms',
        layers: 'cesium:xiamen',
        parameters: {
            service: 'WMS',
            version: '1.3.0',
            request: 'GetMap',
            format: 'image/png',
            transparent: true,
            styles: '',
            tiled: true
        },
    }));
}