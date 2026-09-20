function UploadCard({
  handleImageChange,
  handleDetect,
  handleTakePhoto,
  loading,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-2xl font-semibold mb-6">
        Detect Microplastics
      </h2>

      {/* Upload Image */}
      <label className="block w-full text-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition mb-4">
        <span className="text-gray-600">
          📁 Upload Image
        </span>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {/* Take Photo */}
      <button
        onClick={handleTakePhoto}
        disabled={loading}
        className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl transition mb-6 disabled:opacity-50"
      >
        📷 Take Photo
      </button>

      {/* Detect */}
      <button
        onClick={handleDetect}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition disabled:bg-gray-400"
      >
        {loading ? "Detecting..." : "Detect Microplastics"}
      </button>

    </div>
  );
}

export default UploadCard;