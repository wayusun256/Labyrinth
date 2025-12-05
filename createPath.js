// createPath.js - 詳細版
export function createPath(mazeArray, scene) {
    const meshSize = 2;
    const size = mazeArray.length;
    
    // 複数の平面を組み合わせてNavMeshを作成
    const group = new THREE.Group();
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            // 通路部分(0)のみNavMeshとして登録
            if (mazeArray[i][j] === 0) {
                const geometry = new THREE.PlaneGeometry(meshSize, meshSize);
                geometry.rotateX(-Math.PI / 2);
                
                const material = new THREE.MeshBasicMaterial({
                    visible: false
                });
                
                const plane = new THREE.Mesh(geometry, material);
                plane.position.set(
                    i * meshSize + meshSize / 2,
                    0.01, // 床より少し上
                    j * meshSize + meshSize / 2
                );
                
                group.add(plane);
            }
        }
    }
    
    const navEntity = document.createElement("a-entity");
    navEntity.setObject3D("mesh", group);
    navEntity.setAttribute("nav-mesh", "");
    scene.appendChild(navEntity);
}