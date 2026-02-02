import React, { useEffect } from "react";
import {Send, X } from "lucide-react";
import API from "../api/axiosInstance";
import toast from "react-hot-toast";

export default function ForgotPassword({ isOpen, onClose, email, setEmail }) {
  // Close on 'Escape' key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleResetRequest = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Sending reset link...");

    try {
      await API.post("/auth/forgot-password", { email });
      toast.success("Reset link sent! Check your inbox. 📧", { id: loadingToast });
      onClose(); // Close modal on success
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong.";
      toast.error(msg, { id: loadingToast });
    }
  };

  return (
    /* Modal Backdrop */
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-md bg-black border-2 border-red-600 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.5)] p-8 animate-zoomIn"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the form
      >
        {/* Close Icon (Top Right) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Back to Login Button
        <button
          onClick={onClose}
          className="flex items-center text-gray-400 hover:text-red-500 transition-colors mb-4 text-xs font-serif"
        >
          <ArrowLeft size={14} className="mr-1" /> Back to Login
        </button> */}

        <h2 className="text-3xl font-extrabold text-center text-red-600 mb-2">
          ⚡ Reset ⚡
        </h2>

        <p className="text-center text-gray-400 text-sm mb-6 leading-relaxed">
          Enter your email address and we'll send you a link to get back into the Learning World.
        </p>

        <form onSubmit={handleResetRequest} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="input-auth w-full bg-[#111] border border-red-600 p-3 rounded-lg text-white outline-none focus:border-yellow-400 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />

          <button
            type="submit"
            className="btn-auth w-full bg-red-700 hover:bg-red-600 text-white font-bold py-3 rounded-lg border-2 border-yellow-500 flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            Send Reset Link <Send size={16} />
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-xs">
          Need help? <span className="text-red-600 underline cursor-pointer">Contact Support</span>
        </p>
      </div>
    </div>
  );
}