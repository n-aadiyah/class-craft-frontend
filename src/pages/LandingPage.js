// src/pages/LandingPage.js
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import "../pages/landing.css";
const images = [
  "/classcraft5.jpg",
  "/classcraft2.png",
  "/classcraft4.jpg",
  "/classcraft1.jpg",
  "/classcraft6.png",
];
const subjectImages = [
  "/biology.jpeg",
  "/chemistry.png",
  "/english1.jpg",
  "/maths.jpeg",
  "/hindi.jpeg",
];
const subjectNames = ["Biology", "Chemistry", "English", "Maths", "Hindi"];

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subjectIndex, setSubjectIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Hero auto-slide every 3 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Subject carousel auto-slide every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setSubjectIndex((prev) => (prev + 1) % Math.ceil(subjectImages.length / 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setSubjectIndex(
          (prev) => (prev + 1) % Math.ceil(subjectImages.length / 3)
        );
      } else {
        setSubjectIndex(
          (prev) =>
            (prev - 1 + Math.ceil(subjectImages.length / 3)) %
            Math.ceil(subjectImages.length / 3)
        );
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full">
  {/* HERO Section */}
  <main className="relative h-screen flex items-center justify-center overflow-hidden">
    {images.map((img, index) => (
      <div
        key={index}
        className={`absolute inset-0 bg-center transition-opacity duration-[1500ms] ease-in-out ${
          index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover", // You can try 'contain' if images look stretched
          backgroundRepeat: "no-repeat",
          imageRendering: "crisp-edges", // Helps prevent blur
          filter: "brightness(1.06) contrast(1.05)", // Enhance color quality slightly
        }}
      >
        {/* Gradient overlay for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>
    ))}

    <Navbar />

    <div className="relative z-20 text-center text-white px-6">
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-tight drop-shadow-xl">
        Welcome to the Academy of Excellence
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-100 drop-shadow-md">
        Empowering students through innovation, creativity, and knowledge.
      </p>
      <button className="mt-8 bg-red-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-xl">
        Enroll Now
      </button>
    </div>
  </main>

      {/* ABOUT Section */}
      <section className="px-4 py-10 bg-white dark:bg-black">
        <div className="flex flex-col gap-12 md:flex-row items-center justify-between">
          <div className="flex flex-col gap-6 md:w-1/2">
            <h1 className="text-5xl font-black leading-tight text-gray-900 dark:text-white sm:text-6xl">
              Welcome to <span className="text-red-800">Classcraft</span>
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400">
              An immersive learning experience that combines education with
              gamification. Engage with interactive quests, collaborate with
              classmates, and unlock your full potential.
            </p>
            <button className="mt-2 bg-blue-200 text-gray-800 font-semibold py-2 px-3 rounded-md hover:bg-blue-400 transition-all duration-300 w-fit">
              Get Started
            </button>
          </div>
          <div className="relative md:w-1/2 flex items-center justify-center">
            <div className="w-full space-y-3">
              {["/classcraft1.jpg", "/classcraft6.png", "/classcraft4.jpg"].map(
                (url, index) => (
                  <div
                    key={index}
                    className="w-full h-36 bg-center bg-cover rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105"
                    style={{ backgroundImage: `url(${url})` }}
                  ></div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
      {/* SUBJECTS Carousel */}
<section
  className="relative w-full py-12 bg-gray-50 dark:bg-gray-900 overflow-hidden"
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>
  <h2 className="text-center text-3xl font-bold text-blue-800 dark:text-white mb-8">
    Our Subjects
  </h2>

  <div className="overflow-hidden">
    <div
      className="flex transition-transform duration-[2000ms] ease-in-out"
      style={{
        transform: `translateX(-${subjectIndex * 100}%)`,
        width: `${subjectImages.length * (100 / 3)}%`,
      }}
    >
      {subjectImages.map((img, index) => (
       <div
  key={index}
  className="flex-shrink-0 w-1/3 flex flex-col items-center"
>
  <div
  className="w-[20rem] sm:w-[24rem] md:w-[26rem] lg:w-[28rem] h-60 bg-center bg-cover rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
  style={{ backgroundImage: `url(${img})` }}
></div>

  <span className="mt-4 text-center text-gray-800 dark:text-white font-semibold text-lg">
    {subjectNames[index]}
  </span>
</div>

      ))}
    </div>
  </div>

  {/* Navigation Dots */}
  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
    {Array.from({ length: Math.ceil(subjectImages.length / 3) }).map((_, idx) => (
      <button
        key={idx}
        onClick={() => setSubjectIndex(idx)}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          subjectIndex === idx
            ? "bg-blue-500 scale-125"
            : "bg-gray-400 hover:bg-gray-300"
        }`}
      ></button>
    ))}
  </div>
</section>
<section className="flex flex-col max-w-[1280px] mx-auto p-4 md:p-10">
  <div className="flex flex-col md:flex-row w-full">
    {/** about school */}
    {/* Left side - Title */}
    <div className="md:w-1/3 flex items-start justify-center md:justify-start py-8 md:py-16 md:pr-10">
      <h1 className="text-red-800 dark:text-slate-50 text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em] font-serif">
        About Our School
      </h1>
    </div>

    {/* Right side - Content */}
    <div className="md:w-2/3 md:pl-10 md:border-l border-slate-300 dark:border-slate-700 py-8 md:py-16">
      <div className="flex flex-col gap-6">
        <p className="text-base font-normal leading-relaxed text-gray-800 dark:text-gray-300">
          Welcome to Our School, where we are committed to providing a nurturing
          and challenging environment for our students. Our mission is to foster
          a love of learning, a strong sense of community, and a commitment to
          academic excellence.
        </p>

        <p className="text-base font-normal leading-relaxed text-gray-800 dark:text-gray-300">
          Our school has a rich history of providing quality education to
          students from all backgrounds, dating back to our founding in 1923.
          We are proud of our traditions, our achievements, and our commitment
          to innovation.
        </p>

        <p className="text-base font-normal leading-relaxed text-gray-800 dark:text-gray-300">
          We believe in a student-centered approach to learning, where students
          are actively engaged in their own education. Our dedicated faculty and
          staff are committed to helping each student reach their full potential
          through personalized instruction.
        </p>

        <div className="flex justify-start pt-4">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-blue-300 text-black text-base font-bold truncate hover:bg-blue-400">
  <span className="truncate">Discover Our History</span>
</button>
<div>
<div class="mt-16">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
      <img alt="Students in a classroom" class="h-52 max-w-full rounded-lg object-cover" src="https://webapi.entab.info/api/image/LFSGV/public/Images/sld-2.jpg"/>
      <img alt="Graduation ceremony" class="h-52 max-w-full rounded-lg object-cover" src="https://littleflowerkkd.ac.in/public/img/slider/slider20.webp"/>
      <img alt="Students walking on campus" class="h-52 max-w-full rounded-lg object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHE_JytPfGbsCYwCuIyIyfHJ9zixNkAnUMgA&s"/>
      <img alt="Students studying together" class="h-52 max-w-full rounded-lg object-cover" src="https://lfcsjhunjhunu.edu.in/images/slider/039A2106.jpg"/>
      <img alt="Teacher helping a student" class="h-52 max-w-full rounded-lg object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-UoWQ6a2Ky2dIA1VCtazm9Sp01wRD8r6-VA&s"/>
      <img alt="School library" class="h-52 max-w-full rounded-lg object-cover" src="https://lfvmnlg.com/assets/slider/main1.jpg"/>
    </div>
    </div>
  </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* VIDEO SECTION WITH ANIMATED BACKGROUND */}
<section className="relative py-20 px-6 overflow-hidden">
  {/* Animated Bubble Background */}
  <div className="absolute inset-0 z-0 flex items-center justify-center">
    <div className="container relative">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bubble">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      ))}
    </div>
  </div>

  {/* Foreground Content */}
 <div className="relative z-10">
    <h2 className="text-center text-3xl font-bold text-blue-800 dark:text-white mb-10">
      Our Activities & Highlights
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {[
        "https://www.youtube.com/embed/GlQD8-lIOpM",
        "https://www.youtube.com/embed/QM1TpWjur_Q",
        "https://www.youtube.com/embed/Ccd6R9oSyOw",
      ].map((src, i) => (
        <div
          key={i}
          className="relative w-full pt-[56.25%] overflow-hidden rounded-xl shadow-lg"
        >
          <iframe
            title={`video-${i}`}
            src={src}
            frameBorder="0"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      ))}
    </div>
  </div>
</section>
<section>
<div class="mt-16 bg-secondary dark:bg-background-dark p-8 rounded-lg">
<h3 class="text-2xl font-bold text-blue-800 dark:text-slate-50 mb-4 font-serif">Subscribe to Us</h3>
<p class="text-base font-normal leading-relaxed text-gray-800 dark:text-gray-300 mb-6">Stay updated with our latest news and events. Join our newsletter!</p>
<div class="flex flex-col sm:flex-row gap-4">
<input class="flex-grow w-full h-12 px-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-accent text-base text-gray-800 dark:text-slate-50 placeholder-gray-500 dark:placeholder-gray-400" placeholder="Your email address" type="email"/>
<button class="flex min-w-[84px] max-w-full sm:max-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-red-800 text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
<span class="truncate">Send</span>
</button>
</div>
</div>
</section>
<footer className="bg-secondary dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-10 py-16">
  <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-4 text-primary dark:text-slate-50">
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
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        © 2025 Little Flower School. All rights reserved.
      </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 col-span-1 md:col-span-3 gap-8">
      <div>
        <h3 className="text-base font-bold text-red-800 dark:text-slate-50 mb-4">Our Campus</h3>
        <ul className="space-y-3">
          <li><a href="/academic" className="text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent">Academic</a></li>
          <li><a href="/leadership" className="text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent">Our Leadership</a></li>
          <li><a href="/careers" className="text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent">Careers</a></li>
          <li><a href="/hr" className="text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent">Human Resource</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-base font-bold text-red-800 dark:text-slate-50 mb-4">Our Courses</h3>
        <ul className="space-y-3">
          <li><a href="/courses/maths" className="text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent">Maths</a></li>
          <li><a href="/courses/science" className="text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent">Science</a></li>
          <li><a href="/courses/arts" className="text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent">Arts</a></li>
          <li><a href="/courses/economics" className="text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent">Economics</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-base font-bold text-red-800 dark:text-slate-50 mb-4">Contact</h3>
        <ul className="space-y-3">
          <li><button className="text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent">Help</button></li>
          <li><button className="text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent">Support</button></li>
          <li><button className="text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent">Press</button></li>
          <li><button className="text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent">Share Our Story</button></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
    </div>  
  );
};

export default LandingPage;
