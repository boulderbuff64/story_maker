# /build-pdf

Generate or regenerate the Offer Memorandum PDF.

## Usage
```
/build-pdf
```

## What This Does
1. Loads property data from `docs/reference/property_data.md`
2. Loads photos from `assets/photos/`
3. Loads plans from `assets/plans/`
4. Generates PDF using the pdf-generation skill
5. Outputs to `output/tennyson-offer-memorandum.pdf`

## Prerequisites
- All photos uploaded to `assets/photos/`
- All plans uploaded to `assets/plans/`
- Branding files in `assets/branding/`
- Property data complete in `property_data.md`
- Financial analysis complete

## Output
`output/tennyson-offer-memorandum.pdf`
