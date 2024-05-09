import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useAvatar } from "../../../context/AvatarContext";

export default function Tesseract(
    {position}
) {

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
    useFrame(() => {
        boxRef.current.rotation.x += 0.01;
        boxRef.current.rotation.y += 0.01;
        boxRef.current.rotation.z += 0.01;
    });

    const impulsoBoxRef = useRef();
    const impulso = (e) => {
        e.stopPropagation();
        console.log(impulsoBoxRef.current);
        impulsoBoxRef.current.applyImpulse({x: 100, y: 100, z: 100}, true);
        console.log(impulsoBoxRef.current);
    }
    const [isTaken, setIsTaken] = useState(false);
    const [isCollected, setIsCollected] = useState(false);

    const {avatar, setAvatar} = useAvatar();

    // let positionB = position

    // console.log("position", position)
    // console.log("positionB", positionB)

    // useFrame((state, delta) => {

    //     const currentPosition = boxRef.current?.translation()

    //     console.log("currentPosition", currentPosition)

    //     // if (avatar.avatarBodyRef?.translation().x > currentPosition?.x - 4 - 4) {
    //     //     moveX += delta * speed;
    //     //     moveR += delta * speed
    //     // }

    // }, true)

    return (
        !isTaken && !isCollected && (
            // <RigidBody
            // type='dynamic'
            // position={[0, 10, 0]}
            // colliders='cuboid'
            // scale={2}
            // friction={0}>
                <RigidBody
                type='fixed'
                ref={impulsoBoxRef}
                position={position}
                colliders='cuboid'
                friction={0}>
                    <mesh
                    ref={boxRef}
                    // onClick={impulso}
                    position={position}
                    castShadow={true}
                    receiveShadow={true}>
                        <boxGeometry args={[0.3, 0.3, 0.3]} />
                        <meshStandardMaterial color="blue" />
                    </mesh>
                </RigidBody>
            // </RigidBody>
        )
    )
}