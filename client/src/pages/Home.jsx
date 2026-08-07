import { useState } from "react";
import axios from "axios";
import api from "../services/api";


function Home() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDetect = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/detect",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);

    } catch (error) {
      console.error(error);
      alert("Detection failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">

      <h1 className="text-4xl font-bold">
        AI Microplastic Detection
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <button
        onClick={handleDetect}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Detect
      </button>

      {result && (
        <pre className="bg-gray-100 p-4 rounded w-3/4 overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

    </div>
  );
}

export default Home;