import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pokemon, PokemonType } from "./types.ts";

const pokemonBaseQuery = fetchBaseQuery({
  baseUrl: "https://pokeapi.co/api/v2/",
});

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: pokemonBaseQuery,
  endpoints: (build) => ({
    getPokemonList: build.query<any, { offset: number; limit: number }>({
      query: ({ offset, limit }) => `pokemon?offset=${offset}&limit=${limit}`,
    }),
    getAllPokemonList: build.query({
      query: () => `pokemon?offset=0&limit=100`,
    }),
    getPokemonTypes: build.query({
      query: () => `type`,
    }),
    getPokemonById: build.query<Pokemon, number>({
      query: (id) => `pokemon/${id}`,
    }),
    getPokemonByType: build.query<PokemonType, string>({
      query: (type) => `type/${type}`,
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetAllPokemonListQuery,
  useGetPokemonTypesQuery,
  useGetPokemonByIdQuery,
  useGetPokemonByTypeQuery,
} = pokemonApi;
