import * as THREE from 'three'

// orbitcontrols import
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js'

import { 
    WEBGL 
} from './webgl'

if (WEBGL.isWebGLAvailable()) {
    // 장면
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // 카메라 추가
    const fov = 120; 
    const aspect = window.innerWidth / innerHeight;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.x = 0;
    camera.position.y = 2;
    camera.position.z = 1.8;
    camera.lookAt(new THREE.Vector3(0,0,0));

    // 렌더러
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    // orbitcontrols는 camera 와 render가 parameter로 들어가기 때문에 그 아래에 선언해줘야한다.
    // shift 키를 누르고 드래그 하면 카메라 위치를 바꿀 수 있다.
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 5;
    // 카메라 각도 바닥 넘지 않도록 설정, Math.PI / 2 로 하면 딱 바닥 바로 위로 설정된다
    controls.maxPolarAngle = Math.PI / 2;
    controls.update();

    // 도형 추가
    //const geometry = new THREE.SphereGeometry(0.5, 32, 16);
    const geometry = new THREE.IcosahedronGeometry(0.5, 0);
    //const geometry = new THREE.ConeGeometry(0.4, 0.7, 6);
    const material = new THREE.MeshStandardMaterial({
        color: 0x004fff,
    });
    const obj = new THREE.Mesh(geometry, material);
    obj.rotation.y = 0.5;
    obj.position.y = 0.5;
    scene.add(obj);
    obj.castShadow = true;
    obj.receiveShadow = true;

    const geometry2 = new THREE.IcosahedronGeometry(0.5, 0);
    const material2 = new THREE.MeshStandardMaterial({
        color: 0x004fff,
    });
    const obj2 = new THREE.Mesh(geometry2, material2);
    obj2.position.set(-0.8, 1.2, 0.5);
    scene.add(obj2);
    obj2.castShadow = true;


    // 바닥 추가
    const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x -= 0.5*(Math.PI);
    plane.position.y -= 0.2;
    scene.add(plane);
    plane.receiveShadow = true;
    
    // 빛
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    ambientLight.castShadow = true; // 3. AmbientLight는 그림자 적용되지 않음

    const dirctionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirctionalLight.position.set(-1.5, 2, 1);
    const dlHelper = new THREE.DirectionalLightHelper(dirctionalLight, 0.2, 0x0000ff);
    scene.add(dlHelper);
    scene.add(dirctionalLight);
    dirctionalLight.castShadow = true;
    dirctionalLight.shadow.mapSize.width = 2048;
    dirctionalLight.shadow.mapSize.height = 2048;
    dirctionalLight.shadow.radius = 8;

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(1, 1, 0.5);
    const plHelper = new THREE.PointLightHelper(pointLight, 0.2, 0x0000ff);


    const rectLight = new THREE.RectAreaLight(0xfffff, 2, 1, 1);
    rectLight.position.set(0.3, 0.3, 0.3);
    rectLight.lookAt(0,0,0);
    // scene.add(rectLight)
    // rectLight.castShadow = true;

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.lookAt(1, 2, 1);
    //scene.add(spotLight);
    //spotLight.castShadow = true;

  // three.js document에서 복사 붙여넣기, 기존의 render 함수 대신 사용 orbitcontrols
  function animate() {
        requestAnimationFrame( animate );
        obj.rotation.y += 0.01;
        obj2.rotation.x += 0.015;
        obj2.rotation.y += 0.02;
        controls.update();
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
