// En tu componente de escena 3D
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useAvatar, colectCoin, getColectedCoins } from '../../../context/AvatarContext';

import { socket } from '../../../socket/socket-manager';

let onlinePlayerInSensor = false;

const CollisionDetector = ({ position, onCollisionX, onPX}) => {
  const group = useRef();
  
  const {avatar, setAvatar} = useAvatar();

  const boxRef = useRef();
  useFrame(() => {
      // boxRef.current.rotation.x += 0.01;
      // boxRef.current.rotation.y += 0.01;
      // boxRef.current.rotation.z += 0.01;
      
    // console.log("position>", position)
    // console.log("position.x>", position[0])
    // console.log("position.z>", position[2])
        // console.log("onlinePlayerInSensor>>", onlinePlayerInSensor)

    if ((position[0]-2 < avatar.avatarBodyRef?.translation().x && avatar.avatarBodyRef?.translation().x < position[0]+2 && position[2]-2 < avatar.avatarBodyRef?.translation().z && avatar.avatarBodyRef?.translation().z < position[2]+2) || onlinePlayerInSensor){
      // console.log("choke>>")
        console.log("1. onPX>>", onPX)
      if (onPX == false){
        console.log("2. onPX>>", onPX)
        onCollisionX(true);
      }
    }


    if (onlinePlayerInSensor==false && (position[0]-2 > avatar.avatarBodyRef?.translation().x || avatar.avatarBodyRef?.translation().x > position[0]+2 || position[2]-2 > avatar.avatarBodyRef?.translation().z || avatar.avatarBodyRef?.translation().z > position[2]+2)){
      // console.log("nochoke>>")
      if (onPX){
        onCollisionX(false);
      }
    } 
    // else if (onPX && onlinePlayerInSensor==false){
    //   onCollisionX();
    // }

  });

  const handleCollision = (otherObject) => {
    onCollisionX();
  };

  socket.on('update-values-transform-player', (player) => {
    // // console.log("player.position>>", player.position)
    // if (position[0]-2 < player.position.x && player.position.x < position[0]+2 && position[2]-2 < player.position.z && player.position.z < position[2]+2){
    //   onlinePlayerInSensor = true;
    // } 
    
    // // else {
    // //   console.log(position[2]-2,">", player.position.z)
    // //   if (position[2]-2 == -32 || position[2]-2 == 28){
    // //     onlinePlayerInSensor = false;
    // //   }
    // // }

    // // const unpedazodemierda = position[2]-2;
    // // console.log(unpedazodemierda > 0, position[0]-2 > player.position.x, player.position.x > position[0]+2, unpedazodemierda > player.position.z, player.position.z > position[2]+2);
    // // // console.log(position[2]-2,">", player.position.z)
    // // console.log(unpedazodemierda);
    // if (position[0]-2 > player.position.x || player.position.x > position[0]+2 || unpedazodemierda > player.position.z || player.position.z > position[2]+2){
    //   onlinePlayerInSensor = false;

        // console.log("player.position>>", player.position)
        if (Math.abs(position[0])-2 < Math.abs(player.position.x) && Math.abs(player.position.x) < Math.abs(position[0])+2 && Math.abs(position[2])-2 < Math.abs(player.position.z) && Math.abs(player.position.z) < Math.abs(position[2])+2){
          onlinePlayerInSensor = true;
        } 

        if (Math.abs(position[0])-2 > Math.abs(player.position.x) || Math.abs(player.position.x) > Math.abs(position[0])+2 || Math.abs(position[2])-2 > Math.abs(player.position.z) || Math.abs(player.position.z) > Math.abs(position[2])+2){
          onlinePlayerInSensor = false;
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
