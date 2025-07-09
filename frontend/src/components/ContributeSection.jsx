import React from "react";

const ContributeSection = () => {
  const handleContribute = () => {
    // You can update this to navigate or open a modal/form
    window.open("https://example.com/environment", "_blank");
  };

  return (
    <section className="bg-base-100 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Video */}
        <div className="w-full rounded-xl overflow-hidden shadow-xl">
          <video
            src="/environment-video.mp4" // Ensure this file exists in /public
            controls
            autoPlay
            muted
            loop
            className="w-full h-auto rounded-xl"
          />
        </div>

        {/* Right Side - Info and Button */}
        <div className="space-y-6 text-left">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            Contribute to a Greener Future
          </h2>
          <p className="text-lg text-zinc-600 leading-relaxed">
            At <span className="font-semibold text-primary">ChatSphere</span>, we believe in building not just stronger communities—but a healthier planet. Join us in supporting eco-friendly initiatives and staying connected with environmental efforts through our platform.
          </p>

          <button
            onClick={handleContribute}
            className="btn btn-success text-base font-medium px-6"
          >
            Connect & Contribute 🌱
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContributeSection;
