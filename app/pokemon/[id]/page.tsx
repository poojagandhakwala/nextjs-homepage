import dynamic from "next/dynamic";

const PokemonDetail = dynamic(() => import("../../components/PokemonDetails"));

const PokemonDetailsPage = () => {
  return <PokemonDetail />;
};

export default PokemonDetailsPage;