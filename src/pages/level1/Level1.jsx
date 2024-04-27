// import { OrbitControls, Shape } from "@react-three/drei";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Suspense, useRef } from "react";
// import World from "./world/World";
// import Lights from "./ligthts/Lights";
// import Hero from "./characters/Hero";
// import RockEnemy from "./characters/RockEnemy";
// import WellcomeText from "./abstractions/WellcomeText";

// import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";

// const Experience = () => {
//     const boxRef = useRef();
//     useFrame(() => {
//         boxRef.current.rotation.x += 0.01;
//         boxRef.current.rotation.y += 0.01;
//         boxRef.current.rotation.z += 0.01;
//     });

//     const impulsoBoxRef = useRef();
//     const impulso = (e) => {
//         e.stopPropagation();
//         console.log(impulsoBoxRef.current);
//         impulsoBoxRef.current.applyImpulse({x: 100, y: 100, z: 100}, true);
//         console.log(impulsoBoxRef.current);
//     }

//     return (
//         <Canvas 
//         camera={
//             {
//                 position: [100, 100, 100],
//                 rotation: [0, 0, 0]
//             }
//         } 
//         shadows={true}>
//             {/* <Suspense fallback={null}> */}
//                 <Lights />

//                 {/* <Hero />
//                 <RockEnemy /> */}

//                 <Physics
//                 debug={false}
//                 gravity={[0, -9.8, 0]}>
//                     {/* <World>
//                         <WellcomeText position={[0, 50, 0]} />
//                     </World> */}

//                     {/* <World />
//                     <WellcomeText position={[0, 0, 0]} /> */}
//                     <World />

//                     <Hero />
//                     <RockEnemy />

//                     <RigidBody
//                     type='dynamic'
//                     ref={impulsoBoxRef}
//                     position={[0, 50, 5]}
//                     colliders='cuboid'
//                     friction={3}>
//                         <mesh
//                         ref={boxRef}
//                         onClick={impulso}
//                         position={[0, 50, 5]}
//                         castShadow={true}
//                         receiveShadow={true}>
//                             <boxGeometry args={[2, 2, 2]} />
//                             <meshStandardMaterial color="blue" />
//                         </mesh>
//                     </RigidBody>
//                 </Physics>

//                 <WellcomeText position={[0, 50, 0]} />

//             {/* </Suspense> */}

//             <OrbitControls makeDefault />
//         </Canvas>
//     )

// }

// export default Experience;



/////////////////////////////////////////////////////////////////////////////////////////////////////



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

const Level1 = () => {
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
                    <RockEnemy /> */}

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

                        <Tesseract />
                    </Physics>

                    <WellcomeText position={[0, 50, 0]} />

                </Suspense>

                {/* <OrbitControls target={[0, 1, -2]} /> */}
            </Canvas>
        </KeyboardControls>
    )

}

export default Level1;



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import { OrbitControls, Shape } from "@react-three/drei";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Suspense, useRef } from "react";
// import World from "./world/World";
// import Lights from "./ligthts/Lights";
// import Hero from "./characters/Hero";
// import RockEnemy from "./characters/RockEnemy";
// import WellcomeText from "./abstractions/WellcomeText";

// import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";

// import { impulsoBoxRef, boxRef, impulso } from "../../../src/context/AvatarContext";

// const Experience = () => {

//     // const impulsoBoxRef = useRef();
//     // const boxRef = useRef();

//     return (
//         <Canvas 
//         camera={
//             {
//                 position: [100, 100, 100],
//                 rotation: [0, 0, 0]
//             }
//         } 
//         shadows={true}>
//             {/* <Suspense fallback={null}> */}
//                 <Lights />

//                 {/* <Hero />
//                 <RockEnemy /> */}

//                 <Physics
//                 debug={false}
//                 gravity={[0, -9.8, 0]}>
//                     {/* <World>
//                         <WellcomeText position={[0, 50, 0]} />
//                     </World> */}

//                     {/* <World />
//                     <WellcomeText position={[0, 0, 0]} /> */}
//                     <World />

//                     <Hero />
//                     <RockEnemy />

//                     <RigidBody
//                     type='dynamic'
//                     ref={impulsoBoxRef}
//                     position={[0, 50, 5]}
//                     colliders='cuboid'
//                     friction={3}>
//                         <mesh
//                         ref={boxRef}
//                         onClick={impulso}
//                         position={[0, 50, 5]}
//                         castShadow={true}
//                         receiveShadow={true}>
//                             <boxGeometry args={[2, 2, 2]} />
//                             <meshStandardMaterial color="blue" />
//                         </mesh>
//                     </RigidBody>
//                 </Physics>

//                 <WellcomeText position={[0, 50, 0]} />

//             {/* </Suspense> */}

//             <OrbitControls makeDefault />
//         </Canvas>
//     )

// }

// export default Experience;