import React from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import { useEffect, useRef } from "react";
import { useAvatar } from "../../../context/AvatarContext";
// import useMovements from "../../../utils/key-movements";

export default function Hero(props) {

    const avatarBodyRef = useRef();
    const avatarRef = useRef();

    const {avatar, setAvatar} = useAvatar();


    useEffect(()=>{
        setAvatar({
            body: avatarBodyRef.current,
            ref: avatarRef.current,
        })
    }, [avatarBodyRef.current, avatarRef.current])

    const { nodes, materials } = useGLTF('assets/models/hero/Hero.glb')
    return (
        <group {...props} dispose={null}>
            <RigidBody
            type='dynamic'
            ref={avatarBodyRef}
            position={[0, 5, 0]}
            colliders='cuboid'
            friction={0}>
                <group 
                scale={5}
                ref={avatarRef}>
                    <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.M_MED_GoldAccomplishment.geometry}
                    material={materials.MI_GoldAccomplishment_Body}
                    />
                    <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.M_MED_GoldAccomplishment_1.geometry}
                    material={materials.MI_GoldAccomplishment_FaceAcc}
                    />
                </group>
            </RigidBody>
        </group>
    )
}

useGLTF.preload('assets/models/hero/Hero.glb')
