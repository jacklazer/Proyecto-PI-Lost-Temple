import { Color } from "three";
import { BakeShadows } from "@react-three/drei";

const Lights = () => {
    return <>
            <ambientLight
            color={'white'}
            intensity={1}
            />
            <directionalLight
            castShadow={true}
            position={[50, 50, -50]}
            color={"white"} intensity={50}
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={10}
            shadow-camera-left={-16}
            shadow-camera-right={16}
            shadow-camera-top={16}
            shadow-camera-bottom={-16}/>
            <directionalLight />
            <BakeShadows />
        </>
}
export default Lights;
