import { FetchPaginatedPokemons } from '@/app/api/fetch-paginated-pokemons';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { Header } from '../components/header';
import { Pagination } from '../components/pagination';
import { PokemonCard } from '../components/pokemon-card';
import { PokemonsFilters } from './pokemons/pokemons-filters';

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const habitat = searchParams.get('habitat');
  const name = searchParams.get('name');
  const type = searchParams.get('type');

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1');

  const { data } = useQuery({
    queryKey: ['pokemons', pageIndex, name, type, habitat],
    queryFn: () =>
      FetchPaginatedPokemons({
        habitat: habitat === 'all' ? null : habitat,
        name,
        pageIndex,
        type: type === 'all' ? null : type,
      }),
  });

  function handlePaginated(pageIndex: number) {
    setSearchParams((prevState) => {
      prevState.set('page', (pageIndex + 1).toString());

      return prevState;
    });
  }

  return (
    <>
      <Header />

      <div className="space-y-4 mt-3 p-2">
        <PokemonsFilters />

        <div className="w-full mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {data &&
            data.response.map((pokemon) => {
              return (
                <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  imageUrl={pokemon.imageUrl}
                  name={pokemon.name}
                  types={pokemon.types}
                />
              );
            })}
        </div>

        {data && (
          <Pagination
            pageIndex={pageIndex}
            perPage={10}
            totalCount={data.total}
            onPageChange={handlePaginated}
          />
        )}
      </div>
    </>
  );
}
