import { Button } from '@/views/components/ui/button';
import { Input } from '@/views/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/views/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const pokemonsFilterSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  habitat: z.string().optional(),
});

type PokemonsFilterSchema = z.infer<typeof pokemonsFilterSchema>;

export function PokemonsFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const name = searchParams.get('name');
  const type = searchParams.get('type');
  const habitat = searchParams.get('habitat');

  const { register, handleSubmit, control, reset } =
    useForm<PokemonsFilterSchema>({
      resolver: zodResolver(pokemonsFilterSchema),
      defaultValues: {
        habitat: habitat ?? '',
        name: name ?? '',
        type: type ?? '',
      },
    });

  function handleFilter({ habitat, name, type }: PokemonsFilterSchema) {
    setSearchParams((prevState) => {
      if (habitat) {
        prevState.set('habitat', habitat);
      } else {
        prevState.delete('habitat');
      }

      if (name) {
        prevState.set('name', name);
      } else {
        prevState.delete('name');
      }

      if (type) {
        prevState.set('type', type);
      } else {
        prevState.delete('type');
      }

      prevState.set('page', '1');

      return prevState;
    });
  }

  function handleClearFilters() {
    setSearchParams((prevState) => {
      prevState.delete('name');
      prevState.delete('type');
      prevState.delete('habitat');
      prevState.set('page', '1');

      return prevState;
    });

    reset({
      habitat: '',
      name: '',
      type: '',
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      action=""
      className="flex items-center gap-3"
    >
      <span className="text-xl font-semibold">Filtros:</span>

      <Input
        placeholder="Nome do pokemon"
        className="h-8 w-[360px]"
        {...register('name')}
      />

      <Controller
        name="type"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[360px]">
                <SelectValue placeholder="Tipo do pokemon" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="fighting">Lutador</SelectItem>
                <SelectItem value="flying">Voador</SelectItem>
                <SelectItem value="poison">Venenoso</SelectItem>
                <SelectItem value="ground">Terra</SelectItem>
                <SelectItem value="rock">Pedra</SelectItem>
                <SelectItem value="bug">Inseto</SelectItem>
                <SelectItem value="ghost">Fantasma</SelectItem>
                <SelectItem value="steel">Aço</SelectItem>
                <SelectItem value="fire">Fogo</SelectItem>
                <SelectItem value="water">Água</SelectItem>
                <SelectItem value="grass">Grama</SelectItem>
                <SelectItem value="electric">Elétrico</SelectItem>
                <SelectItem value="psychic">Psíquico</SelectItem>
                <SelectItem value="ice">Gelo</SelectItem>
                <SelectItem value="dragon">Dragão</SelectItem>
                <SelectItem value="dark">Sombrio</SelectItem>
                <SelectItem value="fairy">Fada</SelectItem>
                <SelectItem value="stellar">Estelar</SelectItem>
                <SelectItem value="unknown">Desconhecido</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />

      <Controller
        name="habitat"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[360px]">
                <SelectValue placeholder="Tipo do habitat" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="cave">Caverna</SelectItem>
                <SelectItem value="forest">Floresta</SelectItem>
                <SelectItem value="grassland">Campo</SelectItem>
                <SelectItem value="mountain">Montanha</SelectItem>
                <SelectItem value="rare">Raro</SelectItem>
                <SelectItem value="rough-terrain">Tereno Árido</SelectItem>
                <SelectItem value="sea">Mar</SelectItem>
                <SelectItem value="urban">Urbano</SelectItem>
                <SelectItem value="waters-edge">Lagos</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />

      <Button type="submit" className="h-8 bg-red-600 hover:bg-red-700">
        Filtrar
      </Button>

      <Button
        onClick={handleClearFilters}
        type="button"
        className="h-8 bg-red-400 hover:bg-red-700"
      >
        Limpar
      </Button>
    </form>
  );
}
