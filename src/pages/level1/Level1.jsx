import { KeyboardControls, OrbitControls, Shape } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import World from "./world/World";
import Lights from "./ligthts/Lights";
import Tesseract from "./characters/Tesseract";
import Hero from "./characters/Hero";
import RockEnemy from "./characters/RockEnemy";
import WellcomeText from "./abstractions/WellcomeText";

import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import Controls from "./controls/Controls";
import useMovements from "../../utils/key-movements";

import { socket } from "../../socket/socket-manager";
// import Collectables from "./collectable/collectable";
// import Collectable from "./collectable/coin";
import Collectable from "./collectable/Coin";
import { useAvatar } from "../../context/AvatarContext";

const Level1 = () => {
    const map = useMovements();

    useEffect(()=>{
        socket.emit('player-connected')
    }, [])

    const [collectedCount, setCollectedCount] = useState(0);

    const handleCollect = () => {
      // Incrementar el contador de objetos recolectados
      setCollectedCount(prevCount => prevCount + 1);
      console.log("collectedCount>", collectedCount)
    };

    const {avatar, setAvatar} = useAvatar();

    return (
        <Suspense fallback={null}>
            <KeyboardControls map={map}>
                <Canvas 
                // camera={
                //     {
                //         position: [100, 100, 100],
                //         // target: [0, 50, 5]
                //         // rotation: [-1, 1, 1]
                //     }
                // } 
                shadows={true}>
                    <Lights />

                    <Physics
                    // debug={true}
                    >
                        <World />

                        <Hero />
                        
                        <RockEnemy position={[0, 0.3, 0]} />

                        {/* <Tesseract position={[0, 10, 0]} /> */}

                        <Collectable position={[15, 1, 15]} onCollect={handleCollect} />
                        <Collectable position={[17, 1, 15]} onCollect={handleCollect} />
                        <Collectable position={[19, 1, 15]} onCollect={handleCollect} />
                    </Physics>

                    <WellcomeText position={[0, 50, 0]} />

                    <Controls />

                    {/* <OrbitControls target={[0, 1, -2]} /> */}
                </Canvas>
            </KeyboardControls>
        </Suspense>

    )

}

export default Level1;


