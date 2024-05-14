import * as THREE from 'three'

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
    // 1. 그림자를 사용하겠다는 설정
    renderer.shadowMap.enabled = true;

    // 도형 추가
    //const geometry = new THREE.SphereGeometry(0.5, 32, 16);
    const geometry = new THREE.IcosahedronGeometry(0.5, 0);
    //const geometry = new THREE.ConeGeometry(0.4, 0.7, 6);
    const material = new THREE.MeshStandardMaterial({
        color: 0x004fff,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.rotation.y = 0.5;
    cube.position.y = 0.5;
    scene.add(cube);
    cube.castShadow = true;// 2. 그림자를 지게 할 물체 설정
    cube.receiveShadow = true;

    const geometry2 = new THREE.IcosahedronGeometry(0.5, 0);
    const material2 = new THREE.MeshStandardMaterial({
        color: 0x004fff,
    });
    const cube2 = new THREE.Mesh(geometry2, material2);
    cube2.position.set(-0.8, 1.2, 0.5);
    scene.add(cube2);
    cube2.castShadow = true;// 2. 그림자를 지게 할 물체 설정


    // 바닥 추가
    const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x -= 0.5*(Math.PI);
    plane.position.y -= 0.2;
    scene.add(plane);
    // 2. 그림자를 받아주는 부분 설정
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
    // 3. 이 빛에 의한 그림자를 생성하겠다.
    dirctionalLight.castShadow = true;
    dirctionalLight.shadow.mapSize.width = 10240;
    dirctionalLight.shadow.mapSize.height = 10240;
    dirctionalLight.shadow.radius = 8;

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(1, 1, 0.5);
    const plHelper = new THREE.PointLightHelper(pointLight, 0.2, 0x0000ff);
    //scene.add(plHelper);
    //scene.add(pointLight);
    // // 3. 이 빛에 의한 그림자를 생성하겠다.
    // pointLight.castShadow = true; 

    const rectLight = new THREE.RectAreaLight(0xfffff, 2, 1, 1);
    rectLight.position.set(0.3, 0.3, 0.3);
    rectLight.lookAt(0,0,0);
    // scene.add(rectLight)
    // rectLight.castShadow = true; // 3. AmbientLight는 그림자 적용되지 않음

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.lookAt(1, 2, 1);
    //scene.add(spotLight);
    //spotLight.castShadow = true;

    function render(time) {
        renderer.render(scene, camera);
    }
    requestAnimationFrame(render);

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
