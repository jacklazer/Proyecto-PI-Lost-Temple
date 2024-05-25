import { KeyboardControls, OrbitControls, Shape } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import World from "./world/World";
import Lights from "./ligthts/Lights";
import Tesseract from "./characters/Tesseract";
import Hero from "./characters/Hero";
import SkeletonEnemy from "./characters/SkeletonEnemy";
import WellcomeText from "./abstractions/WellcomeText";

import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import Controls from "./controls/Controls";
import useMovements from "../../utils/key-movements";

import { socket } from "../../socket/socket-manager";
import Coin from "./collectables/Coin";
import SmokeBomb from "./collectables/SmokeBomb";
import { useAvatar } from "../../context/AvatarContext";
import Gate from "./world/Gate";

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

import { createUser, readUser } from "../../db/users-collections";

import Platform from "./world/Platform";
import PlayerInfortmation from "./abstractions/PlayerInformation";

const Level2 = () => {
    const map = useMovements();

    const auth = useAuth();
    const { displayName, email } = auth.userLogged;
    console.log(displayName, email);

    useEffect(()=>{
        socket.emit('player-connected')
    }, [])

    const [levelFinished, setLevelFinished] = useState(false);
    const [collectedCoins, setCollectedCoins] = useState(0);
    const [collectedBombs, setCollectedBombs] = useState(0);

    /**
     * Save the user data in the DB.
     * @param {*} valuesUser 
     */
    const saveDataUser = async (valuesUser) => {
        const {success} = await readUser(valuesUser.email)
        if (!success)
            await createUser(valuesUser)
    }
    /**
     * When userLogged is changed call saveDataUser to save the user in the DB.
     * @see saveDataUser
     */
    useEffect(() => {
        if (auth.userLogged && levelFinished) {
            const { displayName, email } = auth.userLogged

            saveDataUser({
                displayName: displayName,
                email: email,
                score: collectedCoins.toString(),
            })
        }
    }, [auth.userLogged])




    const collectCoinLevel2 = () => {
        // Incrementar el contador de objetos recolectados
        setCollectedCoins(prevCount => prevCount + 1);
    };

    const collectBombLevel2 = () => {
        // Incrementar el contador de objetos recolectados
        setCollectedBombs(prevCount => prevCount + 1);
    };

    const throwBombLevel2 = () => {
        // Incrementar el contador de objetos recolectados
        setCollectedBombs(prevCount => prevCount - 1);
    };

    const {avatar, setAvatar} = useAvatar();

    const navigate = useNavigate();

    const goToLogin = () => {
        setLevelFinished(true);

        navigate('/', {
            state: {
                firstTime: false
            }
        })
    }

    const goToLevel3 = () => {
        setLevelFinished(true);

        navigate('/level3', {
            state: {
                firstTime: false
            }
        })
    }




    return (
        <Suspense fallback={null}>
                
            <PlayerInfortmation llaves_={collectedCoins} bombas_={collectedBombs}/>
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
                        
                        <Platform position={[40, 0, 40]}/>
                        <Platform position={[40, 0, -40]}/>
                        <Platform position={[-40, 0, 40]}/>
                        <Platform position={[-40, 0, -40]}/>

                        {/* {!win && <Hero /> } */}
                        <Hero />
                        
                        <SkeletonEnemy position={[0, 0.3, 30]} onCatch={goToLogin} onGetShot={throwBombLevel2}/>
                        {/* <SkeletonEnemy position={[30, 0.3, 30]} onCatch={goToLogin} onGetShot={throwBombLevel2}/> */}

                        {/* <Tesseract position={[0, 10, 0]} /> */}

                        <Coin position={[40, 15, 40]} onCollect={collectCoinLevel2} />
                        <Coin position={[40, 15, -40]} onCollect={collectCoinLevel2} />
                        <Coin position={[-40, 15, 40]} onCollect={collectCoinLevel2} />
                        <Coin position={[-40, 15, -40]} onCollect={collectCoinLevel2} />
                        <Coin position={[1, 1, 1]} onCollect={collectCoinLevel2} />


                        <SmokeBomb position={[10, 1, 10]} onCollect={collectBombLevel2} />
                        <SmokeBomb position={[-10, 1, -10]} onCollect={collectBombLevel2}/>
                        <SmokeBomb position={[-10, 1, 10]} onCollect={collectBombLevel2}/>
                        <SmokeBomb position={[10, 1, -10]} onCollect={collectBombLevel2}/>

                    </Physics>

                    <WellcomeText position={[0, 50, 0]} />

                    <Controls />

                    {/* <OrbitControls target={[0, 1, -2]} /> */}
                </Canvas>
            </KeyboardControls>
        </Suspense>

    )

}

export default Level2;


