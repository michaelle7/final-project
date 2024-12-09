"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function PokemonDetailsPage() {
  const { pokemonName } = useParams()
  const router = useRouter()
  const [pokemon, setPokemon] = useState(null)
  
  useEffect(() => {
    if (!pokemonName) return
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        const data = await response.json()
        setPokemon(data)
      } catch (error) {
        console.error("Error fetching Pokémon details:", error)
      }
    }
    fetchPokemonDetails()
  }, [pokemonName])
  if (!pokemon) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Loading Pokemon details...</p>
      </main>
    )
  }

  const handleReturn = () => {
    router.push("/pokemon")
  }

  // used a bit of ai to help me with styling to make it look like a pokeball
  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{
        background:`linear-gradient(to bottom, #FF3B3B 50%, #FFFFFF 50%)`,}}>
      <h1 className="text-4xl font-bold capitalize text-center text-gray-800 mb-6">
        {pokemon.name}
      </h1>
      <div
        className="rounded-xl shadow-xl bg-white p-8"
        style={{
          width: "80%",
          maxWidth: "700px",
          border: "8px solid black",}}>
        <div className="flex justify-center mb-6">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-40 h-40 object-contain"
            style={{
              borderRadius: "50%",
              border: "4px solid black",
            }}
          />
        </div>
        <div className="bg-white rounded-md shadow p-4 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Details</h2>
          <p className="text-lg text-gray-600">
            <strong>Height:</strong> {pokemon.height / 10} m
          </p>
          <p className="text-lg text-gray-600">
            <strong>Weight:</strong> {pokemon.weight / 10} kg
          </p>
          <p className="text-lg text-gray-600">
            <strong>Types:</strong> {pokemon.types.map((type) => type.type.name).join(", ")}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Abilities:</strong> {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
          </p>
        </div>
      </div>
      <button
        onClick={handleReturn}
        className="mt-6 px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-gray-400">
        Return to Pokemon List
      </button>
    </main>
  )
}
