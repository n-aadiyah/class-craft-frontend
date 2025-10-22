// src/pages/LandingPage.js
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

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
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}

        <Navbar />

        <div className="relative z-20 text-center text-white px-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-tight drop-shadow-lg">
            Welcome to the Academy of Excellence
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-200">
            Empowering students through innovation, creativity, and knowledge.
          </p>
          <button className="mt-8 bg-red-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg">
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
  <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-8">
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
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <img alt="Students in a classroom" class="h-auto max-w-full rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZsU9NbGDxfhIBDCYB9_Y3eMSA0XJC8ZpaE05YQVPqhEThds0p4Ws4z81PN87Ir51ONkbLe9NoRB8gj2a9bm0I8xHyoUWZSpyn2rvUhDBzPFzQd0U06TXjDlWE6VhjzIuwbslMo1thKmsBPWdgs5GKXnldxv9W91yBnbdSySeUnX9_nqEl99T6GDSafZizDSEzVFLlrLQ1FODhE1mQWpGn0tN-LXN0ftdn-MX2SaYv34jWMwzhhNYx9svgqsQh_A7-w-lr9NGdAz4"/>
      <img alt="Graduation ceremony" class="h-auto max-w-full rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyce9cFr0ZPJeMT_4C2EhFFAPTg3VwvPZQSmgtVHZ3aJ39hseuVC7wrTzIKj2YPFOn6foNyMi-9s7aIJZy5dca5pTxbcvJAUIP1y8bUpPRejTRtfV-II2m9g9fn_PymRvndyDVSoPUhuHmE0Ri3E88pTSECObL80G6LqN2OoTtQbmDBP6wDL1sZfN6Dde3h-Ds3V4pTbR0SW57ha1PvNjBJQScGARZOV0kv-9kblvLziM5NZ7r51vL4z3VLiyciBiSUnKZx2f3g9M"/>
      <img alt="Students walking on campus" class="h-auto max-w-full rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuComCuX34M36xQL4XcUgoVIPgGfu5RGoXgEQa2GL8hALllSBmrqjTlDX5A8PpV7m7uD-Tn0VaJwrzbMmE7ltK65anLG1uyUgsv7K0mdnEP4LtkzCzkfVX48nU4GJiCRK7-XPAonsLYt1pBlBTXINwkpDLOZ2WYzdBDsgOqvvRUfkbcNV9HHqEZqUP-1vwxGOx46-rEb4zl1I3lVQKz3c38l1TwG07n5JP2ZwOkB-plZKhWAIgC7xYCPf80uTzQWiL-qo1pd7XVEfCM"/>
      <img alt="Students studying together" class="h-auto max-w-full rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc3ViKcagHpxzwV1rkvUZrrfzvrIOmw4RE7bwsO-H8m6fj-W22qs8itjWfv2kPeJ6eai3UH9IE90iOnOF9oQTV0Y5kFUey9WQgsoKwzOQg8ZNpi_6Qpb_nYRKLGvtbiaP3Ds34II6t-BzCPqMW0gd0cI7lmgL5prVFcBcMKy88m3r9Rk_SyXLNHIasf9fj-NuhDLkR31mOapxJmw25L4BPk7KFzhvMVba2m1TkuXPfTF43oFh22pu62lX-fhaBBg2mAej_yAefZZ0"/>
      <img alt="Teacher helping a student" class="h-auto max-w-full rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4PXCazNfKsDkdAbp-NTDIj9csw6u39h4eAXWkLoWq_r-YJE0Yv0bTmTlnwmE81AKDXiIkV6-btdyjvcoqsiBqECkVVvRE-xW1q789WvUlDnmLIHaMV3va_bU4Wtasmk4txG7IBPUVZKF3IJHy_6qKdcdYSM7Bses0ISp7Fg54wEF5PpTnzYDflH6M35IJCKMFEwxAz5ex-ALsgbO8lWOA5mTbFqRrj132mIou2vB6spKioLS83YWp6J9bxH8qtroGVd45m4CDP2o"/>
      <img alt="School library" class="h-auto max-w-full rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgQEUa4a-TpS_UVLwARgVzlPvCc9361se__Pa6S6JNxcN1LHS55aTmlN7ono5TWVqR7BC9m1HKaBHCYQPD_219HnfTMy4qWVFdqoDAnacRah7HbRsnr7aIbx4hFLwPkrrscOlt6Y4UkWKb1R1dyFZebQjLSzUzrESzA720zzI4f2VZ4XrIrP7OkCJhgUsF6yNupDrkY60NUrs5wXRvNR5Tz3E_n2Kbq9yAcUvi40B-0NxSFeazlnPv1lQ1E6IeD9kuojcVrzcfolQ"/>
    </div>
    </div>
  </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>  
  );
};

export default LandingPage;
