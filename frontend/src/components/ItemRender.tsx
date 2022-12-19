import{ useMemo, useState } from 'react';
import * as THREE from 'three';

type ItemRenderProps = {
    object: string;
    texture: string;
};

function ItemRender({ object, texture }: ItemRenderProps) {
    const [scene, setScene] = useState(new THREE.Scene());
    const [camera, setCamera] = useState(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
    const [renderer, setRenderer] = useState(new THREE.WebGLRenderer({ antialias: true }));

    if (scene.children.length === 0) {
        var objLoader = new THREE.ObjectLoader();
        var textureLoader = new THREE.TextureLoader();

        const material = new THREE.MeshBasicMaterial({
            map: textureLoader.load(texture),
        });

        objLoader.load(object, function (object) {
            object.position.set(1, 3, -20);
            object.scale.set(5, 5, 5);
            object.rotation.set(2.5, 3.5, 0);

            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                }
            });
            object.name = 'spear';
            scene.add(object);
        });

        renderer.setClearColor('#263238', 0);
        renderer.setSize(400, 400);
    }

    function animation() {
        requestAnimationFrame(animation);

        if (scene.getObjectByName('spear')) {
            scene.getObjectByName('spear')!.rotation.z += 0.01;
        }

        renderer.render(scene, camera);
    }

    function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    render();

    //context render lost
    useMemo(() => {
        animation();
    }, []);

    return <div ref={(element) => (element ? element.appendChild(renderer.domElement) : null)} />;
}

export default ItemRender;