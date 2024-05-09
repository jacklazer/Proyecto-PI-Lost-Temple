import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { RigidBody, CuboidCollider } from '@react-three/rapier';
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
    const impulsoBoxRef = useRef();


    // const {avatar, setAvatar} = useAvatar();

    // useFrame(() => {
    //     // const currentPosition = impulsoBoxRef.current?.translation()

    //     // if ((avatar.avatarBodyRef?.translation().x < currentPosition?.x + 0.5) && (avatar.avatarBodyRef?.translation().x > currentPosition?.x - 0.5)
    //     //     &&
    //     // (avatar.avatarBodyRef?.translation().z < currentPosition?.z + 0.5) && (avatar.avatarBodyRef?.translation().z > currentPosition?.z - 0.5)
    //     // ){
    //     //     // uno = false

    //     //     impulsoBoxRef.current?.setTranslation({
    //     //         x:  currentPosition?.x,
    //     //         y:  -10,
    //     //         z:  currentPosition?.z //redManQuadBodyRef.current?.translation().z
    //     //     }, true)
    //     // }

    //     boxRef.current.rotation.x += 0.01;
    //     boxRef.current.rotation.y += 0.01;
    //     boxRef.current.rotation.z += 0.01;
    // });

    // useFrame(() => {
    //     const currentPosition = impulsoBoxRef.current?.translation()

    //     // console.log(avatar.avatarBodyRef?.translation().x, "x<", currentPosition?.x + 1)
    //     // console.log(avatar.avatarBodyRef?.translation().x, ">x", currentPosition?.x - 1)

    //     // console.log(avatar.avatarBodyRef?.translation().z, "z<", currentPosition?.z + 1)
    //     // console.log(avatar.avatarBodyRef?.translation().z, ">z", currentPosition?.z - 1)

    //     // console.log((avatar.avatarBodyRef?.translation().x < currentPosition?.x + 1) && (avatar.avatarBodyRef?.translation().x > currentPosition?.x - 1) && (avatar.avatarBodyRef?.translation().z < currentPosition?.z + 1) && (avatar.avatarBodyRef?.translation().z > currentPosition?.z - 1))
    //     if ((avatar.avatarBodyRef?.translation().x < currentPosition?.x + 1) && (avatar.avatarBodyRef?.translation().x > currentPosition?.x - 1) && (avatar.avatarBodyRef?.translation().z < currentPosition?.z + 1) && (avatar.avatarBodyRef?.translation().z > currentPosition?.z - 1)){

    //         impulsoBoxRef.current?.setTranslation({
    //             x:  currentPosition?.x,
    //             y:  -10,
    //             z:  currentPosition?.z //redManQuadBodyRef.current?.translation().z
    //         }, true)

    //     }
    // });

    // const impulso = (e) => {
    //     e.stopPropagation();
    //     console.log(impulsoBoxRef.current);
    //     impulsoBoxRef.current.applyImpulse({x: 100, y: 100, z: 100}, true);
    //     console.log(impulsoBoxRef.current);
    // }

    const [isTaken, setIsTaken] = useState(false);
    const [isCollected, setIsCollected] = useState(false);

    const handleIntersectionEnter = () => {
        setIsTaken(true);
      props.onUpdateState({ isTaken: true, isCollected: false });
    };
  
    useEffect(() => {
      // Aquí puedes agregar lógica para manejar el estado isCollected si lo necesitas
    }, [isTaken, isCollected]);

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
                friction={0}
                sensor
                onIntersectionEnter={handleIntersectionEnter}

                // Esto es si se opta por el toroide
                scale={0.12}
                // Esto es si se opta por el toroide
                // scale={0.3}
                >
                    <mesh
                    ref={boxRef}
                    // onClick={impulso}
                    position={position}
                    castShadow={true}
                    receiveShadow={true}>
                        <torusGeometry/>
                        {/* <boxGeometry /> */}
                        <meshStandardMaterial color="#FFD700" />
                    </mesh>
                </RigidBody>
            // </RigidBody>
        )
    )
}