import * as THREE from 'three'

// orbitcontrols import
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js'

import { 
    WEBGL 
} from './webgl'

if (WEBGL.isWebGLAvailable()) {

    const FogColor = 0x004fff;
    const objColor = 0xffffff;
    const FloorColor = 0x555555;
    // 장면 추가
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(FogColor);
    //scene.fog = new THREE.Fog(FogColor, 1, 8);  // 첫번째 fog, 안개 색깔, 적용 시작할 위치, 적용 끝낼 위치
    scene.fog = new THREE.FogExp2(FogColor, 0.2) // 두번째 fog 안개 색깔, 밀도

    // 카메라 추가
    const camera = new THREE.PerspectiveCamera(
        80,
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );

    camera.position.set(0, 2, 3);
    camera.lookAt(0, 0, 0);

    // 렌더러 추가
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 3;
    controls.maxDistance = 6;
    controls.maxPolarAngle = Math.PI / 2 - 0.1;
    controls.enableDamping = true; // 마우스 우클릭으로 카메라 위치 변경
    controls.update();

    // 도형 추가
    const geometry = new THREE.TorusGeometry(0.7, 0.3, 12, 80);
    const material = new THREE.MeshStandardMaterial({
        color: objColor,
    });
    const obj = new THREE.Mesh(geometry, material);
    obj.position.y = 0.8;
    obj.position.z = 0;
    scene.add(obj);

    // 바닥 추가
    const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: FloorColor,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x -= 0.5*(Math.PI);
    plane.position.y -= 0.5;
    scene.add(plane);
    
    // 빛
    const dirctionalLight = new THREE.DirectionalLight(0xffffff, 1);
    dirctionalLight.position.set(1, 1, 1);
    scene.add(dirctionalLight);

  function animate() {
        requestAnimationFrame( animate );
        obj.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
    animate();

    // 반응형 처리 -> 종횡비 그대로 유지시키기
    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix(); // camera의 어떤 parameter 라도 변경이 되면 이 함수가 호출이 되어야한다
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
