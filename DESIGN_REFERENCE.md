# TaxInfo Solutions: Design System Reference Guide

## Quick Color Reference

```
Primary Dark:     #1a3a52  ████████████████ Navy Blue (headers, navbar)
Primary Blue:     #2c5aa0  ████████████████ Links, buttons
Accent Teal:      #0d8b8b  ████████████████ Hover states
Accent Gold:      #b8860b  ████████████████ Highlights
Success Green:    #2d7a3e  ████████████████ Confirmations
Background:       #f5f7fa  ████████████████ Page bg
Cards:            #ffffff  ████████████████ White
Text Primary:     #1a2332  ████████████████ Dark gray
Text Secondary:   #465768  ████████████████ Medium gray
Text Muted:       #7a8a99  ████████████████ Light gray
Borders:          #d8dfe8  ████████████████ Very light
```

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
- Default: `#2c5aa0` (Primary Blue)
- Hover: `#0d8b8b` (Accent Teal) + lift effect
- Active: Darker shade

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
- 8px border radius
- Hover: darker shadow + blue border

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
- Navy header
- White text in header
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

**Last Updated:** April 11, 2026
**Design System Version:** 1.0
**Status:** Active & Maintained
