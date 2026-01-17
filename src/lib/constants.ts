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

// Bath Bomb Scents (15)
export const SCENTS = [
  'Fruity Burst',
  'Watermelon',
  'Papaya',
  'White Peach Oolong',
  'Pineapple',
  'Vanilla',
  'Gardenia',
  'Mint',
  'Lavender',
  'Potent Eucalyptus',
  'Rose',
  'Jasmine',
  'Baby Orchid',
  'Orange',
  'Lemon',
] as const

// Story Themes
export const STORY_THEMES = [
  'Dinosaurs',
  'Princesses',
  'Sea Creatures',
  'Pirates',
  'Space Explorers',
] as const

// Story Vibes
export const STORY_VIBES = [
  'Funny & Silly',
  'Calm & Sleepy',
  'Action & Adventure',
] as const

// Story Lengths
export const STORY_LENGTHS = [
  { label: 'Short (< 1 min)', value: 'short', words: 150 },
  { label: 'Medium (2-3 mins)', value: 'medium', words: 400 },
  { label: 'Long (5 mins)', value: 'long', words: 750 },
] as const

// Amazon product link
export const AMAZON_LINK = 'https://www.amazon.com/Kids-Bath-Bombs-Surprise-Inside/dp/B0CFQ2NHSC/'

export type ToyCharacter = typeof TOY_CHARACTERS[number]
export type Scent = typeof SCENTS[number]
export type StoryTheme = typeof STORY_THEMES[number]
export type StoryVibe = typeof STORY_VIBES[number]
export type StoryLength = typeof STORY_LENGTHS[number]['value']
