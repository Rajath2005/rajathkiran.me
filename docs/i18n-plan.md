# Internationalization (i18n) Strategy Plan

To make the portfolio globally accessible and highly relevant for recruiters across different regions in India, this repository plans to implement multilingual support for its documentation.

Following the best practices from the `readme-i18n` skill, this document outlines the strategy for adding **Kannada (kn)** and **Hindi (hi)** translations to the primary `README.md`.

---

## 🌍 Supported Languages

| Language | BCP47 Tag | Target File | Status |
|----------|-----------|-------------|--------|
| English (Source) | `en` | `README.md` | Active |
| Kannada | `kn` | `README.kn.md` | Planned |
| Hindi | `hi` | `README.hi.md` | Planned |

---

## 🛠️ Translation Workflow Strategy

When triggering the AI agent or translation pipeline to generate the localized files, the following strict constraints must be observed to avoid breaking repository mechanics:

### 1. Source of Truth
`README.md` (English) remains the authoritative source. All translations must derive directly from its structural layout.

### 2. Preservation Guidelines
The following elements must **NOT** be translated:
- Code fences (e.g., `git clone ...`)
- Inline code spans (e.g., `ai-chat.js`, `npm install`)
- URLs, file paths, and relative markdown links
- HTML attributes, standard classes, and markdown comments
- Proper nouns (e.g., "Rajath Kiran A", "Google Gemini", "Netlify")

### 3. Structural Integrity
- The Markdown heading hierarchy must perfectly mirror the English version.
- When a heading is translated (e.g., `## Visual Showcase`), any internal anchor links pointing to it must be updated to match the generated slug of the localized text.

---

## 🌐 Language Selector Component

A language switcher block will be placed at the very top of all README variants (immediately below the banner). 

**Proposed Markdown Template:**
```markdown
<!-- LANGUAGE-SELECTOR-START -->
*Read this in other languages:*
- [English](README.md) *(Current)*
- [ಕನ್ನಡ / Kannada](README.kn.md)
- [हिन्दी / Hindi](README.hi.md)
<!-- LANGUAGE-SELECTOR-END -->
```

*(This block will dynamically highlight the current language depending on the file you are viewing.)*

---

## 📝 Glossary & Do-Not-Translate List

To maintain technical accuracy, the following technical terms should remain in English (or transliterated, rather than translated literally) across all variants:

- "Cloud Engineer"
- "AI/ML Developer"
- "Full Stack Engineer"
- "Google Cloud Platform (GCP)"
- "React.js"
- "Node.js"
- "TensorFlow" / "PyTorch"
- "Netlify Functions"
- "Programmatic SEO"

---

## 🚀 Execution Steps

1. **Verify** that the source `README.md` is in its final, stable state.
2. **Invoke** the `.agents/skills/readme-i18n` tool.
3. **Generate** `README.kn.md` and verify anchor links.
4. **Generate** `README.hi.md` and verify anchor links.
5. **Inject** the Language Selector into all three files simultaneously.
