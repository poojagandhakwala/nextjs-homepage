export const getPokemonId = (url: string) => {
    const arr = url?.split("/")?.filter(Number);
    return arr?.toString();
  };