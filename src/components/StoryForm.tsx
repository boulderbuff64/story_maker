'use client'

import { TOY_CHARACTERS, SCENTS, STORY_THEMES, STORY_VIBES, STORY_LENGTHS } from '@/lib/constants'

export interface StoryFormData {
  childName: string
  toyCharacter: string
  toyName: string
  storyTheme: string
  storyVibe: string
  scent: string
  length: string
}

interface StoryFormProps {
  formData: StoryFormData
  onChange: (data: StoryFormData) => void
  onSubmit: () => void
  isLoading: boolean
}

export default function StoryForm({ formData, onChange, onSubmit, isLoading }: StoryFormProps) {
  const handleChange = (field: keyof StoryFormData, value: string) => {
    onChange({ ...formData, [field]: value })
  }

  const isValid = true

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-white/50">
      <div className="space-y-6">
        {/* Child's Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Child&apos;s Name
          </label>
          <input
            type="text"
            placeholder="Enter your child's name"
            value={formData.childName}
            onChange={(e) => handleChange('childName', e.target.value)}
            className="form-input"
          />
        </div>

        {/* Toy Character */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Toy Character
          </label>
          <select
            value={formData.toyCharacter}
            onChange={(e) => handleChange('toyCharacter', e.target.value)}
            className="form-select"
          >
            <option value="">Select your bath bomb toy...</option>
            <optgroup label="Land Animals">
              {TOY_CHARACTERS.slice(0, 15).map((toy) => (
                <option key={toy} value={toy}>{toy}</option>
              ))}
            </optgroup>
            <optgroup label="Sea Creatures">
              {TOY_CHARACTERS.slice(15).map((toy) => (
                <option key={toy} value={toy}>{toy}</option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Toy's Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            What did you name your new friend?
          </label>
          <input
            type="text"
            placeholder="e.g., Sparkle, Bubbles, Captain Splash"
            value={formData.toyName}
            onChange={(e) => handleChange('toyName', e.target.value)}
            className="form-input"
          />
        </div>

        {/* Story Theme & Vibe - Side by Side on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Story Theme
            </label>
            <select
              value={formData.storyTheme}
              onChange={(e) => handleChange('storyTheme', e.target.value)}
              className="form-select"
            >
              <option value="">Select a theme...</option>
              {STORY_THEMES.map((theme) => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Story Vibe
            </label>
            <select
              value={formData.storyVibe}
              onChange={(e) => handleChange('storyVibe', e.target.value)}
              className="form-select"
            >
              <option value="">Select a vibe...</option>
              {STORY_VIBES.map((vibe) => (
                <option key={vibe} value={vibe}>{vibe}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Scent & Length - Side by Side on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bath Bomb Scent
            </label>
            <select
              value={formData.scent}
              onChange={(e) => handleChange('scent', e.target.value)}
              className="form-select"
            >
              <option value="">Select your scent...</option>
              {SCENTS.map((scent) => (
                <option key={scent} value={scent}>{scent}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Story Length
            </label>
            <select
              value={formData.length}
              onChange={(e) => handleChange('length', e.target.value)}
              className="form-select"
            >
              <option value="">Select length...</option>
              {STORY_LENGTHS.map((length) => (
                <option key={length.value} value={length.value}>{length.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          disabled={!isValid || isLoading}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-lg text-white shadow-lg
            transition-all duration-300 transform
            ${isValid && !isLoading
              ? 'bg-gradient-sunset hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed'
            }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating Magic...
            </span>
          ) : (
            '✨ Open the Storybook ✨'
          )}
        </button>
      </div>
    </div>
  )
}
