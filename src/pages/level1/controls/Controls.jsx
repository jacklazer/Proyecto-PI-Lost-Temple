import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { useAvatar } from "../../../context/AvatarContext";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Quaternion, Vector3 } from "three";

export default function Controls() {
    const {avatar, setAvatar} = useAvatar();
    const [sub, get] = useKeyboardControls()
    const controlsRef = useRef()
    let walkDirection = new Vector3();
    let rotateAngle = new Vector3(0, 1, 0);
    let rotateQuaternion = new Quaternion();
    const velocity = 3;
    let cameraTarget = new Vector3();
    const desiredDistance = 20;

    const getDirectionOffset = (forward, backward, leftward, rightward) => {
        if (forward && leftward) return Math.PI/4;
        if (forward && rightward) return -Math.PI/4;
        if (backward && leftward) return Math.PI*(3/4);
        if (backward && rightward) return -Math.PI*(3/4);
        if (forward) return 0;
        if (backward) return Math.PI;
        if (leftward) return Math.PI / 2;
        if (rightward) return -Math.PI / 2;
        return 0;
    }

    // useEffect(()=>{
    //     return sub(
    //         (state) => state.forward,
    //         (pressed) => {
    //             console.log('forward', pressed)
    //         }
    //     )
    // }, [])

    useFrame((state, delta)=>{
        const { forward, backward, leftward, rightward } = get()
        if(forward || backward || leftward || rightward){
            const directionOffset = getDirectionOffset(forward, backward, leftward, rightward)
            const currentTranslation = avatar.body.translation()

            const angleYCameraDirection = Math.atan2(
                state.camera.position.x - currentTranslation.x,
                state.camera.position.z - currentTranslation.z
            )
            rotateQuaternion.setFromAxisAngle(
                rotateAngle,
                angleYCameraDirection + Math.PI + directionOffset
            )

            avatar.ref.quaternion.rotateTowards(rotateQuaternion, 0.2)
            state.camera.getWorldDirection(walkDirection)
            walkDirection.y = 0
            walkDirection.normalize()
            walkDirection.applyAxisAngle(rotateAngle, directionOffset);

            const moveX = walkDirection.x * velocity * 0.1 //delta
            const moveZ = walkDirection.z * velocity * 0.1 //delta

            const newPosition = new Vector3(
                currentTranslation.x + moveX,
                currentTranslation.y,
                currentTranslation.z + moveZ,
            );

            avatar.body.setTranslation({
                x: newPosition.x,
                y: newPosition.y,
                z: newPosition.z,
            }, true)

            avatar.body.setRotation(new Quaternion({
                x: 0,
                y: avatar.ref.quaternion.y,
                z: 0,
                w: 1
            }).normalize())

            state.camera.position.add(new Vector3(moveX, 0, moveZ))

            cameraTarget.set(
                newPosition.x,
                newPosition.y + 8,
                currentTranslation.z + moveZ,
            )

            // console.log(cameraTarget)

            controlsRef.current.target = cameraTarget
            const avatarPosition = new Vector3(newPosition.x, newPosition.y, newPosition.z)
            const cameraPosition = state.camera.position
            const direction = cameraPosition.sub(avatarPosition).normalize()
            const newCameraPosition = avatarPosition.add(direction.multiplyScalar(desiredDistance))
            state.camera.position.copy(newCameraPosition)
            // const xd = new Vector3(newPosition.x, newPosition.y + 8, newPosition.z)
            // state.camera.lookAt(xd)

            // if(avatar.body && avatar.ref){ 
            //     console.log('moving')
            //     avatar.body.applyImpulse({
            //         x: 0, y: 0, z: 10
            //     }, true)
            //     state.camera.position.x = avatar.body.translation().x // - 5
            //     controlsRef.current.target.x = avatar.body.translation().x
            //     state.camera.position.y = avatar.body.translation().y + 5 + 3 // + 50 + 3
            //     controlsRef.current.target.y = avatar.body.translation().y + 5 + 3 // + 50 + 3
            //     state.camera.position.z = avatar.body.translation().z - 10
            //     controlsRef.current.target.z = avatar.body.translation().z
            // } 
        } else {
            // avatar.body?.sleep()
        }
        const pressed = get().back
    })

    console.log("Avatar", avatar)
    return (
        <OrbitControls 
        ref={controlsRef}
        target={[0, 0, 0]}
        />
        // <OrbitControls 
        // ref={controlsRef}
        // />
    )
}




////////////////////////////////////////////////////////////////////////////////////////

// // import { OrbitControls, useKeyboardControls } from "@react-three/drei";
// // import { useAvatar } from "../../../context/AvatarContext";
// // import { useEffect, useRef } from "react";
// // import { useFrame } from "@react-three/fiber";
// // import { Quaternion, Vector3 } from "three";

// import { useKeyboardControls } from "@react-three/drei";
// import { useAvatar } from "../../../context/AvatarContext";
// import { useEffect, useState } from "react";
// import { useFrame } from "@react-three/fiber";
// import { socket } from "../../../socket/socket-manager";

// export default function Controls() {
//   const { avatar, setAvatar } = useAvatar();
//   const [sub, get] = useKeyboardControls()
// //   const [runSound] = useState(new Audio("/assets/sounds/run.wav"))
//   const [play, setPlay] = useState(false)


// //   useEffect(() => {
// //     const unsubscribe = sub(
// //       (state) => state.forward || state.backward || state.leftward || state.rightward,
// //       (pressed) => {
// //         setAvatar({ ...avatar, animation: pressed ? "Running" : "Idle" });
// //         socket.emit("change-animation", { animation: pressed ? "Running" : "Idle" })
// //       }
// //     );
// //     return () => unsubscribe();
// //   }, [avatar, setAvatar, sub, get]);

// //   useEffect(() => {
// //     if (play) {
// //       runSound.currentTime = 0;
// //       runSound.volume = Math.random()
// //       runSound.play()
// //     } else {
// //       runSound.pause()
// //     }
// //   }, [play])

//   useFrame(() => {
//     const { forward, backward, leftward, rightward } = get()
//     if (forward || backward || leftward || rightward) {
//       setPlay(true)
//       socket.emit("moving-player", {
//         position: avatar.rigidBodyAvatarRef?.translation(),
//         rotation: avatar.rigidBodyAvatarRef?.rotation()
//       })
//     } else {
//       setPlay(false)
//     }
//     const pressed = get().back
//   })
// }