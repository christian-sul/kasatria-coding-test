'use strict';
import './style.css';
import * as THREE from 'three';
import { Group, Tween, Easing } from '@tweenjs/tween.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

interface UserObject {
    id?: number,
    name: string | '',
    age: number | 0,
    interest: string | '',
    country: string | '',
    photo: string | '',
    net_worth: number | 0
}

interface NavButton {
    id: string;
    text: string;
    click: () => void;
}

const tweenGroup = new Group();

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: CSS3DRenderer;
let controls: TrackballControls;

let users: UserObject[] = [];
let objects: CSS3DObject[] = [];

// Modes
let table: THREE.Object3D[] = [];
let sphere: THREE.Object3D[] = [];
let helix: THREE.Object3D[] = [];
let grid: THREE.Object3D[] = [];
let tetrahedron: THREE.Object3D[] = [];

// Table
const maxColumns: number = 20;
const maxRows: number = 10;

// Sphere
const sphereRadius: number = 1200;

// Helix
const radius = 1200;
const twist = 0.25;
const verticalSpacing = 20;

// Grid
const gridCols: number = 5;
const gridRows: number = 4;
const gridDepth: number = 10;

// Tetrahedron
const size = 1200;
const apex = new THREE.Vector3(0, size, 0);
const v1 = new THREE.Vector3(-size, -size / 2, size / Math.sqrt(3));
const v2 = new THREE.Vector3(size, -size / 2, size / Math.sqrt(3));
const v3 = new THREE.Vector3(0, -size / 2, -2 * size / Math.sqrt(3));
const faces = [
    [apex, v1, v2],
    [apex, v2, v3],
    [apex, v3, v1],
    [v1, v2, v3]
];

// Menu
const buttons: NavButton[] = [
    { id: 'table', text: 'TABLE', click: () => changeModeTo(table) },
    { id: 'sphere', text: 'SPHERE', click: () => changeModeTo(sphere) },
    { id: 'helix', text: 'HELIX', click: () => changeModeTo(helix) },
    { id: 'grid', text: 'GRID', click: () => changeModeTo(grid) },
    { id: 'tetrahedron', text: 'TETRAHEDRON', click: () => changeModeTo(tetrahedron) },
];

function init(): void {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3000;

    scene = new THREE.Scene();

    // Table
    for (let i = 0; i < users.length; i++) {
        const element = document.createElement('div');
        element.setAttribute('data-id', `user_${users[i].id}`);
        element.classList.add('user-wrapper');
        element.style['position'] = 'relative';
        element.style['pointerEvents'] = 'auto';
        element.style['touchAction'] = 'auto';

        if (users[i].net_worth > 200000) { // Green
            element.classList.add('green');
        } else if (users[i].net_worth >= 100000) { // Yellow
            element.classList.add('yellow');
        } else { // Red
            element.classList.add('red');
        }

        const upperCasedInterest: string = users[i].interest[0].toUpperCase() + users[i].interest.slice(1);

        // element.addEventListener('mouseenter', () => {
        //     // 
        // });

        element.innerHTML = `
            <div class="user">
                <div class="user-info">
                    <span style="font-size: 10px; font-weight: bold;">${users[i].country}</span>

                    <span style="font-size: 10px;">${users[i].age}</span>
                </div>

                <div class="user-image">
                    <img
                    draggable="false"
                    src="${users[i].photo}"
                    style="width: 100%;" />
                </div>

                <div style="margin-top: 8px; max-width: 100%; text-align: center; text-overflow: ellipsis; whitespace-nowrap;">
                    <span style="display: block; font-size: 10px; font-weight: bold; text-overflow: ellipsis;">${users[i].name}</span>

                    <span style="font-size: 8px; display: block; margin-top: 8px;">${upperCasedInterest}</span>
                </div>
            </div>
        `;

        const objectCSS = new CSS3DObject(element);
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;

        scene.add(objectCSS);

        objects.push(objectCSS);

        const object = new THREE.Object3D();
        const col = i % maxColumns;
        const row = Math.floor(i / maxColumns);

        object.position.x = col * 150 - (150 * (maxColumns - 1) / 2);

        const spacingY = 210;
        object.position.y = -row * spacingY + (spacingY * (maxRows - 1) / 2);

        object.position.z = 0;

        object.rotation.x = 0;
        object.rotation.y = 0;
        object.rotation.z = 0;

        table.push(object);
    }

    // Sphere
    const vector = new THREE.Vector3();

    for (let i = 0, l = objects.length; i < l; i++) {
        const phi = Math.acos(-1 + (2 * i) / l);
        const theta = Math.sqrt(l * Math.PI) * phi;

        const object = new THREE.Object3D();

        object.position.setFromSphericalCoords(sphereRadius, phi, theta);

        vector.copy(object.position).multiplyScalar(2);

        object.lookAt(vector);

        sphere.push(object);
    }

    // Helix
    let A = [];
    let B = [];

    for (let i = 0, l = objects.length; i < l; i ++) {
        // const theta = i * 0.175 + Math.PI;
        // const y = -(i * 8) + 450;

        // const object = new THREE.Object3D();

        // object.position.setFromCylindricalCoords(helixRadius, theta, y );

        // vector.x = object.position.x * 2;
        // vector.y = object.position.y;
        // vector.z = object.position.z * 2;

        // object.lookAt(vector);

        // helix.push(object);

        if (i % 2 === 0) {
            A.push(i);
        } else {
            B.push(i);
        }
    }

    const maxN = Math.max(A.length, B.length);

    let helixTargets = [];

    for (let n = 0; n < maxN; n++) {
        if (A[n] !== undefined) {
            const object = new THREE.Object3D();

            const angle = twist * n;

            object.position.x = radius * Math.cos(angle);
            object.position.y = -n * verticalSpacing;
            object.position.z = radius * Math.sin(angle);

            object.lookAt(new THREE.Vector3(0, object.position.y, 0));

            helixTargets[A[n]] = object;
        }

        if (B[n] !== undefined) {
            const object = new THREE.Object3D();

            const angle = twist * n - Math.PI;

            object.position.x = radius * Math.cos(angle);
            object.position.y = -n * verticalSpacing;
            object.position.z = radius * Math.sin(angle);

            object.lookAt(new THREE.Vector3(0, object.position.y, 0));

            helixTargets[B[n]] = object;
        }
    }

    helix = helixTargets;

    // Grid
    for (let i = 0; i < objects.length; i ++) {
        const col = i % gridCols;
        const row = Math.floor(i / gridCols) % gridRows;
        const depth = Math.floor(i / (gridCols * gridRows)) % gridDepth;

        const object = new THREE.Object3D();

        object.position.x = col * 400 - ((gridCols - 1) * 400 / 2);
        object.position.y = -row * 400 + ((gridRows - 1) * 400 / 2);
        object.position.z = depth * 1000 - ((gridDepth - 1) * 1000 / 2);

        grid.push(object);
    }

    // Tetrahedron
    // Recalculate after objects are known
    const itemsPerFace = Math.ceil(objects.length / 4);
    const gridSize = Math.max(1, Math.ceil(Math.sqrt(itemsPerFace)));

    for (let f = 0; f < 4; f++) {
        const A = faces[f][0];
        const B = faces[f][1];
        const C = faces[f][2];

        for (let gx = 0; gx < gridSize; gx++) {
            for (let gy = 0; gy < gridSize; gy++) {

                const index = f * gridSize * gridSize + gx * gridSize + gy;

                if (index >= objects.length) {
                    break;
                };

                const object = new THREE.Object3D();

                // Normalize grid (0..1)
                let u = gx / (gridSize - 1);
                let v = gy / (gridSize - 1);

                // Keep points inside triangle
                if (u + v > 1) {
                    u = 1 - u;
                    v = 1 - v;
                }

                const w = 1 - u - v;

                // Position = barycentric interpolation
                const pos = new THREE.Vector3()
                    .addScaledVector(A, u)
                    .addScaledVector(B, v)
                    .addScaledVector(C, w);

                object.position.copy(pos);
                object.lookAt(new THREE.Vector3(0,0,0));

                tetrahedron.push(object);
            }
        }
    }

    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.setAttribute('id', 'three');
    renderer.domElement.style['margin'] = '0 auto';

    const app = document.getElementById('app');
    app!.appendChild(renderer.domElement);

    controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', () => renderer.render(scene, camera));

    transform(table, 2000);

    animate();

    // Add click event
    // const raycaster = new THREE.Raycaster();
    // const mouse = new THREE.Vector2();

    // window.addEventListener('click', (event) => {
    //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    //     raycaster.setFromCamera(mouse, camera);

    //     const intersects = raycaster.intersectObjects(clickTargets);

    //     if (intersects.length < 1) {
    //         return;
    //     }

    //     const obj = intersects[0].object.userData.cssElement;

    //     console.log("Clicked:", obj);
    // });
};

function changeModeTo(data: THREE.Object3D[] = []): void {
    transform(data, 2000);
};

function animate(): void {
    requestAnimationFrame(animate);

    tweenGroup.update();
    controls.update();
    renderer.render(scene, camera);
};

function addNavigation(): void {
    const menu = document.createElement('div');

    menu.setAttribute('id', 'menu');

    buttons.forEach((buttonData: NavButton) => {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('id', buttonData.id);
        button.addEventListener('click', buttonData.click);
        button.innerHTML = buttonData.text;

        menu.appendChild(button);
    });

    document.body.appendChild(menu);
};

function transform(targets: THREE.Object3D[], duration: number): void {
    tweenGroup.removeAll?.();

    for (let i: number = 0; i < objects.length; i++) {
        const object = objects[i];

        const target = targets[i];

        if (!target) { // Prevent crash
            continue;
        }

        new Tween(object.position, tweenGroup)
            .to({
                x: target.position.x,
                y: target.position.y,
                z: target.position.z
            }, Math.random() * duration + duration)
            .easing(Easing.Exponential.InOut)
            .start();

        new Tween(object.rotation, tweenGroup)
            .to({
                x: target.rotation.x,
                y: target.rotation.y,
                z: target.rotation.z
            }, Math.random() * duration + duration)
            .easing(Easing.Exponential.InOut)
            .start();
    }

    new Tween(tweenGroup)
        .to({}, duration * 2)
        .onUpdate(() => renderer.render(scene, camera))
        .start();
}

function windowResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
}

export {
    addNavigation,
    init,
    users,
    windowResize,
};
