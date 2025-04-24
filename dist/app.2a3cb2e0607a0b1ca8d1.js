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

/***/ "./src/components/contents-button.js":
/*!*******************************************!*\
  !*** ./src/components/contents-button.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createContentsButton: () => (/* binding */ createContentsButton)
/* harmony export */ });
/* harmony import */ var cesium_Widgets_shared_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cesium/Widgets/shared.css */ "./node_modules/cesium/Source/Widgets/shared.css");
/* harmony import */ var _json_button_config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../json/button-config.json */ "./src/json/button-config.json");
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
    const items = Object.keys(_json_button_config_json__WEBPACK_IMPORTED_MODULE_1__);

    items.forEach(item => {
        const itemButton = document.createElement('button');
        itemButton.className = 'cesium-button';
        itemButton.textContent = item;
        itemButton.style.margin = '5px 0';

        // 设置点击事件
        const clickHandler = _json_button_config_json__WEBPACK_IMPORTED_MODULE_1__[item].onclick;
        const position = _json_button_config_json__WEBPACK_IMPORTED_MODULE_1__[item].position;

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
		"src_contents_cdd_loadshp_js"
	],
	"./lqf_loadtif.js": [
		"./src/contents/lqf_loadtif.js",
		"src_contents_lqf_loadtif_js"
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
	return __webpack_require__.e(ids[1]).then(() => {
		return __webpack_require__(id);
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
/* harmony import */ var _components_contents_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/contents-button */ "./src/components/contents-button.js");





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
(0,_components_contents_button__WEBPACK_IMPORTED_MODULE_2__.createContentsButton)(viewer);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./src/json/button-config.json":
/*!*************************************!*\
  !*** ./src/json/button-config.json ***!
  \*************************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLjJhM2NiMmUwNjA3YTBiMWNhOGQxLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDNkc7QUFDakI7QUFDNUYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8scUZBQXFGLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSw4REFBOEQsb0JBQW9CLHFCQUFxQixrQkFBa0IsbUJBQW1CLHlCQUF5QixLQUFLLG1CQUFtQjtBQUM5VTtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZKO0FBQ21CO0FBQ1A7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsYUFBYTtBQUMxQjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsOEJBQThCLHFEQUFZO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIscURBQVk7QUFDekMseUJBQXlCLHFEQUFZO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxxRUFBTyxHQUFhLEVBQUUsYUFBYSxJQUFJLENBQUM7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCw4Q0FBVTtBQUMzRCxpQ0FBaUM7QUFDakMsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSxpREFBaUQsOENBQVM7QUFDMUQsaUNBQWlDO0FBQ2pDO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxzQ0FBc0MsY0FBYztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCQSxNQUFrRztBQUNsRyxNQUF3RjtBQUN4RixNQUErRjtBQUMvRixNQUFrSDtBQUNsSCxNQUEyRztBQUMzRyxNQUEyRztBQUMzRyxNQUFxRztBQUNyRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhO0FBQ3JDLGlCQUFpQix1R0FBYTtBQUM5QixpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHFGQUFPOzs7O0FBSStDO0FBQ3ZFLE9BQU8saUVBQWUscUZBQU8sSUFBSSxxRkFBTyxVQUFVLHFGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQjdEO0FBQ29CO0FBQ1A7QUFDdUM7QUFDcEU7QUFDQTtBQUNBLDhDQUFHO0FBQ0g7QUFDQTtBQUNPLG1CQUFtQiw4Q0FBTTtBQUNoQyxhQUFhLDhDQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSw4QkFBOEIsa0RBQXVCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLGlGQUFvQiIsInNvdXJjZXMiOlsid2VicGFjazovL2Nlc2l1bXN0dWR5Ly4vc3JjL2Nzcy9tYWluLmNzcyIsIndlYnBhY2s6Ly9jZXNpdW1zdHVkeS8uL3NyYy9jb21wb25lbnRzL2NvbnRlbnRzLWJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9jZXNpdW1zdHVkeS8uL3NyYy9jb250ZW50cy8gbGF6eSBeXFwuXFwvLipcXC5qcyQgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jZXNpdW1zdHVkeS8uL3NyYy9jc3MvbWFpbi5jc3M/MmM5ZiIsIndlYnBhY2s6Ly9jZXNpdW1zdHVkeS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgaHRtbCxcclxuYm9keSxcclxuI2Nlc2l1bUNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvY3NzL21haW4uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7SUFHSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLFNBQVM7SUFDVCxVQUFVO0lBQ1YsZ0JBQWdCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImh0bWwsXFxyXFxuYm9keSxcXHJcXG4jY2VzaXVtQ29udGFpbmVyIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiaW1wb3J0ICdjZXNpdW0vV2lkZ2V0cy9zaGFyZWQuY3NzJztcclxuaW1wb3J0IGJ1dHRvbmNvbmZpZyBmcm9tICcuLi9qc29uL2J1dHRvbi1jb25maWcuanNvbic7XHJcbmltcG9ydCB7IENhcnRlc2lhbjMsIFJlY3RhbmdsZSB9IGZyb20gXCJjZXNpdW1cIjtcclxuXHJcbi8qKlxyXG4gKiDliJvlu7rnm67lvZXmjInpkq7nu4Tku7ZcclxuICogQHBhcmFtIHtPYmplY3R9IHZpZXdlciAtIENlc2l1bSB2aWV3ZXLlrp7kvotcclxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSDov5Tlm57liJvlu7rnmoTmjInpkq7lhYPntKBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb250ZW50c0J1dHRvbih2aWV3ZXIpIHtcclxuICAgIC8vIOWIm+W7uuaMiemSrlxyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBidXR0b24uaWQgPSAnY29udGVudHNfYnV0dG9uJztcclxuICAgIGJ1dHRvbi5jbGFzc05hbWUgPSAnY2VzaXVtLWJ1dHRvbiBjZXNpdW0tdG9vbGJhci1idXR0b24nO1xyXG4gICAgYnV0dG9uLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgIGJ1dHRvbi5zdHlsZS50b3AgPSAnNXB4JztcclxuICAgIGJ1dHRvbi5zdHlsZS5sZWZ0ID0gJzVweCc7XHJcblxyXG4gICAgLy8g5Yib5bu655uu5b2V5a655ZmoXHJcbiAgICBjb25zdCBkcm9wZG93biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZHJvcGRvd24uaWQgPSAnY29udGVudHNfZHJvcGRvd24nO1xyXG4gICAgZHJvcGRvd24uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgZHJvcGRvd24uc3R5bGUudG9wID0gJzQwcHgnO1xyXG4gICAgZHJvcGRvd24uc3R5bGUubGVmdCA9ICc1cHgnO1xyXG4gICAgZHJvcGRvd24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGRyb3Bkb3duLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSAnY29sdW1uJztcclxuXHJcbiAgICAvLyDmt7vliqDngrnlh7vkuovku7ZcclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBkcm9wZG93bi5zdHlsZS5kaXNwbGF5ID0gZHJvcGRvd24uc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnID8gJ2ZsZXgnIDogJ25vbmUnO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g6Kej5p6QSlNPTumFjee9ru+8jOeUn+aIkOebruW9lemhuVxyXG4gICAgY29uc3QgaXRlbXMgPSBPYmplY3Qua2V5cyhidXR0b25jb25maWcpO1xyXG5cclxuICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGl0ZW1CdXR0b24uY2xhc3NOYW1lID0gJ2Nlc2l1bS1idXR0b24nO1xyXG4gICAgICAgIGl0ZW1CdXR0b24udGV4dENvbnRlbnQgPSBpdGVtO1xyXG4gICAgICAgIGl0ZW1CdXR0b24uc3R5bGUubWFyZ2luID0gJzVweCAwJztcclxuXHJcbiAgICAgICAgLy8g6K6+572u54K55Ye75LqL5Lu2XHJcbiAgICAgICAgY29uc3QgY2xpY2tIYW5kbGVyID0gYnV0dG9uY29uZmlnW2l0ZW1dLm9uY2xpY2s7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBidXR0b25jb25maWdbaXRlbV0ucG9zaXRpb247XHJcblxyXG4gICAgICAgIGl0ZW1CdXR0b24ub25jbGljayA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydChgLi4vY29udGVudHMvJHtjbGlja0hhbmRsZXJ9LmpzYCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9kdWxlW2NsaWNrSGFuZGxlcl0pIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2R1bGVbY2xpY2tIYW5kbGVyXSh2aWV3ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWFvOWuueWkmuenjeinhuinkuiuvue9ruaWueW8j1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBbbG9uLCBsYXQsIGhlaWdodF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3ZXIuY2FtZXJhLnNldFZpZXcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbjogQ2FydGVzaWFuMy5mcm9tRGVncmVlcyhwb3NpdGlvblswXSwgcG9zaXRpb25bMV0sIHBvc2l0aW9uWzJdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbi5sZW5ndGggPT09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdlci5jYW1lcmEuc2V0Vmlldyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uOiBSZWN0YW5nbGUuZnJvbURlZ3JlZXMocG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdLCBwb3NpdGlvblsyXSwgcG9zaXRpb25bM10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBvc2l0aW9uID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g55u05o6l5Lyg6YCS5a6M5pW055qEc2V0Vmlld+WPguaVsOWvueixoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld2VyLmNhbWVyYS5zZXRWaWV3KHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlhbbku5bmg4XlhrXlj6/moLnmja7pnIDopoHmianlsZVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGDliqDovb3mqKHlnZcgJHtjbGlja0hhbmRsZXJ9IOWksei0pTpgLCBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBkcm9wZG93bi5hcHBlbmRDaGlsZChpdGVtQnV0dG9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIOiOt+WPluebruagh+WuueWZqOW5tua3u+WKoOaMiemSruWSjOS4i+aLieiPnOWNlVxyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI215Q29udGFpbmVyJyk7XHJcbiAgICBpZiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRyb3Bkb3duKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcign5pyq5om+5YiwICNteUNvbnRhaW5lciDlrrnlmagnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYnV0dG9uO1xyXG59XHJcblxyXG5cclxuXHJcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9jZGRfbG9hZHNocC5qc1wiOiBbXG5cdFx0XCIuL3NyYy9jb250ZW50cy9jZGRfbG9hZHNocC5qc1wiLFxuXHRcdFwic3JjX2NvbnRlbnRzX2NkZF9sb2Fkc2hwX2pzXCJcblx0XSxcblx0XCIuL2xxZl9sb2FkdGlmLmpzXCI6IFtcblx0XHRcIi4vc3JjL2NvbnRlbnRzL2xxZl9sb2FkdGlmLmpzXCIsXG5cdFx0XCJzcmNfY29udGVudHNfbHFmX2xvYWR0aWZfanNcIlxuXHRdXG59O1xuZnVuY3Rpb24gd2VicGFja0FzeW5jQ29udGV4dChyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG5cdFx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0XHR0aHJvdyBlO1xuXHRcdH0pO1xuXHR9XG5cblx0dmFyIGlkcyA9IG1hcFtyZXFdLCBpZCA9IGlkc1swXTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShpZHNbMV0pLnRoZW4oKCkgPT4ge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcblx0fSk7XG59XG53ZWJwYWNrQXN5bmNDb250ZXh0LmtleXMgPSAoKSA9PiAoT2JqZWN0LmtleXMobWFwKSk7XG53ZWJwYWNrQXN5bmNDb250ZXh0LmlkID0gXCIuL3NyYy9jb250ZW50cyBsYXp5IHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qXFxcXC5qcyRcIjtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0FzeW5jQ29udGV4dDsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsImltcG9ydCB7XHJcbiAgICBJb24sXHJcbiAgICBWaWV3ZXIsXHJcbiAgICBUZXJyYWluLFxyXG4gICAgY3JlYXRlT3NtQnVpbGRpbmdzQXN5bmMsXHJcbiAgICBDYXJ0ZXNpYW4zLFxyXG4gICAgTWF0aCxcclxufSBmcm9tIFwiY2VzaXVtXCI7XHJcbmltcG9ydCBcImNlc2l1bS9XaWRnZXRzL3dpZGdldHMuY3NzXCI7XHJcbmltcG9ydCBcIi4uL3NyYy9jc3MvbWFpbi5jc3NcIjtcclxuaW1wb3J0IHsgY3JlYXRlQ29udGVudHNCdXR0b24gfSBmcm9tICcuL2NvbXBvbmVudHMvY29udGVudHMtYnV0dG9uJztcclxuXHJcbi8vIFlvdXIgYWNjZXNzIHRva2VuIGNhbiBiZSBmb3VuZCBhdDogaHR0cHM6Ly9jZXNpdW0uY29tL2lvbi90b2tlbnMuXHJcbklvbi5kZWZhdWx0QWNjZXNzVG9rZW4gPSBcImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpxZEdraU9pSXhZelpqTW1VMVpDMWxaak00TFRRMFpqZ3RZalE0TlMwNFpXTmtaamN3WW1NNE1EWWlMQ0pwWkNJNk1qVTBNREl3TENKcFlYUWlPakUzTkRJeE1EY3pOak45LlZfOERwcXNHczc5OVA4S2RQOUE3eWV0Z1RxN3NPMlg1Skp0M0Fxa01PdXdcIjtcclxuXHJcbi8vIEluaXRpYWxpemUgdGhlIENlc2l1bSBWaWV3ZXIgaW4gdGhlIEhUTUwgZWxlbWVudCB3aXRoIHRoZSBgY2VzaXVtQ29udGFpbmVyYCBJRC5cclxuZXhwb3J0IGNvbnN0IHZpZXdlciA9IG5ldyBWaWV3ZXIoXCJjZXNpdW1Db250YWluZXJcIiwge1xyXG4gICAgdGVycmFpbjogVGVycmFpbi5mcm9tV29ybGRUZXJyYWluKCksXHJcblxyXG4gICAgYW5pbWF0aW9uOiB0cnVlLCAgICAgICAgLy8g5piv5ZCm5Yib5bu65Yqo55S75bCP5Zmo5Lu277yM55So5LqO5o6n5Yi26KeG6aKR5pKt5pS+XHJcbiAgICBiYXNlTGF5ZXJQaWNrZXI6IHRydWUsICAvLyDmmK/lkKbmmL7npLrlm77lsYLpgInmi6nlmajvvIznlKjkuo7liIfmjaLlnLDlm77mlbDmja7mupBcclxuICAgIGZ1bGxzY3JlZW5CdXR0b246IHRydWUsICAvLyDmmK/lkKbmmL7npLrlhajlsY/mjInpkq7vvIznlKjkuo7liIfmjaLlhajlsY/mqKHlvI9cclxuICAgIGdlb2NvZGVyOiB0cnVlLCAgICAgICAgIC8vIOaYr+WQpuaYvuekuuWcsOeQhue8lueggeWZqO+8jOeUqOS6juWcsOeCueaQnOe0ouWKn+iDvVxyXG4gICAgaG9tZUJ1dHRvbjogdHJ1ZSwgICAgICAgLy8g5piv5ZCm5pi+56S6SG9tZeaMiemSru+8jOeUqOS6jui/lOWbnum7mOiupOinhuinklxyXG4gICAgaW5mb0JveDogdHJ1ZSwgICAgICAgICAgLy8g5piv5ZCm5pi+56S65L+h5oGv5qGG77yM55So5LqO5pi+56S65omA6YCJ5a6e5L2T55qE5bGe5oCnXHJcbiAgICBzY2VuZU1vZGVQaWNrZXI6IHRydWUsICAvLyDmmK/lkKbmmL7npLrlnLrmma/mqKHlvI/liIfmjaLlmajvvIznlKjkuo7liIfmjaIyRC8zROinhuWbvlxyXG4gICAgc2VsZWN0aW9uSW5kaWNhdG9yOiBmYWxzZSwgLy8g5piv5ZCm5pi+56S66YCJ5oup5oyH56S65Zmo77yM55So5LqO6auY5Lqu5pi+56S66YCJ5Lit55qE5a6e5L2TXHJcbiAgICB0aW1lbGluZTogZmFsc2UsICAgICAgICAgLy8g5piv5ZCm5pi+56S65pe26Ze06L205o6n5Lu277yM55So5LqO5pe26Ze05bqP5YiX5pWw5o2u5bGV56S6XHJcbiAgICBuYXZpZ2F0aW9uSGVscEJ1dHRvbjogZmFsc2UsIC8vIOaYr+WQpuaYvuekuuWvvOiIquW4ruWKqeaMiemSru+8jOeUqOS6juaYvuekuuaTjeS9nOaMh+WNl1xyXG4gICAgc2t5Qm94OiBmYWxzZSwgICAgICAgICAgLy8g5piv5ZCm5pi+56S65aSp56m655uS77yM55So5LqO5riy5p+T5aSq56m66IOM5pmvXHJcbiAgICBzY2VuZTNET25seTogZmFsc2UgICAgICAgLy8g5piv5ZCm5LuF5L2/55SoM0TlnLrmma/vvIzlj6/mj5DljYfmgKfog71cclxufSk7XHJcblxyXG4vLyBBZGQgQ2VzaXVtIE9TTSBCdWlsZGluZ3MsIGEgZ2xvYmFsIDNEIGJ1aWxkaW5ncyBsYXllci5cclxuY29uc3QgYnVpbGRpbmdUaWxlc2V0ID0gYXdhaXQgY3JlYXRlT3NtQnVpbGRpbmdzQXN5bmMoKTtcclxudmlld2VyLnNjZW5lLnByaW1pdGl2ZXMuYWRkKGJ1aWxkaW5nVGlsZXNldCk7XHJcblxyXG4vLyDliJvlu7rlubbmt7vliqDnm67lvZXmjInpkq5cclxuY3JlYXRlQ29udGVudHNCdXR0b24odmlld2VyKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=