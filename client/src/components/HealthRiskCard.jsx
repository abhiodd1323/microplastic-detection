import { useEffect, useState } from "react";

const cards = [
  {
    title: "Cardiovascular System",
    image: "/images/heart.png",
    description:
      "Microplastics have been detected in arterial plaques. Researchers are investigating possible links with cardiovascular disease and vascular inflammation.",
  },
  {
    title: "Respiratory System",
    image: "/images/lungs.png",
    description:
      "Airborne microplastic particles may be inhaled into the lungs, potentially contributing to respiratory irritation and inflammatory responses.",
  },
  {
    title: "Digestive System",
    image: "/images/stomach.png",
    description:
      "Microplastics enter the body primarily through food and drinking water. Scientists are studying their interaction with the gastrointestinal tract.",
  },
  {
    title: "Nervous System",
    image: "/images/brain.png",
    description:
      "Emerging studies are investigating whether extremely small plastic particles may influence neurological health.",
  },
  {
    title: "Immune & Cellular Health",
    image: "/images/cell.png",
    description:
      "Laboratory studies suggest microplastics may trigger inflammation, oxidative stress, and changes in normal cellular function.",
  },
];

function HealthRiskCard() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-100">

      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-slate-900">
            Potential Health Effects
          </h2>

          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            Scientists continue to investigate how long-term exposure to
            microplastics may affect different organs and biological systems.
          </p>

        </div>

        <div className="flex justify-center">

          <div
            key={current}
            className="animate-fade w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10"
          >

            <div className="flex flex-col md:flex-row items-center gap-10">

              <img
                src={cards[current].image}
                alt={cards[current].title}
                className="w-40 h-40 object-contain"
              />

              <div>

                <h3 className="text-3xl font-bold mb-5">
                  {cards[current].title}
                </h3>

                <p className="text-gray-600 leading-8 text-lg">
                  {cards[current].description}
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="flex justify-center gap-3 mt-10">

          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-blue-600 w-10"
                  : "bg-gray-300 w-3"
              }`}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default HealthRiskCard;