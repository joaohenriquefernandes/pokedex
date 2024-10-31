export interface IFetchPokemonsByHabitats {
  id: number;
  pokemon_species: {
    name: string;
    url: string;
  }[];
}
