import React, { useEffect, useState } from "react";
import { Send, X } from "lucide-react";
import API from "../api/axiosInstance" 
import toast from "react-hot-toast";

export default function ForgotPassword({ isOpen, onClose, email, setEmail }) {
  const [loading, setLoading] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleResetRequest = async (e) => {
    e.preventDefault();

    if (loading) return;

    const trimmedEmail = email?.trim();
    if (!trimmedEmail) {
      toast.error("Please enter a valid email address");
      return;
    }
console.log("FORGOT PASSWORD EMAIL:", email);
    const toastId = toast.loading("Sending reset link...");
    setLoading(true);


    try {
      await API.post("/auth/forgot-password", {
        email: trimmedEmail,
      });

      toast.success(
        "Reset link sent! Check your inbox 📧",
        { id: toastId }
      );

      // small delay so user sees success
      setTimeout(() => {
        onClose();
      }, 600);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Unable to send reset link";
      toast.error(msg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-black border-2 border-red-600 rounded-2xl
                   shadow-[0_0_20px_rgba(220,38,38,0.5)] p-8 animate-zoomIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-3xl font-extrabold text-center text-red-600 mb-2">
          ⚡ Reset ⚡
        </h2>

        <p className="text-center text-gray-400 text-sm mb-6 leading-relaxed">
          Enter your email address and we'll send you a link to get back into the
          Learning World.
        </p>

        <form onSubmit={handleResetRequest} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="input-auth w-full bg-[#111] border border-red-600 p-3 rounded-lg
                       text-white outline-none focus:border-yellow-400 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className={`btn-auth w-full bg-red-700 hover:bg-red-600 text-white font-bold
                        py-3 rounded-lg border-2 border-yellow-500 flex items-center
                        justify-center gap-2 transition-transform
                        ${loading ? "opacity-60 cursor-not-allowed" : "active:scale-95"}`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
            {!loading && <Send size={16} />}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-xs">
          Need help?{" "}
          <span className="text-red-600 underline cursor-pointer">
            Contact Support
          </span>
        </p>
      </div>
    </div>
  );
}
