// CorkFromTheEye.js
import { maxCorks } from "./config.js"; // 残弾数設定

AFRAME.registerComponent('cork-shooter', {
  schema: {
    speed: { type: 'number', default: 0.5 },
    maxDistance: { type: 'number', default: 20 }
  },

  init: function () {
    // 初期化
    this.corks = [];
    this.remaining = maxCorks;
    this.cameraEl = this.el;

    // ---既存のHUD要素が残っていたら削除---
    try {
      const prevDom = document.getElementById('ammo_hud');
      if (prevDom) prevDom.remove();
      const prevAEnt = document.querySelector('[data-cork-hud]');
      if (prevAEnt) prevAEnt.remove();
    } catch (e) {
      console.warn('HUD cleanup warning', e);
    }

    // --- DOMオーバーレイでHUDを作成 ---
    this.domHud = document.createElement('div');
    this.domHud.id = 'ammo_hud';
    this.domHud.style.position = 'fixed';
    this.domHud.style.top = '12px';
    this.domHud.style.left = '12px';
    this.domHud.style.zIndex = '2147483647';
    this.domHud.style.pointerEvents = 'none';
    this.domHud.style.fontFamily = "sans-serif, 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', Meiryo";
    this.domHud.style.color = 'red';
    this.domHud.style.fontSize = '22px';
    this.domHud.style.fontWeight = '700';
    this.domHud.style.textShadow = '0 0 2px rgba(0,0,0,0.6)';
    this.domHud.style.userSelect = 'none';
    this.domHud.style.whiteSpace = 'nowrap';
    this.domHud.textContent = `残弾数：${this.remaining}`;
    document.body.appendChild(this.domHud);

    // スペースキーでコルク発射
    this._onKeyDown = (e) => { if (e.code === 'Space') this.shootCork(); };
    window.addEventListener('keydown', this._onKeyDown);
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

    // 残弾数減少＆HUD更新（DOMを直接更新）
    this.remaining--;
    if (this.domHud) {
      this.domHud.textContent = `残弾数：${this.remaining}`;
      console.log('Remaining updated →', this.remaining);
    } else {
      console.warn('HUD element not found when updating remaining.');
    }
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
      if (cork.parentNode) cork.parentNode.removeChild(cork);
      const idx = this.corks.indexOf(cork);
      if (idx !== -1) this.corks.splice(idx, 1);
    });
  },

  remove: function () {
    // コンポーネントが破棄されるときのクリーンナップ
    try {
      if (this.domHud && this.domHud.parentNode) this.domHud.parentNode.removeChild(this.domHud);
      window.removeEventListener('keydown', this._onKeyDown);
    } catch (e) { /* ignore */ }
  }
});
