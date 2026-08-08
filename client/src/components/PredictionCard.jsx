function PredictionCard({ prediction }) {

  return (

    <div className="border rounded-xl p-4 shadow">

      <p>

        <strong>Class:</strong> {prediction.class}

      </p>

      <p>

        <strong>Confidence:</strong>{" "}
        {(prediction.confidence * 100).toFixed(2)}%

      </p>

      <p>

        <strong>Position:</strong>{" "}
        ({prediction.x.toFixed(0)}, {prediction.y.toFixed(0)})

      </p>

      <p>

        <strong>Size:</strong>{" "}
        {prediction.width.toFixed(0)} × {prediction.height.toFixed(0)}

      </p>

    </div>

  );

}

export default PredictionCard;