// En tu componente de escena 3D
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useAvatar, colectCoin, getColectedCoins } from '../../../context/AvatarContext';

import { socket } from '../../../socket/socket-manager';

const CollisionDetector = ({ position, onCollision, onP}) => {
  const group = useRef();
  
  const {avatar, setAvatar} = useAvatar();

  const boxRef = useRef();
  useFrame(() => {
      boxRef.current.rotation.x += 0.01;
      boxRef.current.rotation.y += 0.01;
      boxRef.current.rotation.z += 0.01;
      
    if (onP == false && 4 < avatar.avatarBodyRef?.translation().x && avatar.avatarBodyRef?.translation().x < 6 && 0 < avatar.avatarBodyRef?.translation().z && avatar.avatarBodyRef?.translation().z < 2){
      console.log("choke>>")
      onCollision();
    }
    if (onP && (4 > avatar.avatarBodyRef?.translation().x || avatar.avatarBodyRef?.translation().x > 6 || 0 > avatar.avatarBodyRef?.translation().z || avatar.avatarBodyRef?.translation().z > 2)){
      console.log("nochoke>>")
      onCollision();
    }

  });

  const handleCollision = (otherObject) => {
    onCollision();
  };

  socket.on('update-values-transform-player', (player) => {
    console.log("player.position>>", player.position)
    if (onP == false && 4 < player.position.x && player.position.x < 6 && 0 < player.position.z && player.position.z < 2){
      console.log("choke>>")
      onCollision();
    }
    if (onP && (4 > player.position.x || player.position.x > 6 || 0 > player.position.z || player.position.z > 2)){
      console.log("nochoke>>")
      onCollision();
    }
  })

  return (


    <RigidBody
    type='fixed'
    position={position}
    sensor
    scale={0.12}
    // onIntersectionEnter={handleCollision}
    >
      <group 
      ref={group} 
      // position={position}
      >
          <mesh
          castShadow={true}
          receiveShadow={true}
          ref={boxRef}
          >
              <boxGeometry />
              <meshStandardMaterial color="blue" />
          </mesh>
      </group>
    </RigidBody>

  );
};

export default CollisionDetector;
