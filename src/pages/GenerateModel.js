import { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const GenerateModel = () => {
    const [input, setInput] = useState("");

    useEffect(() => {
        const container = document.getElementById("model-display");

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            container.offsetWidth / container.offsetHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(renderer.domElement);

        const loader = new GLTFLoader();
        loader.load(
            "/hamburger.glb", // Укажите путь к вашей модели
            (gltf) => {
                scene.add(gltf.scene);
            },
            undefined,
            (error) => {
                console.error("Error loading model:", error);
            }
        );

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
    }, []); // Рендеринг происходит только при первой загрузке

    // const handleGenerate = async () => {
    //     // Логика генерации
    //     const response = await fetch("http://127.0.0.1:8000/api/generate_model/", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ input }),
    //     });
    //     const data = await response.json();
    //     if (data) {
    //         console.log("Model generated:", data);
    //     }
    // };

    return (
        <div className="bg-dark min-h-screen flex flex-col items-center justify-center text-light">
            <h1 className="text-4xl font-bold text-purple-500 mb-6">Neuro3D</h1>
            <div
                id="model-display"
                className="w-full h-[70vh] bg-gray-900 rounded-md mb-6 flex items-center justify-center"
            />
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input for model"
                className="w-full max-w-md p-2 rounded border-2 border-gray-700 focus:outline-none focus:border-purple-500 text-dark"
            />
            <button
                // onClick={handleGenerate}
                className="mt-4 bg-purple-500 text-light px-4 py-2 rounded hover:bg-purple-700"
            >
                Generate
            </button>
        </div>
    );
};

export default GenerateModel;
