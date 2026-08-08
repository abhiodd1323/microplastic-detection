function UploadCard({ handleImageChange, handleDetect, loading }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-2xl font-semibold mb-6">
        Upload Image
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-6"
      />

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