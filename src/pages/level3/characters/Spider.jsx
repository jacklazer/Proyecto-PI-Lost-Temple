

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';

export default function Spider(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('assets/models/Spider/Spider.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Game">
        <group name="Spider_Armature" position={[0, 41.005, -0.242]} scale={5}>
        <RigidBody
            type='dynamic'
            colliders='cuboid'
            friction={0}>
             </RigidBody>
          <skinnedMesh
            name="Spider"
            geometry={nodes.Spider.geometry}
            material={materials.Spider}
            skeleton={nodes.Spider.skeleton}
          />
          <skinnedMesh
            name="Spider_Eyes"
            geometry={nodes.Spider_Eyes.geometry}
            material={materials.Spider_Eye}
            skeleton={nodes.Spider_Eyes.skeleton}
          />
          <skinnedMesh
            name="Spider_Fur"
            geometry={nodes.Spider_Fur.geometry}
            material={materials.Spider_Fur}
            skeleton={nodes.Spider_Fur.skeleton}
          />
          <skinnedMesh
            name="Spider_teeth"
            geometry={nodes.Spider_teeth.geometry}
            material={materials.Spider_teeth}
            skeleton={nodes.Spider_teeth.skeleton}
          />
          <primitive object={nodes.Body003} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('assets/models/Spider/Spider.glb')

