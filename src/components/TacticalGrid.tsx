import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Grid = ({ color }: { color: string }) => {
    const gridRef = useRef<THREE.Group>(null!);
    const { mouse, viewport } = useThree();

    useFrame(() => {
        // Smooth parallax tilt based on mouse position
        const targetRotationX = (mouse.y * viewport.height) / 100;
        const targetRotationY = (mouse.x * viewport.width) / 100;

        gridRef.current.rotation.x = THREE.MathUtils.lerp(gridRef.current.rotation.x, Math.PI / 2.5 + targetRotationX * 0.05, 0.05);
        gridRef.current.rotation.y = THREE.MathUtils.lerp(gridRef.current.rotation.y, targetRotationY * 0.05, 0.05);
    });

    return (
        <group ref={gridRef} position={[0, -5, 0]}>
            <gridHelper args={[100, 40, color, color]} position={[0, 0, 0]} />

            {/* Optional: Subtle architectural markers at some grid intersections */}
            {[-20, 0, 20].map((x) =>
                [-20, 0, 20].map((z) => (
                    <mesh key={`${x}-${z}`} position={[x, 0, z]}>
                        <boxGeometry args={[0.2, 0.2, 0.2]} />
                        <meshBasicMaterial color={color} transparent opacity={0.3} />
                    </mesh>
                ))
            )}
        </group>
    );
};

export const TacticalGrid = () => {
    const [isDark, setIsDark] = useState(document.documentElement.getAttribute('data-theme') !== 'light');

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    const theme = document.documentElement.getAttribute('data-theme');
                    setIsDark(theme !== 'light');
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    const gridColor = isDark ? '#333333' : '#cccccc';

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 5, 20], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <Grid color={gridColor} />
            </Canvas>
        </div>
    );
};
