import React from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useEffect, useRef } from "react";
import { useAvatar } from "../../../context/AvatarContext";
// import useMovements from "../../../utils/key-movements";



export default function RockEnemy(props) {
    const { nodes, materials } = useGLTF('assets/models/rockenemy/RockEnemy.glb')
    return (
        <RigidBody
        // colliders={false}
        type='fixed'
        // type='dynamic'
        colliders='cuboid'
        // Este de abajo genera error
        // friction={0} 
        scale={1.5}
        position={[0, 0.3, -15]}
        >
            <group {...props} dispose={null}>
                <mesh
                position={[0, 0.3, -15]}
                castShadow
                receiveShadow
                geometry={nodes.Enemy.geometry}
                material={materials['Scene_-_Root.003']}
                />
                {/* <CuboidCollider args={[10, 10, 10]} position={[0, 0, 0]} /> */}
                {/* <CuboidCollider args={[10, 10, 10]} position={[0, 0.3, -15]} /> */}
                {/* <CuboidCollider args={[2.5, 10, 3]} position={[0, 0.3, -15]} /> */}
            </group>
        </RigidBody>
    )
}

useGLTF.preload('assets/models/rockenemy/RockEnemy.glb')
