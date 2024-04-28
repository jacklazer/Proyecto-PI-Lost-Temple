
/////////////////////////////////////////////////////////////////////////////////////////////////////



import { KeyboardControls, OrbitControls, Shape } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import World from "./world/World";
import Lights from "./ligthts/Lights";
import Tesseract from "./characters/Tesseract";
import Hero from "./characters/Hero";
import RockEnemy from "./characters/RockEnemy";
import Spider from "./characters/Spider";
import WellcomeText from "./abstractions/WellcomeText";

import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import Controls from "./controls/Controls";
import useMovements from "../../utils/key-movements";

const Level3 = () => {
    const map = useMovements();

    return (
        <KeyboardControls map={map}>
            <Canvas 
            camera={
                {
                    position: [0, 5, -5],
                    // target: [0, 50, 5]
                    // rotation: [-1, 1, 1]
                }
            } 
            shadows={true}>
                <Controls />
                <Suspense fallback={null}>
                    <Lights />

                    {/* <Hero />
                    <RockEnemy />
                    <Spider />*/}

                    <Physics
                    debug={false}
                    gravity={[0, -9.8, 0]}>
                        {/* <World>
                            <WellcomeText position={[0, 50, 0]} />
                        </World> */}

                        {/* <World />
                        <WellcomeText position={[0, 0, 0]} /> */}
                        <World />

                        <Hero />
                        <RockEnemy />
                        <Spider />
                        <Tesseract />
                    </Physics>

                    <WellcomeText position={[0, 50, 0]} />

                </Suspense>

                {/* <OrbitControls target={[0, 1, -2]} /> */}
            </Canvas>
        </KeyboardControls>
    )

}

export default Level3;



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



