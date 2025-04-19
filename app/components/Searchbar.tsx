"use client";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { PokemonList } from "../services/types";
import { usePokemonId } from "../utils/hooks";
import { useGetAllPokemonListQuery } from "../services/api";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const {
    data: allPokemonList,
    error: errors,
    isLoading: isSearchLoading,
  } = useGetAllPokemonListQuery({ skip: false });

  const router = useRouter();

  return (
    <div>
      <Autocomplete
        id="search-pokemon"
        color="secondary"
        fullWidth={true}
        sx={{
          "& .MuiInputBase-root": {
            // backgroundColor:"rgba(255, 255, 255, 0.79)",
            // backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "white",
            borderRadius: 2,
            px: 1,
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            // borderColor: "#90caf9", // light blue on focus
          },
        }}
        options={allPokemonList?.results.map(
          (option: PokemonList) => option.name
        )}
        onChange={(event, value) => {
          const selectedPokemon = allPokemonList?.results.find(
            (pokemon: PokemonList) => pokemon.name === value
          );
          if (selectedPokemon) {
            const id = usePokemonId(selectedPokemon.url);
            router.push(`/pokemon/${id}`);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Pokemon Name"
            color="secondary"
            // sx={{ borderColor: "white" }}
            fullWidth
            variant="outlined"
          />
        )}
        className="p-4 !text-white"
      />
    </div>
  );
};

export default Searchbar;
