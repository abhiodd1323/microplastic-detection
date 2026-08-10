import Header from "../components/Header";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Header />

      <main className="bg-white text-slate-900">

        {/* ================= HERO ================= */}

        <section className="bg-slate-950 text-white">

          <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

            <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm">
              About Our Project
            </p>

            <h1 className="mt-5 text-5xl md:text-7xl font-bold max-w-4xl leading-tight">
              Using AI to understand
              <span className="text-cyan-400">
                {" "}microplastic pollution.
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-3xl leading-8">
              We are developing an AI-powered system that analyzes
              microscope images and identifies potential microplastic
              particles through computer vision.
            </p>

          </div>

        </section>


        {/* ================= WHO WE ARE ================= */}

        <section className="max-w-7xl mx-auto px-6 py-24">

          <div className="grid md:grid-cols-2 gap-16 items-center">

            <div>

              <p className="text-cyan-600 font-semibold uppercase tracking-widest text-sm">
                Who We Are
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-bold">
                Building technology for a cleaner future.
              </h2>

            </div>

            <div className="text-gray-600 text-lg leading-8">

              <p>
                Microplastics are increasingly being detected in
                water, soil, air and other environments. Identifying
                these particles from microscope images can be a
                time-consuming process.
              </p>

              <p className="mt-6">
                Our project explores how computer vision and artificial
                intelligence can assist with this process by automatically
                identifying potential microplastic particles in images.
              </p>

            </div>

          </div>

        </section>


        {/* ================= MISSION ================= */}

        <section className="bg-slate-50">

          <div className="max-w-7xl mx-auto px-6 py-24">

            <div className="max-w-3xl">

              <p className="text-cyan-600 font-semibold uppercase tracking-widest text-sm">
                Our Mission
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-bold">
                Make microplastic screening faster and more accessible.
              </h2>

              <p className="mt-6 text-lg text-gray-600 leading-8">
                Our goal is to create a simple system where a microscope
                image can be uploaded and analyzed using an AI detection
                model, providing researchers and users with an initial
                visual screening of potential microplastic particles.
              </p>

            </div>

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}

        <section className="max-w-7xl mx-auto px-6 py-24">

          <div className="text-center">

            <p className="text-cyan-600 font-semibold uppercase tracking-widest text-sm">
              Our Approach
            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-bold">
              From image to detection
            </h2>

          </div>


          <div className="grid md:grid-cols-4 gap-6 mt-16">

            <Step
              number="01"
              title="Capture"
              description="A microscope image containing a sample is captured."
            />

            <Step
              number="02"
              title="Upload"
              description="The image is uploaded to our detection system."
            />

            <Step
              number="03"
              title="AI Analysis"
              description="Our object detection model analyzes the image."
            />

            <Step
              number="04"
              title="Results"
              description="Potential microplastic particles are highlighted."
            />

          </div>

        </section>


        {/* ================= TECHNOLOGY ================= */}

        <section className="bg-slate-950 text-white">

          <div className="max-w-7xl mx-auto px-6 py-24">

            <div className="grid md:grid-cols-2 gap-16">

              <div>

                <p className="text-cyan-400 font-semibold uppercase tracking-widest text-sm">
                  Our Technology
                </p>

                <h2 className="mt-4 text-4xl md:text-5xl font-bold">
                  Computer vision meets environmental research.
                </h2>

              </div>


              <div className="grid grid-cols-2 gap-4">

                <TechCard title="Computer Vision" />
                <TechCard title="YOLO Object Detection" />
                <TechCard title="Roboflow" />
                <TechCard title="React" />
                <TechCard title="Node.js" />
                <TechCard title="Python" />

              </div>

            </div>

          </div>

        </section>


        {/* ================= VISION ================= */}

        <section className="max-w-5xl mx-auto px-6 py-28 text-center">

          <p className="text-cyan-600 font-semibold uppercase tracking-widest text-sm">
            Our Vision
          </p>

          <h2 className="mt-5 text-4xl md:text-6xl font-bold leading-tight">
            Technology should help us understand
            the environmental challenges around us.
          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-8 max-w-3xl mx-auto">
            We envision tools that make scientific screening more
            accessible, easier to use and capable of supporting
            researchers in understanding the growing challenge of
            microplastic pollution.
          </p>

        </section>


      </main>

      <Footer />
    </>
  );
}


/* ================= COMPONENTS ================= */

function Step({ number, title, description }) {
  return (
    <div className="border border-gray-200 rounded-2xl p-7">

      <span className="text-cyan-600 font-bold text-sm">
        {number}
      </span>

      <h3 className="mt-5 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-gray-600 leading-6">
        {description}
      </p>

    </div>
  );
}


function TechCard({ title }) {
  return (
    <div className="border border-slate-700 rounded-xl p-5
                    hover:border-cyan-400 transition">

      <p className="font-semibold">
        {title}
      </p>

    </div>
  );
}


export default About;