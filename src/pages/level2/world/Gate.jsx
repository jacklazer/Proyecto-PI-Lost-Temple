import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useAvatar, getColectedCoins } from '../../../context/AvatarContext'
import { useFrame } from '@react-three/fiber'

let onGate = false;

export default function Gate(
    // props
    { onWin }) {
    const { nodes, materials } = useGLTF('assets/models/world/GateOnePiece.glb')

    const {avatar, setAvatar} = useAvatar();

    useFrame(() => {
        // console.log(avatar.avatarBodyRef?.translation().z, avatar.avatarBodyRef?.translation().x)
        // const [x1, y1, z1] = position;

        // const distancia = Math.sqrt(
        //     Math.pow(avatar.avatarBodyRef?.translation().x - x1, 2) +
        //     Math.pow(avatar.avatarBodyRef?.translation().z - z1, 2)
        // );

        if ((97 < avatar.avatarBodyRef?.translation().z) && (-1 < avatar.avatarBodyRef?.translation().x) && (avatar.avatarBodyRef?.translation().x < 1) && (!onGate)) {
            onGate = true;

            // // // // // // Crear un evento de teclado para presionar la tecla ""
            // // // // // const espacio = new KeyboardEvent('keydown', { key: ' ' });
            // // // // // const aaaa = new KeyboardEvent('keydown', { key: 'a' });
            // // // // // const wwww = new KeyboardEvent('keydown', { key: 'w' });
            // // // // // const dddd = new KeyboardEvent('keydown', { key: 'd' });
            // // // // // // Obtener el elemento en el DOM donde quieres simular la presión de la tecla
            // // // // // const elementoDOM = document.getElementById('root');
            // // // // // // Emitir el evento de teclado en el elemento
            // // // // // elementoDOM.dispatchEvent(espacio);
            // // // // // elementoDOM.dispatchEvent(espacio);
            // // // // // elementoDOM.dispatchEvent(espacio);
            // // // // // elementoDOM.dispatchEvent(espacio);

            // // // // // elementoDOM.dispatchEvent(aaaa);
            // // // // // elementoDOM.dispatchEvent(aaaa);
            // // // // // elementoDOM.dispatchEvent(aaaa);
            // // // // // elementoDOM.dispatchEvent(aaaa);

            // // // // // elementoDOM.dispatchEvent(dddd);
            // // // // // elementoDOM.dispatchEvent(dddd);
            // // // // // elementoDOM.dispatchEvent(dddd);
            // // // // // elementoDOM.dispatchEvent(dddd);

            // // // // // elementoDOM.dispatchEvent(wwww);
            // // // // // elementoDOM.dispatchEvent(wwww);
            // // // // // elementoDOM.dispatchEvent(wwww);
            // // // // // elementoDOM.dispatchEvent(wwww);

            if (getColectedCoins() < 3) {
                const numero_de_llaves = 3 - getColectedCoins()
                alert('Aun faltan ' + numero_de_llaves.toString() + ' llaves');

            } else if (getColectedCoins() >= 3) {
                alert('Has abierto el porton');
                onWin();
            }
            // // // // // // Emitir el evento de teclado en el elemento
            // // // // // elementoDOM.dispatchEvent(espacio);
            // // // // // elementoDOM.dispatchEvent(espacio);
            // // // // // elementoDOM.dispatchEvent(espacio);
            // // // // // elementoDOM.dispatchEvent(espacio);

            // // // // // elementoDOM.dispatchEvent(aaaa);
            // // // // // elementoDOM.dispatchEvent(aaaa);
            // // // // // elementoDOM.dispatchEvent(aaaa);
            // // // // // elementoDOM.dispatchEvent(aaaa);

            // // // // // elementoDOM.dispatchEvent(dddd);
            // // // // // elementoDOM.dispatchEvent(dddd);
            // // // // // elementoDOM.dispatchEvent(dddd);
            // // // // // elementoDOM.dispatchEvent(dddd);

            // // // // // elementoDOM.dispatchEvent(wwww);
            // // // // // elementoDOM.dispatchEvent(wwww);
            // // // // // elementoDOM.dispatchEvent(wwww);
            // // // // // elementoDOM.dispatchEvent(wwww);
        } else if (onGate && ((97 > avatar.avatarBodyRef?.translation().z) || (-1 > avatar.avatarBodyRef?.translation().x) || (avatar.avatarBodyRef?.translation().x > 1))){
            onGate = false;
        }
    });

    return (
        // <RigidBody
        // // type='fixed'
        // // // type='dynamic'
        // // colliders='cuboid'
        // // // scale={0.5}
        // // // position={position}
        // // // sensor
        // >
            <group
            // {...props}
            dispose={null}>
                <group scale={0.01}>
                    <group position={[0, 0, 9950]} rotation={[-Math.PI / 2, 0, Math.PI]} scale={100}>
                    <RigidBody
                    type='fixed'
                    // type='dynamic'
                    colliders='cuboid'
                    // scale={0.5}
                    // position={position}
                    >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes['1_stand_low_stand_0_1'].geometry}
                        material={materials.stand}
                    />
                    </RigidBody>

                    <RigidBody
                    type='fixed'
                    // type='dynamic'
                    colliders='cuboid'
                    // scale={0.5}
                    // position={position}
                    >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes['1_stand_low_stand_0_2'].geometry}
                        material={materials.gate}
                    />
                    </RigidBody>
                    </group>
                </group>
            </group>
        // </RigidBody>

    )
}

useGLTF.preload('assets/models/world/GateOnePiece.glb')
