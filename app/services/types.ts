export interface AllPokemons {
  count: number;
  previous: string;
  next: string;
  results: PokemonList[];
}
export interface PokemonList {
  name: string;
  url: string;
}

export type PokemonType = {
  pokemon: {
    pokemon: { name: string; url: string };
  }[];
};

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  height: number;
  name: string;
  weight: number;
  species: { name: string; url: string };
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  types: Types[];
  moves: Moves[];
}
type AbilityInfo = {
  name: string;
  url: string;
};
export type Ability = {
  ability: AbilityInfo;
  is_hidden: boolean;
  slot: number;
};
export type Types = { slot: number; type: PokemonList };
export type Moves = { move: PokemonList };
