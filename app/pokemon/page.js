"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function PokemonPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllPokemon = async () => {
      let allPokemon = [];
      let nextUrl = "https://pokeapi.co/api/v2/pokemon?limit=100";
      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        allPokemon = allPokemon.concat(data.results);
        nextUrl = data.next;
      }

      const fetchedPokemon = await Promise.all(
        allPokemon.map(async (poke) => {
          const response = await fetch(poke.url);
          const data = await response.json();
          return data;
        })
      );
      setPokemonList(fetchedPokemon);
      setFilteredPokemon(fetchedPokemon);
      setLoading(false);
    };
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPokemon(pokemonList);
    } else {
      const filtered = pokemonList.filter((poke) =>
        poke.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  }, [searchTerm, pokemonList]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full min-h-screen">
        <p className="text-2xl font-semibold">Loading Pokemon...</p>
      </div>
    );
  }
  // got ai to help with hovering and styling
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-black">Pokemon Page</h1>
      <p className="text-lg text-black text-center mb-8">
        Click on a Pokemon to view more information
      </p>
      <div className="mb-8 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg shadow-md border border-gray-300 focus:outline-none text-black"/>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredPokemon.map((poke, index) => (
          <PokemonCard key={index} poke={poke}/>
        ))}
      </div>
    </main>
  );
}

function PokemonCard({ poke }) {
  return (
    <Link href={`/pokemon/${poke.name}`} className="flex flex-col items-center justify-center">
      <div className="bg-white text-black p-4 w-56 h-64 rounded-lg shadow-lg border-4 border-black transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold capitalize mb-4 text-center">{poke.name}</h2>
        <img
          src={poke.sprites.front_default}
          alt={poke.name}
          className="w-36 h-36 object-contain mx-auto mb-4"/>
      </div>
    </Link>
  );
}
