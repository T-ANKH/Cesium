import { WebMapServiceImageryProvider } from 'cesium';

/**
 * 加载tif（WMS）图层到Cesium场景
 * @param {Cesium.Viewer} viewer - Cesium的viewer实例
 */
export function lqf_loadtif(viewer) {
    viewer.imageryLayers.addImageryProvider(new WebMapServiceImageryProvider({
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
}