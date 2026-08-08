import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../services/api";

function Detect() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Select image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  // Send image to backend
  const handleDetect = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();

    formData.append("image", image);

    try {
      setLoading(true);
      setResult(null);

      const response = await api.post(
        "/api/detect",
        formData
      );

      console.log("Detection result:", response.data);

      setResult(response.data);

    } catch (error) {
      console.error("Detection error:", error);

      alert("Detection failed. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">

        {/* ================= HERO ================= */}

        <section className="px-6 pt-16 pb-10 text-center">

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            AI Microplastic Detection
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Upload a microscope image and let our AI identify
            microplastic particles automatically.
          </p>

        </section>


        {/* ================= UPLOAD ================= */}

        <section className="max-w-5xl mx-auto px-6">

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">

            <label
              htmlFor="imageUpload"
              className="block cursor-pointer"
            >

              <div className="border-2 border-dashed border-blue-300
                              rounded-2xl p-12 text-center
                              hover:border-blue-500
                              hover:bg-blue-50
                              transition">

                <div className="text-5xl mb-5">
                  ↑
                </div>

                <h2 className="text-2xl font-semibold text-slate-800">
                  Drag & Drop Image
                </h2>

                <p className="mt-2 text-gray-500">
                  or click to upload a microscope image
                </p>

                <p className="mt-4 text-sm text-gray-400">
                  JPG, JPEG or PNG
                </p>

              </div>

            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleImageChange}
              className="hidden"
            />


            {/* Preview */}

            {preview && !loading && !result && (

              <div className="mt-8 text-center">

                <h3 className="font-semibold text-lg mb-4">
                  Selected Image
                </h3>

                <img
                  src={preview}
                  alt="Selected microscope sample"
                  className="max-h-80 mx-auto rounded-2xl shadow-lg"
                />

                <button
                  onClick={handleDetect}
                  className="mt-8 bg-blue-600 hover:bg-blue-700
                             text-white font-semibold
                             px-8 py-4 rounded-xl
                             transition shadow-lg"
                >
                  Start AI Detection
                </button>

              </div>

            )}

          </div>

        </section>


        {/* ================= PROCESSING ================= */}

        {loading && (

          <section className="max-w-3xl mx-auto px-6 py-16">

            <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

              <div className="w-16 h-16 mx-auto border-4
                              border-blue-200 border-t-blue-600
                              rounded-full animate-spin">
              </div>

              <h2 className="mt-8 text-2xl font-bold">
                AI is Processing...
              </h2>

              <p className="mt-3 text-gray-500">
                Analyzing the microscope image for microplastic particles.
              </p>

              {/* Progress animation */}

              <div className="mt-8 h-3 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-blue-600 rounded-full
                             animate-progress"
                />

              </div>

            </div>

          </section>

        )}


        {/* ================= RESULTS ================= */}

        {result && !loading && (

          <section className="max-w-6xl mx-auto px-6 py-16">

            <h2 className="text-3xl font-bold text-center mb-10">
              Detection Results
            </h2>


            {/* Images */}

            <div className="grid md:grid-cols-2 gap-8">

              {/* Original */}

              <div className="bg-white rounded-3xl shadow-xl p-6">

                <h3 className="text-xl font-bold mb-5">
                  Original Image
                </h3>

                <img
                  src={preview}
                  alt="Original microscope sample"
                  className="w-full rounded-2xl"
                />

              </div>


              {/* Detection */}

              <div className="bg-white rounded-3xl shadow-xl p-6">

                <h3 className="text-xl font-bold mb-5">
                  Detected Image
                </h3>

                <div className="relative">

                  <img
                    src={preview}
                    alt="Microplastic detection"
                    className="w-full rounded-2xl"
                  />

                  {/* Temporary detection boxes */}

                  <div className="absolute top-[25%] left-[30%]
                                  w-16 h-12
                                  border-2 border-red-500">

                    <span className="absolute -top-6 left-0
                                     bg-red-500 text-white
                                     text-xs px-2 py-1">
                      Microplastic
                    </span>

                  </div>

                  <div className="absolute top-[55%] left-[55%]
                                  w-20 h-14
                                  border-2 border-red-500">

                    <span className="absolute -top-6 left-0
                                     bg-red-500 text-white
                                     text-xs px-2 py-1">
                      Microplastic
                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* ================= STATISTICS ================= */}

            <div className="grid sm:grid-cols-2 gap-6 mt-10">

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

                <p className="text-gray-500">
                  Detected Microplastics
                </p>

                <p className="text-5xl font-bold text-blue-600 mt-3">
                  {result.predictions?.length || 0}
                </p>

              </div>


              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

                <p className="text-gray-500">
                  Average Confidence
                </p>

                <p className="text-5xl font-bold text-green-600 mt-3">

                  {result.predictions?.length
                    ? Math.round(
                        (result.predictions.reduce(
                          (sum, item) => sum + item.confidence,
                          0
                        ) /
                          result.predictions.length) *
                          100
                      )
                    : 0}
                  %

                </p>

              </div>

            </div>


            {/* ================= DOWNLOAD ================= */}

            <div className="text-center mt-12">

              <button
                className="bg-slate-900
                           hover:bg-slate-800
                           text-white
                           px-8 py-4
                           rounded-xl
                           font-semibold
                           transition"
              >
                Download Report
              </button>

            </div>


            {/* NEW DETECTION */}

            <div className="text-center mt-6">

              <button
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                  setResult(null);
                }}
                className="text-blue-600 hover:underline"
              >
                Analyze Another Image
              </button>

            </div>

          </section>

        )}

      </main>

      <Footer />

    </>
  );
}

export default Detect;