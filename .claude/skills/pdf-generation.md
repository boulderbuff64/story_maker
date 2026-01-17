# Skill: PDF Offer Memorandum Generation

## When to Use
When asked to create, update, or regenerate the Offer Memorandum PDF.

## Prerequisites
- Property data in `docs/reference/property_data.md`
- Photos in `assets/photos/`
- Plans in `assets/plans/`
- Branding in `assets/branding/`

## Process

### 1. Load Data
```python
# Parse property_data.md for all property information
# This is the single source of truth
```

### 2. Generate Sections
Follow the section order in `docs/active/PRD.md`:
1. Cover
2. Table of Contents
3. Executive Summary
4. Property Overview
5. Development Potential
6. Grandfathered Advantage
7. Location
8. Financial Analysis
9. Pro Forma
10. Profit Forecast
11. Comparable Sales
12. Site Plans
13. ADU Floor Plans
14. Renderings
15. Offering Process
16. Contact

### 3. Apply Design
- Use colors from ADR 002
- Landscape orientation
- Full-bleed photos where specified
- Clean data tables

### 4. Output
Save to `output/tennyson-offer-memorandum.pdf`

## Quality Checklist
- [ ] All data matches property_data.md
- [ ] Photos are high resolution (300 DPI for print)
- [ ] Financial numbers are clearly labeled as estimates
- [ ] Disclaimers included
- [ ] Next Wave Group branding present
- [ ] Contact information correct
