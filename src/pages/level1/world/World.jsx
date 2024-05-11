import React from 'react'
import { useGLTF, useTexture, Sky, Sparkles, Cloud, Stars, Environment } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import { RepeatWrapping } from 'three'


export default function World(props) {
    const { nodes, materials } = useGLTF('assets/models/world/WorldL1.glb')

    const PATH = 'assets/other/textures/floor/'
    const propsTextures = useTexture({
        map: PATH + 'coast_sand_02_diff_1k.jpg',
        displacementMap: PATH + 'coast_sand_02_disp_1k.png',
        normalMap: PATH + 'coast_sand_02_nor_gl_1k.jpg',
        rougghnessMap: PATH + 'coast_sand_02_rough_1k.jpg',
    })
    propsTextures.map.repeat.set(2, 2);
    propsTextures.map.wrapS = RepeatWrapping;
    propsTextures.map.wrapT = RepeatWrapping;
    propsTextures.displacementMap.repeat.set(2, 2);
    propsTextures.displacementMap.wrapS = RepeatWrapping;
    propsTextures.displacementMap.wrapT = RepeatWrapping;
    propsTextures.normalMap.repeat.set(2, 2);
    propsTextures.normalMap.wrapS = RepeatWrapping;
    propsTextures.normalMap.wrapT = RepeatWrapping;
    propsTextures.rougghnessMap.repeat.set(2, 2);
    propsTextures.rougghnessMap.wrapS = RepeatWrapping;
    propsTextures.rougghnessMap.wrapT = RepeatWrapping;

    return (
        <group {...props} dispose={null}>
            <group>
                <RigidBody
                type="fixed" 
                colliders="trimesh">
                    <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.WallsL1.geometry}
                    onClick={(e) => e.stopPropagation()}>
                        <meshStandardMaterial {...propsTextures} />
                    </mesh>
                </RigidBody>
                <RigidBody 
                type="fixed" 
                colliders="trimesh">
                    <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.FloorL1.geometry}
                    onClick={(e) => e.stopPropagation()}>
                        <meshStandardMaterial {...propsTextures} />
                    </mesh>
                </RigidBody>
            </group>

            <group>
                {/* <Environment
                files='/assets/other/hdris/goegap_4k.hdr'
                background={true}
                ground={{height: 20, scale: 512, radius: 400}} /> */}
                {/* <Sky
                sunPosition={[0, 0, -1]}
                inclination={0.2}
                azimuth={180}
                mieCoefficient={0.005}
                elevation={5}
                mieDirectionalG={0.07}
                rayleigh={3}
                turbidity={10}
                exposure={0.5} /> */}
                {/* <Sparkles
                color='white'
                count={100}
                size={10}
                fade={false}
                speed={2}
                scale={20} /> */}
                {/* <Cloud
                opacity={0.5}
                speed={0.4}
                width={50}
                depth={5}
                segments={20}
                position-y={20} /> */}
                {/* <Stars
                radius={100}
                depth={50}
                count={1000}
                factor={2}
                saturation={0} /> */}
            </group>
        </group>
    )
}

useGLTF.preload('assets/models/world/WorldL1.glb')
