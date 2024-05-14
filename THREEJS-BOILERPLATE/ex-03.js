import * as THREE from 'three'

import { 
    WEBGL 
} from './webgl'


if (WEBGL.isWebGLAvailable()) {
  
    // 장면
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x004fff);
    // 카메라
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const canvas = document.querySelector('#ex_03');

    // 렌더러
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);

    function render(time) {
        time *= 0.001;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
