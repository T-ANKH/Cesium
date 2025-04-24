"use strict";
(self["webpackChunkcesiumstudy"] = self["webpackChunkcesiumstudy"] || []).push([["src_contents_cdd_loadshp_js"],{

/***/ "./src/contents/cdd_loadshp.js":
/*!*************************************!*\
  !*** ./src/contents/cdd_loadshp.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cdd_loadshp: () => (/* binding */ cdd_loadshp)
/* harmony export */ });
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cesium */ "./node_modules/@cesium/engine/Source/Scene/WebMapServiceImageryProvider.js");


/**
 * 加载WMS图层到Cesium场景
 * @param {Cesium.Viewer} viewer - Cesium的viewer实例
 */
function cdd_loadshp(viewer) {
    // 添加 WMS 图层
    viewer.imageryLayers.addImageryProvider(new cesium__WEBPACK_IMPORTED_MODULE_0__["default"]({
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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMvc3JjX2NvbnRlbnRzX2NkZF9sb2Fkc2hwX2pzLmM5MGNkZTY2ZGI5ZjgzNjU5NmMyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZUFBZTtBQUMxQjtBQUNPO0FBQ1A7QUFDQSxnREFBZ0QsOENBQTRCO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovL2Nlc2l1bXN0dWR5Ly4vc3JjL2NvbnRlbnRzL2NkZF9sb2Fkc2hwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdlYk1hcFNlcnZpY2VJbWFnZXJ5UHJvdmlkZXIgfSBmcm9tICdjZXNpdW0nO1xyXG5cclxuLyoqXHJcbiAqIOWKoOi9vVdNU+WbvuWxguWIsENlc2l1beWcuuaZr1xyXG4gKiBAcGFyYW0ge0Nlc2l1bS5WaWV3ZXJ9IHZpZXdlciAtIENlc2l1beeahHZpZXdlcuWunuS+i1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNkZF9sb2Fkc2hwKHZpZXdlcikge1xyXG4gICAgLy8g5re75YqgIFdNUyDlm77lsYJcclxuICAgIHZpZXdlci5pbWFnZXJ5TGF5ZXJzLmFkZEltYWdlcnlQcm92aWRlcihuZXcgV2ViTWFwU2VydmljZUltYWdlcnlQcm92aWRlcih7XHJcbiAgICAgICAgdXJsOiAnaHR0cDovLzQ3Ljk3LjU2LjQ5OjgwODEvZ2Vvc2VydmVyL2Nlc2l1bS93bXMnLFxyXG4gICAgICAgIGxheWVyczogJ2Nlc2l1bTp4aWFtZW4nLFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgc2VydmljZTogJ1dNUycsXHJcbiAgICAgICAgICAgIHZlcnNpb246ICcxLjMuMCcsXHJcbiAgICAgICAgICAgIHJlcXVlc3Q6ICdHZXRNYXAnLFxyXG4gICAgICAgICAgICBmb3JtYXQ6ICdpbWFnZS9wbmcnLFxyXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgc3R5bGVzOiAnJyxcclxuICAgICAgICAgICAgdGlsZWQ6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgfSkpO1xyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9