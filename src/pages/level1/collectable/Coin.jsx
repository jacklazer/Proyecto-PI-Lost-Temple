// En tu componente de escena 3D
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';

const Collectable = ({ position, onCollect, positionHero }) => {
  const group = useRef();

//   const { nodes } = useGLTF('/path/to/collectable.glb');

  useFrame(() => {
    // Rotar el objeto coleccionable
    group.current.rotation.y += 0.01;
  });

  const handleCollision = (otherObject) => {
    console.log("handleCollision>")
    // Detectar colisión con el personaje
    // const distance = position.distanceTo(positionHero);
    const [x1, y1, z1] = position;
    // const [x2, y2, z2] = positionHero;

    const distancia = Math.sqrt(
        Math.pow(positionHero.x - x1, 2) +
        // Math.pow(y2 - y1, 2) +
        Math.pow(positionHero.z - z1, 2)
    );
    if (distancia < 2) {
      // El personaje está lo suficientemente cerca para recoger el objeto
      if (group.current.visible){
        onCollect();
      }
      // Eliminar el objeto coleccionable de la escena
      group.current.visible = false;
    }
  };

  return (
    // <group ref={group} position={position}>
    //   <group rotation={[Math.PI / 2, 0, 0]}>
    //     <mesh
    //       geometry={nodes.collectable.geometry}
    //       material={nodes.collectable.material}
    //       onClick={handleCollision}
    //     />
    //   </group>
    // </group>


    <RigidBody
    type='fixed'
    position={position}
    sensor
    scale={0.12}
    onIntersectionEnter={handleCollision}
    >
      <group 
      ref={group} 
      // position={position}
      >
          <mesh
          castShadow={true}
          receiveShadow={true}
          >
              <torusGeometry/>
              <meshStandardMaterial color="#FFD700" />
          </mesh>
      </group>
    </RigidBody>




    // <group 
    //   ref={group} 
    //   position={position}
    //   >
    //   <group
    //     onPointerOver={handleCollision}
    //     // onClick={handleCollision}
    //     // onIntersectionEnter={handleCollision}
    //   >
    //     <mesh
    //     castShadow={true}
    //     receiveShadow={true}
    //     scale={0.12}
    //     // onClick={handleCollision}
    //     >
    //         <torusGeometry/>
    //         <meshStandardMaterial color="#FFD700" />
    //     </mesh>
    //   </group>
    // </group>

  );
};

export default Collectable;
