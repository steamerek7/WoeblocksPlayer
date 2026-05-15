/* ========================= */
/* CHARACTER.JS              */
/* ========================= */

function createCharacter(){

    const player =
    new THREE.Group();

    /* BODY */

    const torso =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            2,
            3,
            1
        ),

        new THREE.MeshStandardMaterial({
            color:0x2563eb
        })

    );

    torso.position.y = 4;

    torso.castShadow = true;

    player.add(torso);

    /* HEAD */

    const head =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            1.8,
            1.8,
            1.8
        ),

        new THREE.MeshStandardMaterial({
            color:0xffd6b3
        })

    );

    head.position.y = 6.2;

    head.castShadow = true;

    player.add(head);

    /* LEFT ARM */

    const leftArm =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            0.7,
            2.5,
            0.7
        ),

        new THREE.MeshStandardMaterial({
            color:0xffd6b3
        })

    );

    leftArm.position.set(
        -1.5,
        4,
        0
    );

    leftArm.castShadow = true;

    player.add(leftArm);

    /* RIGHT ARM */

    const rightArm =
    leftArm.clone();

    rightArm.position.x = 1.5;

    player.add(rightArm);

    /* LEFT LEG */

    const leftLeg =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            0.8,
            2.5,
            0.8
        ),

        new THREE.MeshStandardMaterial({
            color:0x1f2937
        })

    );

    leftLeg.position.set(
        -0.5,
        1.8,
        0
    );

    leftLeg.castShadow = true;

    player.add(leftLeg);

    /* RIGHT LEG */

    const rightLeg =
    leftLeg.clone();

    rightLeg.position.x = 0.5;

    player.add(rightLeg);

    /* SAVE */

    player.userData = {

        leftArm,
        rightArm,
        leftLeg,
        rightLeg

    };

    return player;

}

/* ========================= */
/* WALK ANIMATION            */
/* ========================= */

function animateCharacter(
    player,
    moving
){

    const {

        leftArm,
        rightArm,
        leftLeg,
        rightLeg

    }

    = player.userData;

    if(moving){

        leftArm.rotation.x =

        Math.sin(
            Date.now() * 0.01
        ) * 0.8;

        rightArm.rotation.x =

        -Math.sin(
            Date.now() * 0.01
        ) * 0.8;

        leftLeg.rotation.x =

        -Math.sin(
            Date.now() * 0.01
        ) * 0.8;

        rightLeg.rotation.x =

        Math.sin(
            Date.now() * 0.01
        ) * 0.8;

    }

    else{

        leftArm.rotation.x = 0;
        rightArm.rotation.x = 0;

        leftLeg.rotation.x = 0;
        rightLeg.rotation.x = 0;

    }

}
