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
const spacingY: number = 210;

// Sphere
const sphereRadius: number = 1200;

// Helix
const radius: number = 1200;
const twist: number = 0.25;
const verticalSpacing: number = 20;

// Grid
const gridCols: number = 5;
const gridRows: number = 4;
const gridDepth: number = 10;

// Tetrahedron
const size = 1800;
const apex = new THREE.Vector3(0, size, 0);
const B1 = new THREE.Vector3(-size, -size, size);
const B2 = new THREE.Vector3(size, -size, size);
const B3 = new THREE.Vector3(0, -size, -size);
const tetraFaces = [
    [apex, B1, B2], // side 1
    [apex, B2, B3], // side 2
    [apex, B3, B1], // side 3
    [B1, B2, B3],   // base
];

// Menu
const buttons: NavButton[] = [
    { id: 'table', text: 'TABLE', click: () => changeModeTo(table) },
    { id: 'sphere', text: 'SPHERE', click: () => changeModeTo(sphere) },
    { id: 'helix', text: 'HELIX', click: () => changeModeTo(helix) },
    { id: 'grid', text: 'GRID', click: () => changeModeTo(grid) },
    { id: 'tetrahedron', text: 'TETRAHEDRON', click: () => changeModeTo(tetrahedron) },
];

function lerpVec(a: THREE.Vector3, b: THREE.Vector3, t: number): THREE.Vector3 {
    return new THREE.Vector3(
        a.x + (b.x - a.x) * t,
        a.y + (b.y - a.y) * t,
        a.z + (b.z - a.z) * t
    );
};

// Hitung jumlah ideal per face (triangular number)
function bestTriangular(maxCount: number): number {
    let n = Math.floor((Math.sqrt(8 * maxCount + 1) - 1) / 2);
    return (n * (n + 1)) / 2; // triangular number
};

// function generateTableMode(): void {
//     // 
// };

// function generateHelixMode(): void {
//     // 
// };

// function generateSphereMode(): void {
//     // 
// };

// function generateGridMode(): void {
//     // 
// };

// function generateTetrahedronMode(): void {
//     // 
// };

function init(): void {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3000;

    scene = new THREE.Scene();

    // Table
    for (let i = 0; i < users.length; i++) {
        const element: HTMLDivElement = document.createElement<'div'>('div');
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

    // Helix (Double Helix)
    let A: number[] = [];
    let B: number[] = [];

    for (let i: number = 0, l: number = objects.length; i < l; i++) {
        if (i % 2 === 0) {
            A.push(i);
        } else {
            B.push(i);
        }
    }

    const maxN = Math.max(A.length, B.length);

    let helixTargets = [];

    for (let n: number = 0; n < maxN; n++) {
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
    for (let i: number = 0; i < objects.length; i ++) {
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
    const total = objects.length;
    const maxForEachFace = Math.floor(total / 4);

    const perFace = bestTriangular(maxForEachFace); 

    let globalIndex = 0;

    // Jarak aman dari sudut
    const cornerInset = 0.10; // tambah / kurangi jika masih terlalu rapat

    for (let f = 0; f < 4; f++) {
        const [A, B, C] = tetraFaces[f];

        // per-face data
        let count = perFace;
        let placed = 0;

        let layer = 1;

        while (placed < count) {
            const itemsInLayer = layer;

            if (placed + itemsInLayer > count) {
                break;
            }

            for (let i = 0; i < itemsInLayer; i++) {
                if (globalIndex >= total) break;

                // ===== FIX BAGIAN SUDUT (UTAMA) =====
                // Semakin dekat apex → geser sedikit menjauhi sudut
                let tA = layer / (Math.sqrt(count) + 2);

                // geser supaya tidak nempel apex & edges
                tA = cornerInset + tA * (1 - cornerInset * 2);

                // posisi horizontal antar layer
                let tB = (itemsInLayer === 1)
                    ? 0.5
                    : i / (itemsInLayer - 1);

                // geser sedikit dari pinggir horizontal
                tB = cornerInset + tB * (1 - cornerInset * 2);

                // move slightly inward to avoid touching edges
                const AB = lerpVec(A, B, tA);
                const AC = lerpVec(A, C, tA);

                const P = lerpVec(AB, AC, tB);

                const obj = new THREE.Object3D();
                obj.position.copy(P);

                // face normal
                const normal = new THREE.Vector3()
                    .crossVectors(
                        new THREE.Vector3().subVectors(B, A),
                        new THREE.Vector3().subVectors(C, A)
                    )
                    .normalize();

                obj.lookAt(P.clone().add(normal));

                tetrahedron[globalIndex] = obj;

                globalIndex++;

                placed++;
            }

            layer++;
        }
    }

    // fill any leftover
    while (tetrahedron.length < objects.length) {
        tetrahedron.push(tetrahedron[tetrahedron.length - 1].clone());
    }

    // Create CSS 3D render element
    createCSS3DRenderer();

    // Create controls
    createControls();

    transform(table, 2000);

    animate();
};

function changeModeTo(data: THREE.Object3D[] = []): void {
    transform(data, 2000);
};

function createControls(): void {
    controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', () => renderer.render(scene, camera));
};

function createCSS3DRenderer(): void {
    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.setAttribute('id', 'three');
    renderer.domElement.style['margin'] = '0 auto';

    const app = document.getElementById('app');
    app!.appendChild(renderer.domElement);
};

function animate(): void {
    requestAnimationFrame(animate);

    tweenGroup.update();
    controls.update();
    renderer.render(scene, camera);
};

function addNavigation(): void {
    const menu: HTMLDivElement = document.createElement<'div'>('div');

    menu.setAttribute('id', 'menu');

    buttons.forEach((buttonData: NavButton) => {
        const button: HTMLButtonElement = document.createElement<'button'>('button');
        button.setAttribute('type', 'button');
        button.setAttribute('id', buttonData.id);
        button.addEventListener('click', buttonData.click);
        button.innerHTML = buttonData.text;

        menu.appendChild(button);
    });

    document.body.appendChild(menu);
};

function transform(targets: THREE.Object3D[], duration: number): void {
    tweenGroup.removeAll();

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
