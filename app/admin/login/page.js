"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid email or password");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex pt-10 justify-center px-4">
      <div className="w-full h-fit max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        <div className="text-center mb-8">
          <span className="text-3xl text-[#d4af37]">✦</span>
          <h1 className="text-xl font-bold text-[#0d2818] mt-2">Admin Login</h1>
          <p className="text-sm text-gray-400 mt-1">Decor management panel</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1a4d2e] transition-colors"
              placeholder="admin@yoursite.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1a4d2e] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#1a4d2e] text-white font-semibold rounded-full hover:bg-[#0d2818] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
}