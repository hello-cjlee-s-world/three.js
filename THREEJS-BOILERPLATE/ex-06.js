import * as THREE from 'three'

import { 
    WEBGL 
} from './webgl'

if (WEBGL.isWebGLAvailable()) {
    // 장면
    const scene = new THREE.Scene();
   //scene.background = new THREE.Color(0x004fff);

    // 카메라
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    // 렌더러
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // 빛 추가
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 2, 12);
    scene.add(pointLight);

    const textureLoader = new THREE.TextureLoader(); 
    const textureBaseColor = textureLoader.load('../static/img/Stone_Path_007_basecolor.jpg');
    const textureAmbient = textureLoader.load('../static/img/Stone_Path_007_ambientOcclusion.jpg');
    const textureNormal = textureLoader.load('../static/img/Stone_Path_007_normal.jpg');
    const textureHeight = textureLoader.load('../static/img/Stone_Path_007_height.png');
    const textureRoughness = textureLoader.load('../static/img/Stone_Path_007_roughness.jpg');

    // 도형 추가
    const geometry = new THREE.SphereGeometry(0.3, 32, 16);
    //const geometry = new THREE.PlaneGeometry(1, 1);
    //1
    const material01 = new THREE.MeshStandardMaterial({
        map: textureBaseColor,
    });
    // 아래와 같이도 표현 가능하다.
    //material01.wireframe = true;
    const obj01 = new THREE.Mesh(geometry, material01);
    obj01.position.x -= 1.5;
    scene.add(obj01);

    //2
    const material02 = new THREE.MeshStandardMaterial({
        map: textureBaseColor,
        normalMap: textureNormal,
    })
    const obj02 = new THREE.Mesh(geometry, material02);
    obj02.position.x -= 0.75;
    scene.add(obj02);

    //3
    const material03 = new THREE.MeshStandardMaterial({
        map: textureBaseColor,
        normalMap: textureNormal,
        displacementMap: textureHeight,
        displacementScale: 0.04,
    })
    const obj03 = new THREE.Mesh(geometry, material03);
    obj03.position.x = 0;
    scene.add(obj03);

    //4
    const material04 = new THREE.MeshStandardMaterial({
        map: textureBaseColor,
        normalMap: textureNormal,
        displacementMap: textureHeight,
        displacementScale: 0.04,
        roughnessMap: textureRoughness,
        roughness: 0.8,
    })
    const obj04 = new THREE.Mesh(geometry, material04);
    obj04.position.x = 0.75;
    scene.add(obj04);

    // 도형 회전
    function render(time) {
        time *= 0.0005;
        obj01.rotation.y = time;
        obj02.rotation.y = time;
        obj03.rotation.y = time;
        obj04.rotation.y = time;
        obj01.rotation.x = time;
        obj02.rotation.x = time;
        obj03.rotation.x = time;
        obj04.rotation.x = time;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    // 반응형 처리 -> 종횡비 그대로 유지시키기
    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
