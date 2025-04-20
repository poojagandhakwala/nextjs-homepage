import React from "react";
import { PokemonList } from "../services/types";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { getPokemonId } from "../utils/helpers";

interface LayoutProps {
  pokemons: PokemonList[];
  view: "module" | "list";
  isLoading: boolean;
}

const ViewLayout = ({ pokemons, view, isLoading }: LayoutProps) => {
  return (
    <div>
      {view === "module" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
          {isLoading &&
            [...Array(5)].map((_, id) => (
              <div
                key={id}
                className="w-full h-[150px] sm:h-[160px] md:h-[180px]"
              >
                <Skeleton
                  key={id}
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  className="rounded-xl"
                  animation="wave"
                />
              </div>
            ))}
          {pokemons?.map((item: PokemonList) => {
            const id = getPokemonId(item.url);
            return (
              <Link
                href={`/pokemon/${id}`}
                key={id}
                className="text-sm hover:text-blue-700"
              >
                <div className="border rounded-2xl p-4 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all bg-gradient-to-br from-[#f0f4ff] to-white">
                  <div className="flex justify-center mb-2">
                    <Image
                      width={96}
                      height={96}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                      alt={`${item.name} image`}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center capitalize">
                    {item.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <ul className="space-y-3">
          {isLoading &&
            [...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={90}
                className="rounded-xl"
                animation="wave"
              />
            ))}
          {pokemons?.map((item: PokemonList) => {
            const id = getPokemonId(item.url);

            return (
              <li
                key={id}
                className="border px-4 py-3 rounded-xl flex items-center justify-between hover:shadow-md  hover:text-blue-700 transition-all bg-gradient-to-br from-[#f0f4ff] to-white"
              >
                <Link
                  href={`/pokemon/${id}`}
                  className="text-sm hover:text-blue-700"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      width={72}
                      height={72}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                      alt={`${item.name}`}
                      className="object-contain"
                      loading="lazy"
                    />
                    <span className="text-lg font-medium capitalize text-decoration-none !underline-none">
                      {item.name}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {pokemons?.length === 0 && (
        <h5 className="text-xl justify-center flex">
          No Pokemons found.Please select another type.
        </h5>
      )}
    </div>
  );
};

export default ViewLayout;
