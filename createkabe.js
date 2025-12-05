export function createKabe(scene, mazeArray) {
    const cellSize = 2;      // マスの幅
    const size = mazeArray.length;

    // GLB の大きさに合わせて必要なら調整
    const modelScale = 0.33;  
    const modelY = 1.0;       // 壁の高さ位置（GLB による）

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {

            if (mazeArray[i][j] === 1) {

                // =============================
                // GLB 壁モデル本体
                // =============================
                const wall = document.createElement("a-entity");
                wall.setAttribute("gltf-model", "#kabe2");

                // マスの中心に合わせる
                const x = i * cellSize + cellSize / 2;
                const z = j * cellSize + cellSize / 2;

                wall.setAttribute("position", `${x} ${modelY} ${z}`);
                wall.setAttribute("scale", `${modelScale} 0.66 ${modelScale}`);

                // モデルの向きが違う場合は rotateY
                // wall.setAttribute("rotation", "0 90 0");

                scene.appendChild(wall);

                // =============================
                // 衝突判定用の透明ボックス
                // =============================
                const hit = document.createElement("a-entity");
                hit.setAttribute("geometry", "primitive: box; width: 2; height: 2; depth: 2");
                hit.setAttribute("material", "visible: false; opacity: 0");
                hit.setAttribute("class", "wall-collision");

                // 衝突ボックスも GLB に合わせて中心に置く
                hit.setAttribute("position", `${x} ${1} ${z}`);
                scene.appendChild(hit);
            }
        }
    }
}