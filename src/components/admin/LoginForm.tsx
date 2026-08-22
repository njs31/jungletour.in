"use client";

import { useState } from "react";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import Link from "@/shims/next-link";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Invalid username or password");
      return;
    }

    window.location.assign("/admin");
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-6 text-center sm:mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-cta">
          Admin
        </p>
        <h1 className="mt-2 text-2xl font-bold text-brand-text">
          Jungle Tours & Treks
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          Sign in to manage trips and bookings
        </p>
      </div>

      <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-text">
              Username
            </label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-brand-border px-3.5 py-3 text-sm outline-none transition-colors focus:border-cta focus:ring-2 focus:ring-cta/20"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-text">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-brand-border px-3.5 py-3 text-sm outline-none transition-colors focus:border-cta focus:ring-2 focus:ring-cta/20"
              required
            />
          </div>
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cta py-3.5 text-sm font-semibold text-white transition-colors hover:bg-cta-hover disabled:opacity-60"
          >
            {loading ? "Loading" : "Sign in"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-brand-muted transition-colors hover:text-cta"
        >
          ← Back to website
        </Link>
      </p>
    </div>
  );
}
