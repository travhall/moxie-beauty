"use client";

import { useEffect, useRef } from "react";

// ── Color palettes (hex — OGL's Color parser doesn't accept rgb() strings) ───

const COLORS = {
  light: {
    primary: "#cdb19f",
    secondary: "#b99682",
    // Backdrop: very pale blush, nearly background — becomes a diffuse haze layer
    backdrop: "#eedcd2",
  },
  dark: {
    primary: "#e7bc9c",
    secondary: "#d69e84",
    backdrop: "#c3987e",
  },
} as const;

// ── Animation constants ──────────────────────────────────────────────────────

// Slower speed → more languid, dreamlike drift
const SPEED = 0.00014;
// Higher amplitude → more expressive morphing
const NOISE_AMP = 0.36;
// Lower frequency → bigger, rounder undulations (cloudlike vs textured)
const NOISE_FREQ = 0.75;

// ── Minimal unlit shader — equivalent to a transparent MeshBasicMaterial ────

const VERTEX = `
  attribute vec3 position;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT = `
  precision mediump float;
  uniform vec3 uColor;
  uniform float uOpacity;
  void main() {
    gl_FragColor = vec4(uColor, uOpacity);
  }
`;

// ── Icosphere generator ──────────────────────────────────────────────────────
// Ports three.js's IcosahedronGeometry subdivision (golden-ratio base +
// midpoint subdivision normalized to the sphere) as flat, non-indexed
// triangles — the deform() loop below treats every vertex independently, so
// shared/indexed vertices buy nothing here.

type Vec3Tuple = [number, number, number];

function normalize(v: Vec3Tuple): Vec3Tuple {
  const len = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / len, v[1] / len, v[2] / len];
}

function midpoint(a: Vec3Tuple, b: Vec3Tuple): Vec3Tuple {
  return normalize([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]);
}

function buildIcosphere(radius: number, detail: number): Float32Array {
  const t = (1 + Math.sqrt(5)) / 2;
  const baseVerts: Vec3Tuple[] = [
    [-1, t, 0],
    [1, t, 0],
    [-1, -t, 0],
    [1, -t, 0],
    [0, -1, t],
    [0, 1, t],
    [0, -1, -t],
    [0, 1, -t],
    [t, 0, -1],
    [t, 0, 1],
    [-t, 0, -1],
    [-t, 0, 1],
  ];
  const faces: Vec3Tuple[] = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1],
  ];

  let triangles: [Vec3Tuple, Vec3Tuple, Vec3Tuple][] = faces.map(
    ([a, b, c]) => [
      normalize(baseVerts[a]),
      normalize(baseVerts[b]),
      normalize(baseVerts[c]),
    ],
  );

  for (let d = 0; d < detail; d++) {
    const next: typeof triangles = [];
    for (const [a, b, c] of triangles) {
      const ab = midpoint(a, b);
      const bc = midpoint(b, c);
      const ca = midpoint(c, a);
      next.push([a, ab, ca], [ab, b, bc], [ca, bc, c], [ab, bc, ca]);
    }
    triangles = next;
  }

  const out = new Float32Array(triangles.length * 9);
  let i = 0;
  for (const [a, b, c] of triangles) {
    for (const v of [a, b, c]) {
      out[i++] = v[0] * radius;
      out[i++] = v[1] * radius;
      out[i++] = v[2] * radius;
    }
  }
  return out;
}

export default function Blob() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let rafId = 0;
    let disposed = false;
    let running = false;

    void (async () => {
      // Dynamic import keeps OGL + simplex-noise out of the initial bundle
      const [
        { Renderer, Camera, Transform, Mesh, Geometry, Program, Color },
        { createNoise4D },
      ] = await Promise.all([import("ogl"), import("simplex-noise")]);
      if (disposed) return;

      // ── Renderer ──────────────────────────────────────────────────────────
      const renderer = new Renderer({
        canvas,
        antialias: false,
        alpha: true,
        dpr: Math.min(window.devicePixelRatio, 1.5),
        powerPreference: "low-power",
      });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      renderer.setSize(window.innerWidth, window.innerHeight);
      // Renderer.setSize always writes inline width/height — clear it so the
      // CSS class's 150vw/150vh oversized canvas (for the blur bleed) wins.
      canvas.style.width = "";
      canvas.style.height = "";

      // ── Scene & camera ────────────────────────────────────────────────────
      const scene = new Transform();
      const camera = new Camera(gl, {
        fov: 45,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100,
      });
      camera.position.set(0, 0, 5.2);

      function makeBlob(radius: number, detail: number, opacity: number) {
        const baseVerts = buildIcosphere(radius, detail);
        const positions = baseVerts.slice();
        const geometry = new Geometry(gl, {
          position: { size: 3, data: positions, usage: gl.DYNAMIC_DRAW },
        });
        const program = new Program(gl, {
          vertex: VERTEX,
          fragment: FRAGMENT,
          uniforms: {
            uColor: { value: new Color() },
            uOpacity: { value: opacity },
          },
          transparent: true,
          depthTest: true,
        });
        const mesh = new Mesh(gl, { geometry, program, frustumCulled: false });
        mesh.setParent(scene);
        return { mesh, geometry, program, baseVerts, positions };
      }

      // ── Backdrop blob ─────────────────────────────────────────────────────
      // Large, nearly spherical, very slow — creates the atmospheric haze that
      // the primary and secondary blobs float inside. Detail 2 = ~960 vertices,
      // almost no deformation (ampScale 0.06 ≈ barely breathing).
      const blob3 = makeBlob(2.8, 2, 0.38);
      blob3.mesh.position.set(-0.4, 0.3, -2.5);

      // ── Primary blob ──────────────────────────────────────────────────────
      // Detail 3 = ~3,840 vertices. The 72px CSS blur makes higher detail
      // invisible, but the lower vertex count keeps CPU noise work fast.
      const blob = makeBlob(1.6, 3, 0.95);

      // ── Secondary (accent) blob ───────────────────────────────────────────
      const blob2 = makeBlob(0.9, 3, 0.75);
      blob2.mesh.position.set(2.2, -1.4, -1.8);

      // ── Theme-aware color sync ────────────────────────────────────────────
      const isDark = () => document.documentElement.classList.contains("dark");
      const syncColors = () => {
        const c = isDark() ? COLORS.dark : COLORS.light;
        (blob.program.uniforms.uColor.value as InstanceType<typeof Color>).set(
          c.primary,
        );
        (blob2.program.uniforms.uColor.value as InstanceType<typeof Color>).set(
          c.secondary,
        );
        (blob3.program.uniforms.uColor.value as InstanceType<typeof Color>).set(
          c.backdrop,
        );
      };
      syncColors();

      const themeObserver = new MutationObserver(syncColors);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      // ── Noise & deformation ───────────────────────────────────────────────
      const noise4D = createNoise4D();

      function deform(
        target: {
          geometry: InstanceType<typeof Geometry>;
          baseVerts: Float32Array;
          positions: Float32Array;
        },
        t: number,
        ampScale: number,
      ) {
        const { geometry, baseVerts, positions } = target;
        const amp = NOISE_AMP * ampScale;

        for (let i = 0; i < positions.length; i += 3) {
          const bx = baseVerts[i];
          const by = baseVerts[i + 1];
          const bz = baseVerts[i + 2];
          const len = Math.hypot(bx, by, bz) || 1;
          const nx = bx / len;
          const ny = by / len;
          const nz = bz / len;
          const n = noise4D(
            nx * NOISE_FREQ,
            ny * NOISE_FREQ,
            nz * NOISE_FREQ,
            t,
          );
          const k = 1 + n * amp;
          positions[i] = bx * k;
          positions[i + 1] = by * k;
          positions[i + 2] = bz * k;
        }
        geometry.attributes.position.needsUpdate = true;
      }

      // ── Pointer parallax ─────────────────────────────────────────────────
      let mx = 0,
        my = 0;
      const onPointer = (e: PointerEvent) => {
        mx = e.clientX / window.innerWidth - 0.5;
        my = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      // Respect reduced-motion preference — render a single static frame and stop
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // ── Render loop ───────────────────────────────────────────────────────
      let t = 0;
      let last = performance.now();

      function loop(now: number) {
        const dt = now - last;
        last = now;
        t += dt * SPEED;

        // Backdrop: barely deforms (0.06), independent time offset for variety
        deform(blob3, t * 0.55, 0.06);
        blob3.mesh.rotation.x = t * 0.08;
        blob3.mesh.rotation.y = t * 0.1;

        deform(blob, t, 1.0);
        deform(blob2, t * 1.4, 0.7);

        blob.mesh.position.x = Math.sin(t * 0.6) * 0.5 + mx * 0.4;
        blob.mesh.position.y = Math.cos(t * 0.4) * 0.35 - my * 0.3;
        blob.mesh.rotation.x = t * 0.4;
        blob.mesh.rotation.y = t * 0.55;

        blob2.mesh.position.x = 2.2 + Math.sin(t * 0.5 + 1.2) * 0.5;
        blob2.mesh.position.y = -1.4 + Math.cos(t * 0.3 + 0.8) * 0.4;
        blob2.mesh.rotation.x = t * -0.3;
        blob2.mesh.rotation.y = t * 0.4;

        renderer.render({ scene, camera, frustumCull: false });
        if (!reduced) rafId = requestAnimationFrame(loop);
      }

      function startLoop() {
        if (running || reduced) return;
        running = true;
        last = performance.now();
        rafId = requestAnimationFrame(loop);
      }

      function stopLoop() {
        running = false;
        cancelAnimationFrame(rafId);
      }

      // Pause when the tab is hidden — no point burning GPU in the background
      const onVisibilityChange = () => {
        if (document.hidden) {
          stopLoop();
        } else {
          startLoop();
        }
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      startLoop();
      // Static frame under reduced-motion
      if (reduced) {
        deform(blob3, 0, 0.06);
        deform(blob, 0, 1.0);
        deform(blob2, 0, 0.7);
        renderer.render({ scene, camera, frustumCull: false });
      }

      // ── Resize ────────────────────────────────────────────────────────────
      const onResize = () => {
        camera.perspective({ aspect: window.innerWidth / window.innerHeight });
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvas.style.width = "";
        canvas.style.height = "";
      };
      window.addEventListener("resize", onResize);

      (
        canvas as HTMLCanvasElement & { __blobCleanup?: () => void }
      ).__blobCleanup = () => {
        themeObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibilityChange);
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("resize", onResize);
        stopLoop();
        blob3.geometry.remove();
        blob3.program.remove();
        blob.geometry.remove();
        blob.program.remove();
        blob2.geometry.remove();
        blob2.program.remove();
      };
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      const el = canvas as HTMLCanvasElement & { __blobCleanup?: () => void };
      el.__blobCleanup?.();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="blob-canvas" />;
}
