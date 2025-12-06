// arrival-check カスタムコンポーネント
AFRAME.registerComponent('arrival-check', {
    schema: {
      destination: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
      onarrival:   {type: 'vec3', default: {x: 0, y: 2, z: 0}}
    },
  
    tick: function () {
      const currentPos = this.el.object3D.position;
      const dest = this.data.destination;
      const threshold = 0.5;
  
      if (
        Math.abs(currentPos.x - dest.x) < threshold &&
        Math.abs(currentPos.y - dest.y) < threshold &&
        Math.abs(currentPos.z - dest.z) < threshold
      ) {
        const cam = document.querySelector('#camera');
        cam.setAttribute('position', this.data.onarrival);
        // 一度到着したら arrival-check コンポーネント削除
        this.el.removeAttribute('arrival-check');
      }
    }
  });