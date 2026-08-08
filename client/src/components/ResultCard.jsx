import PredictionCard from "./PredictionCard";
import LoadingSpinner from "./LoadingSpinner";

function ResultCard({ result, loading }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-2xl font-semibold mb-6">
        Detection Results
      </h2>

      {!result && !loading && (
        <p className="text-gray-500">
          Upload an image and click Detect.
        </p>
      )}

      {loading && <LoadingSpinner />}

      {result && (

        <>

          <div className="mb-6">

            <p>

              <strong>Total Detections:</strong>{" "}
              {result.predictions.length}

            </p>

            <p>

              <strong>Time:</strong> {result.time} sec

            </p>

            <p>

              <strong>Image Size:</strong>{" "}
              {result.image.width} × {result.image.height}

            </p>

          </div>

          <div className="space-y-4">

            {result.predictions.map((prediction, index) => (

              <PredictionCard
                key={index}
                prediction={prediction}
              />

            ))}

          </div>

        </>

      )}

    </div>

  );

}

export default ResultCard;