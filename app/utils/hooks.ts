export const usePokemonId = (url: string) => {
    const arr = url?.split("/")?.filter(Number);
    return arr?.toString();
  };