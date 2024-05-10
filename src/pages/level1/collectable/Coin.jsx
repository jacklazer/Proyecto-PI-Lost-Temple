// En tu componente de escena 3D
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useAvatar } from '../../../context/AvatarContext';

const Collectable = ({ position, onCollect}) => {
  const group = useRef();

  const {avatar, setAvatar} = useAvatar();
  let xH = avatar.avatarBodyRef?.translation().x;
  let zH = avatar.avatarBodyRef?.translation().z;

  useFrame(() => {
    // Rotar el objeto coleccionable
    group.current.rotation.y += 0.01;

    xH = avatar.avatarBodyRef?.translation().x;
    zH = avatar.avatarBodyRef?.translation().z;
  });

  const handleCollision = (otherObject) => {
    // Detectar colisión con el personaje
    const [x1, y1, z1] = position;

    const distancia = Math.sqrt(
        Math.pow(xH - x1, 2) +
        Math.pow(zH - z1, 2)
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

  );
};

export default Collectable;
