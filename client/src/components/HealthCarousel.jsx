import { useEffect, useState } from "react";
import healthData from "../data/healthData";

const radius = 260;

export default function HealthCarousel() {
  const [rotation, setRotation] = useState(0);

  // Rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 overflow-hidden bg-gradient-to-b from-white to-slate-100">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-center text-5xl font-bold">
          Potential Health Effects
        </h2>

        <p className="text-center mt-6 text-gray-600 max-w-3xl mx-auto">
          Scientists are actively discovering that tiny plastic particles enter the human body via food, water, and air, traveling through the bloodstream to accumulate in major organs like the brain, liver, and kidneys, where they may trigger inflammation, oxidative stress, and long-term metabolic disruptions
        </p>

        <div className="relative h-[700px] mt-16">

          {/* Center Image */}

          <div className="absolute left-1/2 top-1/2
                          -translate-x-1/2 -translate-y-1/2 z-50">

            <img
              src="/images/human-body.png"
              className="w-60 opacity-20"
            />

          </div>

          {healthData.map((card, index) => {

            const angle =
              ((360 / healthData.length) *
                (index + rotation)) *
              (Math.PI / 180);

            const x = Math.cos(angle) * radius;

            const y = Math.sin(angle) * 120;

            const scale = 0.7 + (Math.sin(angle) + 1) * 0.2;

            const opacity = 0.4 + (Math.sin(angle) + 1) * 0.3;

            const zIndex = Math.round(scale * 100);

            return (
              <div
                key={card.id}
                className="absolute transition-all duration-1000 ease-in-out"
                style={{
                  left: "50%",
                  
                  top: "50%",
                  transform: `
                    translate(${x}px, ${y}px)
                    translate(-50%,-50%)
                    scale(${scale})
                  `,
                  opacity,
                  zIndex,
                }}
              >

                <div className="w-90 bg-black rounded-3xl shadow-2xl p-6"
               
                >

                <img
                      src={card.image}
                        alt={card.title}
                      className="w-60 rounded-2xl shadow-xl"
                        />

                  <h3 className="text-xl font-bold text-center mb-3">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 text-center text-sm leading-6">
                    {card.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}