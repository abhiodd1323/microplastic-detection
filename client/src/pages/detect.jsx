import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../services/api";

function Detect() {
  // =====================================================
  // IMAGE / DETECTION STATES
  // =====================================================

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // CAMERA STATES
  // =====================================================

  const [showCamera, setShowCamera] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Stop any running camera
    stopCamera();

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  // =====================================================
  // GET AVAILABLE CAMERAS
  // =====================================================

  const getCameras = async () => {
    try {
      const devices =
        await navigator.mediaDevices.enumerateDevices();

      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      console.log("CAMERAS:", videoDevices);

      setCameras(videoDevices);

      return videoDevices;
    } catch (error) {
      console.error(
        "Camera list error:",
        error
      );

      return [];
    }
  };

  // =====================================================
  // OPEN CAMERA
  // =====================================================

  const openCamera = async () => {
    try {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        alert(
          "Your browser does not support camera access."
        );

        return;
      }

      // Ask for camera permission first
      const temporaryStream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

      // Stop temporary stream
      temporaryStream
        .getTracks()
        .forEach((track) => track.stop());

      // Get cameras after permission
      const videoDevices =
        await getCameras();

      if (videoDevices.length === 0) {
        alert(
          "No camera detected. Please connect your webcam or USB microscope."
        );

        return;
      }

      setCameras(videoDevices);

      // Select first camera
      setSelectedCamera(
        videoDevices[0].deviceId
      );

      setShowCamera(true);

    } catch (error) {
      console.error(
        "Initial camera error:",
        error
      );

      if (
        error.name === "NotAllowedError"
      ) {
        alert(
          "Camera permission was denied. Please allow camera access."
        );
      } else if (
        error.name === "NotFoundError"
      ) {
        alert(
          "No camera was found."
        );
      } else {
        alert(
          "Unable to access the camera."
        );
      }
    }
  };

  // =====================================================
  // START SELECTED CAMERA
  // =====================================================

  const startCamera = async (deviceId) => {
    try {
      // Stop existing stream
      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => {
            track.stop();
          });

        streamRef.current = null;
      }

      const constraints = {
        video: deviceId
          ? {
              deviceId: {
                exact: deviceId,
              },
            }
          : true,

        audio: false,
      };

      console.log(
        "REQUESTING CAMERA:",
        constraints
      );

      const stream =
        await navigator.mediaDevices.getUserMedia(
          constraints
        );

      console.log(
        "STREAM:",
        stream
      );

      streamRef.current = stream;

      const video = videoRef.current;

      if (!video) {
        console.error(
          "VIDEO ELEMENT NOT FOUND"
        );

        return;
      }

      video.srcObject = stream;

      // Important:
      // Wait until video metadata is loaded
      video.onloadedmetadata =
        async () => {
          console.log(
            "VIDEO METADATA LOADED"
          );

          console.log(
            "VIDEO WIDTH:",
            video.videoWidth
          );

          console.log(
            "VIDEO HEIGHT:",
            video.videoHeight
          );

          try {
            await video.play();

            console.log(
              "VIDEO PLAYING"
            );
          } catch (error) {
            console.error(
              "VIDEO PLAY ERROR:",
              error
            );
          }
        };

    } catch (error) {
      console.error(
        "GET USER MEDIA ERROR:",
        error
      );

      alert(
        "Unable to start the selected camera."
      );
    }
  };

  // =====================================================
  // START CAMERA WHEN SELECTION CHANGES
  // =====================================================

  useEffect(() => {
    if (!showCamera) return;

    if (!selectedCamera) return;

    startCamera(selectedCamera);
  }, [
    showCamera,
    selectedCamera,
  ]);

  // =====================================================
  // CHANGE CAMERA
  // =====================================================

  const handleCameraChange = (e) => {
    const cameraId =
      e.target.value;

    setSelectedCamera(cameraId);
  };

  // =====================================================
  // CAPTURE PHOTO
  // =====================================================

  const handleTakePhoto = () => {
    const video =
      videoRef.current;

    if (!video) {
      alert(
        "Camera is not available."
      );

      return;
    }

    console.log(
      "READY STATE:",
      video.readyState
    );

    console.log(
      "VIDEO WIDTH:",
      video.videoWidth
    );

    console.log(
      "VIDEO HEIGHT:",
      video.videoHeight
    );

    // Make sure camera is providing a frame
    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      alert(
        "Camera is not providing a video frame. Please wait a moment and try again."
      );

      return;
    }

    // Create canvas
    const canvas =
      document.createElement(
        "canvas"
      );

    canvas.width =
      video.videoWidth;

    canvas.height =
      video.videoHeight;

    const context =
      canvas.getContext("2d");

    if (!context) {
      alert(
        "Unable to create image canvas."
      );

      return;
    }

    // Draw current video frame
    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Convert to JPEG
    const imageData =
      canvas.toDataURL(
        "image/jpeg",
        0.95
      );

    console.log(
      "CAPTURE SUCCESS"
    );

    console.log(
      "IMAGE DATA LENGTH:",
      imageData.length
    );

    // Convert base64 to Blob
    const byteString =
      atob(
        imageData.split(",")[1]
      );

    const mimeString =
      imageData
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];

    const arrayBuffer =
      new ArrayBuffer(
        byteString.length
      );

    const intArray =
      new Uint8Array(
        arrayBuffer
      );

    for (
      let i = 0;
      i < byteString.length;
      i++
    ) {
      intArray[i] =
        byteString.charCodeAt(i);
    }

    const blob = new Blob(
      [intArray],
      {
        type: mimeString,
      }
    );

    // Convert Blob to File
    const file = new File(
      [blob],
      `microscope-${Date.now()}.jpg`,
      {
        type: "image/jpeg",
      }
    );

    console.log(
      "CAPTURED FILE:",
      file
    );

    console.log(
      "FILE SIZE:",
      file.size,
      "bytes"
    );

    // Save captured image
    setImage(file);

    setPreview(imageData);

    setResult(null);

    // Stop camera
    stopCamera();
  };

  // =====================================================
  // STOP CAMERA
  // =====================================================

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => {
          track.stop();
        });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject =
        null;
    }

    setShowCamera(false);
  };

  // =====================================================
  // CLEANUP CAMERA WHEN PAGE CLOSES
  // =====================================================

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => {
            track.stop();
          });
      }
    };
  }, []);

  // =====================================================
  // SEND IMAGE TO BACKEND
  // =====================================================

  const handleDetect = async () => {
    if (!image) {
      alert(
        "Please select or capture an image first."
      );

      return;
    }

    const formData =
      new FormData();

    formData.append(
      "image",
      image
    );

    try {
      setLoading(true);

      setResult(null);

      const response =
        await api.post(
          "/api/detect",
          formData
        );

      console.log(
        "Detection result:",
        response.data
      );

      setResult(
        response.data
      );

    } catch (error) {
      console.error(
        "Detection error:",
        error
      );

      alert(
        "Detection failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RESET EVERYTHING
  // =====================================================

  const resetDetection = () => {
    stopCamera();

    setImage(null);
    setPreview(null);
    setResult(null);
    setSelectedCamera("");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">

        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="px-6 pt-16 pb-10 text-center">

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            AI Microplastic Detection
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Capture or upload a microscope image
            and let our AI identify potential
            microplastic particles.
          </p>

        </section>


        {/* ================================================= */}
        {/* INPUT AREA */}
        {/* ================================================= */}

        {!loading && !result && (

          <section className="max-w-5xl mx-auto px-6 pb-16">

            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">

              {/* ================================================= */}
              {/* CAMERA MODE */}
              {/* ================================================= */}

              {showCamera ? (

                <div>

                  <h2 className="text-2xl font-semibold text-center mb-6">
                    Microscope Camera
                  </h2>


                  {/* CAMERA SELECTOR */}

                  {cameras.length > 1 && (

                    <div className="mb-6 max-w-xl mx-auto">

                      <label
                        htmlFor="cameraSelect"
                        className="block text-sm font-medium text-gray-600 mb-2"
                      >
                        Select Camera
                      </label>

                      <select
                        id="cameraSelect"
                        value={
                          selectedCamera
                        }
                        onChange={
                          handleCameraChange
                        }
                        className="w-full border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >

                        {cameras.map(
                          (
                            camera,
                            index
                          ) => (

                            <option
                              key={
                                camera.deviceId
                              }
                              value={
                                camera.deviceId
                              }
                            >
                              {camera.label ||
                                `Camera ${
                                  index + 1
                                }`}
                            </option>

                          )
                        )}

                      </select>

                    </div>

                  )}


                  {/* LIVE VIDEO */}

                  <div className="bg-black rounded-2xl overflow-hidden max-w-4xl mx-auto">

                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full max-h-[600px] object-contain"
                    />

                  </div>


                  {/* CAMERA BUTTONS */}

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">

                    <button
                      onClick={
                        handleTakePhoto
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition shadow-lg"
                    >
                      📷 Capture Photo
                    </button>


                    <button
                      onClick={
                        stopCamera
                      }
                      className="border border-gray-300 hover:bg-gray-100 px-8 py-4 rounded-xl transition"
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              ) : (

                /* ================================================= */
                /* UPLOAD / CAMERA OPTIONS */
                /* ================================================= */

                <div className="grid md:grid-cols-2 gap-6">

                  {/* ================= UPLOAD ================= */}

                  <label
                    htmlFor="imageUpload"
                    className="block cursor-pointer"
                  >

                    <div className="border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center hover:border-blue-500 hover:bg-blue-50 transition h-full">

                      <div className="text-5xl mb-5">
                        ↑
                      </div>

                      <h2 className="text-xl font-semibold text-slate-800">
                        Upload Image
                      </h2>

                      <p className="mt-2 text-gray-500">
                        Select an existing microscope image
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
                    onChange={
                      handleImageChange
                    }
                    className="hidden"
                  />


                  {/* ================= TAKE PHOTO ================= */}

                  <button
                    type="button"
                    onClick={
                      openCamera
                    }
                    className="border-2 border-dashed border-green-300 rounded-2xl p-10 text-center hover:border-green-500 hover:bg-green-50 transition"
                  >

                    <div className="text-5xl mb-5">
                      📷
                    </div>

                    <h2 className="text-xl font-semibold text-slate-800">
                      Take Photo
                    </h2>

                    <p className="mt-2 text-gray-500">
                      Use your webcam or USB microscope
                    </p>

                    <p className="mt-4 text-sm text-gray-400">
                      Capture a new microscope image
                    </p>

                  </button>

                </div>

              )}


              {/* ================================================= */}
              {/* IMAGE PREVIEW */}
              {/* ================================================= */}

              {preview &&
                !showCamera && (

                  <div className="mt-10 text-center">

                    <h3 className="font-semibold text-lg mb-4">
                      Image Preview
                    </h3>

                    <img
                      src={preview}
                      alt="Microscope sample"
                      className="max-h-96 max-w-full mx-auto rounded-2xl shadow-lg object-contain"
                    />


                    {/* IMAGE INFORMATION */}

                    {image && (

                      <p className="mt-4 text-sm text-gray-500">
                        {image.name}
                      </p>

                    )}


                    {/* DETECT BUTTON */}

                    <button
                      onClick={
                        handleDetect
                      }
                      className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition shadow-lg"
                    >
                      Start AI Detection
                    </button>


                    {/* CHANGE IMAGE */}

                    <button
                      onClick={
                        resetDetection
                      }
                      className="block mx-auto mt-4 text-gray-500 hover:text-blue-600"
                    >
                      Choose Another Image
                    </button>

                  </div>

                )}

            </div>

          </section>

        )}


        {/* ================================================= */}
        {/* PROCESSING */}
        {/* ================================================= */}

        {loading && (

          <section className="max-w-3xl mx-auto px-6 py-16">

            <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

              <div className="w-16 h-16 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />

              <h2 className="mt-8 text-2xl font-bold">
                AI is Processing...
              </h2>

              <p className="mt-3 text-gray-500">
                Analyzing the microscope image
                for microplastic particles.
              </p>


              <div className="mt-8 h-3 bg-gray-200 rounded-full overflow-hidden">

                <div className="h-full bg-blue-600 rounded-full animate-progress" />

              </div>

            </div>

          </section>

        )}


        {/* ================================================= */}
        {/* RESULTS */}
        {/* ================================================= */}

        {result && !loading && (

          <section className="max-w-6xl mx-auto px-6 py-16">

            <h2 className="text-3xl font-bold text-center mb-10">
              Detection Results
            </h2>


            {/* ================================================= */}
            {/* IMAGES */}
            {/* ================================================= */}

            <div className="grid md:grid-cols-2 gap-8">

              {/* ORIGINAL IMAGE */}

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


              {/* DETECTED IMAGE */}

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


                  {/* TEMPORARY DETECTION BOX */}

                  <div className="absolute top-[25%] left-[30%] w-16 h-12 border-2 border-red-500">

                    <span className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 whitespace-nowrap">
                      Microplastic
                    </span>

                  </div>


                  <div className="absolute top-[55%] left-[55%] w-20 h-14 border-2 border-red-500">

                    <span className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 whitespace-nowrap">
                      Microplastic
                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* ================================================= */}
            {/* STATISTICS */}
            {/* ================================================= */}

            <div className="grid sm:grid-cols-2 gap-6 mt-10">

              {/* COUNT */}

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

                <p className="text-gray-500">
                  Detected Microplastics
                </p>

                <p className="text-5xl font-bold text-blue-600 mt-3">
                  {result.predictions?.length || 0}
                </p>

              </div>


              {/* CONFIDENCE */}

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

                <p className="text-gray-500">
                  Average Confidence
                </p>

                <p className="text-5xl font-bold text-green-600 mt-3">

                  {result.predictions?.length
                    ? Math.round(
                        (
                          result.predictions.reduce(
                            (
                              sum,
                              item
                            ) =>
                              sum +
                              item.confidence,
                            0
                          ) /
                          result.predictions
                            .length
                        ) * 100
                      )
                    : 0}

                  %

                </p>

              </div>

            </div>


            {/* ================================================= */}
            {/* DOWNLOAD REPORT */}
            {/* ================================================= */}

            <div className="text-center mt-12">

              <button
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold transition"
              >
                Download Report
              </button>

            </div>


            {/* ================================================= */}
            {/* NEW DETECTION */}
            {/* ================================================= */}

            <div className="text-center mt-6">

              <button
                onClick={
                  resetDetection
                }
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