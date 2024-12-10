import { useEffect, useState } from "react";

const Models = () => {
    // Статический массив для тестовых данных
    const staticModels = [
        { id: 1, name: "Model 1", likes: 10 },
        { id: 2, name: "Model 2", likes: 25 },
        { id: 3, name: "Model 3", likes: 7 },
    ];

    const [models, setModels] = useState(staticModels); // Заменить на [] после тестов

    useEffect(() => {
        // Раскомментировать, если сервер отвечает корректно
        /*
        fetch("http://127.0.0.1:8000/api/generated_models/")
          .then((res) => res.json())
          .then((data) => setModels(data));
        */
    }, []);

    const likeModel = async (id) => {
        // Если сервер не работает, лайки обновляются локально
        setModels((prev) =>
            prev.map((model) => (model.id === id ? { ...model, likes: model.likes + 1 } : model))
        );

        // Раскомментировать, если сервер отвечает корректно
        /*
        await fetch(`http://127.0.0.1:8000/api/generated_models/${id}/like/`, { method: "POST" });
        */
    };

    return (
        <div className="bg-dark min-h-screen p-6 text-light">
            <h1 className="text-primary text-3xl mb-6">Model Ratings</h1>
            <ul className="space-y-4">
                {models.map((model) => (
                    <li
                        key={model.id}
                        className="bg-gray-800 p-4 rounded shadow-md flex justify-between items-center"
                    >
                        <span>{model.name}</span>
                        <div className="flex items-center gap-2">
                            <span>{model.likes} Likes</span>
                            <button
                                className="bg-primary p-2 rounded hover:bg-purple-700"
                                onClick={() => likeModel(model.id)}
                            >
                                Like
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Models;
