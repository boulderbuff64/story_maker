# Product Requirements Document (PRD): BloomFizzy Magic Storybook

## 1. Project Overview
The **BloomFizzy Magic Storybook** is a branded, interactive landing page designed to enhance the post-bath experience for children. After a child finds a toy inside their BloomFizzy bath bomb, the parent uses this tool to generate a personalized, AI-narrated bedtime story featuring that specific toy and the child.

## 2. Target Audience
* **Primary User:** Parents/Grandparents looking for a magical bedtime routine.
* **End User:** Children (ages 3-7) who have just finished a bath with a BloomFizzy product.

## 3. Brand Identity & Aesthetic
* **Company Name:** BloomFizzy Store.
* **Visual Style:** High-energy, whimsical, and colorful.
* **Color Palette:** Use the vibrant blues, pinks, and "sunset" gradients found on the 30-pack packaging.
* **Imagery:** Use product photography of the land and sea creature sets.

## 4. Technical Stack Requirements
* **Framework:** Next.js (App Router) with Tailwind CSS.
* **LLM API:** Anthropic (Claude-3-5-Sonnet) for story generation.
* **Audio API:** ElevenLabs (TTS) for high-quality narration.
* **Hosting:** Vercel (standard for Claude Code deployments).

## 5. Functional Specifications

### 5.1 The Input Form
A single-page, mobile-responsive form with the following fields:
* **Child's Name:** (Text Input)
* **Toy Character:** (Dropdown) Include all 30 options (Unicorn, Dinosaur, Dolphin, Penguin, Owl, Turtle, Shark, etc.).
* **Toy's Name:** (Text Input) e.g., "What did you name your new friend?"
* **Story Theme:** (Dropdown) Dinosaurs, Princesses, Sea Creatures, Pirates, Space Explorers.
* **Story Vibe:** (Dropdown) Funny & Silly, Calm & Sleepy, Action & Adventure.
* **Bath Bomb Scent:** (Dropdown) Lavender, Sweet Orange, Watermelon, Eucalyptus, etc.
* **Length:** (Dropdown) <1 min, 2-3 mins, 5 mins.

### 5.2 The "Magic Trigger"
* **Action:** A button labeled **"Open the Storybook"**.
* **UX Effect:** Upon clicking, trigger a "fizzing" or "sparkling" loading state that hides the form and prepares the story view.

### 5.3 Story Content Generation (Anthropic Prompting)
* **Persona:** Write as a "Master Storyteller" with a warm, motherly, and slightly dramatic tone.
* **Requirements:** Must weave in the child's name, the toy's name, and the scent of the bath bomb as a sensory detail in the story.
* **Output:** Return raw text for the UI and a formatted string for the TTS engine.

### 5.4 Audio Narration (ElevenLabs)
* **Voice:** Select a "Motherly/Dramatic" voice (e.g., "Nicole" or "Matilda" style).
* **Features:** Include a play/pause button and a progress bar above the generated text.

## 6. Layout & UI Sections
1.  **Header:** BloomFizzy Logo and a "Magic Storybook" title.
2.  **Hero/Form Section:** The personalization inputs described in 5.1.
3.  **Story Display (Conditional):** A "Paper-Texture" or "Book" container that appears after the trigger. It should house the Audio Player and the Story Text.
4.  **Conversion Section (CTA):** "Recommended for You" section featuring:
    * The 15-pack Land Animal Box.
    * The 15-pack Sea Creature Box.
    * CTA Button: "Shop BloomFizzy on Amazon."

## 7. Success Metrics
* Successful API handshake between Anthropic and ElevenLabs.
* Mobile responsiveness (most parents will use this on a phone/tablet at bedside).
* Page load time under 2 seconds (excluding AI generation time).
