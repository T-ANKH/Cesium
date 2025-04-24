(self["webpackChunkcesiumstudy"] = self["webpackChunkcesiumstudy"] || []).push([["app"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/main.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/main.css ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `html,
body,
#cesiumContainer {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}`, "",{"version":3,"sources":["webpack://./src/css/main.css"],"names":[],"mappings":"AAAA;;;IAGI,WAAW;IACX,YAAY;IACZ,SAAS;IACT,UAAU;IACV,gBAAgB;AACpB","sourcesContent":["html,\r\nbody,\r\n#cesiumContainer {\r\n    width: 100%;\r\n    height: 100%;\r\n    margin: 0;\r\n    padding: 0;\r\n    overflow: hidden;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/components/contents.js":
/*!************************************!*\
  !*** ./src/components/contents.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createContentsButton: () => (/* binding */ createContentsButton)
/* harmony export */ });
/* harmony import */ var cesium_Widgets_shared_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cesium/Widgets/shared.css */ "./node_modules/cesium/Source/Widgets/shared.css");
/* harmony import */ var _json_contents_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../json/contents.json */ "./src/json/contents.json");
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cesium */ "./node_modules/@cesium/engine/Source/Core/Cartesian3.js");
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cesium */ "./node_modules/@cesium/engine/Source/Core/Rectangle.js");




/**
 * 创建目录按钮组件
 * @param {Object} viewer - Cesium viewer实例
 * @returns {HTMLElement} 返回创建的按钮元素
 */
function createContentsButton(viewer) {
    // 创建按钮
    const button = document.createElement('button');
    button.id = 'contents_button';
    button.className = 'cesium-button cesium-toolbar-button';
    button.style.position = 'absolute';
    button.style.top = '5px';
    button.style.left = '5px';

    // 创建目录容器
    const dropdown = document.createElement('div');
    dropdown.id = 'contents_dropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.top = '40px';
    dropdown.style.left = '5px';
    dropdown.style.display = 'none';
    dropdown.style.flexDirection = 'column';

    // 添加点击事件
    button.addEventListener('click', () => {
        dropdown.style.display = dropdown.style.display === 'none' ? 'flex' : 'none';
    });

    // 解析JSON配置，生成目录项
    const items = Object.keys(_json_contents_json__WEBPACK_IMPORTED_MODULE_1__);

    items.forEach(item => {
        const itemButton = document.createElement('button');
        itemButton.className = 'cesium-button';
        itemButton.textContent = item;
        itemButton.style.margin = '5px 0';

        // 设置点击事件
        const clickHandler = _json_contents_json__WEBPACK_IMPORTED_MODULE_1__[item].onclick;
        const position = _json_contents_json__WEBPACK_IMPORTED_MODULE_1__[item].position;

        itemButton.onclick = async () => {
            try {
                const module = await __webpack_require__("./src/contents lazy recursive ^\\.\\/.*\\.js$")(`./${clickHandler}.js`);
                if (module[clickHandler]) {
                    module[clickHandler](viewer);
                    // 兼容多种视角设置方式
                    if (position) {
                        if (Array.isArray(position)) {
                            if (position.length === 3) {
                                // [lon, lat, height]
                                viewer.camera.setView({
                                    destination: cesium__WEBPACK_IMPORTED_MODULE_2__["default"].fromDegrees(position[0], position[1], position[2])
                                });
                            } else if (position.length === 4) {
                                // [west, south, east, north]
                                viewer.camera.setView({
                                    destination: cesium__WEBPACK_IMPORTED_MODULE_3__["default"].fromDegrees(position[0], position[1], position[2], position[3])
                                });
                            }
                        } else if (typeof position === 'object') {
                            // 直接传递完整的setView参数对象
                            viewer.camera.setView(position);
                        }
                        // 其他情况可根据需要扩展
                    }
                }
            } catch (error) {
                console.error(`加载模块 ${clickHandler} 失败:`, error);
            }
        };

        dropdown.appendChild(itemButton);
    });

    // 获取目标容器并添加按钮和下拉菜单
    const container = document.querySelector('#myContainer');
    if (container) {
        container.appendChild(button);
        container.appendChild(dropdown);
    } else {
        console.error('未找到 #myContainer 容器');
    }

    return button;
}





/***/ }),

/***/ "./src/contents lazy recursive ^\\.\\/.*\\.js$":
/*!**********************************************************!*\
  !*** ./src/contents/ lazy ^\.\/.*\.js$ namespace object ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./cdd_loadshp.js": [
		"./src/contents/cdd_loadshp.js",
		9,
		"src_contents_cdd_loadshp_js"
	],
	"./lqf_loadtif.js": [
		"./src/contents/lqf_loadtif.js",
		9,
		"src_contents_lqf_loadtif_js"
	],
	"./zxx_loadmodel.js": [
		"./src/contents/zxx_loadmodel.js",
		7,
		"src_contents_zxx_loadmodel_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[2]).then(() => {
		return __webpack_require__.t(id, ids[1] | 16)
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = "./src/contents lazy recursive ^\\.\\/.*\\.js$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/css/main.css":
/*!**************************!*\
  !*** ./src/css/main.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   viewer: () => (/* binding */ viewer)
/* harmony export */ });
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cesium */ "./node_modules/@cesium/engine/Source/Core/Ion.js");
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cesium */ "./node_modules/@cesium/widgets/Source/Viewer/Viewer.js");
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cesium */ "./node_modules/@cesium/engine/Source/Scene/Terrain.js");
/* harmony import */ var cesium__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cesium */ "./node_modules/@cesium/engine/Source/Scene/createOsmBuildingsAsync.js");
/* harmony import */ var cesium_Widgets_widgets_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cesium/Widgets/widgets.css */ "./node_modules/cesium/Source/Widgets/widgets.css");
/* harmony import */ var _src_css_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/css/main.css */ "./src/css/main.css");
/* harmony import */ var _components_contents_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/contents.js */ "./src/components/contents.js");





// Your access token can be found at: https://cesium.com/ion/tokens.
cesium__WEBPACK_IMPORTED_MODULE_3__["default"].defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxYzZjMmU1ZC1lZjM4LTQ0ZjgtYjQ4NS04ZWNkZjcwYmM4MDYiLCJpZCI6MjU0MDIwLCJpYXQiOjE3NDIxMDczNjN9.V_8DpqsGs799P8KdP9A7yetgTq7sO2X5JJt3AqkMOuw";

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new cesium__WEBPACK_IMPORTED_MODULE_4__["default"]("cesiumContainer", {
    terrain: cesium__WEBPACK_IMPORTED_MODULE_5__["default"].fromWorldTerrain(),

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
const buildingTileset = await (0,cesium__WEBPACK_IMPORTED_MODULE_6__["default"])();
viewer.scene.primitives.add(buildingTileset);

// 创建并添加目录按钮
(0,_components_contents_js__WEBPACK_IMPORTED_MODULE_2__.createContentsButton)(viewer);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./src/json/contents.json":
/*!********************************!*\
  !*** ./src/json/contents.json ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"加载shp":{"onclick":"cdd_loadshp","position":[118.089425,24.6,100000]},"加载tif":{"onclick":"lqf_loadtif","position":[-103.87100615361031,44.37021187004214,-103.62932676908184,44.50162561960653]},"加载模型":{"onclick":"zxx_loadmodel","position":""}}');

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./src/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLjZhOWU1ZjliNzZmYjJmZjVjZDU1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDNkc7QUFDakI7QUFDNUYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8scUZBQXFGLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSw4REFBOEQsb0JBQW9CLHFCQUFxQixrQkFBa0IsbUJBQW1CLHlCQUF5QixLQUFLLG1CQUFtQjtBQUM5VTtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZKO0FBQ2dCO0FBQ0o7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsYUFBYTtBQUMxQjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsOEJBQThCLGdEQUFjO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsZ0RBQWM7QUFDM0MseUJBQXlCLGdEQUFjO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxxRUFBTyxHQUFhLEVBQUUsYUFBYSxJQUFJLENBQUM7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCw4Q0FBVTtBQUMzRCxpQ0FBaUM7QUFDakMsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSxpREFBaUQsOENBQVM7QUFDMUQsaUNBQWlDO0FBQ2pDO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxzQ0FBc0MsY0FBYztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENBLE1BQWtHO0FBQ2xHLE1BQXdGO0FBQ3hGLE1BQStGO0FBQy9GLE1BQWtIO0FBQ2xILE1BQTJHO0FBQzNHLE1BQTJHO0FBQzNHLE1BQXFHO0FBQ3JHO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7QUFDckMsaUJBQWlCLHVHQUFhO0FBQzlCLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMscUZBQU87Ozs7QUFJK0M7QUFDdkUsT0FBTyxpRUFBZSxxRkFBTyxJQUFJLHFGQUFPLFVBQVUscUZBQU8sbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCN0Q7QUFDb0I7QUFDUDtBQUNtQztBQUNoRTtBQUNBO0FBQ0EsOENBQUc7QUFDSDtBQUNBO0FBQ08sbUJBQW1CLDhDQUFNO0FBQ2hDLGFBQWEsOENBQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLDhCQUE4QixrREFBdUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0EsNkVBQW9CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2VzaXVtc3R1ZHkvLi9zcmMvY3NzL21haW4uY3NzIiwid2VicGFjazovL2Nlc2l1bXN0dWR5Ly4vc3JjL2NvbXBvbmVudHMvY29udGVudHMuanMiLCJ3ZWJwYWNrOi8vY2VzaXVtc3R1ZHkvLi9zcmMvY29udGVudHMvIGxhenkgXlxcLlxcLy4qXFwuanMkIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2VzaXVtc3R1ZHkvLi9zcmMvY3NzL21haW4uY3NzPzJjOWYiLCJ3ZWJwYWNrOi8vY2VzaXVtc3R1ZHkvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYGh0bWwsXHJcbmJvZHksXHJcbiNjZXNpdW1Db250YWluZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2Nzcy9tYWluLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0lBR0ksV0FBVztJQUNYLFlBQVk7SUFDWixTQUFTO0lBQ1QsVUFBVTtJQUNWLGdCQUFnQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJodG1sLFxcclxcbmJvZHksXFxyXFxuI2Nlc2l1bUNvbnRhaW5lciB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsImltcG9ydCAnY2VzaXVtL1dpZGdldHMvc2hhcmVkLmNzcyc7XHJcbmltcG9ydCBjb250ZW50X2NvbmZpZyBmcm9tICcuLi9qc29uL2NvbnRlbnRzLmpzb24nO1xyXG5pbXBvcnQgeyBDYXJ0ZXNpYW4zLCBSZWN0YW5nbGUgfSBmcm9tIFwiY2VzaXVtXCI7XHJcblxyXG4vKipcclxuICog5Yib5bu655uu5b2V5oyJ6ZKu57uE5Lu2XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3ZXIgLSBDZXNpdW0gdmlld2Vy5a6e5L6LXHJcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0g6L+U5Zue5Yib5bu655qE5oyJ6ZKu5YWD57SgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29udGVudHNCdXR0b24odmlld2VyKSB7XHJcbiAgICAvLyDliJvlu7rmjInpkq5cclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgYnV0dG9uLmlkID0gJ2NvbnRlbnRzX2J1dHRvbic7XHJcbiAgICBidXR0b24uY2xhc3NOYW1lID0gJ2Nlc2l1bS1idXR0b24gY2VzaXVtLXRvb2xiYXItYnV0dG9uJztcclxuICAgIGJ1dHRvbi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICBidXR0b24uc3R5bGUudG9wID0gJzVweCc7XHJcbiAgICBidXR0b24uc3R5bGUubGVmdCA9ICc1cHgnO1xyXG5cclxuICAgIC8vIOWIm+W7uuebruW9leWuueWZqFxyXG4gICAgY29uc3QgZHJvcGRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRyb3Bkb3duLmlkID0gJ2NvbnRlbnRzX2Ryb3Bkb3duJztcclxuICAgIGRyb3Bkb3duLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgIGRyb3Bkb3duLnN0eWxlLnRvcCA9ICc0MHB4JztcclxuICAgIGRyb3Bkb3duLnN0eWxlLmxlZnQgPSAnNXB4JztcclxuICAgIGRyb3Bkb3duLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBkcm9wZG93bi5zdHlsZS5mbGV4RGlyZWN0aW9uID0gJ2NvbHVtbic7XHJcblxyXG4gICAgLy8g5re75Yqg54K55Ye75LqL5Lu2XHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgZHJvcGRvd24uc3R5bGUuZGlzcGxheSA9IGRyb3Bkb3duLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJyA/ICdmbGV4JyA6ICdub25lJztcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIOino+aekEpTT07phY3nva7vvIznlJ/miJDnm67lvZXpoblcclxuICAgIGNvbnN0IGl0ZW1zID0gT2JqZWN0LmtleXMoY29udGVudF9jb25maWcpO1xyXG5cclxuICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGl0ZW1CdXR0b24uY2xhc3NOYW1lID0gJ2Nlc2l1bS1idXR0b24nO1xyXG4gICAgICAgIGl0ZW1CdXR0b24udGV4dENvbnRlbnQgPSBpdGVtO1xyXG4gICAgICAgIGl0ZW1CdXR0b24uc3R5bGUubWFyZ2luID0gJzVweCAwJztcclxuXHJcbiAgICAgICAgLy8g6K6+572u54K55Ye75LqL5Lu2XHJcbiAgICAgICAgY29uc3QgY2xpY2tIYW5kbGVyID0gY29udGVudF9jb25maWdbaXRlbV0ub25jbGljaztcclxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGNvbnRlbnRfY29uZmlnW2l0ZW1dLnBvc2l0aW9uO1xyXG5cclxuICAgICAgICBpdGVtQnV0dG9uLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb2R1bGUgPSBhd2FpdCBpbXBvcnQoYC4uL2NvbnRlbnRzLyR7Y2xpY2tIYW5kbGVyfS5qc2ApO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vZHVsZVtjbGlja0hhbmRsZXJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlW2NsaWNrSGFuZGxlcl0odmlld2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlhbzlrrnlpJrnp43op4bop5Lorr7nva7mlrnlvI9cclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocG9zaXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24ubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gW2xvbiwgbGF0LCBoZWlnaHRdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld2VyLmNhbWVyYS5zZXRWaWV3KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb246IENhcnRlc2lhbjMuZnJvbURlZ3JlZXMocG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdLCBwb3NpdGlvblsyXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zaXRpb24ubGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3ZXIuY2FtZXJhLnNldFZpZXcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbjogUmVjdGFuZ2xlLmZyb21EZWdyZWVzKHBvc2l0aW9uWzBdLCBwb3NpdGlvblsxXSwgcG9zaXRpb25bMl0sIHBvc2l0aW9uWzNdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwb3NpdGlvbiA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOebtOaOpeS8oOmAkuWujOaVtOeahHNldFZpZXflj4LmlbDlr7nosaFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdlci5jYW1lcmEuc2V0Vmlldyhwb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5YW25LuW5oOF5Ya15Y+v5qC55o2u6ZyA6KaB5omp5bGVXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihg5Yqg6L295qih5Z2XICR7Y2xpY2tIYW5kbGVyfSDlpLHotKU6YCwgZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZHJvcGRvd24uYXBwZW5kQ2hpbGQoaXRlbUJ1dHRvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDojrflj5bnm67moIflrrnlmajlubbmt7vliqDmjInpkq7lkozkuIvmi4noj5zljZVcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNteUNvbnRhaW5lcicpO1xyXG4gICAgaWYgKGNvbnRhaW5lcikge1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkcm9wZG93bik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ+acquaJvuWIsCAjbXlDb250YWluZXIg5a655ZmoJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJ1dHRvbjtcclxufVxyXG5cclxuXHJcblxyXG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vY2RkX2xvYWRzaHAuanNcIjogW1xuXHRcdFwiLi9zcmMvY29udGVudHMvY2RkX2xvYWRzaHAuanNcIixcblx0XHQ5LFxuXHRcdFwic3JjX2NvbnRlbnRzX2NkZF9sb2Fkc2hwX2pzXCJcblx0XSxcblx0XCIuL2xxZl9sb2FkdGlmLmpzXCI6IFtcblx0XHRcIi4vc3JjL2NvbnRlbnRzL2xxZl9sb2FkdGlmLmpzXCIsXG5cdFx0OSxcblx0XHRcInNyY19jb250ZW50c19scWZfbG9hZHRpZl9qc1wiXG5cdF0sXG5cdFwiLi96eHhfbG9hZG1vZGVsLmpzXCI6IFtcblx0XHRcIi4vc3JjL2NvbnRlbnRzL3p4eF9sb2FkbW9kZWwuanNcIixcblx0XHQ3LFxuXHRcdFwic3JjX2NvbnRlbnRzX3p4eF9sb2FkbW9kZWxfanNcIlxuXHRdXG59O1xuZnVuY3Rpb24gd2VicGFja0FzeW5jQ29udGV4dChyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG5cdFx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0XHR0aHJvdyBlO1xuXHRcdH0pO1xuXHR9XG5cblx0dmFyIGlkcyA9IG1hcFtyZXFdLCBpZCA9IGlkc1swXTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShpZHNbMl0pLnRoZW4oKCkgPT4ge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQoaWQsIGlkc1sxXSB8IDE2KVxuXHR9KTtcbn1cbndlYnBhY2tBc3luY0NvbnRleHQua2V5cyA9ICgpID0+IChPYmplY3Qua2V5cyhtYXApKTtcbndlYnBhY2tBc3luY0NvbnRleHQuaWQgPSBcIi4vc3JjL2NvbnRlbnRzIGxhenkgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLipcXFxcLmpzJFwiO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQXN5bmNDb250ZXh0OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xub3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiaW1wb3J0IHtcclxuICAgIElvbixcclxuICAgIFZpZXdlcixcclxuICAgIFRlcnJhaW4sXHJcbiAgICBjcmVhdGVPc21CdWlsZGluZ3NBc3luYyxcclxuICAgIENhcnRlc2lhbjMsXHJcbiAgICBNYXRoLFxyXG59IGZyb20gXCJjZXNpdW1cIjtcclxuaW1wb3J0IFwiY2VzaXVtL1dpZGdldHMvd2lkZ2V0cy5jc3NcIjtcclxuaW1wb3J0IFwiLi4vc3JjL2Nzcy9tYWluLmNzc1wiO1xyXG5pbXBvcnQgeyBjcmVhdGVDb250ZW50c0J1dHRvbiB9IGZyb20gJy4vY29tcG9uZW50cy9jb250ZW50cy5qcyc7XHJcblxyXG4vLyBZb3VyIGFjY2VzcyB0b2tlbiBjYW4gYmUgZm91bmQgYXQ6IGh0dHBzOi8vY2VzaXVtLmNvbS9pb24vdG9rZW5zLlxyXG5Jb24uZGVmYXVsdEFjY2Vzc1Rva2VuID0gXCJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcWRHa2lPaUl4WXpaak1tVTFaQzFsWmpNNExUUTBaamd0WWpRNE5TMDRaV05rWmpjd1ltTTRNRFlpTENKcFpDSTZNalUwTURJd0xDSnBZWFFpT2pFM05ESXhNRGN6TmpOOS5WXzhEcHFzR3M3OTlQOEtkUDlBN3lldGdUcTdzTzJYNUpKdDNBcWtNT3V3XCI7XHJcblxyXG4vLyBJbml0aWFsaXplIHRoZSBDZXNpdW0gVmlld2VyIGluIHRoZSBIVE1MIGVsZW1lbnQgd2l0aCB0aGUgYGNlc2l1bUNvbnRhaW5lcmAgSUQuXHJcbmV4cG9ydCBjb25zdCB2aWV3ZXIgPSBuZXcgVmlld2VyKFwiY2VzaXVtQ29udGFpbmVyXCIsIHtcclxuICAgIHRlcnJhaW46IFRlcnJhaW4uZnJvbVdvcmxkVGVycmFpbigpLFxyXG5cclxuICAgIGFuaW1hdGlvbjogdHJ1ZSwgICAgICAgIC8vIOaYr+WQpuWIm+W7uuWKqOeUu+Wwj+WZqOS7tu+8jOeUqOS6juaOp+WItuinhumikeaSreaUvlxyXG4gICAgYmFzZUxheWVyUGlja2VyOiB0cnVlLCAgLy8g5piv5ZCm5pi+56S65Zu+5bGC6YCJ5oup5Zmo77yM55So5LqO5YiH5o2i5Zyw5Zu+5pWw5o2u5rqQXHJcbiAgICBmdWxsc2NyZWVuQnV0dG9uOiB0cnVlLCAgLy8g5piv5ZCm5pi+56S65YWo5bGP5oyJ6ZKu77yM55So5LqO5YiH5o2i5YWo5bGP5qih5byPXHJcbiAgICBnZW9jb2RlcjogdHJ1ZSwgICAgICAgICAvLyDmmK/lkKbmmL7npLrlnLDnkIbnvJbnoIHlmajvvIznlKjkuo7lnLDngrnmkJzntKLlip/og71cclxuICAgIGhvbWVCdXR0b246IHRydWUsICAgICAgIC8vIOaYr+WQpuaYvuekukhvbWXmjInpkq7vvIznlKjkuo7ov5Tlm57pu5jorqTop4bop5JcclxuICAgIGluZm9Cb3g6IHRydWUsICAgICAgICAgIC8vIOaYr+WQpuaYvuekuuS/oeaBr+ahhu+8jOeUqOS6juaYvuekuuaJgOmAieWunuS9k+eahOWxnuaAp1xyXG4gICAgc2NlbmVNb2RlUGlja2VyOiB0cnVlLCAgLy8g5piv5ZCm5pi+56S65Zy65pmv5qih5byP5YiH5o2i5Zmo77yM55So5LqO5YiH5o2iMkQvM0Top4blm75cclxuICAgIHNlbGVjdGlvbkluZGljYXRvcjogZmFsc2UsIC8vIOaYr+WQpuaYvuekuumAieaLqeaMh+ekuuWZqO+8jOeUqOS6jumrmOS6ruaYvuekuumAieS4reeahOWunuS9k1xyXG4gICAgdGltZWxpbmU6IGZhbHNlLCAgICAgICAgIC8vIOaYr+WQpuaYvuekuuaXtumXtOi9tOaOp+S7tu+8jOeUqOS6juaXtumXtOW6j+WIl+aVsOaNruWxleekulxyXG4gICAgbmF2aWdhdGlvbkhlbHBCdXR0b246IGZhbHNlLCAvLyDmmK/lkKbmmL7npLrlr7zoiKrluK7liqnmjInpkq7vvIznlKjkuo7mmL7npLrmk43kvZzmjIfljZdcclxuICAgIHNreUJveDogZmFsc2UsICAgICAgICAgIC8vIOaYr+WQpuaYvuekuuWkqeepuuebku+8jOeUqOS6jua4suafk+WkquepuuiDjOaZr1xyXG4gICAgc2NlbmUzRE9ubHk6IGZhbHNlICAgICAgIC8vIOaYr+WQpuS7heS9v+eUqDNE5Zy65pmv77yM5Y+v5o+Q5Y2H5oCn6IO9XHJcbn0pO1xyXG5cclxuLy8gQWRkIENlc2l1bSBPU00gQnVpbGRpbmdzLCBhIGdsb2JhbCAzRCBidWlsZGluZ3MgbGF5ZXIuXHJcbmNvbnN0IGJ1aWxkaW5nVGlsZXNldCA9IGF3YWl0IGNyZWF0ZU9zbUJ1aWxkaW5nc0FzeW5jKCk7XHJcbnZpZXdlci5zY2VuZS5wcmltaXRpdmVzLmFkZChidWlsZGluZ1RpbGVzZXQpO1xyXG5cclxuLy8g5Yib5bu65bm25re75Yqg55uu5b2V5oyJ6ZKuXHJcbmNyZWF0ZUNvbnRlbnRzQnV0dG9uKHZpZXdlcik7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9