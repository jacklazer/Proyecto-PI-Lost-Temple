// import { useGLTF } from "@react-three/drei";

// export default function World() {
//     const worldModel = useGLTF('assets/models/world/WorldL1.glb');

//     return (
//         <mesh>
//             <primitive object={worldModel.scene} />
//         </mesh>
//     )

// }

// useGLTF.preload('assets/models/world/WorldL1.glb')



///////////////////////////////////////////////////////////////////////////////////////



// import React, { useRef } from 'react'
// import { useGLTF } from '@react-three/drei'

// export default function World(props) {
//     const { nodes, materials } = useGLTF('assets/models/world/WorldL1.glb')
//     return (
//         <group {...props} dispose={null}>
//         <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.WallsL1.geometry}
//             material={materials.Material}
//         />
//         <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.FloorL1.geometry}
//             material={materials.Material}
//         />
//         <group scale={5}>
//             <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.M_MED_GoldAccomplishment.geometry}
//             material={materials.MI_GoldAccomplishment_Body}
//             />
//             <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.M_MED_GoldAccomplishment_1.geometry}
//             material={materials.MI_GoldAccomplishment_FaceAcc}
//             />
//         </group>
//         <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Enemy.geometry}
//             material={materials['Scene_-_Root.003']}
//         />
//         </group>
//     )
// }

// useGLTF.preload('assets/models/world/WorldL1.glb')



///////////////////////////////////////////////////////////////////////////////////////



// import React, { useRef } from 'react'
// import { useGLTF, useHelper, useTexture } from '@react-three/drei'
// import { PointLightHelper, RepeatWrapping } from 'three'

// import { useFrame } from '@react-three/fiber';
// import { useControls } from 'leva';
// // import { PointLight } from 'three';

// import { useMemo } from 'react';
// // import { Perf } from 'r3f-perf';
// import { Physics, RigidBody } from '@react-three/rapier';

// export default function World(props) {
//     const { nodes, materials } = useGLTF('assets/models/world/WorldL1_v1.glb')

//     const PATH = 'assets/other/textures/floor/'
//     const propsTextures = useTexture({
//         map: PATH + 'coast_sand_02_diff_1k.jpg',
//         displacementMap: PATH + 'coast_sand_02_disp_1k.png',
//         normalMap: PATH + 'coast_sand_02_nor_gl_1k.jpg',
//         rougghnessMap: PATH + 'coast_sand_02_rough_1k.jpg',
//     })
//     propsTextures.map.repeat.set(2, 2);
//     propsTextures.map.wrapS = RepeatWrapping;
//     propsTextures.map.wrapT = RepeatWrapping;
//     propsTextures.displacementMap.repeat.set(2, 2);
//     propsTextures.displacementMap.wrapS = RepeatWrapping;
//     propsTextures.displacementMap.wrapT = RepeatWrapping;
//     propsTextures.normalMap.repeat.set(2, 2);
//     propsTextures.normalMap.wrapS = RepeatWrapping;
//     propsTextures.normalMap.wrapT = RepeatWrapping;
//     propsTextures.rougghnessMap.repeat.set(2, 2);
//     propsTextures.rougghnessMap.wrapS = RepeatWrapping;
//     propsTextures.rougghnessMap.wrapT = RepeatWrapping;

//     const pointLightRef = useRef();
//     useFrame(() => {
//         // pointLightRef.current.position.x = Math.sin(Date.now() * 0.001) * 3; // Ejemplo de movimiento oscilante en el eje X
//         // pointLightRef.current.position.y = Math.cos(Date.now() * 0.001) * 3; // Ejemplo de movimiento oscilante en el eje Y
//         pointLightRef.current.intensity = Math.cos(Date.now() * 0.0005) * 1000;
//     });

//     const optionsSpotLight = useMemo(() => {
//         return{
//             intensitySL: {value: 100, min: 0, max: 1000, step: 1},
//             colorSL: {value: 'white'}
//         }
//     }, [])
//     const{intensitySL, colorSL} = useControls('Spot Light', optionsSpotLight);

//     const spotLightRef = useRef();
//     useHelper(pointLightRef, PointLightHelper);
//     useHelper(spotLightRef, PointLightHelper);

//     const accion_ = (e) => {
//         e.stopPropagation();
//         alert('alerta');
//         console.log(e);
//         console.log("distance", e.distance); // Distancia entre la cámara y el punto de contacto del rayo.
//         console.log("point", e.point); // Punto de coordenadas en 3D de donde hizo el contacto del rayo en el objeto.
//         console.log("uv", e.uv); // Punto de coordenadas en 2D de donde hizo el contacto el rayo con la geometría.
//         console.log("object", e.object); // Retorna el objeto que fue interceptado.
//         console.log("eventObject", e.eventObject); // Retorna el objeto que escucho el evento.
//         console.log("x", e.x); // Retorna las coordenadas 2D del puntero del mouse en la posición x.
//         console.log("y", event.y); // Retorna las coordenadas 2D del puntero del mouse en la posición y.
//         console.log("shiftKey", e.shiftKey); // retorna true si el evento fue realizado presionando la tecla shiftKey.
//         console.log("ctrlKey", e.shiftKey); // retorna true si el evento fue realizado presionando la tecla ctrlKey.
//         console.log("metaKey", e.metaKey); // retorna true si el evento fue realizado presionando la tecla metaKey.
//     }

//     return (
//         <>
//             <RigidBody 
//             type='fixed'
//             colliders={false}>
//                 {/* <Perf position={'top-left'} /> */}
//                 <group {...props} dispose={null}>
//                     <RigidBody 
//                         type='fixed'
//                         colliders='trimesh'>
//                         <mesh
//                         castShadow={true}
//                         receiveShadow={true}
//                         geometry={nodes.WallsL1.geometry}>
//                             <meshStandardMaterial {...propsTextures} />
//                         </mesh>
//                     </RigidBody>
//                     <RigidBody 
//                     type='fixed'
//                     colliders='trimesh'>
//                         <mesh
//                         castShadow={true}
//                         receiveShadow={true}
//                         geometry={nodes.FloorL1.geometry}>
//                             <meshStandardMaterial {...propsTextures} />
//                         </mesh>
//                     </RigidBody>

//                     <group scale={5} onClick={(e) => accion_(e)}>
//                         <mesh
//                         castShadow={true}
//                         receiveShadow={true}
//                         geometry={nodes.M_MED_GoldAccomplishment.geometry}
//                         material={materials.MI_GoldAccomplishment_Body}
//                         />
//                         <mesh
//                         castShadow={true}
//                         receiveShadow={true}
//                         geometry={nodes.M_MED_GoldAccomplishment_1.geometry}
//                         material={materials.MI_GoldAccomplishment_FaceAcc}
//                         />
//                     <mesh>
//                             <pointLight 
//                             ref={pointLightRef} 
//                             position={[0, 0.7, 1.3]} 
//                             color={'purple'} 
//                             castShadow={true}/>
//                             <spotLight 
//                             ref={spotLightRef} 
//                             position={[0, 5, 15]} 
//                             angle={Math.PI / 3} 
//                             castShadow={true} 
//                             intensity={intensitySL} 
//                             color={colorSL} />
//                         </mesh>
//                     </group>

//                     <group onClick={(e) => accion_(e)}>
//                         <mesh
//                             castShadow={true}
//                             receiveShadow={true}
//                             geometry={nodes.Enemy.geometry}
//                             material={materials['Scene_-_Root.003']}
//                         />
//                     </group>

//                     {props.children}
//                 </group>
//             </RigidBody>
//         </>
//     )
// }

// useGLTF.preload('assets/models/world/WorldL1_v1.glb')



///////////////////////////////////////////////////////////////////////////////////////



import React from 'react'
import { useGLTF, useTexture, Sky, Sparkles, Cloud, Stars, Environment } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import { RepeatWrapping } from 'three'


export default function World(props) {
    const { nodes, materials } = useGLTF('assets/models/world/WorldL1.glb')

    const PATH = 'assets/other/textures/floor/'
    const propsTextures = useTexture({
        map: PATH + 'coast_sand_02_diff_1k.jpg',
        displacementMap: PATH + 'coast_sand_02_disp_1k.png',
        normalMap: PATH + 'coast_sand_02_nor_gl_1k.jpg',
        rougghnessMap: PATH + 'coast_sand_02_rough_1k.jpg',
    })
    propsTextures.map.repeat.set(2, 2);
    propsTextures.map.wrapS = RepeatWrapping;
    propsTextures.map.wrapT = RepeatWrapping;
    propsTextures.displacementMap.repeat.set(2, 2);
    propsTextures.displacementMap.wrapS = RepeatWrapping;
    propsTextures.displacementMap.wrapT = RepeatWrapping;
    propsTextures.normalMap.repeat.set(2, 2);
    propsTextures.normalMap.wrapS = RepeatWrapping;
    propsTextures.normalMap.wrapT = RepeatWrapping;
    propsTextures.rougghnessMap.repeat.set(2, 2);
    propsTextures.rougghnessMap.wrapS = RepeatWrapping;
    propsTextures.rougghnessMap.wrapT = RepeatWrapping;

    return (
        <group {...props} dispose={null}>
            <group>
                <RigidBody
                type="fixed" 
                colliders="trimesh">
                    <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.WallsL1.geometry}
                    onClick={(e) => e.stopPropagation()}>
                        <meshStandardMaterial {...propsTextures} />
                    </mesh>
                </RigidBody>
                <RigidBody 
                type="fixed" 
                colliders="trimesh">
                    <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.FloorL1.geometry}
                    onClick={(e) => e.stopPropagation()}>
                        <meshStandardMaterial {...propsTextures} />
                    </mesh>
                </RigidBody>
            </group>

            <group>
                {/* <Environment
                files='/assets/other/hdris/goegap_4k.hdr'
                background={true}
                ground={{height: 20, scale: 512, radius: 400}} /> */}
                {/* <Sky
                sunPosition={[0, 0, -1]}
                inclination={0.2}
                azimuth={180}
                mieCoefficient={0.005}
                elevation={5}
                mieDirectionalG={0.07}
                rayleigh={3}
                turbidity={10}
                exposure={0.5} />
                <Sparkles
                color='white'
                count={100}
                size={10}
                fade={false}
                speed={2}
                scale={20} />
                <Cloud
                opacity={0.5}
                speed={0.4}
                width={50}
                depth={5}
                segments={20}
                position-y={20} />
                <Stars
                radius={100}
                depth={50}
                count={1000}
                factor={2}
                saturation={0} /> */}
            </group>
        </group>
    )
}

useGLTF.preload('assets/models/world/WorldL1.glb')
