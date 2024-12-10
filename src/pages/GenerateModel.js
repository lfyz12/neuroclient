import { useState } from "react";

const NeuralNetworkPage = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/generate_model/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input }),
            });
            const data = await response.json();
            setResult(data.file || "Error generating model");
        } catch (error) {
            setResult("Error connecting to the server");
        }
        setIsLoading(false);
    };

    return (
        <div className="relative bg-dark min-h-screen flex flex-col">
            <header className="absolute top-6 left-6 text-primary text-4xl font-bold">
                Neuro3D
            </header>

            <div className="flex-grow flex justify-center items-center">
                <div className="w-full max-w-3xl bg-gray-800 text-light p-8 rounded-lg shadow-md relative">
                    {isLoading ? (
                        <div className="text-center text-xl animate-pulse">Generating...</div>
                    ) : result ? (
                        <div className="text-center text-lg">{result}</div>
                    ) : (
                        <div className="text-center text-gray-400">Your generated model will appear here</div>
                    )}
                </div>
            </div>

            <div className="p-4 bg-gray-900">
                <div className="flex justify-center items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter your prompt here..."
                        className="flex-grow max-w-2xl p-3 bg-gray-700 text-light rounded-l-lg focus:outline-none"
                    />
                    <button
                        onClick={handleGenerate}
                        className="p-3 bg-primary text-light rounded-r-lg hover:bg-purple-700"
                    >
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NeuralNetworkPage;
