import { KeyboardControls, OrbitControls, Shape } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import World from "./world/World";
import Lights from "./ligthts/Lights";
import Tesseract from "./characters/Tesseract";
import Hero from "./characters/Hero";
import RockEnemy from "./characters/RockEnemy";
import WellcomeText from "./abstractions/WellcomeText";

import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import Controls from "./controls/Controls";
import useMovements from "../../utils/key-movements";

import Ecctrl, { EcctrlAnimation } from "ecctrl";

const Level1 = () => {
    const map = useMovements();

    return (
        <KeyboardControls map={map}>
            <Canvas 
            camera={
                {
                    position: [100, 100, 100],
                    // target: [0, 50, 5]
                    // rotation: [-1, 1, 1]
                }
            } 
            shadows={true}>
                <Suspense fallback={null}>
                    <Lights />

                    <Physics
                    debug={true}
                    gravity={[0, -9.8, 0]}>
                        <World />

                        {/* <Ecctrl 
                        animated 
                        scale={8}
                        position={[0, 8, 0]}
                        camInitDis = {20}
                        camMinDis = {20}
                        camMaxDis = {20}
                        friction={0.5}> */}
                            <Hero />
                        {/* </Ecctrl> */}
                        
                        {/* <RockEnemy /> */}

                        {/* <Tesseract /> */}
                    </Physics>

                    <WellcomeText position={[0, 50, 0]} />

                </Suspense>

                {/* <OrbitControls target={[0, 1, -2]} /> */}
                <Controls />
            </Canvas>
        </KeyboardControls>
    )

}

export default Level1;


