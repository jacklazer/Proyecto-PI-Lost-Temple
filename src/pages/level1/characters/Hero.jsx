// import React from 'react'
// import { useGLTF } from '@react-three/drei'
// import { RigidBody } from '@react-three/rapier';
// import { useEffect, useRef } from "react";
// import { useAvatar } from "../../../context/AvatarContext";
// // import useMovements from "../../../utils/key-movements";

// export default function Hero(props) {

//     const avatarBodyRef = useRef();
//     const avatarRef = useRef();

//     const {avatar, setAvatar} = useAvatar();


//     useEffect(()=>{
//         setAvatar({
//             body: avatarBodyRef.current,
//             ref: avatarRef.current,
//         })
//     }, [avatarBodyRef.current, avatarRef.current])

//     const { nodes, materials } = useGLTF('assets/models/hero/HeroAA.glb')
//     return (
//         <group {...props} dispose={null}>
//             <RigidBody
//             type='dynamic'
//             ref={avatarBodyRef}
//             position={[0, 5, 0]}
//             colliders='cuboid'
//             friction={0}>
//                 <group 
//                 scale={5}
//                 ref={avatarRef}>
//                     <mesh
//                     castShadow
//                     receiveShadow
//                     geometry={nodes.M_MED_GoldAccomplishment.geometry}
//                     material={materials.MI_GoldAccomplishment_Body}
//                     />
//                     <mesh
//                     castShadow
//                     receiveShadow
//                     geometry={nodes.M_MED_GoldAccomplishment_1.geometry}
//                     material={materials.MI_GoldAccomplishment_FaceAcc}
//                     />
//                 </group>
//             </RigidBody>
//         </group>
//     )
// }

// useGLTF.preload('assets/models/hero/HeroAA.glb')

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React from 'react'
// import { Helper, useAnimations, useGLTF, useHelper } from '@react-three/drei'
// import { CapsuleCollider, CuboidCollider, RigidBody } from '@react-three/rapier';
// import { useEffect, useRef } from "react";
// import { useAvatar } from "../../../context/AvatarContext";
// import { Vector3 } from 'three';
// // import useMovements from "../../../utils/key-movements";

// // import { useAnimations } from '@react-three/rapier';

// import { useFrame } from '@react-three/fiber';

// import Ecctrl, { EcctrlAnimation } from "ecctrl";



// export default function Hero(props) {

//     const avatarBodyRef = useRef();
//     const avatarRef = useRef();

//     const {avatar, setAvatar} = useAvatar();


//     const { nodes, materials, animations } = useGLTF('assets/models/hero/HeroAAA.glb')

//     const {actions} = useAnimations(animations, avatarRef)

//     console.log(actions)

//     useEffect(()=>{
//         setAvatar({
//             body: avatarBodyRef.current,
//             ref: avatarRef.current,
//         })
//     }, [avatarBodyRef.current, avatarRef.current])

//     useEffect(() => {
//         if (avatar.animation !== "") {
//             actions[avatar.animation]?.reset().fadeIn(0.5).play();
//             return() => {
//                 if (actions[avatar.animation])
//                 actions[avatar.animation].fadeOut(0.5);
//             }
//         }
//     }, [avatar.animation, actions])

//     useHelper(avatarBodyRef)
    
//     return (

//         // <Ecctrl 
//         // // animated 
//         // // scale={8}
//         // // position={[0, 8, 0]}
//         // // camInitDis = {20}
//         // // camMinDis = {20}
//         // // camMaxDis = {20}
//         // // friction={0.5}
//         // // capsuleHalfHeight = {0.5}
//         // // capsuleRadius = {1}
//         // // floatHeight = {0.5}
//         // >
            
//         <RigidBody
//         type='dynamic'
//         ref={avatarBodyRef}
//         position={[0, 5, 0]}
//         // colliders='cuboid'
//         friction={0}
//         scale={8}
//         colliders={false}
//         >

//             <group 
//             {...props} 
//             dispose={null}
//             ref={avatarRef}
//             // position-y={-0.65}
//             >
//                 <group name="Scene">
//                     <group
//                     name="M_MED_GoldAccomplishment"
//                     >
//                         <group name="M_MED_GoldAccomplishment001">
//                             <skinnedMesh
//                             name="M_MED_GoldAccomplishment_1"
//                             geometry={nodes.M_MED_GoldAccomplishment_1.geometry}
//                             material={materials.MI_GoldAccomplishment_Body}
//                             skeleton={nodes.M_MED_GoldAccomplishment_1.skeleton}
//                             />
//                             <skinnedMesh
//                             name="M_MED_GoldAccomplishment_2"
//                             geometry={nodes.M_MED_GoldAccomplishment_2.geometry}
//                             material={materials.MI_GoldAccomplishment_FaceAcc}
//                             skeleton={nodes.M_MED_GoldAccomplishment_2.skeleton}
//                             />
//                         </group>
//                         <primitive object={nodes.root} />
//                     </group>
//                 </group>
//                 {/* <CapsuleCollider args={[0.5, 0.5]} position={[0, 1, 0]}/>  */}
//                 <CuboidCollider args={[0.4, 0.88, 0.4]} position={[0, 0.88, 0]}/> 
//             </group>

//         </RigidBody>

//         // </Ecctrl>

//     )
// }

// useGLTF.preload('assets/models/hero/HeroAAA.glb')

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React from 'react'
// import { Helper, useAnimations, useGLTF, useHelper } from '@react-three/drei'
// import { CapsuleCollider, CuboidCollider, RigidBody } from '@react-three/rapier';
// import { useEffect, useRef } from "react";
// import { useAvatar } from "../../../context/AvatarContext";
// import { Vector3 } from 'three';
// // import useMovements from "../../../utils/key-movements";

// // import { useAnimations } from '@react-three/rapier';

// import { useFrame } from '@react-three/fiber';

// import Ecctrl, { EcctrlAnimation } from "ecctrl";



// export default function Hero(props) {

//     const avatarBodyRef = useRef();
//     const avatarRef = useRef();

//     const {avatar, setAvatar} = useAvatar();


//     const { nodes, materials, animations } = useGLTF('assets/models/hero/HeroXD.glb')

//     const {actions} = useAnimations(animations, avatarRef)

//     console.log(actions)

//     useEffect(()=>{
//         setAvatar({
//             body: avatarBodyRef.current,
//             ref: avatarRef.current,
//         })
//     }, [avatarBodyRef.current, avatarRef.current])

//     useEffect(() => {
//         if (avatar.animation !== "") {
//             actions[avatar.animation]?.reset().fadeIn(0.5).play();
//             return() => {
//                 if (actions[avatar.animation])
//                 actions[avatar.animation].fadeOut(0.5);
//             }
//         }
//     }, [avatar.animation, actions])

//     useHelper(avatarBodyRef)
    
//     return (

//         // <Ecctrl 
//         // animated 
//         // scale={8}
//         // position={[0, 8, 0]}
//         // camInitDis = {20}
//         // camMinDis = {20}
//         // camMaxDis = {20}
//         // friction={0.5}
//         // capsuleHalfHeight = {0.5}
//         // capsuleRadius = {1}
//         // floatHeight = {0.5}
//         // >
            
//         <RigidBody
//         type='dynamic'
//         ref={avatarBodyRef}
//         position={[0, 0, 0]}
//         // colliders='cuboid'
//         friction={0}
//         // scale={8}
//         colliders={false}>

//             <group 
//             {...props} 
//             dispose={null}
//             ref={avatarRef}>
//                 <group name="Scene">
//                     <group
//                     name="M_MED_GoldAccomplishment002"
//                     // position={[-0.019, -0.007, 0.036]}
//                     // rotation={[-0.027, -0.002, -0.021]}
//                     >
//                     <group name="M_MED_GoldAccomplishment003">
//                         <skinnedMesh
//                         name="M_MED_GoldAccomplishment001"
//                         geometry={nodes.M_MED_GoldAccomplishment001.geometry}
//                         material={materials['MI_GoldAccomplishment_Body.001']}
//                         skeleton={nodes.M_MED_GoldAccomplishment001.skeleton}
//                         />
//                         <skinnedMesh
//                         name="M_MED_GoldAccomplishment001_1"
//                         geometry={nodes.M_MED_GoldAccomplishment001_1.geometry}
//                         material={materials['MI_GoldAccomplishment_FaceAcc.001']}
//                         skeleton={nodes.M_MED_GoldAccomplishment001_1.skeleton}
//                         />
//                     </group>
//                     <primitive object={nodes.root} />
//                     </group>
//                 </group>
//                 {/* <CapsuleCollider args={[0.5, 0.5]} position={[0, 1, 0]}/>  */}
//                 <CuboidCollider args={[0.4, 8, 0.4]} position={[0, 0.88, 0]}/> 
//             </group>

//         </RigidBody>

//         // </Ecctrl>

//     )
// }

// useGLTF.preload('assets/models/hero/HeroXD.glb')

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import { Helper, useAnimations, useGLTF, useHelper } from '@react-three/drei'
import { CapsuleCollider, CuboidCollider, RigidBody } from '@react-three/rapier';
import { useEffect, useRef } from "react";
import { useAvatar } from "../../../context/AvatarContext";
import { Vector3 } from 'three';
// import useMovements from "../../../utils/key-movements";

// import { useAnimations } from '@react-three/rapier';

import { useFrame } from '@react-three/fiber';

import Ecctrl, { EcctrlAnimation } from "ecctrl";

export default function Hero(props) {

    const avatarRef = useRef();
    const avatarBodyRef = useRef();

    const {avatar, setAvatar} = useAvatar();

    const { nodes, materials, animations } = useGLTF('assets/models/hero/HeroAAA.glb')

    const {actions} = useAnimations(animations, avatarRef)

    console.log(actions)

    useEffect(()=>{
        setAvatar({
            ref: avatarRef.current,
            body: avatarBodyRef.current,
        })
    }, [avatarBodyRef.current, avatarRef.current])

    useEffect(() => {
        if (avatar.animation !== "") {
            actions[avatar.animation]?.reset().fadeIn(0.5).play();
            return() => {
                if (actions[avatar.animation])
                actions[avatar.animation].fadeOut(0.5);
            }
        }
    }, [avatar.animation, actions])

    useEffect(()=>{
        setAvatar({
            ...avatar,
            avatarRef: avatarRef?.current,
            avatarBodyRef: avatarBodyRef?.current
        })
    }, [avatarRef?.current, avatarBodyRef?.current])

    // useHelper(avatarBodyRef)
    
    return (

        <Ecctrl 
        ref={avatarBodyRef}
        // camInitDis= {-40}
        // camMaxDis= {-56}
        // // floatHeight = {0.3}
        // // disableFollowCam = {true}
        maxVelLimit={10}
        // capsuleHalfHeight={3.5}
        // capsuleRadius= {3}
        // // camMinDis= {-0.7} 
        // // animated = {false}
        // // scale={8}
        // fallingGravityScale={0}
        position={[0, 10, 0]}
        // // camInitDis = {20}
        // // camMinDis = {20}
        // // camMaxDis = {20}
        // // friction={0.5}
        // // capsuleHalfHeight = {0.5}
        // // capsuleRadius = {1}
        // // floatHeight = {0.5}
        >
            
        {/* <RigidBody
        type='dynamic'
        ref={avatarBodyRef}
        position={[0, 5, 0]}
        // colliders='cuboid'
        friction={0}
        scale={8}
        colliders={false}> */}

            <group 
            {...props} 
            dispose={null}
            ref={avatarRef}
            position-y={-0.65}
            // position-y={-6.5}
            // scale={8}
            >
                <group name="Scene">
                    <group
                    name="M_MED_GoldAccomplishment"
                    >
                        <group name="M_MED_GoldAccomplishment001">
                            <skinnedMesh
                            name="M_MED_GoldAccomplishment_1"
                            geometry={nodes.M_MED_GoldAccomplishment_1.geometry}
                            material={materials.MI_GoldAccomplishment_Body}
                            skeleton={nodes.M_MED_GoldAccomplishment_1.skeleton}
                            />
                            <skinnedMesh
                            name="M_MED_GoldAccomplishment_2"
                            geometry={nodes.M_MED_GoldAccomplishment_2.geometry}
                            material={materials.MI_GoldAccomplishment_FaceAcc}
                            skeleton={nodes.M_MED_GoldAccomplishment_2.skeleton}
                            />
                        </group>
                        <primitive object={nodes.root} />
                    </group>
                </group>
                {/* <CapsuleCollider args={[0.5, 0.5]} position={[0, 1, 0]}/>  */}
                {/* <CuboidCollider args={[0.4, 0.88, 0.4]} position={[0, -6.5, 0]}/>  */}
            </group>

        {/* </RigidBody> */}

        </Ecctrl>

    )
}

useGLTF.preload('assets/models/hero/HeroAAA.glb')
