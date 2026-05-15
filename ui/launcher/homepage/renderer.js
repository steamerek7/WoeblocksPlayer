const Renderer = (() => {

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight,
        0.1,
        1000
    );

    camera.position.set(0,8,12);

    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff,0.6);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffffff,1);
    sun.position.set(20,30,20);
    scene.add(sun);

    let camRot = 0;

    window.addEventListener("mousemove",(e)=>{
        camRot -= e.movementX * 0.002;
    });

    function updateCamera(player){
        camera.position.x = player.position.x + Math.sin(camRot)*12;
        camera.position.z = player.position.z + Math.cos(camRot)*12;
        camera.position.y = player.position.y + 8;

        camera.lookAt(
            player.position.x,
            player.position.y + 2,
            player.position.z
        );
    }

    window.addEventListener("resize",()=>{
        camera.aspect = innerWidth/innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth,innerHeight);
    });

    return {
        scene,
        camera,
        renderer,
        updateCamera
    };

})();
