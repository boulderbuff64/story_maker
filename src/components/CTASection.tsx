'use client'

import Image from 'next/image'
import { AMAZON_LINK, SEA_SURPRISE_LINK, JUNGLE_ADVENTURE_LINK } from '@/lib/constants'

export default function CTASection() {
  return (
    <section className="w-full max-w-4xl mx-auto mt-16 mb-8 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Recommended for You
        </h2>
        <p className="text-gray-600">
          Continue the magic with more BloomFizzy bath bombs!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Land Animal Box */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-shadow">
          <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
            <Image
              src="https://m.media-amazon.com/images/I/710K6vakjXL._AC_SL1500_.jpg"
              alt="Jungle Adventure Bath Bombs for kids"
              width={1500}
              height={1500}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">
            Jungle Adventure Bath Bombs
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Explore the wild with this exciting jungle-themed bath bomb with surprise toys inside!
          </p>
          <a
            href={JUNGLE_ADVENTURE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 px-4 bg-gradient-sunset text-white text-center font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Shop on Amazon
          </a>
        </div>

        {/* Sea Creature Box */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-shadow">
          <div className="aspect-square bg-gradient-to-br from-blue-100 to-cyan-200 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
            <Image
              src="https://m.media-amazon.com/images/I/71Pfe15CvcL._AC_SL1500_.jpg"
              alt="Sea Surprise Bath Bomb for kids"
              width={1500}
              height={1500}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">
            Sea Surprise Bath Bomb
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Dive into adventure with this magical sea-themed bath bomb with surprise toys inside!
          </p>
          <a
            href={SEA_SURPRISE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 px-4 bg-gradient-ocean text-white text-center font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Shop on Amazon
          </a>
        </div>
      </div>

      {/* Main CTA */}
      <div className="mt-8 text-center">
        <a
          href={AMAZON_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 py-4 px-8 bg-gradient-bloom text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          <span>Shop BloomFizzy on Amazon</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
