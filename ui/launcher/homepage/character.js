function createCharacter(){

    const player = new THREE.Mesh(
        new THREE.BoxGeometry(2,3,2),
        new THREE.MeshStandardMaterial({color:0x2563eb})
    );

    player.position.set(0,2,0);

    return player;
}
