'use client'

export default function Header() {
  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
        {/* BloomFizzy Logo with Red Background */}
        <div className="bg-bloom-red rounded-full px-12 py-4 shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
            BloomFizzy
          </h1>
        </div>

        {/* Tagline */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-600 tracking-wider">
          WHERE BATH MEETS MAGIC!
        </h2>
      </div>
    </header>
  )
}
