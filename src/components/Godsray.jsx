import React, { useMemo, useEffect } from 'react'
import { MeshStandardNodeMaterial } from 'three/webgpu';
import { extend } from '@react-three/fiber';
import { vec4, mx_worley_noise_float, normalLocal, uniform, time, uv, smoothstep, cameraPosition, positionWorld, dot, normalWorld } from 'three/tsl';
import { color as colorNode } from 'three/tsl';
extend({ MeshStandardNodeMaterial });


const Godsray = ({
    settings = {
        topRadius: 1,
        bottomRadius: 2,
        height: 5,
        segments: 64,
        color: "blue",
        intensity: 1,
        decay: 1,
        distance: 100,
        noiseScale: 5,
        timeSpeed: 0.5,
        smoothTop: 0.1,
        smoothBottom: 0.1,
        fresnelPower: 5,
    },
    ...props
}) => {
    const {
        topRadius,
        bottomRadius,
        height,
        segments,
        color: godsrayColor,
        intensity,
        decay,
        distance,
        noiseScale,
        timeSpeed,
        smoothTop,
        smoothBottom,
        fresnelPower,
    } = settings;

    const { nodes, uniforms } = useMemo(() => {
        const uniforms = {
            noiseScale: uniform(noiseScale),
            color: uniform(colorNode(godsrayColor)),
            timeSpeed: uniform(timeSpeed),
            smoothTop: uniform(smoothTop),
            smoothBottom: uniform(smoothBottom),
            fresnelPower: uniform(fresnelPower),
        }

        const customUV = normalLocal.mul(uniforms.noiseScale).add(time.mul(uniforms.timeSpeed));
        const noise = mx_worley_noise_float(customUV);
        const smooth = smoothstep(0, uniforms.smoothBottom, uv().y).mul(
            smoothstep(1.001, uniforms.smoothTop, uv().y)
        );

        const viewDirection = cameraPosition.sub(positionWorld).normalize();
        const invertedFresnel = dot(normalWorld, viewDirection).abs().pow(uniforms.fresnelPower);

        const alpha = smooth.mul(invertedFresnel).mul(noise);

        return {
            nodes: {
                colorNode: vec4(0, 0, 0, alpha),
                emissiveNode: uniforms.color,
            },
            uniforms,
        }
    }, []);


    useEffect(() => {
        uniforms.noiseScale.value = noiseScale;
        uniforms.timeSpeed.value = timeSpeed;
        uniforms.smoothTop.value = smoothTop;
        uniforms.smoothBottom.value = smoothBottom;
        uniforms.fresnelPower.value = fresnelPower;
        if (godsrayColor) {
            uniforms.color.value.set(godsrayColor);
        }
    }, [noiseScale, godsrayColor, timeSpeed, smoothTop, smoothBottom, fresnelPower]);

    return (
        <mesh {...props}>
            <cylinderGeometry args={[topRadius, bottomRadius, height, segments, 1, true]} />
            <meshStandardNodeMaterial {...nodes} transparent />
        </mesh>
    )
}

export default Godsray