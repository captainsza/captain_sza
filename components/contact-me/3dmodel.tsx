/* eslint-disable @typescript-eslint/no-unused-vars */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations, useVideoTexture } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ExtendedColors,
  Overwrite,
  NodeProps,
  NonFunctionKeys,
  Vector3,
  Euler,
  Matrix4,
  Quaternion,
  Layers,
} from '@react-three/fiber';
import { EventHandlers } from '@react-three/fiber/dist/declarations/src/core/events';
import { Group, Object3DEventMap, Mesh, MeshBasicMaterial, AnimationClip } from 'three';
import * as THREE from 'three';

// Define the Props interface
interface Props extends JSX.IntrinsicAttributes, EventHandlers {
  position?: Vector3;
  up?: Vector3;
  scale?: Vector3;
  rotation?: Euler;
  matrix?: Matrix4;
  quaternion?: Quaternion;
  layers?: Layers;
  dispose?: (() => void) | null;
  texture?: string;
}

// Define the GLTF result type
type GLTFResult = {
  nodes: {
    'monitor-screen': Mesh;
    'Monitor-B-_computer_0_1': Mesh;
    'Monitor-B-_computer_0_2': Mesh;
    'Monitor-B-_computer_0_3': Mesh;
    'Monitor-B-_computer_0_4': Mesh;
    'Monitor-B-_computer_0_5': Mesh;
    'Monitor-B-_computer_0_6': Mesh;
    'Monitor-B-_computer_0_7': Mesh;
    'Monitor-B-_computer_0_8': Mesh;
    // Add other nodes as needed
  };
  materials: {
    computer: MeshBasicMaterial;
    base__0: MeshBasicMaterial;
    Material_36: MeshBasicMaterial;
    Material_35: MeshBasicMaterial;
    Material_34: MeshBasicMaterial;
    keys: MeshBasicMaterial;
    keys2: MeshBasicMaterial;
    Material_37: MeshBasicMaterial;
    // Add other materials as needed
  };
  animations: THREE.AnimationClip[];
};

const DemoComputer: React.FC<Props> = (props) => {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF('/models/computer.glb') as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);

  const txt = useVideoTexture(props.texture ? props.texture : '/textures/project/project1.mp4');

  useEffect(() => {
    if (txt) {
      txt.flipY = false;
    }
  }, [txt]);

  useGSAP(() => {
    if (group.current) {
      gsap.from(group.current.rotation, {
        y: Math.PI / 2,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }, [txt]);

  return (
    <group ref={group} {...props} key={props.key ?? undefined}>
      <group name="Scene">
        <mesh
          name="monitor-screen"
          // castShadow
          // receiveShadow
          geometry={nodes['monitor-screen'].geometry}
          material={nodes['monitor-screen'].material}
          position={[0.127, 1.831, 0.511]}
          rotation={[1.571, -0.005, 0.031]}
          scale={[0.661, 0.608, 0.401]}
        >
          <meshBasicMaterial map={txt} toneMapped={false} />
        </mesh>
        <group name="RootNode" position={[0, 1.093, 0]} rotation={[-Math.PI / 2, 0, -0.033]} scale={0.045}>
          {/* Repeat similar group elements for Screen001 to Screen148 */}
          {Array.from({ length: 148 }, (_, i) => {
            const screenNumber = String(i + 1).padStart(3, '0');
            return (
              <group
                key={`Screen${screenNumber}`}
                name={`Screen${screenNumber}`}
                position={[5.658, 1.644, 0.812]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[0.923, 0.855, 0.855]}
              />
            );
          })}
          <group
            name="Tower-light-007"
            position={[16.089, -3.47, -14.495]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.963}
          />
          <group
            name="Tower-light-008"
            position={[15.155, -3.47, -14.495]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.963}
          />
        </group>
        <group
          name="Monitor-B-_computer_0"
          position={[0.266, 1.132, 0.051]}
          rotation={[0, -0.033, 0]}
          scale={[0.042, 0.045, 0.045]}
        >
          <mesh
            name="Monitor-B-_computer_0_1"
            // castShadow
            // receiveShadow
            geometry={nodes['Monitor-B-_computer_0_1'].geometry}
            material={materials.computer}
          />
          <mesh
            name="Monitor-B-_computer_0_2"
            // castShadow
            // receiveShadow
            geometry={nodes['Monitor-B-_computer_0_2'].geometry}
            material={materials.base__0}
          />
          <mesh
            name="Monitor-B-_computer_0_3"
            // castShadow
            // receiveShadow
            geometry={nodes['Monitor-B-_computer_0_3'].geometry}
            material={materials.Material_36}
          />
          <mesh
            name="Monitor-B-_computer_0_4"
            // castShadow
            // receiveShadow
            geometry={nodes['Monitor-B-_computer_0_4'].geometry}
            material={materials.Material_35}
          />
          <mesh
            name="Monitor-B-_computer_0_5"
            // castShadow
            // receiveShadow
            geometry={nodes['Monitor-B-_computer_0_5'].geometry}
            material={materials.Material_34}
          />
          <mesh
            name="Monitor-B-_computer_0_6"
            // castShadow
            // receiveShadow
            geometry={nodes['Monitor-B-_computer_0_6'].geometry}
            material={materials.keys}
          />
          <mesh
            name="Monitor-B-_computer_0_7"
            // castShadow
            // receiveShadow
            geometry={nodes['Monitor-B-_computer_0_7'].geometry}
            material={materials.keys2}
          />
          <mesh
            name="Monitor-B-_computer_0_8"
            // castShadow
            // receiveShadow
            geometry={nodes['Monitor-B-_computer_0_8'].geometry}
            material={materials.Material_37}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/models/computer.glb');

export default DemoComputer;
