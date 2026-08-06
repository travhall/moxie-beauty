"use client";

import { useEffect, useRef } from "react";

/**
 * Hand-rolled WebGL mesh gradient. No shader package: raw WebGL1 context, a
 * fullscreen triangle, and an inlined simplex-noise domain warp. Colors are
 * read from the site's CSS custom properties at runtime (via a 1x1 canvas
 * readback, which resolves oklch() the same way the browser paints it) so
 * light/dark stay in sync without duplicating the palette here. cSpell:ignore readback highp snoise xyxy xxzz fract backgrounded
 */

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uDistortion;
uniform float uSwirl;
uniform float uScale;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv *= uScale;

  float radius = length(uv);
  float swirlAngle = uSwirl * (1.0 - radius) * snoise(uv * 0.6 + uTime * 0.05);
  mat2 swirlRot = mat2(cos(swirlAngle), -sin(swirlAngle), sin(swirlAngle), cos(swirlAngle));
  uv = swirlRot * uv;

  vec2 warp = vec2(
    snoise(uv + vec2(uTime * 0.08, 0.0)),
    snoise(uv + vec2(0.0, uTime * 0.08) + 5.2)
  );
  uv += uDistortion * warp;

  float n1 = snoise(uv + uTime * 0.06);
  float n2 = snoise(uv - uTime * 0.05 + 3.3);

  float mixX = smoothstep(-1.0, 1.0, n1);
  float mixY = smoothstep(-1.0, 1.0, n2);

  vec3 top = mix(uColor0, uColor1, mixX);
  vec3 bottom = mix(uColor2, uColor3, mixX);
  vec3 color = mix(top, bottom, mixY);

  gl_FragColor = vec4(color, 1.0);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile failed: ${info}`);
  }
  return shader;
}

// Reads a CSS custom property through a 1x1 canvas 2D context so oklch()
// (or any color syntax) resolves to concrete sRGB the same way the browser
// paints it, without a manual color-space conversion.
function resolveColor(varName: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  const probe = document.createElement("canvas");
  probe.width = 1;
  probe.height = 1;
  const ctx = probe.getContext("2d")!;
  ctx.fillStyle = raw;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

const PALETTE_VARS = ["--mesh-0", "--mesh-1", "--mesh-2", "--mesh-3"] as const;

export default function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(
      gl,
      gl.FRAGMENT_SHADER,
      FRAGMENT_SHADER,
    );
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`Program link failed: ${gl.getProgramInfoLog(program)}`);
    }
    gl.useProgram(program);

    // Oversized triangle covering clip space — avoids a second vertex/UV pair.
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uDistortion = gl.getUniformLocation(program, "uDistortion");
    const uSwirl = gl.getUniformLocation(program, "uSwirl");
    const uScale = gl.getUniformLocation(program, "uScale");
    const colorUniforms = [0, 1, 2, 3].map((i) =>
      gl.getUniformLocation(program, `uColor${i}`),
    );

    gl.uniform1f(uDistortion, 0.45);
    gl.uniform1f(uSwirl, 0.35);
    gl.uniform1f(uScale, 0.75);

    const applyPalette = () => {
      PALETTE_VARS.forEach((name, i) => {
        const [r, g, b] = resolveColor(name);
        gl.uniform3f(colorUniforms[i], r, g, b);
      });
    };
    applyPalette();

    // Render buffer at a fraction of display size — the noise field is
    // already soft with no hard edges, so the downscale is free quality-wise
    // and cuts fragment-shader cost roughly in proportion to the square of
    // this factor. CSS stretches the canvas back up to full size.
    const RESOLUTION_SCALE = 0.55;
    const MAX_DPR = 1.5;

    // clientWidth/Height can read 0 for a frame around mount (layout not
    // settled yet) — fall back to the viewport, since this canvas is always
    // a fixed, full-viewport layer. If even that's unavailable, retry next
    // frame rather than latching onto a degenerate 0x0 drawing buffer.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const cssWidth = canvas.clientWidth || window.innerWidth;
      const cssHeight = canvas.clientHeight || window.innerHeight;
      if (!cssWidth || !cssHeight) {
        requestAnimationFrame(resize);
        return;
      }
      const width = Math.round(cssWidth * dpr * RESOLUTION_SCALE);
      const height = Math.round(cssHeight * dpr * RESOLUTION_SCALE);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
        gl.uniform2f(uResolution, width, height);
      }
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener("resize", resize);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let rafId: number | null = null;
    const start = performance.now();

    const render = (now: number) => {
      gl.uniform1f(uTime, ((now - start) / 1000) * 0.16);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reducedMotion) rafId = requestAnimationFrame(render);
    };

    const stop = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    };
    const resume = () => {
      if (rafId === null && !reducedMotion)
        rafId = requestAnimationFrame(render);
    };

    // Static single frame for reduced-motion users; otherwise pause the
    // rAF loop entirely while the tab is backgrounded.
    render(start);
    if (document.hidden) stop();

    const onVisibility = () => (document.hidden ? stop() : resume());
    document.addEventListener("visibilitychange", onVisibility);

    // Palette lives on the html element's class (`.dark`) — re-read colors
    // whenever that toggles rather than duplicating the theme state here.
    const themeObserver = new MutationObserver(applyPalette);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      stop();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="mesh-gradient-canvas"
    />
  );
}
