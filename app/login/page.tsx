"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import googleLogo from "@/public/svg/google.svg";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/";
    }
  }, [status]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Ongeldige inloggegevens");
    } else {
      window.location.href = "/";
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8F8F8] px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 border-2 border-[#FFF275]">
        <h1 className="text-3xl font-luckiest-guy text-[#3B5FFF] mb-6 text-center">Inloggen</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Wachtwoord"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-[#3B5FFF] hover:bg-[#2e4ce6] text-white font-bold py-2 rounded-lg transition shadow"
            disabled={loading}
          >
            {loading ? "Even geduld..." : "Inloggen"}
          </button>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </form>
        <div className="my-6 flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs">of</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 font-semibold hover:bg-gray-50 transition"
        >
          <Image src={googleLogo} alt="Google logo" width={20} height={20} />
          Inloggen met Google
        </button>
      </div>
    </main>
  );
}
