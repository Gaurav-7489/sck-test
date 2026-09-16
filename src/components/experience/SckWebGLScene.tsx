'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Cloud, Clouds, Sky } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const clamp = (v: number) => Math.min(1, Math.max(0, v))
const ease = (v: number) => { const x = clamp(v); return x * x * (3 - 2 * x) }
const range = (a: number, b: number, x: number) => ease((x - a) / (b - a))
const INTRO = 19

type Progress = { intro: number; scroll: number; done: boolean }

function Aircraft({ p }: { p: React.MutableRefObject<Progress> }) {
  const g = useRef<THREE.Group>(null)
  const m = useMemo(() => ({
    black: new THREE.MeshPhysicalMaterial({ color: '#050505', metalness: .96, roughness: .18, clearcoat: .9, clearcoatRoughness: .1 }),
    dark: new THREE.MeshPhysicalMaterial({ color: '#121416', metalness: .92, roughness: .2, clearcoat: .65 }),
    glass: new THREE.MeshPhysicalMaterial({ color: '#07131c', metalness: .45, roughness: .04, transmission: .12, transparent: true, opacity: .9 }),
    chrome: new THREE.MeshPhysicalMaterial({ color: '#bfc5c9', metalness: 1, roughness: .14 }),
  }), [])
  useFrame((s) => {
    if (!g.current) return
    const q = p.current, t = s.clock.elapsedTime
    let x=0,y=.25,z=-6,rx=0,ry=0,rz=0,sc=1
    if (!q.done) {
      const e=range(.06,.3,q.intro), pull=range(.25,.53,q.intro), top=range(.48,.68,q.intro), down=range(.65,.9,q.intro), land=range(.86,.99,q.intro)
      x=THREE.MathUtils.lerp(-2,0,e); y=THREE.MathUtils.lerp(5.5,2.6,e)
      z=THREE.MathUtils.lerp(-2.5,-18,pull); y=THREE.MathUtils.lerp(y,14,pull)
      x=THREE.MathUtils.lerp(x,5,top); y=THREE.MathUtils.lerp(y,17,top)
      z=THREE.MathUtils.lerp(z,-5.5,down); y=THREE.MathUtils.lerp(y,.3,down); x=THREE.MathUtils.lerp(x,0,down)
      z=THREE.MathUtils.lerp(z,-6.2,land); y=THREE.MathUtils.lerp(y,.22,land)
      ry=THREE.MathUtils.lerp(-.16,0,down); rx=THREE.MathUtils.lerp(-.3,0,top); rz=Math.sin(t*.6)*.012*(1-land); sc=THREE.MathUtils.lerp(1.35,.98,pull)
    } else {
      const orbit=range(.02,.5,q.scroll), dep=range(.48,.78,q.scroll), fly=range(.74,1,q.scroll), a=-.7+orbit*Math.PI*2.4, r=THREE.MathUtils.lerp(14,8,orbit)
      x=Math.cos(a)*r; z=-6+Math.sin(a)*r; y=.3+Math.sin(a*.7)*1.5
      x=THREE.MathUtils.lerp(x,0,dep); z=THREE.MathUtils.lerp(z,-14,dep); y=THREE.MathUtils.lerp(y,.25,dep)
      z=THREE.MathUtils.lerp(z,-24,fly); y=THREE.MathUtils.lerp(y,10,fly); x=THREE.MathUtils.lerp(x,0,fly)
      ry=THREE.MathUtils.lerp(a*.2,.08,dep); ry=THREE.MathUtils.lerp(ry,.25,fly); rx=-.16*fly; rz=Math.sin(t*.4)*.01; sc=1+fly*.08
    }
    g.current.position.lerp(new THREE.Vector3(x,y,z),.045); g.current.rotation.x=THREE.MathUtils.lerp(g.current.rotation.x,rx,.045); g.current.rotation.y=THREE.MathUtils.lerp(g.current.rotation.y,ry,.045); g.current.rotation.z=THREE.MathUtils.lerp(g.current.rotation.z,rz,.045); g.current.scale.lerp(new THREE.Vector3(sc,sc,sc),.045)
  })
  return <group ref={g}>
    <group rotation={[0,0,Math.PI/2]}>
      <mesh material={m.black} castShadow><capsuleGeometry args={[.62,6.7,12,32]}/></mesh>
      <mesh position={[-3.75,0,0]} rotation={[0,0,-Math.PI/2]} material={m.black}><coneGeometry args={[.62,2,32]}/></mesh>
      <mesh position={[-2.4,.43,0]} material={m.glass}><sphereGeometry args={[.58,32,18]}/></mesh>
      <mesh position={[-2.58,.58,0]} material={m.chrome}><boxGeometry args={[.055,.9,1]}/></mesh>
      <mesh position={[-.15,-.05,-2.35]} rotation={[0,-.1,0]} material={m.dark}><boxGeometry args={[4.9,.12,1.35]}/></mesh>
      <mesh position={[-.15,-.05,2.35]} rotation={[0,.1,0]} material={m.dark}><boxGeometry args={[4.9,.12,1.35]}/></mesh>
      <mesh position={[2.85,.7,0]} rotation={[0,0,-.17]} material={m.black}><boxGeometry args={[1.5,2.1,.15]}/></mesh>
      <mesh position={[2.75,.06,-.9]} material={m.dark}><boxGeometry args={[1.6,.08,.9]}/></mesh>
      <mesh position={[2.75,.06,.9]} material={m.dark}><boxGeometry args={[1.6,.08,.9]}/></mesh>
      {[-1,1].map(side=><group key={side} position={[1.25,-.28,side*1.42]}>
        <mesh rotation={[Math.PI/2,0,0]} material={m.black}><cylinderGeometry args={[.5,.62,1.7,32]}/></mesh>
        <mesh position={[0,0,side*.87]} rotation={[Math.PI/2,0,0]} material={m.chrome}><torusGeometry args={[.45,.055,12,40]}/></mesh>
        <pointLight position={[0,0,side*.92]} intensity={5} distance={3} color="#dbe9ff"/>
      </group>)}
      {Array.from({length:8}).map((_,i)=><mesh key={i} position={[1.05-i*.62,.55,.64]} material={m.glass}><sphereGeometry args={[.12,12,8]}/></mesh>)}
      {[-1,1].map(side=><group key={`g${side}`} position={[-1.1,-.78,side*.6]}><mesh material={m.chrome}><cylinderGeometry args={[.035,.035,.65,10]}/></mesh><mesh position={[0,-.35,0]} rotation={[Math.PI/2,0,0]} material={m.black}><torusGeometry args={[.16,.045,8,20]}/></mesh></group>)}
    </group>
  </group>
}

function Runway() {
  const lights=useMemo(()=>Array.from({length:44},(_,i)=>i),[])
  return <group position={[0,-1.2,-7]}>
    <mesh rotation={[-Math.PI/2,0,0]}><planeGeometry args={[22,100]}/><meshStandardMaterial color="#030303" roughness={.86} metalness={.25}/></mesh>
    <mesh position={[0,.02,-2]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[.06,88]}/><meshBasicMaterial color="#fff" transparent opacity={.28}/></mesh>
    {[-8,8].map(x=><group key={x}>{lights.map(i=><mesh key={i} position={[x,.04,35-i*1.8]}><boxGeometry args={[.08,.03,.32]}/><meshBasicMaterial color="#dce9ff" transparent opacity={.2+(i%3)*.06}/></mesh>)}</group>)}
    <mesh position={[-10,.02,-7]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[.06,86]}/><meshBasicMaterial color="#fff" transparent opacity={.12}/></mesh>
    <mesh position={[10,.02,-7]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[.06,86]}/><meshBasicMaterial color="#fff" transparent opacity={.12}/></mesh>
  </group>
}

function CloudsScene({ p }: { p: React.MutableRefObject<Progress> }) {
  const g=useRef<THREE.Group>(null)
  useFrame(s=>{ if(!g.current)return; const q=p.current; g.current.position.x=Math.sin(s.clock.elapsedTime*.018)*1.5; g.current.position.z=Math.cos(s.clock.elapsedTime*.014)*1.2; g.current.position.y=Math.sin(s.clock.elapsedTime*.025)*.2; g.current.scale.setScalar(q.done?.9:1+range(.0,.35,q.intro)*.15) })
  return <group ref={g}>
    <Clouds limit={600} material={THREE.MeshStandardMaterial}>
      <Cloud position={[-10,5,-10]} seed={11} segments={45} volume={7} color="#fff" opacity={.72} fade={7} growth={4}/>
      <Cloud position={[-3,7,-15]} seed={21} segments={55} volume={8} color="#fff" opacity={.8} fade={8} growth={5}/>
      <Cloud position={[7,5,-12]} seed={31} segments={50} volume={8} color="#fff" opacity={.74} fade={7} growth={5}/>
      <Cloud position={[0,9,-26]} seed={41} segments={60} volume={10} color="#fff" opacity={.78} fade={10} growth={6}/>
      <Cloud position={[12,3,-20]} seed={51} segments={42} volume={7} color="#fff" opacity={.58} fade={8} growth={4}/>
      <Cloud position={[-14,3,-24]} seed={61} segments={44} volume={8} color="#fff" opacity={.62} fade={8} growth={4}/>
    </Clouds>
  </group>
}

function Camera({ p }: { p: React.MutableRefObject<Progress> }) {
  const {camera,pointer}=useThree(); const sm=useRef(0)
  useFrame(()=>{
    const q=p.current; if(!q.done)return
    sm.current=THREE.MathUtils.lerp(sm.current,q.scroll,.035); const s=sm.current
    const orbit=range(.02,.48,s), dep=range(.45,.78,s), fly=range(.76,1,s), a=-.8+orbit*Math.PI*2.2, r=THREE.MathUtils.lerp(15,9,orbit)
    const pos=new THREE.Vector3(Math.cos(a)*r,3.4+Math.sin(a*.7)*2,-7+Math.sin(a)*r)
    pos.x=THREE.MathUtils.lerp(pos.x,8,dep); pos.y=THREE.MathUtils.lerp(pos.y,3,dep); pos.z=THREE.MathUtils.lerp(pos.z,4,dep)
    pos.x=THREE.MathUtils.lerp(pos.x,-6,fly); pos.y=THREE.MathUtils.lerp(pos.y,11,fly); pos.z=THREE.MathUtils.lerp(pos.z,20,fly)
    pos.x+=pointer.x*.45; pos.y+=pointer.y*.2
    camera.position.lerp(pos,.035); camera.lookAt(new THREE.Vector3(0,.4-fly*.2,-7+fly*-14))
  })
  return null
}

function Scene() {
  const p=useRef<Progress>({intro:0,scroll:0,done:false}); const {clock}=useThree()
  useFrame(()=>{ const t=clock.getElapsedTime(); p.current.intro=clamp(t/INTRO); p.current.done=t>=INTRO; if(p.current.done){const max=Math.max(document.documentElement.scrollHeight-window.innerHeight,1);p.current.scroll=clamp(window.scrollY/max)} })
  return <>
    <color attach="background" args={['#73bced']}/><fog attach="fog" args={['#a9d5f2',22,90]}/>
    <Sky distance={450000} sunPosition={[-20,28,12]} turbidity={5} rayleigh={1.8} mieCoefficient={.012} mieDirectionalG={.82}/>
    <hemisphereLight color="#dff2ff" groundColor="#020202" intensity={.8}/><ambientLight intensity={.28}/><directionalLight position={[-12,20,10]} intensity={4.5} color="#fff" castShadow/><directionalLight position={[14,7,-10]} intensity={1.8} color="#8ebcff"/>
    <Camera p={p}/><CloudsScene p={p}/><Runway/><Aircraft p={p}/>
    <EffectComposer multisampling={0}><Bloom intensity={.3} luminanceThreshold={.82} luminanceSmoothing={.25} mipmapBlur/><Vignette darkness={.42} eskil={false}/></EffectComposer>
  </>
}

export default function SckWebGLScene(){return <div className="sck-webgl" aria-hidden="true"><Canvas camera={{position:[0,3,12],fov:42,near:.1,far:1200}} dpr={[1,1.5]} gl={{antialias:true,alpha:false,powerPreference:'high-performance'}} shadows><Scene/></Canvas></div>}
