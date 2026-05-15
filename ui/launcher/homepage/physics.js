const Physics = (() => {

    const keys = {};
    let velY = 0;
    let grounded = false;

    const gravity = -0.02;

    window.addEventListener("keydown",e=>{
        keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener("keyup",e=>{
        keys[e.key.toLowerCase()] = false;
    });

    function update(player, objects, camRot){

        let mx=0,mz=0;

        if(keys["w"]) mz--;
        if(keys["s"]) mz++;
        if(keys["a"]) mx--;
        if(keys["d"]) mx++;

        const sin=Math.sin(camRot);
        const cos=Math.cos(camRot);

        const fx = mx*cos - mz*sin;
        const fz = mz*cos + mx*sin;

        const oldX = player.position.x;
        const oldZ = player.position.z;

        player.position.x += fx * 0.15;
        player.position.z += fz * 0.15;

        if(keys[" "] && grounded){
            velY = 0.35;
            grounded = false;
        }

        velY += gravity;
        player.position.y += velY;

        grounded = false;

        for(let o of objects){

            const top = o.position.y + o.userData.h/2;

            const inX =
            player.position.x > o.position.x - o.userData.w/2 &&
            player.position.x < o.position.x + o.userData.w/2;

            const inZ =
            player.position.z > o.position.z - o.userData.d/2 &&
            player.position.z < o.position.z + o.userData.d/2;

            const falling = velY <= 0;

            if(inX && inZ && falling && player.position.y <= top){

                player.position.y = top;
                velY = 0;
                grounded = true;

            }

            const onTop =
            Math.abs(player.position.y - top) < 0.3;

            if(!o.userData.anchored && !onTop){
                o.position.x += fx * 0.1;
                o.position.z += fz * 0.1;
            }

            if(o.userData.anchored && o !== window.baseplate && o !== window.spawn){

                if(inX && inZ && !falling){
                    player.position.x = oldX;
                    player.position.z = oldZ;
                }

            }

        }

        if(player.position.y < -30){
            player.position.set(0,5,0);
            velY = 0;
        }

        return camRot;
    }

    return {update};

})();
