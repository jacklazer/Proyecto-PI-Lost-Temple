import React, { useState } from 'react'
import { Cloud, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import { useRef } from "react";
import { useAvatar, getColectedSmokeBomb, throwSmokeBomb } from "../../../context/AvatarContext";
// import useMovements from "../../../utils/key-movements";
import { useFrame } from "@react-three/fiber";

let initialSkeletonEnemySpeed = 5;
let slowsPower = 3;

export default function SkeletonEnemy(
    // props
    { position, onCatch, onGetShot }

) {
    const { nodes, materials } = useGLTF('assets/models/spiderenemy/SpiderEnemy.glb');

    const RockEnemydRef = useRef(null);
    const RockEnemydRefBodyRef = useRef(null);
    const enemyCloud = useRef(null);

    const {avatar, setAvatar} = useAvatar();
    
    useFrame((state, delta) => {

        const currentPosition = RockEnemydRefBodyRef.current?.translation();

        let slow = 0;
        if (enemyCloud.current.visible){
            slow = slowsPower;
        }
        const rokcCurrentEnemySpeed = initialSkeletonEnemySpeed - slow;



        // // let moveX = currentPosition?.x;
        let moveZ = currentPosition?.z;
        
        // // if (avatar.avatarBodyRef?.translation().x > currentPosition?.x + 4){ //- 4 - 4) {
        // //     moveX += delta * rokcCurrentEnemySpeed;
        // // }
        // // else if (avatar.avatarBodyRef?.translation().x < currentPosition?.x + 4){ //- 4 - 4) {
        // //     moveX -= delta * rokcCurrentEnemySpeed;
        // // };

        if (avatar.avatarBodyRef?.translation().z > currentPosition?.z - 5) {//+ 24.5) {//+ 13 + 4) {
            moveZ += delta * rokcCurrentEnemySpeed;
        }
        else if (avatar.avatarBodyRef?.translation().z < currentPosition?.z - 5) {//+ 25.5){ //+ 13 + 4) {
            moveZ -= delta * rokcCurrentEnemySpeed;
        };

        RockEnemydRefBodyRef.current?.setTranslation({
            // x:  moveX,
            x:  RockEnemydRefBodyRef.current?.translation().x,
            y:  RockEnemydRefBodyRef.current?.translation().y,
            z:  moveZ
        }, true);





















































    //     // // // const angle = Math.atan2(avatar.avatarBodyRef?.translation().x - currentPosition?.x, avatar.avatarBodyRef?.translation().z - 24.5 - currentPosition?.z)-Math.PI;
    //     // // const angle = Math.atan2(avatar.avatarBodyRef?.translation().x - currentPosition?.x + 4, avatar.avatarBodyRef?.translation().z - currentPosition?.z - 5) -Math.PI;

    //     // // console.log("angle>>", angle)
    //     // // RockEnemydRef.current.rotation.z = Math.PI*0; 
    //     // RockEnemydRef.current.rotation.z = RockEnemydRef.current.rotation.z + 0.05;
    //     // RockEnemydRef.current.position.x = -4.5;
    //     // RockEnemydRef.current.position.y = -4;
    //     // console.log("RockEnemydRef.current.position", RockEnemydRef.current.position)
    //     // // RockEnemydRef.current.rotation.z = angle;
    //     // // RockEnemydRef.current.position.x = currentPosition?.z + 20;
    //     // // RockEnemydRef.current.position.z = currentPosition?.z ;
    //     // // RockEnemydRef.current.position.x = (currentPosition?.x * 0.01) - (Math.sin(angle))*49;
    //     // // RockEnemydRef.current.position.z = (currentPosition?.z * 0.01) + (1 - Math.cos(angle))*49;

    //     // // // let xd = angle;
    //     // // RockEnemydRef.current.rotation.y = xd;
    //     // // RockEnemydRef.current.position.x = (currentPosition?.x * 0.01) - (Math.sin(xd))*49;
    //     // // RockEnemydRef.current.position.z = (currentPosition?.z * 0.01) + (1 - Math.cos(xd))*49;



    //     // const angle = Math.atan2(avatar.avatarBodyRef?.translation().x - currentPosition?.x, avatar.avatarBodyRef?.translation().z - 24.5 - currentPosition?.z)-Math.PI;
    //     const angle = Math.atan2(avatar.avatarBodyRef?.translation().x - currentPosition?.x, avatar.avatarBodyRef?.translation().z + 5 - currentPosition?.z)-Math.PI;

    //     let xd = angle;
    //     RockEnemydRef.current.rotation.z = xd;
    //     // // RockEnemydRef.current.position.x = (currentPosition?.x * 0.01) - (Math.sin(xd))*49;
    //     // // RockEnemydRef.current.position.z = (currentPosition?.z * 0.01) + (1 - Math.cos(xd))*49;
    //     RockEnemydRef.current.position.x = - (Math.sin(xd))*1;
    //     RockEnemydRef.current.position.y = -(1 - Math.cos(xd))*2;

    //     // console.log("angle>>", angle)
    //     // console.log("RockEnemydRef.current.position.x>>", RockEnemydRef.current.position.x)
    //     // console.log("currentPosition?.x>>", currentPosition?.x)
    //     // console.log("RockEnemydRef.current.position.z>>", RockEnemydRef.current.position.z)
    //     // console.log("currentPosition?.z>>", currentPosition?.z)




































        // enemyCloud.current.position.x = moveX ;
        // enemyCloud.current.position.y = -2;
        enemyCloud.current.position.z = moveZ - 5;
    











        console.log("avatar.avatarBodyRef?.translation().z, currentPosition?.z", avatar.avatarBodyRef?.translation().z, currentPosition?.z)


        const distancia = Math.abs(avatar.avatarBodyRef?.translation().z - currentPosition?.z);
        if (distancia < 10) {
            // console.log("distancia>>", distancia)
            alert('Has muerto');
            onCatch();
        }

    });
    
    const atacked = (e) => {

        if (getColectedSmokeBomb() > 0){
            enemyCloud.current.visible = true;
            setTimeout(() => {
                enemyCloud.current.visible = false;
            }, 5000);
            e.stopPropagation();
            throwSmokeBomb();
            onGetShot();
        }
    };


    return (
        <>
            <group
            ref={enemyCloud}
            // position={[0, 0, 24.5]}
            visible={false}
            // visible={true}
            >
                <Cloud
                // ref={enemyCloud}
                // position={position}
                opacity={0.3}
                speed={0.1}
                // width={25}
                // depth={25}
                segments={20}
                position-y={3}
                />
            </group>

            <group 
            // {...props}
            // rotation={[-Math.PI / 2, 0, 0]}
            rotation={[0, Math.PI, 0]}
            // ref={RockEnemydRef}
            dispose={null}
            position={position}
            >

                <RigidBody
                ref={RockEnemydRefBodyRef}
                type='fixed'
                // type='dynamic'
                colliders='cuboid'
                scale={0.5}
                // position={position}
                >
                <group 
                // rotation={[-Math.PI / 2, 0, 0]}
                ref={RockEnemydRef}
                >

                    {/* <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_2.geometry}
                    material={materials.material_0}
                    />

                    <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_3.geometry}
                    material={materials.Mat_1}
                    onClick={atacked}
                    /> */}



                    <skinnedMesh
                    geometry={nodes.Object_12.geometry}
                    material={materials.Default}
                    skeleton={nodes.Object_12.skeleton}
                    />
                    <skinnedMesh
                    geometry={nodes.Object_14.geometry}
                    material={materials.material_0}
                    skeleton={nodes.Object_14.skeleton}
                    onClick={atacked}
                    />

                    <primitive object={nodes.GLTF_created_0_rootJoint} />
                </group>
                </RigidBody>

            </group>
        </>
    );
};

useGLTF.preload('assets/models/spiderenemy/SpiderEnemy.glb');
