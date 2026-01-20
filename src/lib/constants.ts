// Land Animals (15)
export const LAND_ANIMALS = [
  'Unicorn',
  'Dinosaur',
  'Owl',
  'Turtle',
  'Elephant',
  'Lion',
  'Giraffe',
  'Bunny',
  'Bear',
  'Fox',
  'Monkey',
  'Panda',
  'Koala',
  'Butterfly',
  'Ladybug',
] as const

// Sea Creatures (15)
export const SEA_CREATURES = [
  'Dolphin',
  'Penguin',
  'Shark',
  'Jellyfish',
  'Seahorse',
  'Octopus',
  'Whale',
  'Starfish',
  'Crab',
  'Sea Turtle',
  'Clownfish',
  'Mermaid',
  'Seal',
  'Otter',
  'Narwhal',
] as const

// All 30 Toy Characters
export const TOY_CHARACTERS = [...LAND_ANIMALS, ...SEA_CREATURES] as const

// Story Types
export const STORY_TYPES = [
  { value: 'rhythmic-rhyme', label: 'Rhythmic Rhyme' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'fairy-tale', label: 'Fairy Tale' },
  { value: 'bedtime-soother', label: 'Bedtime Soother' },
  { value: 'onomatopoeia', label: 'Onomatopoeia Adventure' },
] as const

// Story Lengths
export const STORY_LENGTHS = [
  { label: 'Short (< 1 min)', value: 'short', words: 150 },
  { label: 'Medium (2-3 mins)', value: 'medium', words: 400 },
  { label: 'Long (5 mins)', value: 'long', words: 750 },
] as const

// Amazon storefront
export const AMAZON_LINK = 'https://www.amazon.com/stores/BloomFizzy/page/08AE1239-24B7-48C4-81FF-37F0A7BD2E82?lp_asin=B0CFQ2NHSC&ref_=ast_bln&store_ref=bl_ast_dp_brandLogo_sto'

// Individual product links
export const SEA_SURPRISE_LINK = 'https://www.amazon.com/Sea-Surprise-Bath-Bombs-Kids/dp/B0CH6FPWBN?ref_=ast_sto_dp&th=1&psc=1'
export const JUNGLE_ADVENTURE_LINK = 'https://www.amazon.com/Jungle-Adventure-Bath-Bombs-Kids/dp/B0CKQTFGBL?ref_=ast_sto_dp&th=1&psc=1'

export type ToyCharacter = typeof TOY_CHARACTERS[number]
export type StoryType = typeof STORY_TYPES[number]['value']
export type StoryLength = typeof STORY_LENGTHS[number]['value']
