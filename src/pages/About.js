// src/pages/About.js
import React from "react";
import NaNvbar from "../components/Navbar";

const About = () => {
  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      <NaNvbar />

      {/* HERO */}
<section
  className="relative h-[85vh] flex items-center justify-center
             bg-hero-animated bg-cover bg-center
             animate-bgPan overflow-hidden"
>
  {/* Photo overlay instead of gradient */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-80"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1509062522246-3755977927d7')",
    }}
  />

  {/* Dark layer for readability */}
  <div className="absolute inset-0 bg-black/50" />

  {/* Content */}
  <div className="relative z-10 text-center px-6 animate-fadeIn">
    <h1 className="text-4xl md:text-6xl font-extrabold font-serif text-yellow-500 drop-shadow-lg">
      About Our School
    </h1>
    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/90 animate-slideUp font-serif">
      Learning here feels like an adventure — not a punishment.
    </p>
  </div>
</section>



      {/* MISSION */}
      <section className="py-20 px-6 md:px-20 grid md:grid-cols-2 gap-14 items-center">
        <div className="animate-slideLeft">
          <h2 className="text-3xl font-bold text-red-700 mb-4 font-serif underline decoration-red-800 decoration-3">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed font-serif">
           At Gayathri, we use the best research and methods to enhance the unique gifts of each student.
Situated on a beautiful picturesque piece of land located at 2Kms from Cherpunkal on Kottayam – Pala route Gayathri Central School provides an ideal campus for learning and general development of students. Our School was established in the year 2005 and has been rendering quality education to the children.
As a school with a difference, a new beacon of light at Gayathri Central  School every schild shall be moulded into independent, self reliant, responsible citizen with competitive skill to meet the challenges of the outside world. From the school assembly in the morning, through the teaching learning process, to the co curricular activities, it is a unique educational experience to the pupils. The school is dedicated to the task of imparting a full disciplined, liberal and comprehensive education to both boys and girls so that they may strive for excellence in every field. Pupils’ progress assessment, parent teacher meetings and teachers’ orientation classes are also held regularly. 

          </p>
        </div>

        <div className="animate-slideRight">
          <img
            src="https://images.unsplash.com/photo-1588072432836-e10032774350"
            alt="Students"
            className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 px-6 md:px-20 bg-red-800 text-white">
        <h2 className="text-center text-3xl font-extrabold text-white mb-12 animate-fadeIn font-serif">
          What Makes Us Different
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 font-serif">
          {[
            {
              icon: "🎯",
              title: "Skill-First Learning",
              text: "We teach what actually matters in real life."
            },
            {
              icon: "🤝",
              title: "Teamwork",
              text: "Collaboration beats meaningless competition."
            },
            {
              icon: "🚀",
              title: "Technology Driven",
              text: "Modern tools for modern thinkers."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white text-gray-900 rounded-2xl p-8 shadow-xl
                         hover:-translate-y-3 hover:shadow-2xl
                         transition-all duration-500 animate-zoomIn"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO */}
      <section className="py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-red-700 mb-10 animate-fadeIn font-serif">
          Life at Our School
        </h2>

        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl animate-slideUp">
          <div className="pt-[56.25%]" />
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/DcTSVSyJcBw"
            title="School Life"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
};

export default About;
