// floor.js
export function createFloors(scene, size = 19) {
    const scale = 1;       // モデルスケール
    const y = 0;           // Y 座標
    const cellSize = 2;    // マス幅
  
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const floor = document.createElement('a-entity');
        floor.setAttribute('gltf-model', '#yuka');
        floor.setAttribute('position', `${i * cellSize} ${y} ${j * cellSize}`);
        floor.setAttribute('scale', `${scale} ${scale} ${scale}`);
        scene.appendChild(floor);
      }
    }
  }
  