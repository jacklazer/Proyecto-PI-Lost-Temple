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
import Coin from "./collectables/Coin";
import SmokeBomb from "./collectables/SmokeBomb";
import { useAvatar } from "../../context/AvatarContext";
import Gate from "./world/Gate";

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

import { createUser, readUser } from "../../db/users-collections";
import OnWin from "../onWinOrLost/OnWin";

const Level1 = () => {
    const map = useMovements();

    const auth = useAuth();
    const { displayName, email } = auth.userLogged;
    console.log(displayName, email);

    useEffect(()=>{
        socket.emit('player-connected')
    }, [])

    const [levelFinished, setLevelFinished] = useState(false);
    const [collectedCount, setCollectedCount] = useState(0);
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
                score: collectedCount.toString(),
            })
        }
    }, [auth.userLogged])




    const collectCoinLevel1 = () => {
      // Incrementar el contador de objetos recolectados
      setCollectedCount(prevCount => prevCount + 1);
    //   console.log("collectedCount>", collectedCount)
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

    const goToLevel2 = () => {
        setLevelFinished(true);

        navigate('/level2', {
            state: {
                firstTime: false
            }
        })
    }

    const [win, setWin] = useState(false);

    const getWin = () => {
        setWin(true);
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
                        <Gate onWin={goToLevel2}/>
                        {/* <Gate onWin={getWin}/> */}

                        {/* {!win && <Hero /> } */}
                        <Hero />
                        
                        <RockEnemy position={[0, 0.3, 0]} onCatch={goToLogin} />

                        {/* <Tesseract position={[0, 10, 0]} /> */}

                        <Coin position={[0, 1, 15]} onCollect={collectCoinLevel1} />
                        <Coin position={[0, 1, 17]} onCollect={collectCoinLevel1} />
                        <Coin position={[30, 1, 30]} onCollect={collectCoinLevel1} />
                        <Coin position={[30, 1, -30]} onCollect={collectCoinLevel1} />
                        <Coin position={[-30, 1, 30]} onCollect={collectCoinLevel1} />


                        <SmokeBomb position={[20, 1, 20]} />
                        <SmokeBomb position={[-20, 1, -20]} />
                        <SmokeBomb position={[-20, 1, 20]} />
                        <SmokeBomb position={[20, 1, -20]} />

                    </Physics>

                    <WellcomeText position={[0, 50, 0]} />

                    <Controls />

                    {/* <OrbitControls target={[0, 1, -2]} /> */}
                </Canvas>
                {win && 
                // <OnWin reloadLevel='/level1'/>
                console.log("Vamooooos")
                // navigate("/level2") 
                }
            </KeyboardControls>
        </Suspense>

    )

}

export default Level1;


