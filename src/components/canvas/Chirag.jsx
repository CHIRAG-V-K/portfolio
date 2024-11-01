/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 public/models/Chirag.glb 
*/

import React, { useEffect, useRef, useState } from "react";
import { useFrame, useGraph } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useControls } from "leva";
import * as THREE from "three";
export function Chirag(props) {
  const { animation } = props;
  const [hasPlayed, setHasPlayed] = useState(false);
  const { x, y, z, start, headflow, cursorflow, wireframe } = useControls({
    x: {
      value: 0,
      min: 0,
      max: 20,
    },
    y: {
      value: 0,
      min: 0,
      max: 20,
    },
    z: {
      value: 0,
      min: 0,
      max: 20,
    },
    start: {
      value: false,
      onChange: (value) => {
        setHasPlayed(!value);
      },
    },
    wireframe: false,
    headflow: false,
    cursorflow: false,
  });

  const groupRef = useRef();
  const { scene } = useGLTF("/models/Chirag.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  const { animations: WaveAnimation } = useFBX("/animations/Waving.fbx");
  const { animations: TalkingAnimation } = useFBX(
    "/animations/Talking Phone Pacing.fbx"
  );
  const { animations: GettingUpAnimation } = useFBX(
    "/animations/Getting Up.fbx"
  );
  const { animations: JumpingDownAnimation } = useFBX(
    "/animations/Jumping Down.fbx"
  );
  const { animations: SittingPoseAnimation } = useFBX(
    "/animations/Male Sitting Pose.fbx"
  );
  const { animations: PushUpAnimation } = useFBX("/animations/Push Up.fbx");
  const { animations: ShootingArrowAnimation } = useFBX(
    "/animations/Shooting Arrow.fbx"
  );
  const { animations: SwingToLandAnimation } = useFBX(
    "/animations/Swing To Land.fbx"
  );

  WaveAnimation[0].name = "Wave";
  TalkingAnimation[0].name = "Talking";
  GettingUpAnimation[0].name = "Up";
  JumpingDownAnimation[0].name = "Down";
  SittingPoseAnimation[0].name = "Sitting";
  PushUpAnimation[0].name = "PushUp";
  ShootingArrowAnimation[0].name = "Shoot";
  SwingToLandAnimation[0].name = "Swing";

  const { actions } = useAnimations(
    [
      WaveAnimation[0],
      TalkingAnimation[0],
      GettingUpAnimation[0],
      JumpingDownAnimation[0],
      SittingPoseAnimation[0],
      PushUpAnimation[0],
      ShootingArrowAnimation[0],
      SwingToLandAnimation[0],
    ],
    groupRef
  );

  useFrame((state) => {
    if (headflow) {
      groupRef.current.getObjectByName("Head").lookAt(state.camera.position);
    }
    if (cursorflow) {
      const target = new THREE.Vector3(state.pointer.x, state.pointer.y, 1);
      groupRef.current.getObjectByName("Spine").lookAt(target);
    }
  });

  useEffect(() => {
    const currentAction = actions[animation];
    if (currentAction) {
      Object.values(actions).forEach((action) => action.stop());
      // currentAction.reset().setLoop(THREE.LoopOnce, 1).fadeIn(0.5).play();
      currentAction.reset().fadeIn(0.5).play();
      currentAction.clampWhenFinished = true;
      setHasPlayed(true);
      return () => {
        currentAction.reset().fadeOut(0.5);
        setHasPlayed(false);
      };
    }
  }, [animation, actions, hasPlayed]);

  return (
    <group {...props} ref={groupRef} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload("/models/Chirag.glb");
