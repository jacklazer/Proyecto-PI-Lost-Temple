import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { useAvatar } from "../../../context/AvatarContext";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Controls() {
    const {avatar, setAvatar} = useAvatar();
    const [sub, get] = useKeyboardControls()
    const controlsRef = useRef()

    useEffect(()=>{
        return sub(
            (state) => state.forward,
            (pressed) => {
                console.log('forward', pressed)
            }
        )
    }, [])

    useFrame((state, delta)=>{
        const { forward, backward, leftward, rightward } = get()
        if(forward || backward || leftward || rightward){
            if(avatar.body && avatar.ref){ 
                console.log('moving')
                avatar.body.applyImpulse({
                    x: 0, y: 0, z: 10
                }, true)
                state.camera.position.x = avatar.body.translation().x // - 5
                controlsRef.current.target.x = avatar.body.translation().x
                state.camera.position.y = avatar.body.translation().y + 5 + 3 // + 50 + 3
                controlsRef.current.target.y = avatar.body.translation().y + 5 + 3 // + 50 + 3
                state.camera.position.z = avatar.body.translation().z - 10
                controlsRef.current.target.z = avatar.body.translation().z
            } 
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