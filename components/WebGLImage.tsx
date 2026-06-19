"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

export function WebGLImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!container.current || !canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: false });
    
    const uniforms = {
      tDiffuse: { value: null as THREE.Texture | null },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImageRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(-2, -2) },
      uTargetMouse: { value: new THREE.Vector2(-2, -2) },
      uVelocity: { value: new THREE.Vector2(0, 0) },
      uHover: { value: 0 },
      uTime: { value: 0 },
    };
    
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(src, (tex: THREE.Texture) => {
      uniforms.uImageRes.value.set((tex.image as HTMLImageElement).width, (tex.image as HTMLImageElement).height);
      resize();
    });
    uniforms.tDiffuse.value = texture;
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 uResolution;
        uniform vec2 uImageRes;
        uniform vec2 uMouse;
        uniform vec2 uVelocity;
        uniform float uHover;
        uniform float uTime;
        varying vec2 vUv;
        
        float hash12(vec2 p) {
            vec3 p3  = fract(vec3(p.xyx) * .1031);
            p3 += dot(p3, p3.yzx + 33.33);
            return fract((p3.x + p3.y) * p3.z);
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uResolution.x / uResolution.y) / (uImageRes.x / uImageRes.y), 1.0),
            min((uResolution.y / uResolution.x) / (uImageRes.y / uImageRes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          
          if (uHover > 0.0) {
            vec2 aspectUv = vec2(uv.x * (uResolution.x / uResolution.y), uv.y);
            vec2 aspectMouse = vec2(uMouse.x * (uResolution.x / uResolution.y), uMouse.y);
            
            float dist = distance(aspectUv, aspectMouse);
            float radius = 0.45 * uHover;
            float falloff = smoothstep(radius, 0.0, dist);
            
            if (falloff > 0.0) {
              float gridSize = 25.0; 
              vec2 grid = vec2(gridSize * (uResolution.x / uResolution.y), gridSize);
              vec2 blockUv = floor(uv * grid) / grid;
              
              float noise = hash12(blockUv + floor(uTime * 2.0)) * 0.5 + 0.5;
              vec2 fluidDisplacement = uVelocity * falloff * noise * 0.3;
              
              vec2 distortedUv = mix(uv, blockUv - fluidDisplacement, falloff * 0.95);
              
              float split = length(uVelocity) * falloff * 0.08;
              
              vec4 colorR = texture2D(tDiffuse, distortedUv + vec2(split, 0.0));
              vec4 colorG = texture2D(tDiffuse, distortedUv);
              vec4 colorB = texture2D(tDiffuse, distortedUv - vec2(split, 0.0));
              
              gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
              return;
            }
          }
          
          gl_FragColor = texture2D(tDiffuse, uv);
        }
      `
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    const resize = () => {
      if (!container.current) return;
      const { width, height } = container.current.getBoundingClientRect();
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };
    
    window.addEventListener("resize", resize);
    resize();
    
    let raf = 0;
    
    const render = () => {
      uniforms.uTime.value += 0.01;
      
      const dx = uniforms.uTargetMouse.value.x - uniforms.uMouse.value.x;
      const dy = uniforms.uTargetMouse.value.y - uniforms.uMouse.value.y;
      
      uniforms.uMouse.value.x += dx * 0.15;
      uniforms.uMouse.value.y += dy * 0.15;
      
      uniforms.uVelocity.value.x += (dx - uniforms.uVelocity.value.x) * 0.1;
      uniforms.uVelocity.value.y += (dy - uniforms.uVelocity.value.y) * 0.1;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();
    
    const el = container.current;
    
    const onMouseMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1.0 - (event.clientY - rect.top) / rect.height;
      uniforms.uTargetMouse.value.set(x, y);
    };

    const onEnter = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1.0 - (event.clientY - rect.top) / rect.height;
      uniforms.uMouse.value.set(x, y);
      uniforms.uTargetMouse.value.set(x, y);
      uniforms.uVelocity.value.set(0, 0);
      
      gsap.to(uniforms.uHover, { value: 1, duration: 0.6, ease: "power2.out" });
      gsap.to(canvasRef.current, { scale: 1.025, duration: 0.9, ease: "power2.out" });
    };
    
    const onLeave = () => {
      gsap.to(uniforms.uHover, { value: 0, duration: 0.6, ease: "power2.out" });
      gsap.to(canvasRef.current, { scale: 1, duration: 0.9, ease: "power2.out" });
    };
    
    const wrapper = el.closest('a') || el.parentElement || el;
    wrapper.addEventListener("mouseenter", onEnter as any);
    wrapper.addEventListener("mouseleave", onLeave);
    wrapper.addEventListener("mousemove", onMouseMove as any);
    
    return () => {
      window.removeEventListener("resize", resize);
      wrapper.removeEventListener("mouseenter", onEnter as any);
      wrapper.removeEventListener("mouseleave", onLeave);
      wrapper.removeEventListener("mousemove", onMouseMove as any);
      cancelAnimationFrame(raf);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [src]);

  return (
    <div ref={container} className={className} style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
