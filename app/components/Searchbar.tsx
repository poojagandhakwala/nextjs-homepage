"use client";
import { Autocomplete, TextField } from "@mui/material";
import React, {  useState } from "react";
import { PokemonList } from "../services/types";
import { getPokemonId } from "../utils/helpers";
import { useGetAllPokemonListQuery } from "../services/api";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const {
    data: allPokemonList,
    error,
    isLoading,
  } = useGetAllPokemonListQuery({ skip: false });
  const [searchValue, setSearchValue] = useState<string | null>("");

  const router = useRouter();
  if (error) return <p>Error while loading pokemons.</p>;

  const options =
    allPokemonList?.results.map((option: PokemonList) => option.name) || [];

  return (
    <div className="px-4 p-2">
      <Autocomplete
        id="search-pokemon"
        color="secondary"
        fullWidth       
        sx={{
          "& .MuiInputBase-root": {
            borderColor: "white",
            borderRadius: 2,
            px: 1,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
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
        }}
        loading={isLoading}
        options={options}
        value={searchValue}
        onChange={(event, newValue) => {
          const selected = allPokemonList?.results?.find(
            (pokemon: PokemonList) => pokemon.name === newValue
          );
          if (selected) {
            const id = getPokemonId(selected.url);
            router.push(`/pokemon/${id}`);
            setSearchValue("");
          }
        }}
        autoComplete
        blurOnSelect
        onInputChange={(e, newInputValue) => setSearchValue(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Pokemon Name"
            color="secondary"
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
