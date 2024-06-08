import React from 'react'
import { useGLTF, useTexture, Sky, Sparkles, Cloud, Stars, Environment } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import { RepeatWrapping } from 'three'


export default function World(props) {{
    const { nodes, materials } = useGLTF('assets/models/world/WorldL3.glb')
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
                    material={materials['Material.001']}
                    scale={[0.13, 1, 1]}
                    />
                </RigidBody>
                <RigidBody
                type="fixed" 
                colliders="trimesh">
                    <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.FloorL1.geometry}
                    // material={materials['Material.001']}
                    material-color="gray"
                    scale={[0.13, 1, 1]}
                    />
            </RigidBody>
        </group>
      </group>
    )
  }
}

useGLTF.preload('assets/models/world/WorldL3.glb')
