import { menuItems } from './menu'
import type { MenuItem } from '../types'

// ── User inputs ────────────────────────────────────────────────────────────

export const MOOD_OPTIONS = [
  { id: 'coffee' as const, label: 'Coffee', emoji: '☕' },
  { id: 'filling' as const, label: 'Something filling', emoji: '🥪' },
  { id: 'comfort' as const, label: 'Comfort food', emoji: '🍝' },
  { id: 'sweet' as const, label: 'Something sweet', emoji: '🍰' },
  { id: 'flavorful' as const, label: 'Something flavorful', emoji: '🌶️' },
  { id: 'refreshing' as const, label: 'Something refreshing', emoji: '🧊' },
]

export const VIBE_OPTIONS = [
  { id: 'quickBite' as const, label: 'Quick bite', emoji: '⚡' },
  { id: 'chill' as const, label: 'Chill', emoji: '😌' },
  { id: 'date' as const, label: 'Date', emoji: '💑' },
  { id: 'study' as const, label: 'Study', emoji: '📚' },
  { id: 'catchup' as const, label: 'Catch-up', emoji: '💬' },
  { id: 'hungry' as const, label: 'Hungry', emoji: '🔥' },
]

export const DIET_OPTIONS = [
  { id: 'any' as const, label: 'No preference' },
  { id: 'veg' as const, label: 'Vegetarian' },
  { id: 'nonveg' as const, label: 'Non-vegetarian' },
]

export type Mood = (typeof MOOD_OPTIONS)[number]['id']
export type Vibe = (typeof VIBE_OPTIONS)[number]['id']
export type Diet = (typeof DIET_OPTIONS)[number]['id']

export interface TasteInput {
  mood: Mood
  vibe: Vibe
  diet: Diet
}

// ── Internal mapping helpers ────────────────────────────────────────────────

/** Which tags an item needs to satisfy a given mood well. */
const MOOD_TAGS: Record<Mood, string[]> = {
  coffee: ['coffee', 'caffeine'],
  filling: ['filling', 'hearty', 'savoury'],
  comfort: ['comfort', 'creamy', 'warm', 'cheesy', 'chocolate'],
  sweet: ['sweet', 'dessert', 'indulgent'],
  flavorful: ['spicy', 'smoky', 'flavourful', 'savoury'],
  refreshing: ['cold', 'refreshing', 'citrus', 'light'],
}

/** How a vibe biases which category + tags to look for. */
const VIBE_BIAS: Record<Vibe, { tags: string[]; categories: string[]; tagBoost: number }> = {
  quickBite: { tags: ['light', 'shareable'], categories: ['coffee', 'tea', 'snacks'], tagBoost: 3 },
  chill: { tags: ['smooth', 'creamy'], categories: ['coffee', 'tea'], tagBoost: 2 },
  date: { tags: ['sweet', 'date', 'indulgent', 'creamy'], categories: ['desserts', 'coffee'], tagBoost: 2 },
  study: { tags: ['caffeine', 'coffee'], categories: ['coffee', 'tea'], tagBoost: 2 },
  catchup: { tags: ['shareable', 'classic'], categories: ['snacks', 'beverages'], tagBoost: 1 },
  hungry: { tags: ['filling', 'hearty'], categories: ['pasta', 'sandwiches', 'snacks'], tagBoost: 4 },
}

const MOOD_ADJ: Record<Mood, string> = {
  coffee: 'a proper cup of coffee',
  filling: 'something filling',
  comfort: 'comfort food',
  sweet: 'something sweet',
  flavorful: 'something with bold flavour',
  refreshing: 'something refreshing',
}

const VIBE_WORD: Record<Vibe, string> = {
  quickBite: 'a quick bite ahead',
  chill: 'a slow, relaxed sit-down',
  date: 'a date-worthy moment',
  study: 'study fuel',
  catchup: 'a good catch-up',
  hungry: 'serious hunger',
}

// ── Recommendation engine ──────────────────────────────────────────────────

export interface Recommendation {
  item: MenuItem
  score: number
  reason: string
}

export function getRecommendations(input: TasteInput, allItems: MenuItem[] = menuItems): Recommendation[] {
  const { mood, vibe, diet } = input

  const moodTags = MOOD_TAGS[mood]
  const vibeBias = VIBE_BIAS[vibe]

  const scored = allItems
    .map((item): Recommendation | null => {
      // Dietary filter
      if (diet === 'veg' && !item.veg) return null
      if (diet === 'nonveg' && !item.veg) {
        // non-veg preference: veg items are allowed but score lower (handled below)
      }

      let score = 0

      // Mood match: each tag overlap is worth a point
      for (const tag of moodTags) {
        if (item.tags.includes(tag)) score += 3
      }

      // Category bonus for mood (e.g. coffee craving → coffee category)
      if (mood === 'coffee' && item.category === 'coffee') score += 4
      if (mood === 'sweet' && item.category === 'desserts') score += 3
      if (mood === 'comfort' && (item.category === 'pasta' || item.category === 'sandwiches')) score += 2
      if (mood === 'filling' && (item.category === 'pasta' || item.category === 'sandwiches')) score += 3
      if (mood === 'flavorful' && (item.category === 'snacks' || item.category === 'pasta')) score += 2
      if (mood === 'refreshing' && item.category === 'beverages') score += 3

      // Vibe bias
      for (const tag of vibeBias.tags) {
        if (item.tags.includes(tag)) score += vibeBias.tagBoost
      }
      if (vibeBias.categories.includes(item.category)) score += vibeBias.tagBoost

      // Non-veg bonus
      if (diet === 'nonveg' && !item.veg) score += 3

      if (score <= 0) return null

      // Compose a reason string
      const reason = `Based on your craving for ${MOOD_ADJ[mood]} and ${VIBE_WORD[vibe]}, this is a great match.`

      return { item, score, reason }
    })
    .filter((r): r is Recommendation => r !== null)

  scored.sort((a, b) => b.score - a.score)

  return scored.slice(0, 3)
}

/**
 * smartRecommend — UI-facing convenience function that returns the top pick.
 * Swap the body with a real AI endpoint (e.g. POST to /api/taste-ai) later.
 */
export function smartRecommend(input: TasteInput): Recommendation | undefined {
  return getRecommendations(input)[0]
}