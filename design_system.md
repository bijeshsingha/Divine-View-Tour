# Hotel Divine View Design System

To ensure consistency across the Divine View brand, here are the exact styling tokens, colors, and typography used in the main hotel website. You can share this document directly with the team working on the `divineviewtours` site.

## 🎨 Color Palette

We use a nature-inspired, elegant palette focusing on deep greens and earthy slate backgrounds.

| Role | Color Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | Forest Green | `#064e3b` | Main buttons, active links, primary accents |
| **Primary Dark** | Deep Emerald | `#022c22` | Button hover states, dark footers |
| **Secondary** | Burnt Orange | `#c2410c` | Highlights, badges, secondary call-to-actions |
| **Secondary Dark**| Rust | `#9a3412` | Secondary hover states |
| **Background** | Slate Off-White| `#f8fafc` | Global app background |
| **Foreground** | Dark Stone | `#1c1917` | Default body text |

## 🔤 Typography

We pair a clean, modern sans-serif for readability with an elegant serif for headings to maintain a premium hospitality feel.

- **Headings (Serif):** `Playfair Display`
  - Used for: Page titles, section headers (e.g., `<h1 className="font-serif">`)
- **Body & UI (Sans-Serif):** `Inter`
  - Used for: Paragraphs, buttons, navigation, inputs, and all other text.

## 📐 UI Styling & Components

The design leans heavily into soft, approachable shapes with clean delineations.

- **Border Radius (Corners):** 
  - Cards and containers use large radiuses: `rounded-xl` (12px) or `rounded-2xl` (16px).
  - Buttons and badges often use `rounded-full` or `rounded-xl`.
- **Shadows & Depth:** 
  - Floating elements (like the Booking Cart) use `shadow-xl` to stand out.
  - Standard cards use `shadow-sm` and elevate to `shadow-md` on hover (`transition-shadow`).
- **Surfaces:**
  - Primary content surfaces are solid white (`#ffffff`).
  - Secondary or grouped content areas (like the inside of the cart widget or secondary badges) use a light stone background (`#fafaf9` / Tailwind `bg-stone-50`) to separate them from the pure white cards.

## 💻 Tailwind CSS Configuration

If the Tours site uses Tailwind CSS v4, they can drop this directly into their CSS file:

```css
@theme {
  --color-primary: #064e3b;
  --color-primary-dark: #022c22;
  --color-secondary: #c2410c;
  --color-secondary-dark: #9a3412;
  --color-background: #f8fafc;
  --color-foreground: #1c1917;

  --font-sans: var(--font-inter);
  --font-serif: var(--font-playfair);
}
```
