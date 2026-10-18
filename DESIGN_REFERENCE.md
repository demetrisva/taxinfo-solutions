# TaxInfo Solutions: Design System Reference Guide

## Quick Color Reference

Mediterranean daylight palette (October 2026). All tokens live in `:root` in
`style.css`, with a matching dark-mode set under `prefers-color-scheme: dark`.

```
Text-safe colours (AA on white and page background)
Brand teal:       #0a7a69  --brand        Buttons, links, companies
Brand strong:     #075d51  --brand-strong Hover, table headers
Sky blue:         #1d5fc9  --blue         Links, individuals
Violet:           #6343c9  --violet       Employers / payroll
Coral:            #c2410c  --coral        VAT and operations
Amber:            #a85a06  --amber        Watch panels, deadlines
Heading text:     #102330  --text-heading
Body text:        #24384a  --text-main
Muted text:       #556a7c  --text-muted
Faint text:       #5f7385  --text-faint

Decorative accents (fills, ribbons and bars only, never body text)
Sea:  #12a58f   Sky: #3b8cf0   Lilac: #8f74f0   Sun: #f6b93b   Peach: #ff8a65
Ribbon: --ribbon (sea → sky → lilac → sun → peach), used on the navbar,
footer, hero insight card and data cards.

Surfaces
Page background:  #f6f8fb  --bg-body
Cards:            #ffffff  --bg-surface
Subtle:           #f0f4f8  --bg-subtle
Footer:           #0c2b38  --bg-footer
```

### Audience colour identity

| Audience            | Text token | Fill token |
|---------------------|-----------|-----------|
| Individuals         | `--blue`   | `--sky`   |
| Employers / payroll | `--violet` | `--lilac` |
| Companies           | `--brand`  | `--sea`   |
| VAT / operations    | `--coral`  | `--peach` |

Cards in four-column groups (`.hero-route-card`, `.operation-card`,
`.briefing-panel`) pick these up by position through `--accent`,
`--accent-fill` and `--accent-soft`.

### Backgrounds

- **Site-wide ledger paper:** `images/bg-ledger-math.svg` (640px tile) is
  applied as a CSS mask on a fixed `body::before`, filled with `--grad-text`.
  It shows ruled lines, column rules and calculation marks (€, %, Σ, ×, ÷,
  mini charts, a small calculator) at `--desk-pattern-opacity` (13% light,
  15% dark).
- **Hero desk scene:** `images/hero-calc-scene.svg` (calculator, 2026 PAYE
  worksheet, VAT chart, 15% donut, band table and formulas) is masked onto
  `.hero-section::after`, intersected with a left-to-right fade so the
  heading and intro text stay clean. Opacity is `--desk-scene-opacity`
  (34% light, 38% dark); smaller and fainter below 900px.
- The worksheet figures match the site calculator for EUR 48,000 under
  2026 rules (SI 4,224, GESY 1,272, tax 4,651, net 37,853). Update the SVG if
  rates change.
- Both are hidden in print.

### Buttons

Primary buttons use `--grad-brand` (teal → sea blue) with `--on-brand` text
(white in light mode, deep navy in dark mode) and lift 1px on hover. Hover
movement is disabled under `prefers-reduced-motion`.

## Component Quick Reference

### Buttons
```html
<!-- Primary Button (Blue) -->
<button class="btn-primary">Action</button>

<!-- Secondary Button (Outlined) -->
<button class="btn-secondary">Option</button>

<!-- Navigation Button -->
<a href="#" class="btn-nav">Navigate</a>
```

**States:**
- Default: `--grad-brand` gradient
- Hover: `--grad-brand-hover` + glow shadow + 1px lift
- Secondary hover: sky border on `--blue-soft`

---

### Cards & Containers
```html
<!-- Standard Card -->
<div class="thread-post">
  <h2>Card Title</h2>
  <p>Content goes here...</p>
</div>

<!-- Summary Card -->
<article class="thread-summary-card">
  Content...
</article>
```

**Styling:**
- White background
- Light border
- Small shadow
- 12–16px border radius
- Colored 4px accent bar from the audience palette
- Hover: medium shadow, accent-tinted border, 2px lift

---

### Badges
```html
<!-- Info Badge -->
<span class="badge-info">Label</span>

<!-- Success Badge -->
<span class="badge badge-success">Done</span>

<!-- Warning Badge -->
<span class="badge badge-warning">Alert</span>

<!-- Thread Badge -->
<span class="thread-badge">Briefing</span>
```

---

### Lists & Checklists
```html
<!-- Checklist with Checkmarks -->
<ul class="check-list">
  <li>Item completed</li>
  <li>Another item</li>
</ul>

<!-- Feature List with Arrows -->
<ul class="feature-list">
  <li>First feature</li>
  <li>Second feature</li>
</ul>
```

**List Styles:**
- Check-list: Green ✓ bullets
- Feature-list: Blue → bullets
- Standard ul: Regular bullets

---

### Forms & Inputs
```html
<!-- Text Input -->
<input type="text" placeholder="Enter text">

<!-- Number Input -->
<input type="number" placeholder="Amount">

<!-- Select Dropdown -->
<select>
  <option>Choose option</option>
</select>

<!-- Form Group -->
<div class="form-group">
  <label for="field">Field Label</label>
  <input type="text" id="field">
</div>
```

**Input Styling:**
- Light border
- Blue focus ring
- Rounded corners
- Proper padding

---

### Tables
```html
<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>
```

**Styling:**
- Mint-tinted header with brand-strong text and a sea underline
- Sky-tinted row hover
- Hover row highlighting
- Proper borders

---

### Alerts
```html
<!-- Info Alert -->
<div class="alert alert-info">
  Information message
</div>

<!-- Success Alert -->
<div class="alert alert-success">
  Success message
</div>

<!-- Warning Alert -->
<div class="alert alert-warning">
  Warning message
</div>

<!-- Error Alert -->
<div class="alert alert-error">
  Error message
</div>
```

---

### Special Sections

#### Table of Contents
```html
<nav class="table-of-contents">
  <h3>In This Article</h3>
  <ul>
    <li><a href="#section">Section Name</a></li>
  </ul>
</nav>
```

#### Reading Time Badge
```html
<span class="reading-time-badge">5 min read</span>
```

#### Citation Block
```html
<div class="citation">
  <p>"Quoted text goes here"</p>
  <div class="citation-source">— Source Name</div>
</div>
```

#### Stat Box
```html
<div class="stat-box">
  <div class="stat-number">15%</div>
  <div class="stat-label">Corporate Tax Rate</div>
</div>
```

#### Timeline
```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">January 2026</div>
    <div class="timeline-content">
      Event description
    </div>
  </div>
</div>
```

#### Accordion
```html
<div class="accordion-item">
  <div class="accordion-header">
    Click to expand
    <span class="accordion-toggle">▼</span>
  </div>
  <div class="accordion-content">
    Hidden content here
  </div>
</div>
```

---

## Typography

### Headings
```
<h1>Main Title - 2.5rem</h1>
<h2>Section Title - 1.875rem</h2>
<h3>Subsection - 1.375rem</h3>
<h4>Article Header - 1.125rem</h4>
```

### Text Styles
```
<p class="text-muted">Muted text</p>
<p class="text-small">Small text</p>
<strong>Bold text</strong>
<em>Italic text</em>
<code>code snippet</code>
```

---

## Spacing Scale

```
--  0px (0)
1   0.5rem (8px)
2   1rem (16px)
3   1.5rem (24px)
4   2rem (32px)
5   2.5rem (40px)
6   3rem (48px)
```

**Usage:**
```html
<div class="mt-4 mb-3 p-2">Content with margins/padding</div>
```

---

## Shadows

```
Small:   0 1px 3px rgba(26, 35, 50, 0.08)
Medium:  0 4px 12px rgba(26, 35, 50, 0.12)
Large:   0 8px 24px rgba(26, 35, 50, 0.15)
```

**Usage:**
- Small: For subtle elevation
- Medium: For cards and containers
- Large: For modals and floating elements

---

## Breakpoints

```
Mobile:   < 768px
Tablet:   768px - 1024px
Desktop:  > 1024px
```

---

## Professional Patterns

### Data Presentation
- Use tables for numeric data
- Use cards for categorical data
- Use badges for status
- Use timelines for sequences

### Information Hierarchy
- Use h2/h3 for section breaks
- Use bold for important terms
- Use color for emphasis
- Use icons/checkmarks for confirmation

### Navigation
- Use breadcrumbs for location
- Use related links for discovery
- Use TOC for long articles
- Use keyboard shortcuts for power users

---

## Keyboard Shortcuts

```
Ctrl+K (Cmd+K)   - Jump to search
Ctrl+/ (Cmd+/)   - Toggle calculator
Escape           - Close modals/menus
```

---

## Accessibility Features

✓ WCAG 2.1 AA Compliant
✓ Color contrast > 4.5:1
✓ Keyboard navigable
✓ Focus visible
✓ Semantic HTML
✓ ARIA labels
✓ Reduced motion support
✓ Print friendly

---

## Production Checklist

- [ ] Minify CSS for production
- [ ] Test in all major browsers
- [ ] Verify mobile responsiveness
- [ ] Check color contrast ratios
- [ ] Test keyboard navigation
- [ ] Verify all links work
- [ ] Check print output
- [ ] Run accessibility audit
- [ ] Performance test
- [ ] Deploy to staging

---

## Common Use Cases

### For Tax Briefings
- Use cards for each section
- Use citations for official sources
- Use badges for briefing type
- Use related links for cross-references

### For Calculators
- Use form groups for inputs
- Use result boxes for outputs
- Use alerts for warnings
- Use stat boxes for key results

### For Compliance Documents
- Use headings for sections
- Use tables for rules/requirements
- Use checklists for action items
- Use accordions for expanded details

---

**Last Updated:** October 19, 2026
**Design System Version:** 2.0
**Status:** Active & Maintained
