import * as THREE from 'three'

import { 
    WEBGL 
} from './webgl'

if (WEBGL.isWebGLAvailable()) {
    // 장면
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // 카메라 추가
    const fov = 100; 
    const aspect = window.innerWidth / innerHeight;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.x = 0;
    camera.position.y = 1;
    camera.position.z = 1.8;
    camera.lookAt(new THREE.Vector3(0,0,0));

    // 렌더러
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 도형 추가
    // 박스
    const geometry = new THREE.SphereGeometry(0.5, 32, 16);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.rotation.y = 0.5;
    cube.position.y = 0.2;
    scene.add(cube);

    // 바닥
    const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x -= 0.5*(Math.PI);
    plane.position.y -= 0.2;
    scene.add(plane);

    // 빛
    // AmbientLight -> 그림자가 생기지 않는 전역에서 비추는 빛
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    // scene.add(ambientLight);

    // DirectionalLight -> 특정한 방향으로 방출되는 빛. 
    // 이 빛은 무한히 멀리 떨어져 있고, 그로부터 발생하는 광선은 모두 평행한 것처럼 행동할 것입니다.
    const dirctionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirctionalLight.position.set(-1, 1, 1);
    // dircetionalLight에 대한 helper, 빛이 쐬는 위치와 방향을 표시해준다
    //const dlHelper = new THREE.DirectionalLightHelper(dirctionalLight, 0.2, 0x0000ff);
    // scene.add(dlHelper);
    // scene.add(dirctionalLight);

    // HemisphereLight -> 장면 바로 위에 위치한 광원으로, 하늘 색에서 땅 색으로 색이 바뀝니다
    const hemisphereLight = new THREE.HemisphereLight(0x000000, 0xffffff, 0.5);
    //scene.add(hemisphereLight);


    // PointLight 한 지점에서 모든 방향으로 빛을 방출한다. 
    //이를 위한 일반적인 사용 사례는 맨 전구에서 방출되는 빛을 복제하는 것입니다.
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-2, 0.5, 0.5);
    const plHelper = new THREE.PointLightHelper(pointLight, 0.2, 0x0000ff);
    //scene.add(plHelper);
    //scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(2, 2, 0.5);
    const plHelper2 = new THREE.PointLightHelper(pointLight2, 0.2, 0x0000ff);
    //scene.add(plHelper2);
    //scene.add(pointLight2);
    
    // RectAreaLight 직사각형 평면의 면을 가로질러 균일하게 빛을 방출합니다. 
    // 이 라이트 타입은 밝은 창문이나 스트립 조명과 같은 광원을 시뮬레이션하는 데 사용될 수 있습니다.
    const rectLight = new THREE.RectAreaLight(0xfffff, 2, 1, 0.5);
    rectLight.position.set(0.5, 0.5, 0.5);
    rectLight.lookAt(0,0,0);
    //scene.add(rectLight)

    // SpotLight -> 한 방향으로 특정 위치를 향해 빛을 방출 하며 원뿔 형태로 크기가 증가한다
    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.lookAt(0, 0, 0);
    scene.add(spotLight);

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
