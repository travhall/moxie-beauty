"use client";

import { useEffect, useRef } from "react";
import type { BufferGeometry, BufferAttribute } from "three";

// ── Color palettes ──────────────────────────────────────────────────────────

const COLORS = {
  light: {
    primary: "rgb(205, 177, 159)",
    secondary: "rgb(185, 150, 130)",
  },
  dark: {
    primary: "rgb(231, 188, 156)",
    secondary: "rgb(214, 158, 132)",
  },
} as const;

// ── Animation constants ──────────────────────────────────────────────────────

const SPEED = 0.0002;
const NOISE_AMP = 0.32;
const NOISE_FREQ = 1.15;

export default function Blob() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let rafId = 0;
    let disposed = false;
    let running = false;

    void (async () => {
      // Dynamic import keeps Three.js out of the initial bundle entirely
      const [THREE, { createNoise4D }] = await Promise.all([
        import("three"),
        import("simplex-noise"),
      ]);
      if (disposed) return;

      // ── Renderer ──────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.setClearColor(0x000000, 0);

      // ── Scene & camera ────────────────────────────────────────────────────
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        100,
      );
      camera.position.set(0, 0, 5.2);

      // ── Primary blob ──────────────────────────────────────────────────────
      // Detail 3 = ~3,840 vertices vs detail 5 = ~61,440. The 72px CSS blur
      // makes the difference invisible, but the CPU/GPU savings are ~16x.
      const geom = new THREE.IcosahedronGeometry(1.6, 3);
      const baseVerts = new Float32Array(geom.attributes.position.array);
      // MeshBasicMaterial needs no normals or lights — eliminates computeVertexNormals()
      // each frame and all GPU lighting math, both invisible at 72px blur.
      const mat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.95,
      });
      const blob = new THREE.Mesh(geom, mat);
      scene.add(blob);

      // ── Secondary (accent) blob ───────────────────────────────────────────
      const geom2 = new THREE.IcosahedronGeometry(0.9, 3);
      const baseVerts2 = new Float32Array(geom2.attributes.position.array);
      const mat2 = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.75,
      });
      const blob2 = new THREE.Mesh(geom2, mat2);
      blob2.position.set(2.2, -1.4, -1.8);
      scene.add(blob2);

      // ── Theme-aware color sync ────────────────────────────────────────────
      const isDark = () => document.documentElement.classList.contains("dark");
      const syncColors = () => {
        const c = isDark() ? COLORS.dark : COLORS.light;
        mat.color.set(c.primary);
        mat2.color.set(c.secondary);
      };
      syncColors();

      const themeObserver = new MutationObserver(syncColors);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      // ── Noise & deformation ───────────────────────────────────────────────
      const noise4D = createNoise4D();
      const tmp = new THREE.Vector3();

      function deform(
        geometry: BufferGeometry,
        baseArr: Float32Array,
        t: number,
        ampScale: number,
      ) {
        const pos = geometry.attributes.position as BufferAttribute;
        const arr = pos.array as Float32Array;
        const amp = NOISE_AMP * ampScale;

        for (let i = 0; i < arr.length; i += 3) {
          tmp.set(baseArr[i], baseArr[i + 1], baseArr[i + 2]).normalize();
          const n = noise4D(
            tmp.x * NOISE_FREQ,
            tmp.y * NOISE_FREQ,
            tmp.z * NOISE_FREQ,
            t,
          );
          const k = 1 + n * amp;
          arr[i] = baseArr[i] * k;
          arr[i + 1] = baseArr[i + 1] * k;
          arr[i + 2] = baseArr[i + 2] * k;
        }
        pos.needsUpdate = true;
        // No computeVertexNormals() needed — MeshBasicMaterial doesn't use them
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

        deform(geom, baseVerts, t, 1.0);
        deform(geom2, baseVerts2, t * 1.4, 0.7);

        blob.position.x = Math.sin(t * 0.6) * 0.5 + mx * 0.4;
        blob.position.y = Math.cos(t * 0.4) * 0.35 - my * 0.3;
        blob.rotation.x = t * 0.4;
        blob.rotation.y = t * 0.55;

        blob2.position.x = 2.2 + Math.sin(t * 0.5 + 1.2) * 0.5;
        blob2.position.y = -1.4 + Math.cos(t * 0.3 + 0.8) * 0.4;
        blob2.rotation.x = t * -0.3;
        blob2.rotation.y = t * 0.4;

        renderer.render(scene, camera);
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
        deform(geom, baseVerts, 0, 1.0);
        deform(geom2, baseVerts2, 0, 0.7);
        renderer.render(scene, camera);
      }

      // ── Resize ────────────────────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight, false);
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
        geom.dispose();
        mat.dispose();
        geom2.dispose();
        mat2.dispose();
        renderer.dispose();
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
