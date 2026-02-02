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


{/* MISSION SECTION */}
<section className="py-20 px-5 md:px-20">
  <div className="grid lg:grid-cols-2 gap-10 items-start">

    {/* LEFT CONTENT */}
    <div className="animate-slideLeft">
      <h2 className="text-3xl font-bold text-red-700 mb-4 font-serif underline decoration-red-800 decoration-3">
        Our Mission
      </h2>

      <div className="space-y-4 text-lg text-gray-700 leading-relaxed font-serif">
        <p>
          Gayathri Educational, Cultural, and Charitable Trust is a registered non-profit organisation established in 2002 with the primary objective of promoting education, culture, social welfare, and value-based development.
        </p>
        <p>
          The Trust operates on a not-for-profit basis, reinvesting all its resources exclusively for charitable purposes. Its activities encompass formal education, skill development, cultural preservation, social welfare programmes, environmental awareness, and community development initiatives.
        </p>
        <p>
          Through its institutions and programmes, the Trust seeks to create socially responsible, self-reliant, and value-oriented citizens who can contribute meaningfully to national development.
        </p>

        {/* Vision */}
        <h5 className="text-2xl font-bold text-red-700 mt-6 mb-2 font-serif underline decoration-red-800 decoration-3">
          Vision
        </h5>
        <p>
          Build an enlightened, inclusive, and self-reliant society through value-based education, cultural enrichment, and sustainable social development.
        </p>

        {/* Mission */}
        <h5 className="text-2xl font-bold text-red-700 mt-6 mb-2 font-serif underline decoration-red-800 decoration-3">
          Mission
        </h5>
        <p>
          To deliver inclusive, value-based education integrating moral, cultural, and scientific learning, empower children and youth, preserve India’s cultural and knowledge traditions, and promote social responsibility and sustainable development.
        </p>

        {/* Objectives */}
        <h5 className="text-2xl font-bold text-red-700 mt-6 mb-2 font-serif underline decoration-red-800 decoration-3">
          Objectives
        </h5>
        <ul className="list-disc pl-6 space-y-2">
          <li>To establish and support educational institutions for holistic learning.</li>
          <li>To promote value-based education blending heritage with modern science.</li>
          <li>To implement skill development and vocational training programmes.</li>
          <li>To support economically backward communities with scholarships and welfare initiatives.</li>
          <li>To promote cultural, social welfare, environmental, and empowerment programmes.</li>
          <li>To collaborate with government and civil society for research and development initiatives.</li>
        </ul>

        <p className="mt-4">
          Gayathri Educational, Cultural and Charitable Trust continues to work towards inclusive growth, empowerment of marginalised communities, and nation-building.
        </p>
      </div>
    </div>

    {/* RIGHT IMAGES – RESPONSIVE */}
    <div className="animate-slideRight">

      {/* DESKTOP VIEW */}
      <div className="hidden sm:flex flex-col gap-5">
        <img
          src="/f5.jpg"
          alt="Students"
          className="rounded-2xl shadow-2xl w-full h-[260px] object-cover
                     hover:scale-105 transition-transform duration-500"
        />
        <img
          src="/f2.jpg"
          alt="Students"
          className="rounded-2xl shadow-2xl w-full h-[260px] object-cover
                     hover:scale-105 transition-transform duration-500"
        />
        <img
          src="/f7.jpg"
          alt="Students"
          className="rounded-2xl shadow-2xl w-full h-[260px] object-cover
                     hover:scale-105 transition-transform duration-500"
        />
                <img
          src="/f4.jpg"
          alt="Students"
          className="rounded-2xl shadow-2xl w-full h-[260px] object-cover
                     hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* MOBILE CAROUSEL */}
      <div className="sm:hidden flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4">
        {[5, 2, 7, 4].map((i) => (
          <img
            key={i}
            src={`/f${i}.jpg`}
            alt="Students"
            className="rounded-xl shadow-xl w-64 h-40 object-cover snap-center flex-shrink-0"
          />
        ))}
      </div>

    </div>

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
      <section className="py-1 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-red-700 mb-10 animate-fadeIn font-serif">
          Life at Our School
        </h2>

<div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl animate-slideUp bg-black">
  <div className="pt-[50.25%]" />
  <video
    className="absolute inset-0 w-full h-full object-cover"
    controls
    playsInline
    preload="metadata"
    title="School Life"
  >
    <source src="/videos/robot.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
      </section>
<section>
<div class="mt-16 bg-white dark:bg-background-dark p-8 rounded-lg">
<h3 class="text-2xl font-bold text-red-700 dark:text-slate-50 mb-4 font-serif ">Subscribe to Us</h3>
<p class="text-base font-normal leading-relaxed text-gray-500 dark:text-gray-300 mb-6 font-serif">Stay updated with our latest news and events. Join our newsletter!</p>
<div class="flex flex-col sm:flex-row gap-4">
<input class="flex-grow w-full h-12 px-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-accent text-base text-gray-800 dark:text-slate-50 placeholder-gray-500 dark:placeholder-gray-400" placeholder="Your email address" type="email"/>
<button class="flex min-w-[84px] max-w-full sm:max-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-red-800 text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-red-600 font-serif">
<span class="truncate">Send</span>
</button>
</div>
</div>
<footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-9 py-2">
  <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2 text-red-700 dark:text-slate-700">
        <div className="size-8">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_6_319)">
              <path
                d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_6_319">
                <rect fill="white" height="48" width="48"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] font-serif">Our School</h2>
      </div>
      <p className="text-sm text-black dark:text-gray-400 mt-2 font-serif">
        © 2025  Gayathri Central School. All rights reserved.
      </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 col-span-1 md:col-span-3 gap-8">
      <div>
        <h3 className="text-base font-bold text-red-800 dark:text-slate-50 mb-4 font-serif">Our Campus</h3>
        <ul className="space-y-3">
          <li><a href="/academic" className="text-sm text-black dark:text-gray-300 hover:text-accent dark:hover:text-accent font-serif">Academic</a></li>
          <li><a href="/leadership" className="text-sm text-black dark:text-gray-300 hover:text-accent dark:hover:text-accent font-serif">Our Leadership</a></li>
          <li><a href="/careers" className="text-sm text-black dark:text-gray-300 hover:text-accent dark:hover:text-accent font-serif">Careers</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-base font-bold text-red-800 dark:text-slate-50 mb-4 font-serif">Our Courses</h3>
        <ul className="space-y-3">
          <li><a href="/courses/maths" className="text-sm text-black dark:text-gray-300 hover:text-accent dark:hover:text-accent font-serif">Maths</a></li>
          <li><a href="/courses/science" className="text-sm text-black dark:text-gray-300 hover:text-accent dark:hover:text-accent font-serif">Science</a></li>
          <li><a href="/courses/arts" className="text-sm text-black dark:text-gray-300 hover:text-accent dark:hover:text-accent font-serif">Arts</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-base font-bold text-red-800 dark:text-slate-50 mb-4 font-serif">Contact</h3>
        <ul className="space-y-3">
          <li><button className="text-sm text-black dark:text-black hover:text-accent dark:hover:text-accent">Help</button></li>
          <li><button className="text-sm text-black dark:text-black hover:text-accent dark:hover:text-accent">Support</button></li>
          <li><button className="text-sm text-black dark:text-black hover:text-accent dark:hover:text-accent">contact Us</button></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
</section>
    </div>
  );
};

export default About;
