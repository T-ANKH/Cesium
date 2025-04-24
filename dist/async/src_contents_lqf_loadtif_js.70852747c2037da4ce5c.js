"use strict";
(self["webpackChunkcesiumstudy"] = self["webpackChunkcesiumstudy"] || []).push([["src_contents_lqf_loadtif_js"],{

/***/ "./src/contents/lqf_loadtif.js":
/*!*************************************!*\
  !*** ./src/contents/lqf_loadtif.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lqf_loadtif: () => (/* binding */ lqf_loadtif)
/* harmony export */ });
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cesium */ "./node_modules/@cesium/engine/Source/Scene/WebMapServiceImageryProvider.js");


/**
 * 加载tif（WMS）图层到Cesium场景
 * @param {Cesium.Viewer} viewer - Cesium的viewer实例
 */
function lqf_loadtif(viewer) {
    viewer.imageryLayers.addImageryProvider(new cesium__WEBPACK_IMPORTED_MODULE_0__["default"]({
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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMvc3JjX2NvbnRlbnRzX2xxZl9sb2FkdGlmX2pzLjcwODUyNzQ3YzIwMzdkYTRjZTVjLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZUFBZTtBQUMxQjtBQUNPO0FBQ1AsZ0RBQWdELDhDQUE0QjtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZXNpdW1zdHVkeS8uL3NyYy9jb250ZW50cy9scWZfbG9hZHRpZi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXZWJNYXBTZXJ2aWNlSW1hZ2VyeVByb3ZpZGVyIH0gZnJvbSAnY2VzaXVtJztcclxuXHJcbi8qKlxyXG4gKiDliqDovb10aWbvvIhXTVPvvInlm77lsYLliLBDZXNpdW3lnLrmma9cclxuICogQHBhcmFtIHtDZXNpdW0uVmlld2VyfSB2aWV3ZXIgLSBDZXNpdW3nmoR2aWV3ZXLlrp7kvotcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBscWZfbG9hZHRpZih2aWV3ZXIpIHtcclxuICAgIHZpZXdlci5pbWFnZXJ5TGF5ZXJzLmFkZEltYWdlcnlQcm92aWRlcihuZXcgV2ViTWFwU2VydmljZUltYWdlcnlQcm92aWRlcih7XHJcbiAgICAgICAgdXJsOiAnaHR0cDovLzQ3Ljk3LjU2LjQ5OjgwODEvZ2Vvc2VydmVyL3NmL3dtcycsXHJcbiAgICAgICAgbGF5ZXJzOiAnc2Y6c2ZkZW0nLFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgc2VydmljZTogJ1dNUycsXHJcbiAgICAgICAgICAgIGZvcm1hdDogJ2ltYWdlL3BuZycsXHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxyXG4gICAgICAgICAgICB2ZXJzaW9uOiAnMS4xLjEnLFxyXG4gICAgICAgICAgICBzcnM6ICdFUFNHOjQzMjYnXHJcbiAgICAgICAgfVxyXG4gICAgfSkpO1xyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9