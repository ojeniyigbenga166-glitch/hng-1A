<!-- TEST CHECKLIST & VALIDATION GUIDE -->

# Todo Card Component - Test Checklist

## Visual Inspection Checklist

### ✅ Required Elements Present
- [ ] Card container with proper styling (data-testid="test-todo-card")
- [ ] Task title visible (data-testid="test-todo-title")
- [ ] Task description visible (data-testid="test-todo-description")
- [ ] Priority badge shows "High" (data-testid="test-todo-priority")
- [ ] Due date formatted as "Due Feb 18, 2026" (data-testid="test-todo-due-date")
- [ ] Time remaining shows friendly text (data-testid="test-todo-time-remaining")
- [ ] Status badge shows "Pending" (data-testid="test-todo-status")
- [ ] Checkbox is visible and toggle-able (data-testid="test-todo-complete-toggle")
- [ ] Tags displayed as chips (data-testid="test-todo-tags")
  - [ ] "Work" tag visible (data-testid="test-todo-tag-work")
  - [ ] "Urgent" tag visible (data-testid="test-todo-tag-urgent")
  - [ ] "Documentation" tag visible (data-testid="test-todo-tag-documentation")
- [ ] Edit button present (data-testid="test-todo-edit-button")
- [ ] Delete button present (data-testid="test-todo-delete-button")

### ✅ Visual Design
- [ ] Clean, modern card appearance
- [ ] Proper spacing and padding
- [ ] Color-coded priority/status badges
- [ ] Smooth hover effects on buttons
- [ ] Professional typography
- [ ] Good visual hierarchy

## Functionality Tests

### ✅ Checkbox Toggle
1. [ ] Checkbox is clickable
2. [ ] Clicking checkbox checks/unchecks it
3. [ ] Title gets strike-through when checked
4. [ ] Status changes to "Done" when checked
5. [ ] Status changes back to "Pending" when unchecked
6. [ ] Card visual updates match state

### ✅ Time Remaining
1. [ ] Initial value shows "Due in 5 days" (approximately)
2. [ ] Updates every 60 seconds
3. [ ] Check console after 1 minute - should see updated value
4. [ ] Format is human-readable (e.g., "Due in 3 days")
5. [ ] When date passes, shows "Overdue by..." format

### ✅ Edit Button
1. [ ] Button is clickable
2. [ ] Logs to console when clicked
3. [ ] Shows green feedback toast
4. [ ] Toast disappears after 2 seconds

### ✅ Delete Button
1. [ ] Button is clickable
2. [ ] Shows confirmation dialog with task description
3. [ ] If confirmed: Card fades out and is removed
4. [ ] If cancelled: Card remains on page
5. [ ] Console logs deletion action

## Accessibility Tests

### ✅ Keyboard Navigation
1. [ ] Tab through all interactive elements
2. [ ] Focus indicator is visible on all buttons
3. [ ] Checkbox is focusable with Tab key
4. [ ] Can toggle checkbox with Space/Enter
5. [ ] Tab order: Checkbox → Edit → Delete (logical)

### ✅ Screen Reader (if available)
1. [ ] Card is announced as an article
2. [ ] Title is announced as heading
3. [ ] Checkbox has accessible label
4. [ ] Edit/Delete buttons have accessible names
5. [ ] Status changes are announced (aria-live)

### ✅ Semantic HTML
- [ ] Right-click → Inspect confirms:
  - [ ] `<article>` root
  - [ ] `<h2>` for title
  - [ ] `<p>` for description
  - [ ] `<time>` for date
  - [ ] `<button>` elements (not divs)
  - [ ] `<input type="checkbox">`
  - [ ] `<label>` for checkbox
  - [ ] `<ul role="list">` for tags

## Responsive Design Tests

### ✅ Mobile (Test in DevTools at 320px width)
1. [ ] Card is full width with padding
2. [ ] No horizontal overflow
3. [ ] Priority badge on separate line or floats well
4. [ ] All text is readable
5. [ ] Buttons stack or arrange properly
6. [ ] Tags wrap to next line
7. [ ] Touch targets are at least 44x44px

### ✅ Tablet (Test at 768px width)
1. [ ] Card has comfortable max-width
2. [ ] Spacing is appropriate
3. [ ] Layout is still readable
4. [ ] Buttons inline side-by-side

### ✅ Desktop (Test at 1200px+ width)
1. [ ] Card has max-width around 500-600px
2. [ ] Centered on page
3. [ ] Professional spacing
4. [ ] All elements clearly visible

### ✅ No Overflow
1. [ ] Resize browser window - no horizontal scrollbar
2. [ ] Long task titles don't overflow
3. [ ] Long descriptions wrap properly
4. [ ] Tags wrap, don't cause overflow

## Color & Contrast Tests

### ✅ WCAG AA Compliance
- [ ] All text is readable against backgrounds
- [ ] Buttons are clearly distinguishable
- [ ] Priority badges are clearly labeled
- [ ] No information conveyed by color alone
- [ ] Links/buttons have text or aria-label

### ✅ Dark Mode (if browser supports)
1. [ ] Open DevTools → Rendering tab
2. [ ] Set "Emulate CSS media feature prefers-color-scheme" to "dark"
3. [ ] [ ] Colors automatically switch to dark theme
4. [ ] [ ] All text remains readable
5. [ ] [ ] Contrast still meets WCAG AA

## Performance Tests

### ✅ Load Time
1. [ ] Page loads quickly (< 1 second)
2. [ ] No layout shift when loading
3. [ ] Smooth interactions/animations

### ✅ Memory Usage
1. [ ] Open DevTools → Memory tab
2. [ ] Take heap snapshot before interaction
3. [ ] Click checkbox, edit, delete several times
4. [ ] Take heap snapshot again
5. [ ] Memory shouldn't grow unbounded

## Browser Compatibility Tests

### ✅ Modern Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### ✅ Mobile Browsers
- [ ] Chrome Mobile
- [ ] iOS Safari

## Automated Test Readiness

### ✅ data-testid Attributes
```javascript
// These selectors should all find elements:
document.querySelector('[data-testid="test-todo-card"]')           // ✓ Found
document.querySelector('[data-testid="test-todo-title"]')          // ✓ Found
document.querySelector('[data-testid="test-todo-description"]')    // ✓ Found
document.querySelector('[data-testid="test-todo-priority"]')       // ✓ Found
document.querySelector('[data-testid="test-todo-due-date"]')       // ✓ Found
document.querySelector('[data-testid="test-todo-time-remaining"]') // ✓ Found
document.querySelector('[data-testid="test-todo-status"]')         // ✓ Found
document.querySelector('[data-testid="test-todo-complete-toggle"]')// ✓ Found
document.querySelector('[data-testid="test-todo-tags"]')           // ✓ Found
document.querySelector('[data-testid="test-todo-tag-work"]')       // ✓ Found
document.querySelector('[data-testid="test-todo-tag-urgent"]')     // ✓ Found
document.querySelector('[data-testid="test-todo-edit-button"]')    // ✓ Found
document.querySelector('[data-testid="test-todo-delete-button"]')  // ✓ Found
```

### ✅ Element Properties
```javascript
// Checkbox tests:
const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
console.log(checkbox.type); // Should be "checkbox"
console.log(checkbox.tagName); // Should be "INPUT"
console.log(checkbox.checked); // Should be boolean

// Time remaining tests:
const timeEl = document.querySelector('[data-testid="test-todo-time-remaining"]');
console.log(timeEl.textContent); // Should contain "Due in" or "Overdue by"

// Button tests:
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
console.log(editBtn.tagName); // Should be "BUTTON"
console.log(editBtn.textContent); // Should have text like "Edit"
```

## Console Testing

### ✅ Expected Console Output
1. [ ] Open DevTools → Console tab
2. [ ] Click Edit button → should log task details
3. [ ] Click Delete → confirm → should log deletion
4. [ ] No JavaScript errors in console
5. [ ] No warnings about accessibility

## Summary Checklist

- [ ] All visual elements present
- [ ] All functionality works
- [ ] All accessibility features working
- [ ] Responsive at all breakpoints
- [ ] No console errors
- [ ] All data-testid attributes exact
- [ ] Keyboard navigation complete
- [ ] Color contrast sufficient
- [ ] Dark mode works
- [ ] Ready for automated testing

## Known Test Values

| Element | Expected Value |
|---------|-----------------|
| Title | "Complete project documentation" |
| Description | "Write comprehensive documentation..." |
| Priority | "High" (with red badge) |
| Due Date | "Due Feb 18, 2026" |
| Time Remaining | "Due in 5 days" (approx) |
| Status | "Pending" or "Done" (toggleable) |
| Tags Count | 3 (Work, Urgent, Documentation) |
| Checkbox | unchecked initially |

---

**Test Date:** ___________
**Tester:** ___________
**Result:** ☐ PASS ☐ FAIL
**Notes:** _________________________________________________________
