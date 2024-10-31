import { IPokemons } from '../interfaces/pokemons';
import { api } from '../lib/axios';

export interface IGetPokemonDetailsParams {
  pokemonId: number;
}

export async function GetPokemonDetails({
  pokemonId,
}: IGetPokemonDetailsParams) {
  const response = await api.get<IPokemons>(`/pokemon/${pokemonId}`);

  return response.data;
}
