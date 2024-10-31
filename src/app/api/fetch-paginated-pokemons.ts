import { IFetchPokemonsByHabitats } from '../interfaces/fetch-pokemons-by-habitats';
import { IFetchPokemonsByTypes } from '../interfaces/fetch-pokemons-by-types';
import { IPokemons } from '../interfaces/pokemons';
import { api } from '../lib/axios';

interface IPokemonResponse {
  name: string;
  url: string;
}

export interface IFetchPokemonsQuery {
  habitat?: string | null;
  name?: string | null;
  type?: string | null;
  pageIndex: number;
}

export interface IFetchPaginatedPokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export async function FetchPaginatedPokemons({
  habitat,
  name,
  pageIndex,
  type,
}: IFetchPokemonsQuery) {
  let pokemonList: IPokemonResponse[] = [];

  if (!name && !type && !habitat) {
    const partialsData = await api.get<IFetchPaginatedPokemonsResponse>(
      '/pokemon',
      {
        params: {
          limit: 10,
          offset: pageIndex * 10,
        },
      },
    );

    const response = await Promise.all(
      partialsData.data.results.map(async (pokemon) => {
        const pokemonsData = await api
          .get<IPokemons>(pokemon.url)
          .then(({ data }) => {
            const informations = {
              id: data.id,
              name: data.name,
              types: data.types,
              imageUrl: data.sprites.other['official-artwork'].front_default,
            };
            return informations;
          });

        return pokemonsData;
      }),
    );

    return {
      response: response,
      total: partialsData.data.count,
    };
  }

  if (habitat) {
    const habitatResponse = await api.get<IFetchPokemonsByHabitats>(
      `/pokemon-habitat/${habitat}`,
    );

    const habitatPokemonList = habitatResponse.data.pokemon_species;

    pokemonList = habitatPokemonList.map((pokemon) => {
      return {
        name: pokemon.name,
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
      };
    });
  }

  if (name) {
    const allPokemons = await api.get<IFetchPaginatedPokemonsResponse>(
      '/pokemon',
      {
        params: {
          limit: 100000,
          offset: 0,
        },
      },
    );

    const nameFilteredPokemon = allPokemons.data.results
      .filter((pokemon) => pokemon.name.includes(name.toLowerCase()))
      .map((pokemon) => ({
        name: pokemon.name,
        url: pokemon.url,
      }));

    if (pokemonList.length !== 0) {
      const nameFilteredSet = new Set(
        nameFilteredPokemon.map((pokemon) => pokemon.name),
      );

      pokemonList = pokemonList.filter((pokemon) =>
        nameFilteredSet.has(pokemon.name),
      );
    } else {
      pokemonList = [...nameFilteredPokemon];
    }
  }

  if (type) {
    const typeResponse = await api.get<IFetchPokemonsByTypes>(`/type/${type}`);

    const typePokemonList = typeResponse.data.pokemon.map(
      (item) => item.pokemon,
    );

    if (pokemonList.length !== 0) {
      const nameFilteredSet = new Set(
        typePokemonList.map((pokemon) => pokemon.name),
      );

      pokemonList = pokemonList.filter((pokemon) =>
        nameFilteredSet.has(pokemon.name),
      );
    } else {
      pokemonList = [...typePokemonList];
    }
  }

  const paginatedResponse = pokemonList
    ? pokemonList.slice(pageIndex * 10, pageIndex * 10 + 10)
    : [];

  const response = await Promise.all(
    paginatedResponse.map(async (pokemon) => {
      const pokemonsData = await api
        .get<IPokemons>(pokemon.url)
        .then(({ data }) => {
          return {
            id: data.id,
            name: data.name,
            types: data.types,
            imageUrl: data.sprites.other['official-artwork'].front_default,
          };
        });
      return pokemonsData;
    }),
  );

  return {
    response,
    total: pokemonList ? pokemonList.length : 0,
  };
}
