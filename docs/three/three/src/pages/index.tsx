/* 核心：场景、相机、物体、渲染器 */
import React, { useEffect, useRef } from 'react';
import {
  Scene, // 场景
  PerspectiveCamera, // 相机
  WebGLRenderer, // 渲染器
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  AxesHelper,
  MeshLambertMaterial,
  SphereGeometry,
  PlaneGeometry,
  GridHelper
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import * as dat from 'dat.gui';

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
    scene.add(cube);
    console.log('cube: ', cube);

    // 图形化界面
    const gui = new dat.GUI();
    gui
      .add(cube.position, 'x')
      .min(0)
      .max(5)
      .step(0.01)
      .name('移动x轴')
      .onChange(v => {
        console.log('改变中的值: ', v);
      })
      .onFinishChange(v => {
        console.log('最终值:', v);
      });
    const params = {
      color: '#ffff00',
      fn: () => {
        // 物体运动
        gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 });
      }
    };
    gui
      .addColor(params, 'color')
      .name('颜色')
      .onChange(v => {
        console.log('值被修改', v);
        cube.material.color.set(v);
      });
    gui.add(cube, 'visible').name('是否显示');
    const folder = gui.addFolder('设置立方体');
    folder.add(cube.material, 'wireframe');
    folder.add(params, 'fn').name('物体运动');
    // 根据几何体和材质创建物体

    // 4、初始化渲染器
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 将webgl渲染的canvas内容添加到网页中
    ref.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    // 设置阻尼，让控制器更有真实的效果,必须在动画效果里调用update
    controls.enableDamping = true;

    const axesHelper = new AxesHelper(5);
    scene.add(axesHelper);

    // const animate = gsap.to(cube.position, {
    //   x: 5,
    //   duration: 4,
    //   ease: 'power1.inOut',
    //   repeat: -1, //  重复次数
    //   // yoyo: true, // 往返
    //   // delay: 2, // 延迟
    //   onComplete: () => {
    //     console.log('动画完成！');
    //   },
    //   onStart: () => {
    //     console.log('动画开始！');
    //   }
    // });
    // gsap.to(cube.rotation, {
    //   x: 2 * Math.PI,
    //   duration: 4,
    //   ease: 'power1.inOut',
    //   repeat: -1 //  重复次数
    // });

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

    window.addEventListener('dblclick', () => {
      const fullscreen = document.fullscreenElement;
      console.log('fullscreen: ', fullscreen);

      if (!fullscreen) {
        renderer.domElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });

    // 添加标注点
    // const sphereMaterial = new MeshLambertMaterial({ color: 'red' });
    // const spherePoint = new Mesh(new SphereGeometry(5, 16, 16), sphereMaterial);
    // spherePoint.position.set(-10, 10, 0);
    // scene.add(spherePoint);

    function render() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    render();
  }, []);

  return <div id='box' ref={ref}></div>;
}
