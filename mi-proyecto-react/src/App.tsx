import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import type { Mesh } from 'three'

function Objeto({
  tipo,
  posicion,
  color,
}: {
  tipo: 'esfera' | 'toro' | 'cono'
  posicion: [number, number, number]
  color: string
}) {
  const ref = useRef<Mesh>(null)
  const [colorActual, setColorActual] = useState(color)

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5
  })

  return (
    <mesh
      ref={ref}
      position={posicion}
      onClick={() =>
        setColorActual((anterior) =>
          anterior === color ? 'black' : color,
        )
      }
    >
      {tipo === 'esfera' && <sphereGeometry args={[0.65, 10, 24]} />}
      {tipo === 'toro' && <torusGeometry args={[0.6, 0.22, 12, 32]} />}
      {tipo === 'cono' && <coneGeometry args={[0.6, 1.3, 15]} />}
      <meshStandardMaterial color={colorActual} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <Environment files="/dany.jpg" background />

      <Objeto tipo="esfera" posicion={[-2, 0, 0]} color="deepskyblue" />
      <Objeto tipo="toro" posicion={[0, 0, 0]} color="orange" />
      <Objeto tipo="cono" posicion={[2, 0, 0]} color="mediumseagreen" />

      <OrbitControls enablePan={false} minDistance={3} maxDistance={20} />
    </Canvas>
  )
}