import * as THREE from 'three'

import { 
    WEBGL 
} from './webgl'

if (WEBGL.isWebGLAvailable()) {
    // 장면
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // 카메라 추가
    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const fov = 63;  // 시야각, 화각 => 8 ~ 28 망원(가까이 보임), 47 표준 , 63 이상 광각(멀리 보임)
    const aspect = window.innerWidth / innerHeight; // 종횡비 
    const near = 0.1; // 카메라 시점이 시작되는 위치
    const far = 1000; // 카메라 시점이 끝나는 위치
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    //camera.position.set(0, 0, 1);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 1;
    camera.lookAt(new THREE.Vector3(0,0,0));

    // 렌더러
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 도형 추가
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshStandardMaterial({
        color: 0xFF7F00,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.rotation.y = 0.5;
    scene.add(cube);

    const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xeeeeee,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x -= 0.5*(Math.PI);
    plane.position.y -= 0.5;
    scene.add(plane);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 2, 12);
    scene.add(pointLight);

    renderer.render(scene, camera);
    // // 도형 회전
    // function render(time) {
    //     time *= 0.0005;
    //     obj01.rotation.y = time;
    //     obj02.rotation.y = time;
    //     obj03.rotation.y = time;
    //     obj04.rotation.y = time;
    //     obj01.rotation.x = time;
    //     obj02.rotation.x = time;
    //     obj03.rotation.x = time;
    //     obj04.rotation.x = time;

    //     renderer.render(scene, camera);
    //     requestAnimationFrame(render);
    // }
    // requestAnimationFrame(render);

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
