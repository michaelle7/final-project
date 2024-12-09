"use client"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* got ai to help make the pokeball in the front page*/ }
      <div className="w-80 h-80 rounded-full relative flex items-center justify-center shadow-2xl bg-red-500 border-8 border-black border-b-0">
        <div className="absolute bottom-0 w-full h-1/2 bg-white rounded-b-full border-t-8 border-black"></div>
        <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center border-6 border-white z-10">
          <div className="w-12 h-12 rounded-full bg-white"></div>
        </div>
      </div>
      <h1 className="text-3xl text-black font-bold mt-6 text-center">
        Welcome to PokeWeb
      </h1>
      <p className="text-lg text-black mt-2 text-center">
        Explore the world of Pokemon with detailed information!
      </p>
      <Link href="/pokemon">
        <button className="mt-6 px-6 py-3 text-white text-lg font-bold rounded-full bg-red-500 hover:bg-red-700 border-2 border-black">
          Explore Pokemon
        </button>
      </Link>
    </main>
  );
}
