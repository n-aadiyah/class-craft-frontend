import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import "../pages/landing.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
 

const images = [
  "/classcraft7.jpg",
  "/classcraft8.jpg",
  "/classcraft9.jpg",
  "/classcraft10.jpg",
  "/classcraft11.jpg",
];

const subjectImages = [
  "/biology.jpeg",
  "/chemistry.png",
  "/english1.jpg",
  "/maths.jpeg",
  "/hindi.jpeg",
  "/malayalam.jpeg",
];

const subjectNames = ["Biology", "Chemistry", "English", "Maths", "Hindi", "Malayalam"];

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // NEW: responsive itemsPerSlide
  const getItemsPerSlide = () => {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());
  const [subjectIndex, setSubjectIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Hero auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // NEW: update itemsPerSlide on resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
      setSubjectIndex(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Subject auto-slide
  useEffect(() => {
    const totalSlides = Math.ceil(subjectImages.length / itemsPerSlide);
    const interval = setInterval(() => {
      setSubjectIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [itemsPerSlide]);

  // Swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    const totalSlides = Math.ceil(subjectImages.length / itemsPerSlide);

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setSubjectIndex((prev) => (prev + 1) % totalSlides);
      } else {
        setSubjectIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
    }
  };

  // Slicing subjects dynamically
  const start = subjectIndex * itemsPerSlide;
  const end = start + itemsPerSlide;
  const visibleSubjects = subjectImages.slice(start, end);

  return (
    <div className="relative min-h-screen w-900 mx-auto bg-white dark:bg-black">

      {/* HERO SECTION — unchanged */}
      <main className="relative h-screen flex items-center justify-center overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-center transition-opacity duration-[1500ms] ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              imageRendering: "crisp-edges",
              filter: "brightness(0.8) contrast(1.00)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
          </div>
        ))}

        <Navbar />

        <div className="relative z-20 text-center text-white px-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-tight drop-shadow-xl font-serif">
            Welcome to the Academy of Excellence
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-100 drop-shadow-md font-serif">
            Empowering students through innovation, creativity, and knowledge.
          </p>
          <button className="mt-8 bg-red-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-xl font-serif"
          onClick={() => navigate("/login")}>
            Enroll Now 
          </button>
        </div>
      </main>


      {/* ABOUT Section */}
      <section className="px-4 py-10 bg-white dark:bg-white/10">
        <div className="flex flex-col gap-12 md:flex-row items-center justify-between">
          <div className="flex flex-col gap-6 md:w-1/2">
            <h1 className="text-5xl font-black leading-tight text-black dark:text-black sm:text-6xl font-serif">
              Welcome to <span className="text-red-800">Classcraft</span>
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-200 font-serif">
              An immersive learning experience that combines education with
              gamification. Engage with interactive quests, collaborate with
              classmates, and unlock your full potential.
            </p>
            <button className="mt-2 bg-red-800 text-white font-semibold py-2 px-3 rounded-md hover:bg-red-700 transition-all duration-300 w-fit font-serif">
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
        <h2 className="text-center text-3xl font-bold text-red-800 dark:text-white mb-8 font-serif">
          Our Subjects
        </h2>

        <div className="overflow-hidden w-full">
          <div className="flex justify-center gap-8 transition-all duration-[600ms] ease-in-out">
            {visibleSubjects.map((img, i) => {
              const globalIndex = start + i;
              return (
                <div key={globalIndex} className="flex flex-col items-center">
                  <div
                    className="w-60 sm:w-72 md:w-80 lg:w-96 h-60 bg-center bg-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${img})` }}
                  ></div>
                  <span className="mt-4 text-center text-gray-800 dark:text-white font-semibold text-lg">
                    {subjectNames[globalIndex]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-3">
          {Array.from({ length: Math.ceil(subjectImages.length / itemsPerSlide) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSubjectIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                subjectIndex === idx
                  ? "bg-red-500 scale-125"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </section>
<section className="flex flex-col max-w-[1280px] mx-auto p-4 md:p-10 overflow-hidden">
      <div className="flex flex-col md:flex-row w-full">
        {/* Left side - Title */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:w-1/3 flex items-start justify-center md:justify-start py-8 md:py-16 md:pr-10"
        >
          <h1 className="text-red-800 dark:text-slate-50 text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em] font-serif drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            About Our School
          </h1>
        </motion.div>

        {/* Right side - Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:w-2/3 md:pl-10 md:border-l border-slate-300 dark:border-slate-700 py-8 md:py-16"
        >
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

            {/* Discover Button */}
            <motion.div
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start pt-4"
            >
              <button className="flex min-w-[84px] max-w-[480px] items-center justify-center h-12 px-6 rounded-lg bg-gradient-to-r from-red-800 to-red-600 text-white font-bold text-base shadow-[0_0_12px_rgba(220,38,38,0.6)] hover:shadow-[0_0_20px_rgba(220,38,38,0.9)] transition-all duration-300">
                <span className="truncate">Discover Our History</span>
              </button>
            </motion.div>

            {/* Image Grid */}
            <div className="mt-16">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {[
                  "https://gayathrischool.com/wp-content/uploads/2022/09/gaya3-1.jpg",
                  "https://www.yayskool.com/images/school/gayathri-central-school-kottayam-713518106.png",
                  "https://content.jdmagicbox.com/comp/alappuzha/k2/0477px477.x477.170925055640.b8k2/catalogue/gayathri-central-school-bharanickavu-alappuzha-cbse-schools-xh8ebnesof.jpg",
                  "/f5.jpg",
                  "https://gayathrischool.com/wp-content/uploads/2023/01/0f88d4b7-4483-4704-bbbe-251a1b184d5c.jpg",
                  "/f2.jpg"
                ].map((img, index) => (
                  <motion.img
                    key={index}
                    src={img}
                    alt={`School ${index + 1}`}
                    className="h-52 w-full rounded-lg object-cover cursor-pointer hover:scale-105 hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-500"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
{/* VIDEO SECTION WITH ANIMATED BACKGROUND */}
<section className="relative py-20 px-6 overflow-hidden">
  {/* Animated Bubble Background - Keeping your existing code */}
  <div className="absolute inset-0 z-0 flex items-center justify-center">
    <div className="container relative">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bubble">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      ))}
    </div>
  </div>

  {/* Foreground Content */}
  <div className="relative z-10">
    <h2 className="text-center text-3xl font-bold text-red-800 dark:text-white mb-10 font-serif">
      Our Activities & Highlights
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {[
        "https://www.youtube.com/embed/DcTSVSyJcBw",
        { src: "/videos/onam.mp4" },
        { src: "/videos/Alumini meet.mp4" }
      ].map((item, i) => {
        // Identify if the source is YouTube or a local file
        const isYouTube = typeof item === 'string' && item.includes('youtube.com');
        const videoSrc = isYouTube ? item : item.src;

        return (
          <div
            key={i}
            className="relative w-full pt-[56.25%] overflow-hidden rounded-xl shadow-lg bg-black"
          >
            {isYouTube ? (
              /* YouTube logic remains the same */
              <iframe
                title={`video-${i}`}
                src={videoSrc}
                frameBorder="0"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            ) : (
              /* Local Video: Removed autoPlay. Added controls and playsInline */
              <video
                controls
                playsInline
                preload="metadata"
                className="absolute top-0 left-0 w-full h-full object-cover"
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        );
      })}
    </div>
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

export default LandingPage;
