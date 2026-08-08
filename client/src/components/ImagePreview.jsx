function ImagePreview({ preview }) {

  if (!preview) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-2xl font-semibold mb-4">
        Image Preview
      </h2>

      <img
        src={preview}
        alt="Preview"
        className="rounded-xl w-full"
      />

    </div>
  );
}

export default ImagePreview;