//アイテムを迷路内に配置する関数
export function putTimer(x,y,modelId) {
    const scene = document.querySelector('#maze');
    const item = document.createElement('a-entity');
    item.setAttribute("gltf-model",modelId);
    item.setAttribute("position",`${x*2} 1 ${y*2}`);
    item.setAttribute('rotation', '0 90 0');
    item.setAttribute('scale', '0.25 0.25 0.25');//いらんかも
    scene.appendChild(item);
}
    //xが迷路の横方向の座標。例えば、x=2のとき配列のmazeArray[?][2]に対応
    //modelIdは<a-asset-item> の id を文字列で指定
    //例：'#itemModel' → <a-asset-item id="itemModel" src="item.glb"></a-asset-item> を読み込む




