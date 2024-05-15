import * as THREE from 'three'

// orbitcontrols import
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js'

import { 
    WEBGL 
} from './webgl'

if (WEBGL.isWebGLAvailable()) {
    // 장면 추가
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
    const axesHelper = new THREE.AxesHelper(10)
    scene.add(axesHelper);

    // 카메라 추가
    const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight, 
        1, 
        4000
    );
    camera.position.set(0, 20, 100);
    camera.lookAt(0, 0, 0);

    // 렌더러 추가
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    
    // 카메라 이후 등장 필요
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 800;
    controls.enableDamping = true;
    controls.update();

    // texture 로드
    const skyMaterialArray = []
    const texture_ft = new THREE.TextureLoader().load('../static/ex-12/bay_ft.jpg');
    const texture_bk = new THREE.TextureLoader().load('../static/ex-12/bay_bk.jpg');
    const texture_up = new THREE.TextureLoader().load('../static/ex-12/bay_up.jpg');
    const texture_dn = new THREE.TextureLoader().load('../static/ex-12/bay_dn.jpg');
    const texture_rt = new THREE.TextureLoader().load('../static/ex-12/bay_rt.jpg');
    const texture_lf = new THREE.TextureLoader().load('../static/ex-12/bay_lf.jpg');

    // 앞, 뒤, 위, 아래, 오른쪽, 왼쪽 순서로 넣는다.
    skyMaterialArray.push(
        new THREE.MeshStandardMaterial({
            map: texture_ft
        })
    );
    skyMaterialArray.push(
        new THREE.MeshStandardMaterial({
            map: texture_bk
        })
    );
    skyMaterialArray.push(
        new THREE.MeshStandardMaterial({
            map: texture_up
        })
    );
    skyMaterialArray.push(
        new THREE.MeshStandardMaterial({
            map: texture_dn
        })
    );
    skyMaterialArray.push(
        new THREE.MeshStandardMaterial({
            map: texture_rt
        })
    );
    skyMaterialArray.push(
        new THREE.MeshStandardMaterial({
            map: texture_lf
        })
    );

    // skyMaterialArray안의 모든 Material에 THREE.BackSide를 넣어준다.
    for(let i = 0; i < skyMaterialArray.length; i++) {
        skyMaterialArray[i].side = THREE.BackSide;
    }

    // 도형 추가
    const skyGeometry = new THREE.BoxGeometry(2400, 2400, 2400);
    // const skyMaterial = new THREE.MeshStandardMaterial({
    //     color: 0x333333,
    //     //map: texture,
    // });
    // box 안쪽 side에 이미지를 적용하겠다.
    //skyMaterial.side = THREE.BackSide;

    const sky = new THREE.Mesh(skyGeometry, skyMaterialArray);
    scene.add(sky);

    // 빛
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
    animate();

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
