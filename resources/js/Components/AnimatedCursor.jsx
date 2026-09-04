import { useEffect, useRef } from 'react';
import {
    WebGLRenderer,
    OrthographicCamera,
    Scene,
    PlaneGeometry,
    ShaderMaterial,
    Mesh,
    Vector2,
    Vector3,
    Color,
    SplineCurve
} from 'three';

const config = {
    shaderPoints: 12,
    curvePoints: 24, // Short trail: quickly follows and dissolves
    curveLerp: 0.82, // Snappy trail collapse
    radius1: 1.2,    // Thin, delicate core
    radius2: 7.0     // Soft, non-intrusive glow
};

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
    }
`;

const fragmentShader = `
    // Signed distance to a quadratic bezier
    float sdBezier(vec2 pos, vec2 A, vec2 B, vec2 C) {
        vec2 a = B - A;
        vec2 b = A - 2.0 * B + C;
        vec2 c = a * 2.0;
        vec2 d = A - pos;
        float kk = 1.0 / dot(b, b);
        float kx = kk * dot(a, b);
        float ky = kk * (2.0 * dot(a, a) + dot(d, b)) / 3.0;
        float kz = kk * dot(d, a);
        float res = 0.0;
        float p = ky - kx * kx;
        float p3 = p * p * p;
        float q = kx * (2.0 * kx * kx - 3.0 * ky) + kz;
        float h = q * q + 4.0 * p3;
        if (h >= 0.0) {
            h = sqrt(h);
            vec2 x = (vec2(h, -h) - q) / 2.0;
            vec2 uv = sign(x) * pow(abs(x), vec2(1.0 / 3.0));
            float t = uv.x + uv.y - kx;
            t = clamp(t, 0.0, 1.0);
            vec2 qos = d + (c + b * t) * t;
            res = length(qos);
        } else {
            float z = sqrt(-p);
            float v = acos(q / (p * z * 2.0)) / 3.0;
            float m = cos(v);
            float n = sin(v) * 1.732050808;
            vec3 t = vec3(m + m, -n - m, n - m) * z - kx;
            t = clamp(t, 0.0, 1.0);
            vec2 qos = d + (c + b * t.x) * t.x;
            float dis = dot(qos, qos);
            res = dis;
            qos = d + (c + b * t.y) * t.y;
            dis = dot(qos, qos);
            res = min(res, dis);
            qos = d + (c + b * t.z) * t.z;
            dis = dot(qos, qos);
            res = min(res, dis);
            res = sqrt(res);
        }
        return res;
    }

    uniform vec2 uRatio;
    uniform vec2 uSize;
    uniform vec2 uPoints[SHADER_POINTS];
    uniform vec3 uColor;
    uniform float uAlpha;
    varying vec2 vUv;

    void main() {
        if (uAlpha <= 0.001) {
            discard;
        }

        vec2 pos = (vUv - 0.5) * uRatio;

        vec2 c = (uPoints[0] + uPoints[1]) / 2.0;
        vec2 c_prev;
        float dist = 10000.0;
        for (int i = 0; i < SHADER_POINTS - 1; i++) {
            c_prev = c;
            c = (uPoints[i] + uPoints[i + 1]) / 2.0;
            dist = min(dist, sdBezier(pos, c_prev, uPoints[i], c));
        }
        dist = max(0.0, dist);

        // Soft, subtle glow that does not obscure text underneath
        float glow = pow(uSize.y / dist, 0.92);
        vec3 col = vec3(0.0);
        col += 1.2 * vec3(smoothstep(uSize.x, 0.0, dist));
        col += glow * uColor * 0.45;

        // Tone mapping
        col = 1.0 - exp(-col);

        // Delicate alpha with quick fade out so text remains completely legible
        float intensity = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);
        float finalAlpha = intensity * uAlpha;

        gl_FragColor = vec4(col, finalAlpha);
    }
`;

export default function AnimatedCursor({ enabled = true, colorTheme = 'magenta' }) {
    const canvasRef = useRef(null);

    if (!enabled) {
        return null;
    }

    const getColorHex = (theme) => {
        switch (theme) {
            case 'cyan': return 0x00f0ff;
            case 'violet': return 0xa855f7;
            case 'emerald': return 0x10b981;
            case 'magenta':
            default: return 0xf43f5e;
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const isFinePointer = window.matchMedia('(pointer: fine)').matches;
        if (!isFinePointer) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const points = new Array(config.curvePoints).fill(0).map(() => new Vector2());
        const spline = new SplineCurve(points);

        const uRatio = { value: new Vector2() };
        const uSize = { value: new Vector2() };
        const uPoints = { value: new Array(config.shaderPoints).fill(0).map(() => new Vector2()) };
        const uColor = { value: new Color(getColorHex(colorTheme)) };
        const uAlpha = { value: 0.0 };

        let width = window.innerWidth;
        let height = window.innerHeight;

        const renderer = new WebGLRenderer({
            canvas,
            alpha: true,
            antialias: false,
            powerPreference: 'high-performance'
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(width, height);

        const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const scene = new Scene();

        const geometry = new PlaneGeometry(2, 2);
        const material = new ShaderMaterial({
            uniforms: { uRatio, uSize, uPoints, uColor, uAlpha },
            defines: {
                SHADER_POINTS: config.shaderPoints
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthTest: false,
            depthWrite: false
        });

        const plane = new Mesh(geometry, material);
        scene.add(plane);

        const onResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            renderer.setSize(width, height);

            uSize.value.set(config.radius1, config.radius2);
            if (width >= height) {
                uRatio.value.set(1, height / width);
                uSize.value.multiplyScalar(1 / width);
            } else {
                uRatio.value.set(width / height, 1);
                uSize.value.multiplyScalar(1 / height);
            }
        };
        onResize();
        window.addEventListener('resize', onResize);

        let lastMove = 0;
        let targetAlpha = 0;
        let animId;

        const onPointerMove = (e) => {
            lastMove = performance.now();
            targetAlpha = 0.55; // Semi-transparent, subtle and non-glaring

            const nx = (e.clientX / width) * 2 - 1;
            const ny = -(e.clientY / height) * 2 + 1;
            const x = 0.5 * nx * uRatio.value.x;
            const y = 0.5 * ny * uRatio.value.y;

            // If starting fresh from idle, snap all points to avoid long streaking lines
            if (uAlpha.value < 0.02) {
                for (let i = 0; i < config.curvePoints; i++) {
                    points[i].set(x, y);
                }
            } else {
                spline.points[0].set(x, y);
            }
        };

        const onPointerLeave = () => {
            targetAlpha = 0;
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        document.addEventListener('pointerleave', onPointerLeave);

        const render = () => {
            const now = performance.now();
            const timeSinceMove = now - lastMove;

            // If mouse has stopped moving for more than 40ms, start fading out immediately
            if (timeSinceMove > 40) {
                targetAlpha = 0;
            }

            // Smooth interpolation for alpha: quick fade in, rapid fade out
            uAlpha.value += (targetAlpha - uAlpha.value) * (targetAlpha === 0 ? 0.16 : 0.25);

            if (uAlpha.value > 0.002) {
                for (let i = 1; i < config.curvePoints; i++) {
                    points[i].lerp(points[i - 1], config.curveLerp);
                }
                for (let i = 0; i < config.shaderPoints; i++) {
                    spline.getPoint(i / (config.shaderPoints - 1), uPoints.value[i]);
                }

                renderer.render(scene, camera);
            } else if (uAlpha.value <= 0.002 && uAlpha.value !== 0) {
                uAlpha.value = 0;
                renderer.clear();
            }

            animId = requestAnimationFrame(render);
        };

        animId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerleave', onPointerLeave);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="neon-cursor-canvas"
            className="fixed inset-0 pointer-events-none z-[9999] w-full h-full"
            aria-hidden="true"
        />
    );
}
