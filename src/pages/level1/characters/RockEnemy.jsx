import React, { useState } from 'react'
import { Cloud, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import { useRef } from "react";
import { useAvatar, getColectedSmokeBomb, throwSmokeBomb } from "../../../context/AvatarContext";
// import useMovements from "../../../utils/key-movements";
import { useFrame } from "@react-three/fiber";

    let rokcInitialEnemySpeed = 4;
    let slowsPower = 3;

export default function RockEnemy(
    // props
    { position, onCatch }

) {
    const { nodes, materials } = useGLTF('assets/models/rockenemy/RockEnemy.glb');

    const RockEnemydRef = useRef(null);
    const RockEnemydRefBodyRef = useRef(null);
    const enemyCloud = useRef(null);


    // // // // // let rojizo = null
    // // // // // let originalTexture = materials['Scene_-_Root.003'].map;
    // // // // // let materialModificado = new THREE.MeshStandardMaterial({
    // // // // //     map: originalTexture, // Utilizar la textura original
    // // // // //     color: rojizo // null // '0xff0000', // Color rojizo
    // // // // // });
    // // // // // let wasAtacked = false;

    const {avatar, setAvatar} = useAvatar();
    // const rokcInitialEnemySpeed = 4
    
    useFrame((state, delta) => {

        const currentPosition = RockEnemydRefBodyRef.current?.translation();

        let slow = 0;
        if (enemyCloud.current.visible){
            slow = slowsPower;
        }
        const rokcCurrentEnemySpeed = rokcInitialEnemySpeed - slow;

        let moveX = currentPosition?.x;
        let moveZ = currentPosition?.z;
        
        if (avatar.avatarBodyRef?.translation().x > currentPosition?.x ){ //- 4 - 4) {
            moveX += delta * rokcCurrentEnemySpeed;
        }
        else if (avatar.avatarBodyRef?.translation().x < currentPosition?.x ){ //- 4 - 4) {
            moveX -= delta * rokcCurrentEnemySpeed;
        };

        if (avatar.avatarBodyRef?.translation().z > currentPosition?.z + 24.5) {//+ 13 + 4) {
            moveZ += delta * rokcCurrentEnemySpeed;
        }
        else if (avatar.avatarBodyRef?.translation().z < currentPosition?.z + 25.5){ //+ 13 + 4) {
            moveZ -= delta * rokcCurrentEnemySpeed;
        };

        RockEnemydRefBodyRef.current?.setTranslation({
            x:  moveX,
            y:  RockEnemydRefBodyRef.current?.translation().y,
            z:  moveZ
        }, true);

        const angle = Math.atan2(avatar.avatarBodyRef?.translation().x - currentPosition?.x, avatar.avatarBodyRef?.translation().z - 24.5 - currentPosition?.z)-Math.PI;

        let xd = angle;
        RockEnemydRef.current.rotation.y = xd;
        RockEnemydRef.current.position.x = (currentPosition?.x * 0.01) - (Math.sin(xd))*49;
        RockEnemydRef.current.position.z = (currentPosition?.z * 0.01) + (1 - Math.cos(xd))*49;

        // // // // // if (wasAtacked) {
        // // // // //     // rojizo = null;
        // // // // //     wasAtacked = false;
        // // // // // };

        enemyCloud.current.position.x = moveX; //RockEnemydRefBodyRef.current.x;
        // enemyCloud.current.position.y = 0;
        enemyCloud.current.position.z = moveZ + 24.5; //RockEnemydRefBodyRef.current.z;
    
        const distancia = Math.sqrt(
            Math.pow(avatar.avatarBodyRef?.translation().x - currentPosition?.x, 2) +
            Math.pow(avatar.avatarBodyRef?.translation().z - currentPosition?.z - 24.5, 2)
        );
        if (distancia < 4) {
            alert('Has muerto');
            onCatch();
        }
    });
    
    const atacked = (e) => {
    // const atacked = () => {
        // // // // // console.log(rojizo);
        // // // // // rojizo = 'red';
        // // // // // wasAtacked = true;

        // enemyCloud.current.material.opacity = 0;
        // const materialN = enemyCloud.current.material;
        // if (materialN){
        //     materialN.opacity = 0;
        // }

        if (getColectedSmokeBomb() > 0){
            enemyCloud.current.visible = true;
            setTimeout(() => {
                enemyCloud.current.visible = false;
            }, 5000);
            e.stopPropagation();
            // console.log("atacked>");
            throwSmokeBomb();
        }
    };

    // console.log("position.x, position.y, position.z>", position[0], position[1], position[2]);

    return (
        <>
            <group
            ref={enemyCloud}
            // position={[0, 0, 24.5]}
            visible={false}
            >
                <Cloud
                // ref={enemyCloud}
                // position={position}
                opacity={0.3}
                speed={0.1}
                // width={25}
                // depth={25}
                segments={20}
                position-y={5}
                />
            </group>

            <RigidBody
            ref={RockEnemydRefBodyRef}
            // type='fixed'
            type='dynamic'
            colliders='cuboid'
            scale={0.5}
            position={position}
            >
                <group
                    ref={RockEnemydRef}
                    dispose={null}
                    >
                    <mesh
                    position={position}
                    castShadow
                    receiveShadow
                    geometry={nodes.Enemy.geometry}
                    material={materials['Scene_-_Root.003']}
                    // material={materialModificado}
                    onClick={atacked}
                    />
                </group>
        </RigidBody>
        </>
    );
};

useGLTF.preload('assets/models/rockenemy/RockEnemy.glb');
