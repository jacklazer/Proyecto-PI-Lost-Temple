

import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useAvatar } from "../../../context/AvatarContext";
import useMovements from "../../../utils/key-movements";

export default function Tesseract({ position }) {

    // const avatarRef = useRef();
    // const avatarBodyRef = useRef();

    // const {avatar, setAvatar} = useAvatar();


    // useEffect(()=>{
    //     setAvatar({
    //         ref: avatarRef.current,
    //         body: avatarBodyRef.current
    //     })
    // }, [avatarBodyRef.current, avatarRef.current])


    const boxRef = useRef();
    // useFrame(() => {
    //     boxRef.current.rotation.x += 0.01;
    //     boxRef.current.rotation.y += 0.01;
    //     boxRef.current.rotation.z += 0.01;
    // });

    const impulsoBoxRef = useRef();
    // const impulso = (e) => {
    //     e.stopPropagation();
    //     console.log(impulsoBoxRef.current);
    //     impulsoBoxRef.current.applyImpulse({x: 100, y: 100, z: 100}, true);
    //     console.log(impulsoBoxRef.current);
    // }

    return (
        <RigidBody
        type='fixed'
        ref={impulsoBoxRef}
        position={position}//{[0, 5, 0]}
        colliders='cuboid'
        friction={0}>
            <mesh
            // ref={boxRef}
            // onClick={impulso}
            position={position}//{[0, 5, 0]}
            castShadow={true}
            receiveShadow={true}>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="blue" />
            </mesh>
        </RigidBody>
    )
}