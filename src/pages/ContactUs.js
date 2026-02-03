import React from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import NaNvbar from "../components/Navbar";

export default function ContactUs() {
  return (
    <div className="bg-gradient-to-b from-white to-red-50 dark:from-black dark:to-gray-900 min-h-screen overflow-x-hidden">

      <NaNvbar />

      {/* HERO SECTION — moved OUTSIDE padding wrapper */}
      <section
        className="
          relative 
          min-h-[60vh] 
          sm:min-h-[70vh] 
          md:min-h-[100vh] 
          lg:min-h-[100vh]
          flex items-center justify-center 
          bg-cover bg-center
          animate-bgPan overflow-hidden
        "
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage:
              'url(https://gayathrischool.com/wp-content/uploads/2022/09/gaya3-1.jpg)',
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold font-serif text-yellow-500 drop-shadow-lg leading-tight">
            Contact Us
          </h1>
          <p className="mt-3 sm:mt-5 max-w-xl mx-auto text-base sm:text-lg md:text-xl text-white/90 animate-slideUp font-serif">
            Have questions? We’re here to help. Reach out to our school office for admissions, 
            academics, events, or general enquiries.
          </p>
        </div>
      </section>

      {/* -------------------------- */}
      {/* MAIN CONTENT WITH PADDING  */}
      {/* -------------------------- */}
      <div className="px-4 sm:px-6 md:px-12 py-10 sm:py-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">

        {/* LEFT — CONTACT FORM */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-red-800 dark:text-white mb-6 font-serif">
            Send us a Message
          </h2>

          <form className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-1 font-semibold text-sm sm:text-base">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-red-700 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-1 font-semibold text-sm sm:text-base">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-red-700 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-1 font-semibold text-sm sm:text-base">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-red-700 outline-none resize-none"
              ></textarea>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-red-800 hover:bg-red-700 text-white py-2.5 sm:py-3 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 shadow-lg">
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT — CONTACT INFO */}
        <div className="flex flex-col gap-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div className="bg-white dark:bg-gray-800 shadow-lg p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <MapPin size={28} className="text-red-700 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                Our Campus
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-serif leading-relaxed">
                Gayathri Central School,<br />
                Puliyannoor P O,<br />
                Pala - 686573
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <Phone size={28} className="text-red-700 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                Phone Number
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-serif">0482-2206366</p>
              <p className="text-gray-700 dark:text-gray-300 font-serif">0482-2206366</p>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <Mail size={22} className="text-red-700 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                Email Address
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-serif break-words">
              gayathricentralschool @gmail.com
              </p>

            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg text-red-800 dark:text-white mb-2">
                Office Hours
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-serif">Mon – Sat: 9 AM – 4 PM</p>
              <p className="text-gray-700 dark:text-gray-300 font-serif">Sun: Closed</p>
            </div>

          </div>

          {/* MAP */}
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 w-full h-64 sm:h-72 md:h-80 lg:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.698163270663!2d76.6405798!3d9.706781699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07d20a87df87b5%3A0x79b95e492ee7f974!2sGayathri%20Central%20School!5e0!3m2!1sen!2sin!4v1769670913378!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              className="w-full h-full"
              title="school location"
            ></iframe>
          </div>

        </div>
      </div>
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
