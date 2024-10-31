import { GetPokemonDetails } from '@/app/api/get-pokemon-details';
import { FormatHeightToMeters } from '@/app/utils/format-pokemon-height';
import { FormatPokemonName } from '@/app/utils/format-pokemon-name';
import { FormatWeightToKilograms } from '@/app/utils/format-pokemon-weight';
import { TranslatePokemonType } from '@/app/utils/translate-pokemon-type';
import { Badge } from '@/views/components/ui/badge';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/views/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/views/components/ui/table';
import { useQuery } from '@tanstack/react-query';

export interface IPokemonDetailsProps {
  pokemonId: number;
  open: boolean;
}

export function PokemonDetails({ pokemonId, open }: IPokemonDetailsProps) {
  const { data: pokemon } = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => GetPokemonDetails({ pokemonId }),
    enabled: open,
  });

  return (
    <DialogContent className="w-[600px] h-[600px] flex flex-col items-center justify-start">
      <DialogHeader className="flex flex-col gap-6 items-center justify-center">
        <DialogTitle className="text-2xl font-bold">
          {pokemon?.name ? FormatPokemonName(pokemon?.name) : 'Desconhecido'}
        </DialogTitle>

        <DialogDescription className="h-48 w-full overflow-hidden p-0">
          <img
            src={pokemon?.sprites.other['official-artwork'].front_default}
            alt="image-pokemon"
            className="h-full w-full object-contain"
          />
        </DialogDescription>

        <DialogTitle className="w-20 text-2xl font-bold">
          <Badge
            variant="default"
            className="flex items-center justify-center h-5"
          >
            {`#${pokemon?.id}`}
          </Badge>
        </DialogTitle>
      </DialogHeader>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo(s)</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            {pokemon?.types.map((type) => {
              return (
                <TableCell key={type.slot}>
                  <Badge
                    variant="default"
                    className="flex items-center justify-center h-5"
                  >
                    {TranslatePokemonType(type.type.name)}
                  </Badge>
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Altura (m)</TableHead>
            <TableHead>Peso (kg)</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>
              {pokemon?.height
                ? FormatHeightToMeters(pokemon?.height)
                : 'Desconhecido'}
            </TableCell>
            <TableCell>
              {pokemon?.weight
                ? FormatWeightToKilograms(pokemon?.weight)
                : 'Desconhecido'}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </DialogContent>
  );
}
