//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react'
import { Helper, useAnimations, useGLTF, useHelper } from '@react-three/drei'
import { CapsuleCollider, CuboidCollider, RigidBody, vec3 } from '@react-three/rapier';
import { useEffect, useRef } from "react";
import { useAvatar } from "../../../context/AvatarContext";
import { Vector3 } from 'three';
// import useMovements from "../../../utils/key-movements";

// import { useAnimations } from '@react-three/rapier';

import { useFrame } from '@react-three/fiber';

import Ecctrl, { EcctrlAnimation } from "ecctrl";
import { socket } from '../../../socket/socket-manager';

// export default function Hero() {
export default function Hero2({ url, setOnP }) {

    const avatarRef2 = useRef();
    const avatarBodyRef2 = useRef();

    const { nodes, materials, animations } = useGLTF(url)

    const {actions} = useAnimations(animations, avatarRef2)

    const position = vec3();

    // useHelper(avatarBodyRef2)
    socket.on('update-values-transform-player', (player) => {
        // console.log(player);
        position.set(player.position.x, player.position.y, player.position.z)
        avatarBodyRef2.current?.setTranslation(position, true)
    })

    return (


        <RigidBody 
        ref={avatarBodyRef2} 
        colliders={false} 
        type='fixed'
        // type='dynamic' 
        // friction={0.01}
        position={[-10, 5, 70]}>
            <group ref={avatarRef2} dispose={null}>
                <mesh>
                    {/* <sphereGeometry args={[1, 32, 32]}/> */}
                    <sphereGeometry args={[0.5, 16, 16]}/>
                    <meshStandardMaterial color='blue'/>
                </mesh>
            </group>
            <CuboidCollider args={[0.5, 0.5, 0.5]} />
        </RigidBody>




        // <RigidBody ref={avatarBodyRef2} colliders={false} type="dynamic" position={[-10, 5, 70]}>
        //     <group ref={avatarRef2} dispose={null}>
        //         <mesh>
        //             <sphereGeometry args={[0.5, 16, 16]} />
        //             <meshStandardMaterial color="blue" />
        //         </mesh>
        //     </group>
        //     <CuboidCollider args={[0.5, 0.5, 0.5]} />
        // </RigidBody>



        // <>
        // {/* <Ecctrl 
        // ref={avatarBodyRef2}
        // // camInitDis= {-40}
        // // camMaxDis= {-56}
        // // // floatHeight = {0.3}
        // // // disableFollowCam = {true}
        // maxVelLimit={10}
        // // capsuleHalfHeight={3.5}
        // // capsuleRadius= {3}
        // // // camMinDis= {-0.7} 
        // // // animated = {false}
        // // // scale={8}
        // // fallingGravityScale={0}
        // position={[-10, 2, 70]}
        // // // camInitDis = {20}
        // // // camMinDis = {20}
        // // // camMaxDis = {20}
        // // // friction={0.5}
        // // // capsuleHalfHeight = {0.5}
        // // // capsuleRadius = {1}
        // // // floatHeight = {0.5}
        // > */}
            
        // <RigidBody
        // // type='velocity'
        // type='fixed'
        // // type='dynamic'
        // ref={avatarBodyRef2}
        // position={[-10, 0.7, 70]}
        // colliders='cuboid'
        // // friction={0}
        // scale={1}
        // // colliders={false}
        // >
        //     <group 
        //     dispose={null}
        //     ref={avatarRef2}
        //     position-y={-0.65}
        //     >
        //         <group name="Scene">
        //             <group
        //             name="M_MED_GoldAccomplishment"
        //             >
        //                 <group name="M_MED_GoldAccomplishment001">
        //                     <skinnedMesh
        //                     name="M_MED_GoldAccomplishment_1"
        //                     geometry={nodes.M_MED_GoldAccomplishment_1.geometry}
        //                     material={materials.MI_GoldAccomplishment_Body}
        //                     skeleton={nodes.M_MED_GoldAccomplishment_1.skeleton}
        //                     />
        //                     <skinnedMesh
        //                     name="M_MED_GoldAccomplishment_2"
        //                     geometry={nodes.M_MED_GoldAccomplishment_2.geometry}
        //                     material={materials.MI_GoldAccomplishment_FaceAcc}
        //                     skeleton={nodes.M_MED_GoldAccomplishment_2.skeleton}
        //                     />
        //                 </group>
        //                 <primitive object={nodes.root} />
        //             </group>
        //         </group>
        //     </group>

        // </RigidBody>

        
        // {/* </Ecctrl>  */}
        // </>

    )
}

useGLTF.preload('assets/models/hero/HeroAAA.glb')
