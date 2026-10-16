# Explorables workflow

_Basically a reminder note-to-self on how to create, edit and add to this repo!_

### Layout Reminder

- Landing page = `index.html`, lists each 'explorable' under its section (`<section id="{section}">`)
- Each 'explorable' lives at `{section}/{topic}/index.html`, e.g. `pharmacology/dose-ratios/`
  - `{topic}` is descriptive, never numbered, so URLs (and QR codes) survive reordering
  - Series order lives only on the landing page and in each page's Previous/Next nav
  - `{section}/index.html` just redirects to `../#{section}`
  - From a page, the root is `../../` (back link → `../../#{section}`, shared JS → `../../assets/`)
- Marimo source `.py` files are contained in `notebooks`

### A. Making quick HTML explorables

1. Sketch out and explore topic (pen and paper etc)
2. Write up detailed spec prompt for LLM to create self-contained HTML file
3. Iterate HTML,
   - Don't let LLM guide creation
   - If not fully self contained test whole repo with `python -m http.server` in repo root, then open `localhost:8000/{section}/{topic}/`
   - Optionally, add link back to landing page
4. Finalise
   - Save as `{section}/{topic}/index.html`
   - Update landing page (and Previous/Next nav if it's part of a series)
5. Publish and check live version

### B. Making marimo pages

1. Ideally create the marimo file via `poetry run marimo edit notebooks/{topic}.py`
2. Export files via `poetry run marimo export html-wasm notebooks/{topic}.py -o {section}/{topic} --mode run`
3. View via
   - `python -m http.server`
   - `localhost:8000/{section}/{topic}/`
4. Iterate by editing, re-exporting and viewing
5. Optional extras
   - Add "View source" link for easier transparency
   - Add link back to landing page
6. Finalise
   1. Final export (as above)
   2. Update landing page
7. Publish and check live version
