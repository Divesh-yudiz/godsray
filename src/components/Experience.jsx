import { Environment, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import Godsray from "./Godsray";
import { Model } from "./Model";

export const Experience = () => {
  const {
    godPosX,
    godPosY,
    godPosZ,
    godRotX,
    godRotY,
    godRotZ,
    topRadius,
    bottomRadius,
    height,
    segments,
    color,
    intensity,
    decay,
    distance,
    noiseScale,
    timeSpeed,
    smoothTop,
    smoothBottom,
    fresnelPower,
  } = useControls("Godsray", {
    godPosX: { value: 0, min: -10, max: 10, step: 0.1, label: "Position X" },
    godPosY: { value: 0.6, min: -10, max: 10, step: 0.1, label: "Position Y" },
    godPosZ: { value: 1.1, min: -10, max: 10, step: 0.1, label: "Position Z" },
    godRotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01, label: "Rotation X" },
    godRotY: { value: Math.PI / 2, min: -Math.PI, max: Math.PI, step: 0.01, label: "Rotation Y" },
    godRotZ: { value: 0.98, min: -Math.PI, max: Math.PI, step: 0.01, label: "Rotation Z" },
    topRadius: { value: 1, min: 0.1, max: 5, step: 0.1, label: "Top Radius" },
    bottomRadius: { value: 2, min: 0.1, max: 5, step: 0.1, label: "Bottom Radius" },
    height: { value: 5, min: 0.5, max: 20, step: 0.1, label: "Height" },
    segments: { value: 64, min: 3, max: 128, step: 1, label: "Segments" },
    color: { value: "#bebebe", label: "Color" },
    intensity: { value: 1, min: 0, max: 10, step: 0.1, label: "Intensity" },
    decay: { value: 1, min: 0, max: 5, step: 0.1, label: "Decay" },
    distance: { value: 100, min: 1, max: 500, step: 1, label: "Distance" },
    noiseScale: { value: 5, min: 0, max: 20, step: 0.1, label: "Noise Scale" },
    timeSpeed: { value: 0.5, min: 0, max: 5, step: 0.01, label: "Time Speed" },
    smoothTop: { value: 0.1, min: 0, max: 1, step: 0.01, label: "Smooth Top" },
    smoothBottom: { value: 0.1, min: 0, max: 1, step: 0.01, label: "Smooth Bottom" },
    fresnelPower: { value: 5, min: 0, max: 20, step: 0.1, label: "Fresnel Power" },
  });

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={1} />
      <directionalLight position={[1, 1, 1]} intensity={3} />
      <Godsray
        position={[godPosX, godPosY, godPosZ]}
        rotation={[godRotX, godRotY, godRotZ]}
        settings={{
          topRadius,
          bottomRadius,
          height,
          segments,
          color,
          intensity,
          decay,
          distance,
          noiseScale,
          timeSpeed,
          smoothTop,
          smoothBottom,
          fresnelPower,
        }}
      />
      <Model position={[0, -2, 0]} />
    </>
  );
};
