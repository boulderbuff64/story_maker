# /build-landing

Build and preview the landing page locally.

## Usage
```
/build-landing
```

## What This Does
1. Ensures all dependencies installed
2. Parses property data from `docs/reference/property_data.md`
3. Copies images to public folder
4. Runs Next.js development server
5. Opens preview in browser

## Prerequisites
- Node.js 18+ installed
- Photos in `assets/photos/`
- Property data complete
- Plans PDF ready for download

## Commands Run
```bash
cd src/landing-page
npm install
npm run dev
```

## Output
Local development server at `http://localhost:3000`
