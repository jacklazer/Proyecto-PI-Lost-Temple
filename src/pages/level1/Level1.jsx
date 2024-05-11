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
import Coin from "./collectable/Coin";
import SmokeBomb from "./collectable/SmokeBomb";
import { useAvatar } from "../../context/AvatarContext";
import Gate from "./world/Gate";

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

const Level1 = () => {
    const map = useMovements();

    const auth = useAuth();
    const { displayName, email } = auth.userLogged;
    console.log(displayName, email);

    useEffect(()=>{
        socket.emit('player-connected')
    }, [])

    const [collectedCount, setCollectedCount] = useState(0);

    const handleCollect = () => {
      // Incrementar el contador de objetos recolectados
      setCollectedCount(prevCount => prevCount + 1);
    //   console.log("collectedCount>", collectedCount)
    };

    const {avatar, setAvatar} = useAvatar();

    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/', {
            state: {
                firstTime: false
            }
        })
    }

    const [win, setWin] = useState(false);

    const getWin = () => {
        useState(true);
    };


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
                        <Gate onWin={goToLogin}/>

                        <Hero />
                        
                        <RockEnemy position={[0, 0.3, 0]} onCatch={goToLogin} />

                        {/* <Tesseract position={[0, 10, 0]} /> */}

                        <Coin position={[0, 1, 15]} onCollect={handleCollect} />
                        <Coin position={[0, 1, 17]} onCollect={handleCollect} />
                        <Coin position={[30, 1, 30]} onCollect={handleCollect} />
                        <Coin position={[30, 1, -30]} onCollect={handleCollect} />
                        <Coin position={[-30, 1, 30]} onCollect={handleCollect} />


                        <SmokeBomb position={[20, 1, 20]} onCollect={handleCollect} />
                        <SmokeBomb position={[-20, 1, -20]} onCollect={handleCollect} />
                        <SmokeBomb position={[-20, 1, 20]} onCollect={handleCollect} />
                        <SmokeBomb position={[20, 1, -20]} onCollect={handleCollect} />

                    </Physics>

                    <WellcomeText position={[0, 50, 0]} />

                    <Controls />

                    {/* <OrbitControls target={[0, 1, -2]} /> */}
                </Canvas>
                {win &&
                    <GameOverScene reloadLevel='/level1'/>
                }
            </KeyboardControls>
        </Suspense>

    )

}

export default Level1;


