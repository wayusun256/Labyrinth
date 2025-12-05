// createKabe.js - 確実な衝突判定版
export function createKabe(scene, mazeArray) {
    const cellSize = 2;
    const size = mazeArray.length;
    const scale = 1;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (mazeArray[i][j] === 1) {
                // 壁の可視部分
                const wall = document.createElement("a-entity");
                wall.setAttribute("gltf-model", "#kabe2");
                wall.setAttribute("position", `${i * cellSize} 1 ${j * cellSize}`);
                wall.setAttribute("scale", `${scale} ${scale} ${scale}`);
                wall.setAttribute("animation-mixer", "");
                scene.appendChild(wall);

                // 衝突判定用の透明ボックス（別エンティティ）
                const collisionBox = document.createElement("a-entity");
                collisionBox.setAttribute("geometry", "primitive: box; width: 2; height: 2; depth: 2");
                collisionBox.setAttribute("material", "visible: false; transparent: true; opacity: 0");
                collisionBox.setAttribute("position", `${i * cellSize} 1 ${j * cellSize}`);
                collisionBox.setAttribute("class", "wall-collision");
                scene.appendChild(collisionBox);
            }
        }
    }
}