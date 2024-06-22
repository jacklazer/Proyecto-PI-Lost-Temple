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

import { disconnectSocket, socket } from "../../socket/socket-manager";
import Coin from "./collectables/Coin";
import SmokeBomb from "./collectables/SmokeBomb";
import { useAvatar } from "../../context/AvatarContext";
import Gate from "./world/Gate";

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

import { createUser, readUser } from "../../db/users-collections";

import Platform from "./world/Platform";
import PlayerInfortmation from "./abstractions/PlayerInformation";
import { count } from "firebase/firestore";
import { useAtom } from "jotai";
import { Players, playersAtom } from "../../components/Players";
import Hero2 from "./characters/Hero2";
import CollisionDetector from "./abstractions/CollisionDetector";

const Level4 = () => {
    const [players] = useAtom(playersAtom);

    const map = useMovements();

    const auth = useAuth();
    const { displayName, email } = auth.userLogged;
    // console.log(displayName, email);

    useEffect(()=>{
        socket.emit('player-connected')
    }, [])

    // useEffect(()=>{
    //     return (
    //         disconnectSocket()
    //     )
    // }, [])

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
        // if (collectedCoins > 0) {
        //     console.log("levelFinished")
            if (auth.userLogged) {
                console.log("saveDataUser")

                const { displayName, email } = auth.userLogged

                saveDataUser({
                    displayName: displayName,
                    email: email,
                    score: collectedCoins.toString(),
                })
            }
        // }
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
        // setLevelFinished(true);
        alert('Ir al siguiente nivel');

        navigate('/level1', {
            state: {
                firstTime: false
            }
        })
    }

    // const [players] = useAtom(playersAtom);
    // // console.log(">>", players);

    const [onP, setOnP] = useState(false);
    const [onP2, setOnP2] = useState(false);

    const changeOnP = () => {
        if (onP){
            setOnP(false);
        } else {
            setOnP(true)
        }
        console.log("changeOnP>>")
    };

    const peroLoMueve = true;

    return (
        <Suspense fallback={null}>
            <PlayerInfortmation llaves_={collectedCoins} bombas_={collectedBombs}/>
            <KeyboardControls map={map}>
                <Players />
                <Canvas 
                shadows={true}>

                    <Lights />

                    <Physics
                    debug={true}
                    >
                        <World />
                        <Gate onWin={goToLevel3}/>

                        {/* <Hero /> */}
                        <Hero url = {players[0]?.urlAvatar} setOnP={changeOnP} onP={onP}/>
                        <Hero2 url = {players[1]?.urlAvatar}/>

                        <CollisionDetector position={[0, 1, -30]} onCollisionX={setOnP2} onPX={onP2}/>

                        <Platform position={[12, 1, 3]} onP={onP} onP2={onP2} esUnaZunga={false}/>
                        <Platform position={[10, 1, 3]} onP={onP} onP2={onP2} esUnaZunga={false}/>
                        <Platform position={[8, 1, 3]} onP={onP} onP2={onP2} esUnaZunga={false}/>
                        <Platform position={[6, 1, 3]} onP={onP} onP2={onP2} esUnaZunga={false}/>
                        <Platform position={[4, 1, 3]} onP={onP} onP2={onP2} esUnaZunga={false}/>
                        <Platform position={[2, 1, 3]} onP={onP} onP2={onP2} esUnaZunga={peroLoMueve}/>
                        <Platform position={[0, 1, 3]} onP={onP} onP2={onP2} esUnaZunga={peroLoMueve}/>
                        <Platform position={[-2, 1, 3]} onP={onP} onP2={onP2} esUnaZunga={peroLoMueve}/>
                        <Platform position={[-4, 1, 3]} onP={onP} onP2={onP2} esUnaZunga={false}/>
                        <Platform position={[-6, 1, 3]} onP={onP} onP2={onP2} esUnaZunga={false}/>
                        <Platform position={[-8, 1, 3]} onP={onP} onP2={onP2} esUnaZunga={false}/>
                        <Platform position={[-10, 1, 3]} onP={onP} onP2={onP2} esUnaZunga={false}/>
                        <Platform position={[-12, 1, 3]} onP={onP} onP2={onP2} esUnaZunga={false}/>
                        
                        <CollisionDetector position={[0, 1, 30]} onCollisionX={setOnP} onPX={onP}/>
                        
                        <SkeletonEnemy position={[0, 3.5, 90]} onCatch={goToLogin} onGetShot={throwBombLevel2}/>
{/* 
                        <Platform position={[5, 1, 3]}/>
                        <Platform position={[5, 1, 3]}/>
                        <Platform position={[-5, 1, 0]}/>
                        <Platform position={[5, 1, 8]}/>
                        <Platform position={[-5, 1, 8]}/>
                        <Platform position={[-5, 1, 13]}/>
                        <Platform position={[5, 1, 13]}/> */}

                        <Coin position={[5, 1, 0]} onCollect={collectCoinLevel2} />
                        <SmokeBomb position={[-5, 1, 0]} onCollect={collectBombLevel2}/>
                        <Coin position={[5, 1, 5]} onCollect={collectCoinLevel2} />
                        <SmokeBomb position={[-5, 1, 5]} onCollect={collectBombLevel2}/>
                        <Coin position={[-5, 1, 10]} onCollect={collectCoinLevel2} />
                        <SmokeBomb position={[5, 1, 10]} onCollect={collectBombLevel2}/>
                        <Coin position={[-5, 1, 13]} onCollect={collectCoinLevel2} />
                        <SmokeBomb position={[5, 1, 13]} onCollect={collectBombLevel2}/>
                        <Coin position={[5, 1, 20]} onCollect={collectCoinLevel2} />
                        <SmokeBomb position={[-5, 1, 20]} onCollect={collectBombLevel2}/>
                        <Coin position={[5, 1, 25]} onCollect={collectCoinLevel2} />
                        <SmokeBomb position={[-5, 1, 25]} onCollect={collectBombLevel2}/>
                        <Coin position={[5, 1, 30]} onCollect={collectCoinLevel2} />
                        <SmokeBomb position={[-5, 1, 30]} onCollect={collectBombLevel2}/>
                        <Coin position={[5, 1, 35]} onCollect={collectCoinLevel2} />
                        <SmokeBomb position={[-5, 1, 35]} onCollect={collectBombLevel2}/>
                        <Coin position={[5, 1, 40]} onCollect={collectCoinLevel2} />
                        <SmokeBomb position={[-5, 1, 40]} onCollect={collectBombLevel2}/>
                        <Coin position={[5, 1, 50]} onCollect={collectCoinLevel2} />
                        <SmokeBomb position={[-5, 1, 50]} onCollect={collectBombLevel2}/>
                        <Coin position={[5, 1, 60]} onCollect={collectCoinLevel2} />
                        <SmokeBomb position={[-5, 1, 60]} onCollect={collectBombLevel2}/>

                    </Physics>

                    {/* {levelFinished && <WellcomeText position={[0, 50, 0]} />} */}
                    <WellcomeText position={[0, 50, 0]} />

                    <Controls />

                    {/* <OrbitControls target={[0, 1, -2]} /> */}
                </Canvas> 
            </KeyboardControls> 
            {/* } */}
        </Suspense>

    )

}

export default Level4;


