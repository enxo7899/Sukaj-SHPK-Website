import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { Mesh, MeshPhysicalMaterial, Group, CylinderGeometry, TorusGeometry, Scene } from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

if (typeof globalThis.FileReader === "undefined") {
  globalThis.FileReader = class {
    constructor() {
      this.onloadend = null;
      this.result = null;
    }

    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buffer) => {
        this.result = buffer;
        if (this.onloadend) {
          this.onloadend();
        }
      });
    }
  };
}

function addCorrugatedTube({ group, radius, length, ribs, axis = "x", material }) {
  const shell = new Mesh(new CylinderGeometry(radius, radius, length, 36, 1, true), material);
  shell.name = "pipe-shell";
  if (axis === "x") {
    shell.rotation.z = Math.PI / 2;
  }
  shell.castShadow = true;
  shell.receiveShadow = true;
  group.add(shell);

  const ribGeom = new TorusGeometry(radius, radius * 0.07, 10, 36);
  for (let i = 0; i < ribs; i += 1) {
    const rib = new Mesh(ribGeom, material);
    rib.name = "pipe-rib";
    if (axis === "x") {
      rib.rotation.y = Math.PI / 2;
      rib.position.x = -length / 2 + (i / (ribs - 1 || 1)) * length;
    } else if (axis === "y") {
      rib.rotation.x = Math.PI / 2;
      rib.position.y = -length / 2 + (i / (ribs - 1 || 1)) * length;
    } else {
      rib.position.z = -length / 2 + (i / (ribs - 1 || 1)) * length;
    }
    rib.castShadow = true;
    rib.receiveShadow = true;
    group.add(rib);
  }
}

function addBranding({ group, text, x, y, z, font }) {
  const geometry = new TextGeometry(text, {
    font,
    size: 0.19,
    depth: 0.011,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.0015,
    bevelSegments: 3,
  });
  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox;
  const width = bbox ? bbox.max.x - bbox.min.x : 0;
  geometry.translate(-width / 2, 0, 0);

  const textMaterial = new MeshPhysicalMaterial({
    color: "#dbe2ee",
    roughness: 0.35,
    metalness: 0.16,
    clearcoat: 0.24,
    clearcoatRoughness: 0.42,
    emissive: "#1f2937",
    emissiveIntensity: 0.01,
  });

  const shadowMaterial = new MeshPhysicalMaterial({
    color: "#111827",
    roughness: 0.72,
    metalness: 0,
    clearcoat: 0.04,
    clearcoatRoughness: 0.9,
  });

  const label = new Mesh(geometry, textMaterial);
  label.name = "branding-text";
  label.position.set(x, y, z);
  label.rotation.x = 0;
  label.castShadow = true;
  label.receiveShadow = true;

  const labelShadow = new Mesh(geometry, shadowMaterial);
  labelShadow.name = "branding-text-shadow";
  labelShadow.position.set(x, y - 0.01, z - 0.018);
  labelShadow.rotation.x = 0;

  group.add(label);
  group.add(labelShadow);
}

function addDetailBand({ group, x, radius, material }) {
  const band = new Mesh(new TorusGeometry(radius, 0.018, 10, 40), material);
  band.name = "pipe-detail-band";
  band.rotation.y = Math.PI / 2;
  band.position.x = x;
  group.add(band);
}

async function main() {
  const scene = new Scene();
  const fontJsonPath = resolve("node_modules/three/examples/fonts/optimer_bold.typeface.json");
  const fontJson = JSON.parse(await readFile(fontJsonPath, "utf8"));
  const font = new FontLoader().parse(fontJson);

  const bodyMaterial = new MeshPhysicalMaterial({
    color: "#070d19",
    roughness: 0.46,
    metalness: 0.04,
    clearcoat: 0.38,
    clearcoatRoughness: 0.54,
  });

  const darkMaterial = new MeshPhysicalMaterial({
    color: "#05080f",
    roughness: 0.62,
    metalness: 0.06,
    clearcoat: 0.2,
    clearcoatRoughness: 0.65,
  });

  const detailMaterial = new MeshPhysicalMaterial({
    color: "#111827",
    roughness: 0.58,
    metalness: 0.03,
    clearcoat: 0.18,
    clearcoatRoughness: 0.62,
  });

  const root = new Group();
  root.name = "SukajPremiumPipe";

  addCorrugatedTube({ group: root, radius: 0.7, length: 4.8, ribs: 30, axis: "x", material: bodyMaterial });

  const socketGeomMain = new CylinderGeometry(0.78, 0.78, 0.4, 36, 1, true);
  const socketLeft = new Mesh(socketGeomMain, darkMaterial);
  socketLeft.rotation.z = Math.PI / 2;
  socketLeft.name = "pipe-socket";
  socketLeft.position.x = -2.55;
  root.add(socketLeft);

  const socketRight = new Mesh(socketGeomMain, darkMaterial);
  socketRight.rotation.z = Math.PI / 2;
  socketRight.name = "pipe-socket";
  socketRight.position.x = 2.55;
  root.add(socketRight);

  addDetailBand({ group: root, x: -1.95, radius: 0.705, material: detailMaterial });
  addDetailBand({ group: root, x: 1.95, radius: 0.705, material: detailMaterial });

  addBranding({ group: root, text: "SUKAJ SHPK", x: 0, y: 0.12, z: 0.748, font });

  scene.add(root);

  const exporter = new GLTFExporter();
  const data = await exporter.parseAsync(scene, {
    binary: true,
    includeCustomExtensions: false,
    onlyVisible: true,
    maxTextureSize: 1024,
  });

  const target = resolve("public/media/models/sukaj-premium-pipe.glb");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(data));
  console.log(`Generated ${target}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
