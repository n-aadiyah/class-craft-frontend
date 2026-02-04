import React from "react";
import { motion } from "framer-motion";
import { 
  Cpu, Sprout, Mic2, Wallet, BookOpen, 
  HeartPulse, Hammer, Camera, HandHelping, 
  MonitorPlay 
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function Facilities() {
  return (
    <div className="bg-slate-50 text-gray-900 overflow-x-hidden font-sans">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[100vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-50"></div>

        <div className="relative z-10 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-yellow-400 font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Excellence in Education
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-5xl md:text-7xl font-bold font-serif mb-6"
          >
            World-Class <span className="italic text-red-700">Facilities</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide"
          >
            A holistic ecosystem designed to nurture curiosity, innovation, and leadership.
          </motion.p>
        </div>
      </section>

{/* --- CORE FACILITIES SECTION --- */}
<section className="py-20 px-6 max-w-7xl mx-auto">
  
  {/* Introductory Header */}
  <div className="mb-20">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-bold text-gray-900 font-serif mb-6"
    >
      Facilities at <span className="text-red-700">Gayathri School</span>
    </motion.h2>
    <p className="text-xl text-red-600 font-serif mb-6 italic">A Holistic Ecosystem for Future-Ready Learning</p>
    <p className="text-gray-600 leading-relaxed text-lg max-w-4xl">
      At Gayathri School, facilities are designed to support experiential learning, innovation, emotional well-being, communication skills, social responsibility, and real-world readiness. Our infrastructure goes beyond conventional classrooms to create an environment where students learn by doing, reflecting, creating, and contributing to society.
    </p>
  </div>

  {/* Grid of All Facilities */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    
    <FacilityCard 
      title="AI & Robotics Innovation Lab"
      icon={<Cpu className="text-red-600" />}
      desc={`The AI & Robotics Innovation Lab introduces students to emerging technologies through hands-on, activity-based learning. \n\n**Key learning areas include:**\n• Drone technology and basic aeronautics\n• AR and VR learning tools\n• 3D printing for design thinking\n• STEM and robotics kits\n• Introductory concepts in AI`}
      footer="This lab empowers students to become innovators, makers, and future technologists."
    />

    <FacilityCard 
      title="Agri Tech Lab – Learn While You Grow"
      icon={<Sprout className="text-green-600" />}
      desc={`Integrates education with sustainable agricultural practices through hands-on farming experiences.\n\n**Focus areas include:**\n• Mushroom & Microgreen cultivation\n• Soil-free farming concepts\n• The “Learn While You Grow” initiative\n• Awareness of plant science and nutrition`}
      footer="Fosters environmental responsibility, patience, and respect for nature."
    />

    <FacilityCard 
      title="Gayathri Speak Smart"
      icon={<Mic2 className="text-blue-600" />}
      desc={`AI-Based Communication Improvement Platform designed to improve English communication and confidence in a safe environment.\n\n**Platform features include:**\n• Speaking prompts and sentence practice\n• Pronunciation activities\n• Role-play based conversational learning\n• AI-driven interactive chat for real-life scenarios`}
      footer="Helps students become confident communicators and effective speakers."
    />

    <FacilityCard 
      title="Life Skills & Financial Literacy Lab"
      icon={<Wallet className="text-amber-600" />}
      desc={`Prepares students for real-world challenges by teaching essential skills beyond academics.\n\n**Key focus areas include:**\n• Basic financial literacy: saving & budgeting\n• Decision-making and problem-solving\n• Leadership development\n• Time management and goal setting`}
      footer="Builds independent, responsible, and confident individuals."
    />

    <FacilityCard 
      title="Reading, Language & Communication Studio"
      icon={<BookOpen className="text-indigo-600" />}
      desc={`A dedicated space for developing language proficiency, expression, and confidence.\n\n**Activities include:**\n• Guided reading and storytelling\n• Public speaking, debates, and discussions\n• English communication practice\n• Listening and expression activities`}
      footer="Nurtures clarity of thought, expression, and confidence."
    />

    <FacilityCard 
      title="Wellness & Mindfulness Zone"
      icon={<HeartPulse className="text-pink-600" />}
      desc={`Supports emotional and mental well-being, creating a calm and stress-free learning environment.\n\n**Activities include:**\n• Yoga and breathing exercises\n• Mindfulness and relaxation practices\n• Emotional awareness sessions\n• Quiet reflection and focus-building`}
      footer="Promotes emotional balance, resilience, and inner well-being."
    />

    <FacilityCard 
      title="Innovation & Maker Space"
      icon={<Hammer className="text-orange-600" />}
      desc={`Encourages creativity and experimentation through hands-on making using everyday materials.\n\n**Students engage in:**\n• DIY projects using recycled materials\n• Design thinking and creative problem-solving\n• Small-scale innovations for community needs\n• Repair, reuse, and sustainability-based projects`}
      footer="Cultivates a maker mindset and creative confidence."
    />

    <FacilityCard 
      title="Student Media & Digital Creativity Lab"
      icon={<Camera className="text-purple-600" />}
      desc={`Provides opportunities to explore digital storytelling and creative digital expression.\n\n**Learning areas include:**\n• Photography and videography\n• Poster design and digital content creation\n• School newsletters and media projects\n• Ethical use of digital platforms`}
      footer="Develops communication skills, creativity, and digital responsibility."
    />

    <FacilityCard 
      title="Gayathri Seva Nidhi"
      icon={<HandHelping className="text-red-500" />}
      desc={`Education with Social Responsibility: An initiative that instills compassion and empathy towards society.\n\n**Through this initiative:**\n• Contribution to social welfare activities\n• Donation drives and community support\n• Learning values of sharing and kindness`}
      footer="Ensures education builds strong character and social awareness."
    />

    <FacilityCard 
      title="Smart Interactive Classrooms"
      icon={<MonitorPlay className="text-cyan-600" />}
      desc={`Equipped with Smart Interactive Panels to enhance engagement and visual learning clarity.\n\n**Key features include:**\n• Interactive, multimedia-based lessons\n• Visual learning enhancement\n• Integration with digital LMS resources\n• Increased student participation`}
      footer="Supports interactive, student-centered learning."
    />

  </div>

  {/* Closing Statement */}
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    className="mt-20 p-10 bg-red-50 rounded-3xl border border-red-100 text-center"
  >
    <h3 className="text-2xl font-bold font-serif text-gray-900 mb-4">A Holistic Learning Environment</h3>
    <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto italic">
      The facilities at Gayathri School collectively create a holistic learning ecosystem that nurtures intellectual growth, emotional well-being, creativity, communication skills, and social responsibility. By blending technology, sustainability, life skills, wellness, and values, Gayathri School prepares students not just for examinations, but for life.
    </p>
    <p className="mt-8 font-bold text-red-700 font-serif">
      Gayathri School – Shaping confident learners, compassionate citizens, and future leaders.
    </p>
  </motion.div>
</section>

      <Gallery />
      <Videos />

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
}

/* --- REUSABLE COMPONENTS --- */

function FacilityCard({ title, icon, desc, footer }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between group transition-all"
    >
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-red-50 transition-colors">
            {React.cloneElement(icon, { size: 28 })}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 font-serif group-hover:text-red-700 transition-colors tracking-tight">
            {title}
          </h3>
        </div>
        
        {/* Render description with basic markdown support for bolding and lists */}
        <div className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line mb-6">
          {desc.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-gray-800">{part}</strong> : part)}
        </div>
      </div>
    </motion.div>
  );
}

function Gallery() {
  const IMAGES = [
    "/f1.jpg",
    "/f2.jpg",
    "/f3.jpg",
    "/f4.jpg",
    "/f5.jpg",
    "/f6.jpg",
    "/f7.jpg",
    "/f8.jpg",
    "/f9.jpg",
    "/f10.jpg",
    "/f11.jpg",
    "/f12.jpg"
  ];

  return (
    <section className="py-24 px-6 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Campus <span className="text-red-700">Gallery</span></h2>
          <div className="h-1 w-12 bg-yellow-400 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMAGES.map((src, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.02 }}
              className="aspect-video rounded-2xl overflow-hidden shadow-md border border-white"
            >
              <img src={src} className="w-full h-full object-cover" alt="Campus" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Videos() {
  const VIDEOS = [
    { src: "/videos/lab.mp4", title: "Innovation & Smart Lab" },
    { src: "/videos/mushroom.mp4", title: "Agri-Tech & Sustainable Farming" },
    { src: "/videos/robot.mp4", title: "Advanced Robotics Hub" }
  ];

 return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-serif mb-4">
            Virtual <span className="text-red-700">Tours</span>
          </h2>
          <div className="h-1 w-20 bg-yellow-400 mx-auto"></div>
        </div>

        {/* 3 Videos in a single row (md:grid-cols-3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VIDEOS.map((vid, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl overflow-hidden shadow-xl bg-black"
            >
              {/* Aspect-video (16:9) decreases the height compared to 16:10 */}
              <div className="aspect-video w-full"> 
                <video 
                  controls 
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                >
                  <source src={vid.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Title Overlay: Clean typography, no background */}
              <div className="absolute top-4 left-4 pointer-events-none">
                <h3 className="text-white text-lg font-serif font-bold drop-shadow-md tracking-wide opacity-90 group-hover:opacity-100 transition-opacity">
                  {vid.title}
                </h3>
              </div>
              
              {/* Bottom Gradient for control visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}