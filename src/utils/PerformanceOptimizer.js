/**
 * Performance Optimizer Utility for Three.js/React Three Fiber
 * Provides optimizations for model rendering and memory management
 */

/**
 * Optimize material for better performance
 * Reduces texture quality and disables expensive features
 */
export const optimizeMaterial = (material, options = {}) => {
    const {
        anisotropy = 1,
        encoding = "sRGBColorSpace",
    } = options;

    if (material.map) {
        material.map.anisotropy = anisotropy;
    }
    if (material.normalMap) {
        material.normalMap.anisotropy = anisotropy;
    }
    if (material.roughnessMap) {
        material.roughnessMap.anisotropy = anisotropy;
    }
    if (material.metalnessMap) {
        material.metalnessMap.anisotropy = anisotropy;
    }

    return material;
};

/**
 * Dispose of Three.js resources properly
 * Prevents memory leaks
 */
export const disposeObject = (object) => {
    if (!object) return;

    if (object.geometry) {
        object.geometry.dispose();
    }

    if (object.material) {
        if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
        } else {
            object.material.dispose();
        }
    }

    if (object.texture) {
        object.texture.dispose();
    }

    if (object.children) {
        object.children.forEach((child) => disposeObject(child));
    }
};

/**
 * Reduce texture resolution for better performance
 * Useful for mobile devices
 */
export const reduceTextureResolution = (texture, factor = 2) => {
    if (!texture || !texture.image) return texture;

    const canvas = document.createElement("canvas");
    canvas.width = texture.image.width / factor;
    canvas.height = texture.image.height / factor;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(texture.image, 0, 0, canvas.width, canvas.height);

    texture.image = canvas;
    texture.needsUpdate = true;

    return texture;
};

/**
 * Enable frustum culling optimization
 * Automatically skip rendering objects outside camera view
 */
export const enableFrustumCulling = (scene) => {
    scene.traverse((child) => {
        if (child.geometry) {
            child.frustumCulled = true;
        }
    });
};

/**
 * Detect device capabilities
 * Returns performance tier: "high", "medium", "low"
 */
export const detectDevicePerformance = () => {
    const canvas = document.createElement("canvas");
    const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

    const lowEndDevices =
        /Mali|Adreno|PowerVR|Intel HD/i.test(renderer) ||
        navigator.hardwareConcurrency <= 4;
    const mobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (lowEndDevices) return "low";
    if (mobileDevice) return "medium";
    return "high";
};

/**
 * Adaptive quality settings based on device
 */
export const getAdaptiveQualitySettings = () => {
    const device = detectDevicePerformance();

    const qualityMap = {
        high: {
            shadowMapSize: 2048,
            textureAnisotropy: 16,
            dpr: Math.min(window.devicePixelRatio, 2),
            antialiasPass: true,
            particleCount: 100,
        },
        medium: {
            shadowMapSize: 1024,
            textureAnisotropy: 8,
            dpr: Math.min(window.devicePixelRatio, 1.5),
            antialiasPass: false,
            particleCount: 60,
        },
        low: {
            shadowMapSize: 512,
            textureAnisotropy: 1,
            dpr: 1,
            antialiasPass: false,
            particleCount: 30,
        },
    };

    return qualityMap[device];
};
