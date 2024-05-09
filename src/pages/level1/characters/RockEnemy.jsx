import React, { useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useEffect, useRef } from "react";
import { useAvatar } from "../../../context/AvatarContext";
// import useMovements from "../../../utils/key-movements";
import { useFrame } from "@react-three/fiber"
import { socket } from '../../../socket/socket-manager';
import { Quaternion, Vector3 } from 'three';




export default function RockEnemy(
    // props
    {position}

) {
    const redManQuadRef = useRef(null)
    const redManQuadBodyRef = useRef(null)

    const { nodes, materials } = useGLTF('assets/models/rockenemy/RockEnemy.glb')

    const {avatar, setAvatar} = useAvatar();

    // let rotateQuaternion = new Quaternion();
    // let rotateAngle = new Vector3(0, 1, 0);
    const speed = 4

    useFrame((state, delta) => {

        const currentPosition = redManQuadBodyRef.current?.translation()

        let moveX = currentPosition?.x
        let moveZ = currentPosition?.z
        let moveR = 0

        // if (avatar.avatarBodyRef?.translation().x == currentPosition?.x) {
        //     moveX = moveX;
        // }
        // else
        if (avatar.avatarBodyRef?.translation().x > currentPosition?.x ){ //- 4 - 4) {
            moveX += delta * speed;
            moveR += delta * speed
        }
        else if (avatar.avatarBodyRef?.translation().x < currentPosition?.x ){ //- 4 - 4) {
            moveX -= delta * speed;
            moveR += delta * speed
        }

        // if (avatar.avatarBodyRef?.translation().z == currentPosition?.z) {
        //     moveZ = moveZ;
        // }
        // else
        if (avatar.avatarBodyRef?.translation().z > currentPosition?.z + 24.5) {//+ 13 + 4) {
            moveZ += delta * speed;
            moveR += delta * speed
        }
        else if (avatar.avatarBodyRef?.translation().z < currentPosition?.z + 25.5){ //+ 13 + 4) {
            moveZ -= delta * speed;
            moveR += delta * speed
        }

        redManQuadBodyRef.current?.setTranslation({
            x:  moveX,
            y:  redManQuadBodyRef.current?.translation().y,
            z:  moveZ //redManQuadBodyRef.current?.translation().z
        }, true)

        const angle = Math.atan2(avatar.avatarBodyRef?.translation().x - currentPosition?.x, avatar.avatarBodyRef?.translation().z - 24.5 - currentPosition?.z)-Math.PI //- Math.PI;

        let xd = angle
        redManQuadRef.current.rotation.y = xd;
        redManQuadRef.current.position.x = (currentPosition?.x * 0.01) - (Math.sin(xd))*49;
        // redManQuadRef.current.position.x = (Math.sin(xd))*49;
        redManQuadRef.current.position.z = (currentPosition?.z * 0.01) + (1 - Math.cos(xd))*49;
        // redManQuadRef.current.position.z = (1 - Math.cos(xd))*49;






        // const angle = Math.atan2(avatar.avatarBodyRef?.translation().x - currentPosition?.x, avatar.avatarBodyRef?.translation().z - 24.5 - currentPosition?.z)-Math.PI //- Math.PI;
        // // console.log("X>", avatar.avatarBodyRef?.translation().x, "-", currentPosition?.x)
        // // console.log("Z>", avatar.avatarBodyRef?.translation().z -24.5, "-", currentPosition?.z)
        // // console.log("angle>", angle)
        // // console.log("redManQuadRef.current.rotation.y>", redManQuadRef.current.rotation.y)


        // // redManQuadRef.current.position.x = currentPosition?.x - 5;
        // // redManQuadRef.current.position.z = currentPosition?.z + 15;
        // let xdd = redManQuadRef.current.rotation.y*(2/Math.PI)
        // if (redManQuadRef.current.rotation.y < angle){
        //     xdd += 0.01;
        // } else if(redManQuadRef.current.rotation.y > angle) {
        //     xdd -= 0.01;
        // }
        // let xd = Math.PI*(xdd/2);
        // // console.log("xd>", xd)
        // // const xd = Math.PI*(0/2);
        // // const xd = -0.75;
        // if (angle < -Math.PI+0.1 || angle > -0.1){
        //     xd = angle
        // }
        // redManQuadRef.current.rotation.y = xd;
        // redManQuadRef.current.position.x = (currentPosition?.x * 0.01) - (Math.sin(xd))*49;
        // // redManQuadRef.current.position.x = (Math.sin(xd))*49;
        // redManQuadRef.current.position.z = (currentPosition?.z * 0.01) + (1 - Math.cos(xd))*49;
        // // redManQuadRef.current.position.z = (1 - Math.cos(xd))*49;

        // // redManQuadRef.current.position.x = (Math.sin(xd))*49;
        // // redManQuadRef.current.position.z = (1 - Math.cos(xd))*49;

        // // console.log("cos:", Math.cos(xd), "- sen", Math.sin(xd))
        // // console.log("x:", redManQuadBodyRef.current?.translation().x, "- z", redManQuadBodyRef.current?.translation().z)
        // // redManQuadRef.current.position.x = 49;
        // // redManQuadRef.current.position.z = 49;
    })

    return (
        <RigidBody
        ref={redManQuadBodyRef}
        // colliders={false}
        type='fixed'
        // type='dynamic'
        colliders='cuboid'
        // Este de abajo genera error
        // friction={0}
        scale={0.5}
        // position={[-15, 0.3, -15]}
        position={position}
        // rotation={[0, Math.PI*(2), 0]}
        >
            <group
                ref={redManQuadRef}
                // {...props}
                dispose={null}
                // ref={redManQuadRef}
                >
                <mesh
                // position={[-15, 0.3, -15]}
                position={position}
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
