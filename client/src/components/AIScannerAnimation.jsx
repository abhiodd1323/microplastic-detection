import { useEffect, useState } from "react";

const samples = [
  {
    image: "/images/sample1.jpg",
    boxes: [
      { x: 70, y: 80, w: 60, h: 45 },
      { x: 220, y: 160, w: 55, h: 40 },
      { x: 150, y: 290, w: 70, h: 50 },
    ],
  },
  {
    image: "/images/sample2.jpg",
    boxes: [
      { x: 90, y: 100, w: 55, h: 45 },
      { x: 250, y: 210, w: 65, h: 50 },
      { x: 170, y: 320, w: 60, h: 40 },
    ],
  },
  {
    image: "/images/sample3.jpg",
    boxes: [
      { x: 100, y: 60, w: 65, h: 50 },
      { x: 260, y: 180, w: 50, h: 45 },
      { x: 180, y: 280, w: 70, h: 55 },
    ],
  },
  {
    image: "/images/sample4.jpg",
    boxes: [
      { x: 80, y: 90, w: 60, h: 45 },
      { x: 230, y: 170, w: 60, h: 45 },
      { x: 150, y: 300, w: 75, h: 55 },
    ],
  },
];

function AIScannerAnimation() {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);

    const t1 = setTimeout(() => setStep(1), 1500);
    const t2 = setTimeout(() => setStep(2), 3000);
    const t3 = setTimeout(() => setStep(3), 3600);
    const t4 = setTimeout(() => setStep(4), 4200);
    const t5 = setTimeout(() => setStep(5), 5200);

    const next = setTimeout(() => {
      setSampleIndex((prev) => (prev + 1) % samples.length);
    }, 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(next);
    };
  }, [sampleIndex]);

  const current = samples[sampleIndex];

  return (
    <div className="relative w-[420px] h-[420px] rounded-3xl overflow-hidden shadow-2xl border bg-black">

      {/* Microscope Image */}
      <img
        src={current.image}
        alt="Microscope"
        className="w-full h-full object-cover"
      />

      {/* Scanning Line */}
      {step >= 1 && step < 5 && (
        <div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_20px_#22d3ee] animate-scan"></div>
      )}

      {/* Detection Box 1 */}
      {step >= 2 && (
        <div
          className="absolute border-2 border-lime-400 rounded-md animate-pulse"
          style={{
            left: current.boxes[0].x,
            top: current.boxes[0].y,
            width: current.boxes[0].w,
            height: current.boxes[0].h,
          }}
        >
          <span className="absolute -top-6 left-0 text-xs bg-lime-500 text-white px-2 rounded">
            Microplastic
          </span>
        </div>
      )}

      {/* Detection Box 2 */}
      {step >= 3 && (
        <div
          className="absolute border-2 border-lime-400 rounded-md animate-pulse"
          style={{
            left: current.boxes[1].x,
            top: current.boxes[1].y,
            width: current.boxes[1].w,
            height: current.boxes[1].h,
          }}
        >
          <span className="absolute -top-6 left-0 text-xs bg-lime-500 text-white px-2 rounded">
            Microplastic
          </span>
        </div>
      )}

      {/* Detection Box 3 */}
      {step >= 4 && (
        <div
          className="absolute border-2 border-lime-400 rounded-md animate-pulse"
          style={{
            left: current.boxes[2].x,
            top: current.boxes[2].y,
            width: current.boxes[2].w,
            height: current.boxes[2].h,
          }}
        >
          <span className="absolute -top-6 left-0 text-xs bg-lime-500 text-white px-2 rounded">
            Microplastic
          </span>
        </div>
      )}

      {/* Status */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">

        {step < 5 ? (
          <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm">
            🤖 AI Analyzing...
          </div>
        ) : (
          <div className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold">
            ✔ Analysis Complete
          </div>
        )}

      </div>
    </div>
  );
}

export default AIScannerAnimation;