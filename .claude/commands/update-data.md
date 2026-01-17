# /update-data

Refresh property data across all outputs after editing property_data.md.

## Usage
```
/update-data
```

## What This Does
1. Validates `docs/reference/property_data.md` for completeness
2. Regenerates PDF with new data
3. Rebuilds landing page
4. Runs verification checks

## When to Use
After any changes to:
- Asking price
- Property details
- Financial projections
- Contact information

## Verification Checklist
- [ ] PDF reflects new data
- [ ] Landing page reflects new data
- [ ] Financial tables are consistent
- [ ] No broken references
