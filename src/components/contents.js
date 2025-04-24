import 'cesium/Widgets/shared.css';
import content_config from '../json/contents.json';
import { Cartesian3, Rectangle } from "cesium";

/**
 * 创建目录按钮组件
 * @param {Object} viewer - Cesium viewer实例
 * @returns {HTMLElement} 返回创建的按钮元素
 */
export function createContentsButton(viewer) {
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
    dropdown.style.left = '7px';
    dropdown.style.display = 'none';
    dropdown.style.flexDirection = 'column';

    // 添加点击事件
    button.addEventListener('click', () => {
        dropdown.style.display = dropdown.style.display === 'none' ? 'flex' : 'none';
    });

    // 解析JSON配置，生成目录项
    const items = Object.keys(content_config);

    items.forEach(item => {
        const itemButton = document.createElement('button');
        itemButton.className = 'cesium-button';
        itemButton.textContent = item;
        itemButton.style.margin = '5px 0';

        // 设置点击事件
        const moduleName = content_config[item].module || content_config[item].onclick; // 兼容老配置
        const clickHandler = content_config[item].onclick;
        const position = content_config[item].position;

        /**
         * 按钮点击事件，动态加载模块并调用指定方法
         */
        itemButton.onclick = async () => {
            try {
                const module = await import(`../contents/${moduleName}.js`);
                if (module && typeof module[clickHandler] === "function") {
                    module[clickHandler](viewer);
                    // 兼容多种视角设置方式
                    if (position) {
                        if (Array.isArray(position)) {
                            if (position.length === 3) {
                                // [lon, lat, height]
                                viewer.camera.setView({
                                    destination: Cartesian3.fromDegrees(position[0], position[1], position[2])
                                });
                            } else if (position.length === 4) {
                                // [west, south, east, north]
                                viewer.camera.setView({
                                    destination: Rectangle.fromDegrees(position[0], position[1], position[2], position[3])
                                });
                            }
                        } else if (typeof position === 'object') {
                            // 直接传递完整的setView参数对象
                            viewer.camera.setView(position);
                        }
                        // 其他情况可根据需要扩展
                    }
                } else {
                    console.error(`模块 ${moduleName}.js 中未找到导出的方法 ${clickHandler}`);
                }
            } catch (error) {
                console.error(`加载模块 ${moduleName} 失败:`, error);
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



