import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { RefreshCw, Sparkles } from 'lucide-react'
import {
  DIET_OPTIONS,
  MOOD_OPTIONS,
  VIBE_OPTIONS,
  getRecommendations,
  type Diet,
  type Mood,
  type Recommendation,
  type Vibe,
} from '../data/tasteAI'
import { categoryLabel } from '../types'
import CafeImage from './CafeImage'
import { cn } from '../lib/cn'

type Step = 0 | 1 | 2 | 3

const QUESTIONS = ['What are you in the mood for?', "What's your vibe?", 'Any preference?']

type OptionKind = 'mood' | 'vibe' | 'diet'

const KIND_OF_STEP: Record<Step, OptionKind> = { 0: 'mood', 1: 'vibe', 2: 'diet', 3: 'diet' }

function StepIndicator({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            'h-1.5 rounded-full transition-all duration-500',
            i === step ? 'w-7 bg-terracotta' : i < step ? 'w-4 bg-espresso/50' : 'w-4 bg-espresso/15',
          )}
        />
      ))}
    </div>
  )
}

function EmojiChip({
  label,
  emoji,
  selected,
  onClick,
}: {
  label: string
  emoji?: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300',
        selected
          ? 'border-espresso bg-espresso text-ivory'
          : 'border-espresso/15 bg-ivory/70 text-espresso hover:-translate-y-0.5 hover:border-terracotta/60',
      )}
    >
      {emoji && <span aria-hidden="true">{emoji}</span>}
      {label}
    </button>
  )
}

export default function TasteAI() {
  const [step, setStep] = useState<Step>(0)
  const [mood, setMood] = useState<Mood | null>(null)
  const [vibe, setVibe] = useState<Vibe | null>(null)
  const [diet, setDiet] = useState<Diet | null>(null)
  const [recos, setRecos] = useState<Recommendation[]>([])
  const [pick, setPick] = useState(0)

  const result = recos[pick]

  function select(kind: OptionKind, value: Mood | Vibe | Diet) {
    if (kind === 'mood') setMood(value as Mood)
    if (kind === 'vibe') setVibe(value as Vibe)
    if (kind === 'diet') setDiet(value as Diet)

    const next = (step + 1) as Step
    setStep(next)
    if (next === 3) {
      // compute on the freshly-updated state
      const m = kind === 'mood' ? (value as Mood) : mood
      const v = kind === 'vibe' ? (value as Vibe) : vibe
      const d = kind === 'diet' ? (value as Diet) : diet
      if (m && v && d) {
        const r = getRecommendations({ mood: m, vibe: v, diet: d })
        setRecos(r)
        setPick(0)
      }
    }
  }

  function back() {
    if (step === 3) {
      setStep(2)
      return
    }
    if (step > 0) setStep(((step - 1) as Step))
  }

  function reset() {
    setStep(0)
    setMood(null)
    setVibe(null)
    setDiet(null)
    setRecos([])
    setPick(0)
  }

  function nextRecommendation() {
    setPick((p) => (p + 1) % Math.max(recos.length, 1))
  }

  const opConfig =
    step === 0 ? MOOD_OPTIONS : step === 1 ? VIBE_OPTIONS : DIET_OPTIONS

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-espresso/8 bg-paper/60">
      {/* faint backdrop word */}
      <span className="pointer-events-none absolute -right-6 top-2 hidden select-none font-display text-[9rem] font-bold leading-none text-espresso/[0.05] lg:block">
        SPOON
      </span>

      <div className="relative p-6 md:p-12">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-terracotta/10 px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-clay">
              <Sparkles className="h-3.5 w-3.5" />
              Taste AI
            </p>
            <h3 className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold leading-tight">
              Not sure what to order?
            </h3>
            <p className="mt-2 text-sm text-coffee">
              Let Taste AI find your kind of bite.
            </p>
          </div>
          <StepIndicator step={step} />
        </div>

        {/* Steps / Result */}
        <AnimatePresence mode="wait">
          {step < 3 ? (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-5 font-display text-xl italic text-espresso">
                {QUESTIONS[step]}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {(opConfig as Array<{ id: string; label: string; emoji?: string }>).map((opt) => {
                  const kind = KIND_OF_STEP[step]
                  const current = kind === 'mood' ? mood : kind === 'vibe' ? vibe : diet
                  return (
                    <EmojiChip
                      key={opt.id}
                      label={opt.label}
                      emoji={opt.emoji}
                      selected={current === opt.id}
                      onClick={() => select(kind, opt.id as Mood & Vibe & Diet)}
                    />
                  )
                })}
              </div>

              {step > 0 && (
                <button
                  type="button"
                  onClick={back}
                  className="mt-6 text-xs font-semibold uppercase tracking-widest text-coffee underline-offset-4 hover:underline"
                >
                  ← Back
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {result ? (
                <div className="grid gap-6 md:grid-cols-[9rem_1fr] md:gap-8">
                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.12 }}
                    className="relative aspect-square overflow-hidden rounded-2xl bg-paper"
                  >
                    <CafeImage src={result.item.image} alt={result.item.name} />
                  </motion.div>

                  <div>
                    <p className="text-[0.6875rem] font-bold uppercase tracking-[0.24em] text-terracotta">
                      Try this
                    </p>
                    <h4 className="mt-1 font-display text-3xl font-semibold">
                      {result.item.name}
                    </h4>
                    <p className="mt-1 text-[0.8125rem] font-semibold text-coffee">
                      {categoryLabel(result.item.category)} · ₹{result.item.price}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-espresso/80">
                      {result.item.description}
                    </p>

                    <div className="mt-5 rounded-xl border border-terracotta/20 bg-terracotta/8 px-4 py-3.5">
                      <p className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-clay">
                        Why it matches
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-espresso">
                        {result.reason}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={nextRecommendation}
                        className="inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-2.5 text-[0.8125rem] font-semibold text-ivory transition-colors hover:bg-terracotta"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Try another
                      </button>
                      <button
                        type="button"
                        onClick={reset}
                        className="text-[0.8125rem] font-semibold text-coffee underline-offset-4 hover:text-espresso hover:underline"
                      >
                        Start over
                      </button>
                      <Link
                        to="/menu"
                        className="text-[0.8125rem] font-semibold text-coffee underline-offset-4 hover:text-espresso hover:underline"
                      >
                        See full menu →
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="py-8 text-center text-sm text-coffee">
                  Hmm, nothing quite matched. Try another combination.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}