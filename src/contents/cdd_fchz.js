import { Cartesian3, Cartesian2 } from 'cesium';
import windData from '../json/wind_uv.json';

/**
 * Cesium风场粒子动画绘制
 * @param {Cesium.Viewer} viewer - Cesium的viewer实例
 */
export async function cdd_fchz(viewer) {
    // 解析风场数据
    if (!Array.isArray(windData) || windData.length < 2) {
        throw new Error('wind_uv.json 文件结构不正确，需包含U和V分量');
    }
    const uObj = windData[0];
    const vObj = windData[1];
    const { nx, ny, lo1, la1, dx, dy } = uObj.header;

    // 粒子参数
    const PARTICLE_COUNT = 2500; // 增加粒子数量
    const PARTICLE_MAX_AGE = 400; // 轨迹更长
    const particles = [];

    // 创建canvas并覆盖在Cesium容器上
    let canvas = document.getElementById('windParticleCan0vas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'windParticleCanvas';
        canvas.style.position = 'absolute';
        canvas.style.pointerEvents = 'none';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.width = viewer.scene.canvas.width;
        canvas.height = viewer.scene.canvas.height;
        viewer.container.appendChild(canvas);
    }
    const ctx = canvas.getContext('2d');

    /**
     * 根据经纬度获取风速矢量
     */
    function getWind(lon, lat) {
        // 计算在风场网格中的索引
        const i = Math.floor((lon - lo1) / dx);
        const j = Math.floor((la1 - lat) / dy);
        if (i < 0 || i >= nx || j < 0 || j >= ny) return [0, 0];
        const idx = i + j * nx;
        const u = uObj.data[idx];
        const v = vObj.data[idx];
        return [u, v];
    }

    /**
     * 初始化所有粒子（基于风场数据网格）
     */
    function initParticles() {
        particles.length = 0;
        // 采样步长，可根据实际数据量调整（如每隔2个点采样一次）
        const step = 2;
        for (let i = 0; i < nx; i += step) {
            for (let j = 0; j < ny; j += step) {
                const lon = lo1 + i * dx;
                const lat = la1 - j * dy;
                // 只在有效风场区域生成粒子
                const idx = i + j * nx;
                const u = uObj.data[idx];
                const v = vObj.data[idx];
                // 可根据风速大小过滤无风点
                if (u === undefined || v === undefined) continue;
                const speed = Math.sqrt(u * u + v * v);
                if (speed < 0.01) continue; // 忽略极小风速点
                const p = {
                    lon,
                    lat,
                    age: Math.random() * PARTICLE_MAX_AGE,
                    alpha: 1.0,
                    prevLon: lon,
                    prevLat: lat
                };
                particles.push(p);
            }
        }
    }

    /**
     * 更新所有粒子的位置
     */
    function evolveParticles() {
        for (let p of particles) {
            // 记录上一个位置
            p.prevLon = p.lon;
            p.prevLat = p.lat;
            const [u, v] = getWind(p.lon, p.lat);
            p.lon += u * 0.05;
            p.lat += v * 0.05;
            p.age++;
            p.alpha = 1.0 - p.age / PARTICLE_MAX_AGE;
            if (
                p.lon < lo1 || p.lon > lo1 + (nx - 1) * dx ||
                p.lat > la1 || p.lat < la1 - (ny - 1) * dy ||
                p.age > PARTICLE_MAX_AGE
            ) {
                Object.assign(p, randomParticle());
                p.prevLon = p.lon;
                p.prevLat = p.lat;
            }
        }
    }

    /**
     * 绘制所有粒子
     */
    function drawParticles() {
        // 每帧同步canvas尺寸和样式，确保和Cesium画布完全一致
        const width = viewer.scene.canvas.width;
        const height = viewer.scene.canvas.height;
        if (canvas.width !== width) canvas.width = width;
        if (canvas.height !== height) canvas.height = height;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            const pos = lonLatToCanvas(p.lon, p.lat);
            const prevPos = lonLatToCanvas(p.prevLon, p.prevLat);
            if (pos && prevPos) {
                ctx.globalAlpha = p.alpha;
                const grad = ctx.createLinearGradient(prevPos[0], prevPos[1], pos[0], pos[1]);
                grad.addColorStop(0, "#00ffff");
                grad.addColorStop(1, "#ffffff");
                ctx.strokeStyle = grad;
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(prevPos[0], prevPos[1]);
                ctx.lineTo(pos[0], pos[1]);
                ctx.stroke();
            }
        }
        ctx.globalAlpha = 1.0;
    }

    /**
     * 生成一个随机粒子
     */
    function randomParticle() {
        // 经纬度范围与风场一致
        return {
            lon: lo1 + Math.random() * (nx - 1) * dx,
            lat: la1 - Math.random() * (ny - 1) * dy,
            age: Math.random() * PARTICLE_MAX_AGE,
            alpha: 1.0 // 新增透明度属性
        };
    }

    /**
     * 经纬度转canvas像素坐标
     */
    function lonLatToCanvas(lon, lat) {
        // 利用Cesium API将经纬度转为canvas坐标
        const windowPosition = viewer.scene.cartesianToCanvasCoordinates(
            Cartesian3.fromDegrees(lon, lat, 0), new Cartesian2()
        );
        if (!windowPosition) return null;
        return [windowPosition.x, windowPosition.y];
    }

    /**
     * 主动画循环
     */
    function animate() {
        evolveParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    /**
     * 监听Cesium窗口大小变化，自动调整canvas大小
     */
    function resizeCanvas() {
        canvas.width = viewer.scene.canvas.width;
        canvas.height = viewer.scene.canvas.height;
    }
    window.addEventListener('resize', resizeCanvas);

    // 初始化并启动动画
    initParticles();
    animate();
}