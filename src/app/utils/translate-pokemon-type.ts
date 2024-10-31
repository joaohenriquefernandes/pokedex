export function TranslatePokemonType(type: string): string {
  const typeTranslations: { [key: string]: string } = {
    normal: 'Normal',
    fighting: 'Lutador',
    flying: 'Voador',
    poison: 'Venenoso',
    ground: 'Terra',
    rock: 'Pedra',
    bug: 'Inseto',
    ghost: 'Fantasma',
    steel: 'Aço',
    fire: 'Fogo',
    water: 'Água',
    grass: 'Grama',
    electric: 'Elétrico',
    psychic: 'Psíquico',
    ice: 'Gelo',
    dragon: 'Dragão',
    dark: 'Sombrio',
    fairy: 'Fada',
    stellar: 'Estelar',
    unknown: 'Desconhecido',
  };

  return typeTranslations[type.toLowerCase()] || 'Tipo desconhecido';
}
