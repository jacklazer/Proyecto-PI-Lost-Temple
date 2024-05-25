import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from '@react-three/drei'
import { CuboidCollider, RigidBody } from '@react-three/rapier'

const debug = true

function print_debug (text) {
  if (debug) {
    console.log(`[PortalNextWorld.jsx]: ${text}`)
  }
}

export default function PortalNextWorld ({ ...props }) {
  const navigate = useNavigate()
  const nextLevel = props.nextLevel ? props.nextLevel : '/level1'
  const position = props.position ? props.position : [0, 0, 0]

  const handleIntersectionEnter = (event) => {
    print_debug(`[PortalNextWorld.jsx] colisioné con: ${event.colliderObject.name}`)

    if (event.colliderObject.name === 'character-capsule-collider') {
      navigate(nextLevel)
    }
  }

  return (
    <group {...props} name='scene' position={position}>
      <group name='portal' position={[0, 2, 0]} dispose={null}>
        <RigidBody
          type='fixed'
          colliders={false}
        >
          <CuboidCollider
            args={[0.6, 0.9, 0.2]}
            onIntersectionEnter={(event) => handleIntersectionEnter(event)}
            sensor
          />
        </RigidBody>
      </group>
    </group>
  )
}