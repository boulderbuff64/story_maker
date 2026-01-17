'use client'

export default function Header() {
  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-2">
        {/* Styled Text Logo */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-sunset bg-clip-text text-transparent drop-shadow-sm">
          BloomFizzy
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <h2 className="text-xl md:text-2xl font-semibold text-bloom-purple">
            Magic Storybook
          </h2>
          <span className="text-2xl">✨</span>
        </div>
        <p className="text-gray-600 text-center text-sm md:text-base mt-2">
          Create a personalized story for your little one
        </p>
      </div>
    </header>
  )
}
