export type MenuCategory =
  | 'coffee'
  | 'tea'
  | 'snacks'
  | 'sandwiches'
  | 'pasta'
  | 'desserts'
  | 'beverages'

export type GalleryCategory = 'food' | 'coffee' | 'interior' | 'moments'

export type PlaceholderVariant =
  | 'coffee'
  | 'tea'
  | 'sandwich'
  | 'pasta'
  | 'dessert'
  | 'snack'
  | 'beverage'
  | 'interior'

/** Doors open the door for a real photo: put a file (e.g. `shef.jpg`) or use a variant key. */
export type ImageSource = PlaceholderVariant | (string & {})

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: MenuCategory
  /** keywords used by the Taste AI recommendation engine */
  tags: string[]
  veg: boolean
  image: ImageSource
  featured?: boolean
}

export interface GalleryImage {
  id: string
  title: string
  category: GalleryCategory
  image: ImageSource
  aspect: string
}

export interface MenuCategoryMeta {
  id: MenuCategory
  label: string
}

export const MENU_CATEGORIES: MenuCategoryMeta[] = [
  { id: 'coffee', label: 'Coffee' },
  { id: 'tea', label: 'Tea' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'sandwiches', label: 'Sandwiches' },
  { id: 'pasta', label: 'Pasta' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'beverages', label: 'Beverages' },
]

export function categoryLabel(id: MenuCategory): string {
  return MENU_CATEGORIES.find((c) => c.id === id)?.label ?? id
}