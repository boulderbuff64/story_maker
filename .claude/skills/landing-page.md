# Skill: Landing Page Development

## When to Use
When asked to create, update, or deploy the property landing page.

## Prerequisites
- Property data in `docs/reference/property_data.md`
- Photos in `assets/photos/`
- Branding in `assets/branding/`
- Plans PDF for download

## Tech Stack
- Next.js 14+ (App Router)
- Tailwind CSS
- Vercel deployment

## Component Structure

```
src/landing-page/
├── app/
│   ├── page.tsx           # Main page composition
│   ├── layout.tsx         # Root layout, fonts, metadata
│   └── api/
│       └── subscribe/
│           └── route.ts   # Email capture endpoint
├── components/
│   ├── Hero.tsx           # Property image + headline + price
│   ├── Highlights.tsx     # Key bullet points with icons
│   ├── Gallery.tsx        # Photo lightbox
│   ├── Opportunity.tsx    # Grandfathered ADU story
│   ├── Development.tsx    # 8 ADU summary with visuals
│   ├── Location.tsx       # Map + neighborhood
│   ├── EmailCapture.tsx   # Form component
│   ├── Contact.tsx        # Next Wave Group info
│   └── Footer.tsx         # Disclaimers + branding
├── lib/
│   ├── propertyData.ts    # Parsed from property_data.md
│   └── email.ts           # Email sending logic
└── public/
    ├── images/            # Optimized property photos
    └── plans.pdf          # Auto-delivered on signup
```

## Design Guidelines
Reference ADR 002 for:
- Color palette (charcoal, gold, cream)
- Typography (Inter)
- Component patterns

## Email Capture Flow
Reference ADR 004 for implementation details.

## Deployment
```bash
# Local development
npm run dev

# Build
npm run build

# Deploy
vercel --prod
```

## Quality Checklist
- [ ] Mobile responsive (test on phone)
- [ ] Lighthouse score 90+
- [ ] Email capture works end-to-end
- [ ] Plans PDF downloads correctly
- [ ] All images optimized
- [ ] Contact info correct
- [ ] Disclaimers in footer
