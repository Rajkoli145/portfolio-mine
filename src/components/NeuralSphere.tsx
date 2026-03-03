import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const NeuralSphere = () => {
    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const frameRef = useRef<THREE.Group>(null);
    const latticeRef = useRef<THREE.Group>(null);

    const starkCyan = "#00f2ff";
    const starkWhite = "#ffffff";
    const metallicSilver = "#cbd5e1"; // Metallic grey for the frame

    // 1. Precise Triangular Prism Geometry
    // We'll use a CylinderGeometry with 3 segments to make a triangle
    const prismGeometry = useMemo(() => {
        return new THREE.CylinderGeometry(2.5, 2.5, 0.6, 3);
    }, []);

    const edges = useMemo(() => new THREE.EdgesGeometry(prismGeometry), [prismGeometry]);

    // 2. Internal Lattice / Circuit Structure
    const { latticePoints, latticeConnections } = useMemo(() => {
        const points = [];
        const conns = [];
        const count = 40;

        // Random points inside the triangular prism boundaries
        for (let i = 0; i < count; i++) {
            // Random point in cylinder (triangle)
            const r = Math.random() * 2.2;
            const theta = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 0.4;

            points.push(new THREE.Vector3(
                r * Math.cos(theta),
                y,
                r * Math.sin(theta)
            ));
        }

        // Connect points that are close to each other
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                if (points[i].distanceTo(points[j]) < 1.1) {
                    conns.push([points[i], points[j]]);
                }
            }
        }

        return { latticePoints: points, latticeConnections: conns };
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

        const scrollProgress = Math.min(scrollY / (totalHeight || 1), 1);

        // Camera diving through the core
        const targetZ = 10 - scrollProgress * 18;
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);

        if (groupRef.current) {
            // Main rotation
            groupRef.current.rotation.y = time * 0.2;
            groupRef.current.rotation.x = Math.PI / 2; // Lie flat
            groupRef.current.rotation.z = time * 0.1;

            // Mouse react
            const x = (state.mouse.x * Math.PI) / 8;
            const y = (state.mouse.y * Math.PI) / 8;
            groupRef.current.rotation.y += x * 0.1;
            groupRef.current.rotation.x += y * 0.1;
        }

        if (coreRef.current) {
            coreRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.1); // Pulsing
        }
    });

    return (
        <group ref={groupRef}>
            {/* 3. Metallic Outer Frame */}
            <group ref={frameRef}>
                <lineSegments geometry={edges}>
                    <lineBasicMaterial color={metallicSilver} linewidth={2} />
                </lineSegments>
                {/* Facets with glass-like material */}
                <mesh geometry={prismGeometry}>
                    <meshPhysicalMaterial
                        transparent
                        opacity={0.1}
                        color={starkCyan}
                        metalness={0.9}
                        roughness={0.1}
                        transmission={0.5}
                        thickness={1}
                    />
                </mesh>
            </group>

            {/* 4. Internal Lattice Framework (The circuit look) */}
            <group ref={latticeRef}>
                {latticeConnections.map(([p1, p2], idx) => (
                    <Line
                        key={idx}
                        points={[p1, p2]}
                        color={starkCyan}
                        lineWidth={0.5}
                        transparent
                        opacity={0.3}
                    />
                ))}
                {/* Lattice Nodes */}
                {latticePoints.map((p, idx) => (
                    <mesh key={idx} position={p}>
                        <sphereGeometry args={[0.02, 8, 8]} />
                        <meshBasicMaterial color={starkWhite} transparent opacity={0.6} />
                    </mesh>
                ))}
            </group>

            {/* 5. Glowing Energy Core */}
            <mesh ref={coreRef}>
                <sphereGeometry args={[0.6, 32, 32]} />
                <MeshDistortMaterial
                    color={starkWhite}
                    emissive={starkCyan}
                    emissiveIntensity={4}
                    speed={3}
                    distort={0.4}
                />
            </mesh>

            {/* Point light localized in core for interior bulb effect */}
            <pointLight intensity={2} color={starkCyan} distance={5} />

            {/* Secondary Edge Glow (Outer Triangle Glow) */}
            <lineSegments geometry={edges}>
                <lineBasicMaterial color={starkCyan} transparent opacity={0.4} />
            </lineSegments>
        </group>
    );
};

