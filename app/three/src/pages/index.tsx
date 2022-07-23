import React, { useEffect, useRef } from 'react';
import {
  Scene, // 场景
  PerspectiveCamera, // 相机
  WebGLRenderer, // 渲染器
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';

export default function HomePage() {
  const ref = useRef<any>();

  useEffect(() => {
    // 1、创建场景
    const scene = new Scene();
    // 2、创建相机
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    scene.add(camera);

    // 3、创建物体
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0x002299 });
    const cube = new Mesh(geometry, material);
    // 根据几何体和材质创建物体
    scene.add(cube);

    // 4、初始化渲染器
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 将webgl渲染的canvas内容添加到网页中
    ref.current.appendChild(renderer.domElement);

    renderer.render(scene, camera);
  }, []);

  return <div id='box' ref={ref}></div>;
}