import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Room } from "./Room";
import HeroLights from "./HeroLights";

const ErrorFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-neutral-900">
    <p className="text-white/50 text-sm">Loading 3D...</p>
  </div>
);

const HeroExperiance = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [error, setError] = useState(null);

  if (error) {
    return <ErrorFallback />;
  }

  return (
    <Canvas 
      camera={{ position: [0, 0, 15], fov: 45 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          console.warn('WebGL context lost');
          setError(true);
        });
        gl.domElement.addEventListener('webglcontextrestored', () => {
          console.log('WebGL context restored');
          setError(false);
        });
      }}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance",
        onError: (canvasError) => {
          console.error("Canvas error:", canvasError);
          setError(true);
        }
      }}
    >
      <HeroLights />

      <OrbitControls
        enablePan={false} // Prevents panning of the scene
        enableZoom={false} // Disables zoom on tablets
        maxDistance={20} // Maximum distance for zooming out
        minDistance={10} // Minimum distance for zooming in
        minPolarAngle={Math.PI / 10} // Minimum angle for vertical rotation
        maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
      />

      <group
        scale={isMobile ? 0.7 : 1}
        position={[0, -3.5, 0]}
        rotation={[0, -Math.PI / 4, 0]}
      >
        <Room />
      </group>
    </Canvas>
  );
};

export default HeroExperiance;
