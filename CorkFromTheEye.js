// CorkFromTheEye.js
import { maxCorks } from "./config.js"; // 残弾数設定

AFRAME.registerComponent('cork-shooter', {
  schema: {
    speed: { type: 'number', default: 0.5 },       // コルクの速度
    maxDistance: { type: 'number', default: 20 }   // コルクが消える距離
  },

  init: function () {
    this.corks = [];
    this.remaining = maxCorks;
    this.cameraEl = this.el;

    // HUD表示（日本語対応フォントを指定）
    this.hudText = document.createElement('a-text');
    this.hudText.setAttribute('font', '#nikumaru'); // 日本語対応MSDFフォント
    this.hudText.setAttribute('value', `残弾数：${this.remaining}`);
    this.hudText.setAttribute('position', '-1.3 0.6 -1'); // カメラ前左上
    this.hudText.setAttribute('color', 'red');
    this.hudText.setAttribute('align', 'left');
    this.hudText.setAttribute('scale', '0.3 0.3 0.3');
    this.cameraEl.appendChild(this.hudText);

    // スペースキーでコルク発射
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') this.shootCork();
    });
  },

  shootCork: function () {
    if (this.remaining <= 0) return; // 弾が無ければ発射不可

    // コルク作成
    const cork = document.createElement('a-entity');
    cork.setAttribute('gltf-model', '#cork');
    cork.setAttribute('scale', '0.2 0.2 0.2');

    // 発射位置・方向
    const startPos = new THREE.Vector3();
    const direction = new THREE.Vector3(0, 0, -1);
    this.cameraEl.object3D.getWorldPosition(startPos);
    direction.applyQuaternion(this.cameraEl.object3D.quaternion);
    startPos.add(direction.clone().multiplyScalar(0.5)); // カメラ前0.5mに配置

    cork.setAttribute('position', startPos);
    cork.userData = {
      startPos: startPos.clone(),
      direction: direction.clone()
    };

    // シーンに追加
    this.el.sceneEl.appendChild(cork);
    this.corks.push(cork);

    // 残弾数減少＆HUD更新
    this.remaining--;
    this.hudText.setAttribute('value', `残弾数：${this.remaining}`);
  },

  tick: function () {
    const removeList = [];

    // コルク移動＆距離チェック
    this.corks.forEach((cork) => {
      const move = cork.userData.direction.clone().multiplyScalar(this.data.speed);
      cork.object3D.position.add(move);

      const traveled = cork.object3D.position.distanceTo(cork.userData.startPos);
      if (traveled > this.data.maxDistance) removeList.push(cork);
    });

    // コルク削除
    removeList.forEach((cork) => {
      cork.parentNode.removeChild(cork);
      this.corks.splice(this.corks.indexOf(cork), 1);
    });
  }
});
