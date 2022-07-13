// 核心：场景、相机、物体、渲染器
import React, { useEffect, useRef } from 'react';
import {
  Scene, // 场景
  PerspectiveCamera, // 相机
  WebGLRenderer, // 渲染器
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  AxesHelper,
  Clock
} from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 导入动画库
import gsap from 'gsap';

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
    // console.log('renderer: ', renderer);
    // 将webgl渲染的canvas内容添加到网页中
    ref.current.appendChild(renderer.domElement);

    // 添加坐标轴辅助器
    const axesHelper = new AxesHelper(5);
    scene.add(axesHelper);
    // 使用渲染器，通过相机将场景渲染进来
    // TODO：基本
    // renderer.render(scene, camera);
    // TODO:动画
    // function animate() {
    //   requestAnimationFrame(animate);
    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;
    //   renderer.render(scene, camera);
    // }
    // animate();

    // 3.使用控制器操作三维物体
    const controls = new OrbitControls(camera, renderer.domElement);
    // 设置阻尼，让控制器更有真实的效果,必须在动画效果里调用update
    controls.enableDamping = true;

    // const clock = new Clock();
    // TODO: 动画库
    const animate = gsap.to(cube.position, {
      x: 5,
      duration: 4,
      ease: 'power1.inOut',
      repeat: -1, //  重复次数
      // yoyo: true, // 往返
      // delay: 2, // 延迟
      onComplete: () => {
        console.log('动画完成！');
      },
      onStart: () => {
        console.log('动画开始！');
      }
    });
    gsap.to(cube.rotation, {
      x: 2 * Math.PI,
      duration: 4,
      ease: 'power1.inOut',
      repeat: -1 //  重复次数
    });

    // window.addEventListener('dblclick', () => {
    //   if (animate.isActive()) {
    //     animate.pause();
    //   } else {
    //     animate.resume();
    //   }
    // });

    window.addEventListener('resize', () => {
      // 更新摄像头
      camera.aspect = window.innerWidth / window.innerHeight;
      // 更新摄像头的投影矩阵
      camera.updateProjectionMatrix();

      // 更新渲染器
      renderer.setSize(window.innerWidth, window.innerHeight);
      // 设置渲染器的像素比
      renderer.setPixelRatio(window.devicePixelRatio);
    });

    // 全屏
    window.addEventListener('dblclick', () => {
      const fullscreen = document.fullscreenElement;
      console.log('fullscreen: ', fullscreen);

      if (!fullscreen) {
        renderer.domElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });

    function render() {
      controls.update();
      renderer.render(scene, camera);
      // 渲染下一帧的时候调用render
      requestAnimationFrame(render);
    }
    render();
  }, []);

  return <div id='box' ref={ref}></div>;
}
