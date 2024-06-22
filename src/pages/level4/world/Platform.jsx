

import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useAvatar } from "../../../context/AvatarContext";
import useMovements from "../../../utils/key-movements";
import { useGLTF } from "@react-three/drei";

let direccion = 1;

export default function Platform({ position, onP, onP2, esUnaZunga}) {

    const { nodes, materials } = useGLTF('assets/models/world/Platform.glb')

    const platformRef = useRef();
    const rigidBodyPlatformRef = useRef();
    
    useFrame(() => {

        if (esUnaZunga){
            const currentPosition = rigidBodyPlatformRef.current?.translation();
            let moveY = currentPosition?.y;

            if (onP || onP2){
        
                if (currentPosition?.y > -5){

                    direccion = -1;
        
                    moveY += 0.05*direccion;
            
                    rigidBodyPlatformRef.current?.setTranslation({
                        x:  currentPosition.x,
                        y:  moveY, // RockEnemydRefBodyRef.current?.translation().y,
                        z:  currentPosition.z
                    }, true);
                }


            }

            if (onP == false && onP2 == false) {
                
                if (currentPosition?.y < 1){

                    direccion = 1;
        
                    moveY += 0.05*direccion;
            
                    rigidBodyPlatformRef.current?.setTranslation({
                        x:  currentPosition.x,
                        y:  moveY, // RockEnemydRefBodyRef.current?.translation().y,
                        z:  currentPosition.z
                    }, true);
                }
            }

        }

    });

    return (
        <group 
        // {...props} 
        dispose={null}
        position={ position }
        rotation={[-Math.PI / 2, 0, 0]}
        >
            <RigidBody
            type='fixed'
            ref={rigidBodyPlatformRef}
            // position={[0, 0, 0]}
            colliders='cuboid'>
                <mesh
                    ref={platformRef}
                    // position={[0, -8.8, 8.92]}
                    castShadow
                    receiveShadow
                    geometry={nodes.pedestal_low_poly_Material_0.geometry}
                    material={materials['Material.001']}
                    // rotation={[-Math.PI / 2, 0, 0]}
                />
            </RigidBody>
        </group>
    )
}

useGLTF.preload('assets/models/world/Platform.glb')