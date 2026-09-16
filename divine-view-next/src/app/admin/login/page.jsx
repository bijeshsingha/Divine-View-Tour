"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, User, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("from") || "/admin/enquiries";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push(returnTo);
        router.refresh();
      } else {
        setError(data.error || "Incorrect credentials. Please verify and try again.");
      }
    } catch (err) {
      setError("Network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#FFFDF7] rounded-3xl p-8 sm:p-10 border border-[#DEDCCD] shadow-2xl shadow-black/20">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#103F36] text-[#D9A441] flex items-center justify-center mx-auto mb-3 shadow-md">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#103F36]">
          Admin Portal
        </h1>
        <p className="text-xs sm:text-sm text-[#59665E] mt-1">
          Divine View Tours Management Console
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3.5 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div className="space-y-1">
          <label
            htmlFor="admin-username"
            className="block text-[11px] font-bold uppercase tracking-wider text-[#59665E]"
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#59665E]">
              <User className="w-4 h-4" />
            </div>
            <input
              id="admin-username"
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full bg-[#F7F3E9] text-[#172C26] text-sm pl-10 pr-3.5 py-3 rounded-xl border border-[#DEDCCD] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label
            htmlFor="admin-password"
            className="block text-[11px] font-bold uppercase tracking-wider text-[#59665E]"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#59665E]">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-[#F7F3E9] text-[#172C26] text-sm pl-10 pr-10 py-3 rounded-xl border border-[#DEDCCD] focus:outline-none focus:ring-2 focus:ring-[#103F36]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#59665E] hover:text-[#172C26]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#103F36] hover:bg-[#082D27] text-[#F7F3E9] font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <span>{isLoading ? "Verifying..." : "Sign in to Admin"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Footer Back Link */}
      <div className="mt-8 pt-6 border-t border-[#DEDCCD] text-center">
        <Link
          href="/"
          className="text-xs text-[#59665E] hover:text-[#103F36] transition-colors inline-block"
        >
          ← Return to public website
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-[#082D27] flex items-center justify-center p-4 sm:p-6">
      <Suspense fallback={<div className="text-[#F7F3E9]">Loading secure login...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
