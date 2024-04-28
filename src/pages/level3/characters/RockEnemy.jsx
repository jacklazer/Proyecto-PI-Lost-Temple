import React from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import { useEffect, useRef } from "react";
import { useAvatar } from "../../../context/AvatarContext";
// import useMovements from "../../../utils/key-movements";



export default function RockEnemy(props) {
    const { nodes, materials } = useGLTF('assets/models/rockenemy/RockEnemy.glb')
    return (
        <group {...props} dispose={null}>
            <RigidBody
            type='dynamic'
            colliders='cuboid'
            friction={0}>
                <mesh
                castShadow
                receiveShadow
             
                material={materials['Scene_-_Root.003']}
                />
            </RigidBody>
        </group>
    )
}

useGLTF.preload('assets/models/rockenemy/RockEnemy.glb')
