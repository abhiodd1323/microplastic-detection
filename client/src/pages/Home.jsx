import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AIScannerAnimation from "../components/AIScannerAnimation";
import Footer from "../components/Footer";

import HealthCarousal from "../components/HealthCarousel";
import MicroplasticInfo from "../components/MicroplasticInfo";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <section
  className="
    min-h-screen
    flex
    flex-col
    lg:flex-row
    items-center
    justify-between
    px-6
    md:px-12
    lg:px-20
    py-12
    gap-12
  "
>

        {/* Left Section */}
        <div className="max-w-xl">
          <h1 className="text-6xl font-bold">
            AI Microplastic Detection
          </h1>

          <p className="mt-6 text-xl text-gray-600">
            Upload microscope images and detect
            microplastics instantly using AI.
          </p>

          <button
            onClick={() => navigate("/detect")}
            className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition"
          >
            Start Detection
          </button>
        </div>

        {/* Right Section */}
        <div className="flex justify-end w-1/2">

          <div className="relative flex items-center justify-center w-[500px] h-[500px]">

            {/* Blue Glow */}
            <div className="absolute w-80 h-80 bg-blue-500/20 blur-3xl rounded-full"></div>

            {/* Hero Image */}
            <div className="flex justify-end w-1/2">
                  <AIScannerAnimation />
            </div>
            

            {/* Orbit 1 */}
            <div className="absolute animate-orbit1">
              <div className="w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]"></div>
            </div>

            {/* Orbit 2 */}
            <div className="absolute animate-orbit2">
              <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_20px_#3b82f6]"></div>
            </div>

            {/* Orbit 3 */}
            <div className="absolute animate-orbit3">
              <div className="w-6 h-6 rounded-full bg-indigo-400 shadow-[0_0_25px_#818cf8]"></div>
            </div>

            {/* Orbit 4 */}
            <div className="absolute animate-orbit4">
              <div className="w-3 h-3 rounded-full bg-sky-300 shadow-[0_0_18px_#7dd3fc]"></div>
            </div>

          </div>

        </div>

      </section>
       <HealthCarousal />
        <MicroplasticInfo />
        
        
       

      <Footer />
    </>
  );
}

export default Home;