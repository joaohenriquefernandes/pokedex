import { FormatPokemonName } from '@/app/utils/format-pokemon-name';
import { TranslatePokemonType } from '@/app/utils/translate-pokemon-type';
import { useState } from 'react';
import { PokemonDetails } from '../pages/pokemons/pokemon-details';
import { Badge } from './ui/badge';
import { CardContent, CardFooter, CardTitle } from './ui/card';
import { Dialog, DialogTrigger } from './ui/dialog';

interface IPokemonCardProps {
  id: number;
  imageUrl: string;
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}

export function PokemonCard({ id, imageUrl, name, types }: IPokemonCardProps) {
  const [isdetailsOpen, setIsdetailsOpen] = useState(false);

  return (
    <Dialog open={isdetailsOpen} onOpenChange={setIsdetailsOpen}>
      <DialogTrigger>
        <div className="bg-zinc-100 h-80 flex flex-col items-center justify-between border-2 border-zinc-800 rounded-lg p-2">
          <CardContent className="h-48 w-full overflow-hidden p-0">
            <img
              src={imageUrl}
              alt="image-pokemon"
              className="h-full w-full object-contain"
            />
          </CardContent>
          <CardTitle className="text-zinc-950 mt-4">
            {FormatPokemonName(name)}
          </CardTitle>
          <CardFooter className="flex flex-1 gap-2 items-end justify-between">
            {types.map((type) => {
              return (
                <Badge
                  key={type.slot}
                  variant="default"
                  className="flex items-center justify-center h-5"
                >
                  {TranslatePokemonType(type.type.name)}
                </Badge>
              );
            })}
          </CardFooter>
        </div>
      </DialogTrigger>

      <PokemonDetails open={isdetailsOpen} pokemonId={id} />
    </Dialog>
  );
}
