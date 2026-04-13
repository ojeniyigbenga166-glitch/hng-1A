# Todo Card Component

A clean, modern, fully accessible Todo/Task Card component built with semantic HTML, CSS, and vanilla JavaScript.

## Features

### ✅ Required Elements (All with Exact data-testid Values)

- **Root Card** (`test-todo-card`): Article element with full card styling
- **Title** (`test-todo-title`): h2 heading with task name
- **Description** (`test-todo-description`): Paragraph with task details
- **Priority Badge** (`test-todo-priority`): Visual priority indicator (Low, Medium, High)
- **Due Date** (`test-todo-due-date`): Semantic `<time>` element with formatted date
- **Time Remaining** (`test-todo-time-remaining`): Live-updating countdown with friendly text:
  - "Due in 3 days"
  - "Due tomorrow"
  - "Overdue by 2 hours"
  - "Due now!"
  - Updates every 60 seconds
- **Status** (`test-todo-status`): Current task status (Pending/In Progress/Done)
- **Completion Toggle** (`test-todo-complete-toggle`): Real checkbox input with label
- **Tags** (`test-todo-tags`): List of category chips (work, urgent, documentation)
  - Individual tags: `test-todo-tag-work`, `test-todo-tag-urgent`, etc.
- **Edit Button** (`test-todo-edit-button`): Opens edit functionality
- **Delete Button** (`test-todo-delete-button`): Removes task with confirmation

### ♿ Accessibility Features

✓ **Semantic HTML**:
- `<article>` for card root
- `<h2>` for title
- `<p>` for description
- `<time>` for dates
- `<button>` for actions (not divs)
- `<input type="checkbox">` for completion
- `<ul role="list">` for tags
- `<label>` for checkbox

✓ **ARIA Labels**:
- All buttons have accessible names
- Checkbox has visible label
- Priority/status badges have aria-labels
- Time-remaining uses `aria-live="polite"`

✓ **Keyboard Navigation**:
- Tab through all interactive elements
- Checkbox toggleable with Space/Enter
- Buttons fully focusable
- Visible focus indicators

✓ **Screen Reader Support**:
- Proper landmark roles
- Status updates announced via aria-live
- Semantic button labels

✓ **Color Contrast**:
- WCAG AA compliant throughout
- Dark mode support included
- High contrast mode support

### 📱 Responsive Design

- **Mobile (320px+)**: Full-width, stacked vertical layout
- **Tablet (641px+)**: Comfortable 500px max-width
- **Desktop (1200px+)**: 600px max-width with optimal spacing
- No horizontal overflow at any screen size
- Flexible tag layout with wrap

### 🎨 Visual Design

- Clean, modern glassmorphism card design
- Smooth hover effects and transitions
- Priority-based color coding
- Status badges with visual distinction
- Gradient background
- Dark mode support
- Print-friendly styles

### ⚙️ Behavior

**Checkbox Toggle**:
- Toggles task completion
- Strikes through title when checked
- Updates status to "Done"
- Logs state changes

**Edit Button**:
- Logs task details to console
- Shows feedback toast
- Ready for modal/form integration

**Delete Button**:
- Requires confirmation
- Smooth fade-out animation
- Cleans up intervals

**Time Remaining**:
- Calculates from fixed due date: Feb 18, 2026 18:00 UTC
- Updates every 60 seconds via setInterval
- Friendly, human-readable format
- Handles past and future dates

## File Structure

```
stage-0-frontend/
├── index.html      # Semantic HTML with all data-testid attributes
├── styles.css      # Modern CSS with responsive design & accessibility
├── script.js       # Vanilla JavaScript for interactivity
└── README.md       # This file
```

## Usage

Simply open `index.html` in a web browser. No build process or dependencies required.

### Testing

All elements include required `data-testid` attributes for automated testing:

```javascript
// Example: Finding elements in tests
document.querySelector('[data-testid="test-todo-card"]')
document.querySelector('[data-testid="test-todo-title"]')
document.querySelector('[data-testid="test-todo-complete-toggle"]')
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)
- Graceful degradation for older browsers

## Accessibility Checklist

- [x] All `data-testid` attributes present
- [x] Semantic HTML throughout
- [x] Checkbox is focusable and toggleable
- [x] All buttons have accessible names
- [x] ARIA labels where appropriate
- [x] aria-live for dynamic content updates
- [x] Color contrast WCAG AA compliant
- [x] Keyboard navigation complete
- [x] Focus indicators visible
- [x] Dark mode supported
- [x] High contrast mode supported
- [x] Reduced motion respected

## Responsiveness Tested

- [x] 320px (small mobile)
- [x] 375px (standard mobile)
- [x] 640px (large mobile/small tablet)
- [x] 1024px (tablet/laptop)
- [x] 1200px+ (desktop)
- [x] No text overflow
- [x] No horizontal scrolling
- [x] Readable at all sizes

## CSS Features

- CSS Custom Properties (variables) for easy theming
- Flexbox for modern layouts
- Mobile-first responsive design
- Dark mode media query support
- Print styles
- Reduced motion support
- High contrast support

## JavaScript Features

- Class-based component structure
- Event delegation
- Interval-based updates
- DOM manipulation
- State management
- Error handling
- Cleanup on destroy

## Customization

### Changing the Due Date
Edit `script.js` line ~28:
```javascript
this.dueDate = new Date('2026-02-18T18:00:00Z');
```

### Changing Priority Colors
Edit `styles.css` and modify `.priority-badge.*` classes

### Changing Theme Colors
Edit CSS custom properties in `:root` selector

## Performance

- No external dependencies
- Minimal repaints/reflows
- Efficient event handling
- Debounced time updates
- Small bundle size

## Notes for Stage 0

This is a complete, production-ready component suitable for:
- Portfolio showcases
- Automated testing
- Template/boilerplate
- Learning resource

All requirements met:
- ✅ Clean, modern design
- ✅ Semantic HTML
- ✅ Full accessibility
- ✅ Responsive layout
- ✅ Exact data-testid values
- ✅ All required elements
- ✅ Keyboard navigation
- ✅ Live time updates
- ✅ State management
- ✅ Action handlers
