function MicroplasticInfo() {

    return (

        <section>
            {/* ================= WHAT ARE MICROPLASTICS ================= */}

<section className="bg-white py-20 px-6 lg:px-20">

  <div className="max-w-7xl mx-auto">

    <div className="text-center mb-16">

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
        Understanding Microplastics
      </h2>

      <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-8">
        Microplastics are one of today's fastest-growing environmental concerns.
        These tiny plastic particles have been discovered everywhere—from the
        deepest oceans and the highest mountains to our food, drinking water,
        and even inside the human body.
      </p>

    </div>

    {/* What Are Microplastics */}

    <div className="grid lg:grid-cols-2 gap-14 items-center">

      <div>

        <img
          src="/images/sample5.png"
          alt="Microplastics"
          className="rounded-3xl shadow-xl"
        />

      </div>

      <div>

        <h3 className="text-3xl font-bold text-blue-600 mb-6">
          What are Microplastics?
        </h3>

        <p className="text-gray-600 leading-8 mb-6">

          Microplastics are plastic fragments ranging from
          <span className="font-semibold text-blue-600">
            {" "}1 nanometer{" "}
          </span>
          to
          <span className="font-semibold text-blue-600">
            {" "}5 millimeters
          </span>
          in size. They are so small that many are invisible to the naked eye,
          making them difficult to detect without specialized equipment.

        </p>

        <p className="text-gray-600 leading-8">

          Scientists have detected microplastics in oceans, rivers, lakes,
          agricultural soil, drinking water, seafood, and even inside the
          human bloodstream, raising serious concerns about environmental
          pollution and human health.

        </p>

      </div>

    </div>

    {/* Sources */}

    <div className="mt-24">

      <h2 className="text-4xl font-bold text-center mb-12">
        Where Do They Come From?
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="bg-gray-50 rounded-2xl p-8 shadow hover:shadow-xl transition">

          
         <img
  src="/images/sample6.jpg"
  alt="Microplastics"
  className="w-60 rounded-2xl shadow-xl"
/>
          <h4 className="text-xl font-semibold mb-3">
            Plastic Waste
          </h4>

          <p className="text-gray-600">
            Plastic bottles, bags, food containers and packaging slowly break
            down into tiny plastic particles over time.
          </p>

        </div>

        <div className="bg-gray-50 rounded-2xl p-8 shadow hover:shadow-xl transition">

                   <img
  src="/images/sample7.jpg"
  alt="Microplastics"
  className="w-60 rounded-2xl shadow-xl"
/>

          <h4 className="text-xl font-semibold mb-3">
            Synthetic Clothing
          </h4>

          <p className="text-gray-600">
            Washing polyester and synthetic fabrics releases microscopic plastic
            fibers into wastewater.
          </p>

        </div>

        <div className="bg-gray-50 rounded-2xl p-8 shadow hover:shadow-xl transition">

                   <img
  src="/images/sample8.jpg"
  alt="Microplastics"
  className="w-60 rounded-2xl shadow-xl"
/>

          <h4 className="text-xl font-semibold mb-3">
            Vehicle Tires
          </h4>

          <p className="text-gray-600">
            Tire wear produces millions of tiny rubber and plastic particles
            that enter the environment.
          </p>

        </div>

        <div className="bg-gray-50 rounded-2xl p-8 shadow hover:shadow-xl transition">

                   <img
  src="/images/sample9.jpg"
  alt="Microplastics"
  className="w-60 rounded-2xl shadow-xl"
/>

          <h4 className="text-xl font-semibold mb-3">
            Cosmetics
          </h4>

          <p className="text-gray-600">
            Some personal care products contain intentionally manufactured
            plastic microbeads.
          </p>

        </div>

      </div>

    </div>

    {/* Why It Matters */}

    <div className="mt-24">

      <h2 className="text-4xl font-bold text-center mb-12">
        Why Are Microplastics a Concern?
      </h2>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="bg-blue-50 rounded-2xl p-8">

          <h3 className="text-2xl font-bold mb-6 text-blue-700">
            Environmental Impact
          </h3>

          <ul className="space-y-4 text-gray-700">

            <li>🌊 Pollute oceans, rivers and lakes</li>

            <li>🐟 Enter aquatic food chains</li>

            <li>🌱 Reduce soil fertility</li>

            <li>❄️ Accelerate snow and ice melting</li>

            <li>🌍 Contribute to ecosystem degradation</li>

          </ul>

        </div>

        <div className="bg-red-50 rounded-2xl p-8">

          <h3 className="text-2xl font-bold mb-6 text-red-700">
            Human Health
          </h3>

          <ul className="space-y-4 text-gray-700">

            <li>🫁 Can be inhaled through air</li>

            <li>🥛 Found in drinking water and food</li>

            <li>🩸 Detected in human blood and arteries</li>

            <li>🍽️ May enter the food chain</li>

            <li>🔬 Long-term health impacts are still being studied</li>

          </ul>

        </div>

      </div>

    </div>

    {/* Call to Action */}

    

      

    </div>

  

</section>
        </section>

    );

}

export default MicroplasticInfo;