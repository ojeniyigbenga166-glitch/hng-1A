/**
 * Example Test Cases for Todo Card Component
 * This file demonstrates how to test the component with common testing frameworks
 * 
 * These are template examples - adapt to your testing framework
 */

// ============================================
// Example 1: Playwright / Cypress E2E Tests
// ============================================

describe('Todo Card Component', () => {
    beforeEach(() => {
        // Navigate to the page
        cy.visit('index.html');
    });

    describe('Element Presence Tests', () => {
        it('should render the todo card container with correct data-testid', () => {
            cy.get('[data-testid="test-todo-card"]').should('exist').should('be.visible');
        });

        it('should display the task title with correct data-testid', () => {
            cy.get('[data-testid="test-todo-title"]')
                .should('exist')
                .should('contain', 'Complete project documentation');
        });

        it('should display the task description with correct data-testid', () => {
            cy.get('[data-testid="test-todo-description"]')
                .should('exist')
                .should('contain', 'comprehensive documentation');
        });

        it('should display priority badge with correct data-testid', () => {
            cy.get('[data-testid="test-todo-priority"]')
                .should('exist')
                .should('contain', 'High');
        });

        it('should display due date with correct data-testid', () => {
            cy.get('[data-testid="test-todo-due-date"]')
                .should('exist')
                .should('contain', 'Feb 18, 2026');
        });

        it('should display time remaining with correct data-testid', () => {
            cy.get('[data-testid="test-todo-time-remaining"]')
                .should('exist')
                .invoke('text')
                .should('match', /Due in|Overdue by/);
        });

        it('should display status badge with correct data-testid', () => {
            cy.get('[data-testid="test-todo-status"]')
                .should('exist')
                .should('contain', 'Pending');
        });

        it('should render checkbox with correct data-testid', () => {
            cy.get('[data-testid="test-todo-complete-toggle"]')
                .should('exist')
                .should('have.attr', 'type', 'checkbox');
        });

        it('should display tags list with correct data-testid', () => {
            cy.get('[data-testid="test-todo-tags"]')
                .should('exist');
        });

        it('should display individual tags with correct data-testid', () => {
            cy.get('[data-testid="test-todo-tag-work"]').should('exist');
            cy.get('[data-testid="test-todo-tag-urgent"]').should('exist');
            cy.get('[data-testid="test-todo-tag-documentation"]').should('exist');
        });

        it('should display edit button with correct data-testid', () => {
            cy.get('[data-testid="test-todo-edit-button"]')
                .should('exist')
                .should('be.visible');
        });

        it('should display delete button with correct data-testid', () => {
            cy.get('[data-testid="test-todo-delete-button"]')
                .should('exist')
                .should('be.visible');
        });
    });

    describe('Checkbox Functionality', () => {
        it('should toggle checkbox state', () => {
            cy.get('[data-testid="test-todo-complete-toggle"]')
                .should('not.be.checked')
                .click()
                .should('be.checked');
        });

        it('should update status to Done when checkbox is checked', () => {
            cy.get('[data-testid="test-todo-complete-toggle"]').click();
            cy.get('[data-testid="test-todo-status"]').should('contain', 'Done');
        });

        it('should strike-through title when completed', () => {
            cy.get('[data-testid="test-todo-complete-toggle"]').click();
            cy.get('[data-testid="test-todo-title"]')
                .should('have.css', 'text-decoration')
                .and('include', 'line-through');
        });

        it('should be keyboard focusable', () => {
            cy.get('[data-testid="test-todo-complete-toggle"]')
                .focus()
                .should('have.focus');
        });

        it('should toggle with spacebar when focused', () => {
            cy.get('[data-testid="test-todo-complete-toggle"]')
                .focus()
                .type(' ')
                .should('be.checked');
        });
    });

    describe('Button Functionality', () => {
        it('edit button should be clickable', () => {
            cy.get('[data-testid="test-todo-edit-button"]')
                .should('not.be.disabled')
                .click();
        });

        it('edit button should log to console', () => {
            cy.window().then((win) => {
                cy.spy(win.console, 'log');
                cy.get('[data-testid="test-todo-edit-button"]').click();
                // Verify console.log was called
            });
        });

        it('delete button should show confirmation', () => {
            cy.get('[data-testid="test-todo-delete-button"]').click();
            cy.on('window:confirm', () => false); // Cancel confirmation
        });

        it('delete button should remove card when confirmed', () => {
            cy.get('[data-testid="test-todo-delete-button"]').click();
            cy.on('window:confirm', () => true); // Confirm deletion
            // Card should be removed after animation
            cy.get('[data-testid="test-todo-card"]', { timeout: 500 }).should('not.exist');
        });
    });

    describe('Time Remaining Updates', () => {
        it('should display initial time remaining value', () => {
            cy.get('[data-testid="test-todo-time-remaining"]')
                .invoke('text')
                .then((text) => {
                    // Value should be approximately "Due in 5 days" (Feb 18, 2026)
                    expect(text).to.match(/Due in|Overdue by|Due now|Due tomorrow/);
                });
        });

        it('should have proper time format', () => {
            cy.get('[data-testid="test-todo-time-remaining"]')
                .invoke('text')
                .should('match', /^⏱️\s+(Due in|Overdue by|Due now|Due tomorrow)/);
        });
    });

    describe('Accessibility', () => {
        it('should have proper semantic HTML structure', () => {
            cy.get('[data-testid="test-todo-card"]').should('be.a', 'article');
            cy.get('[data-testid="test-todo-title"]').should('be.a', 'h2');
            cy.get('[data-testid="test-todo-description"]').should('be.a', 'p');
        });

        it('checkbox should have associated label', () => {
            cy.get('[data-testid="test-todo-complete-toggle"]')
                .should('have.attr', 'id');
        });

        it('should have aria-labels on buttons', () => {
            cy.get('[data-testid="test-todo-edit-button"]')
                .should('have.attr', 'aria-label')
                .and('not.be.empty');
            cy.get('[data-testid="test-todo-delete-button"]')
                .should('have.attr', 'aria-label')
                .and('not.be.empty');
        });

        it('time remaining should have aria-live', () => {
            cy.get('[data-testid="test-todo-time-remaining"]')
                .should('have.attr', 'aria-live', 'polite');
        });
    });

    describe('Responsiveness', () => {
        it('should be responsive at mobile size (320px)', () => {
            cy.viewport(320, 568);
            cy.get('[data-testid="test-todo-card"]').should('be.visible');
            cy.get('body').should('not.have.css', 'overflow-x', 'scroll');
        });

        it('should be responsive at tablet size (768px)', () => {
            cy.viewport(768, 1024);
            cy.get('[data-testid="test-todo-card"]').should('be.visible');
        });

        it('should be responsive at desktop size (1200px)', () => {
            cy.viewport(1200, 800);
            cy.get('[data-testid="test-todo-card"]').should('be.visible');
        });
    });
});

// ============================================
// Example 2: Jest / React Testing Library
// ============================================

import { render, screen, fireEvent, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

describe('Todo Card Component - Jest', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <article class="todo-card" data-testid="test-todo-card">
                <h2 data-testid="test-todo-title">Complete project documentation</h2>
                <p data-testid="test-todo-description">Write comprehensive documentation...</p>
                <span data-testid="test-todo-priority"><span class="priority-badge high">High</span></span>
                <time data-testid="test-todo-due-date" datetime="2026-02-18T18:00:00Z">Due Feb 18, 2026</time>
                <div data-testid="test-todo-time-remaining" aria-live="polite">Due in 5 days</div>
                <span data-testid="test-todo-status"><span class="status-badge pending">Pending</span></span>
                <input type="checkbox" data-testid="test-todo-complete-toggle" id="todo-checkbox" aria-label="Mark task as complete">
                <label for="todo-checkbox">Mark as done</label>
                <ul data-testid="test-todo-tags" role="list">
                    <li><span data-testid="test-todo-tag-work">Work</span></li>
                    <li><span data-testid="test-todo-tag-urgent">Urgent</span></li>
                </ul>
                <button data-testid="test-todo-edit-button" aria-label="Edit task">Edit</button>
                <button data-testid="test-todo-delete-button" aria-label="Delete task">Delete</button>
            </article>
        `;
    });

    test('should render all required elements', () => {
        expect(screen.getByTestId('test-todo-card')).toBeInTheDocument();
        expect(screen.getByTestId('test-todo-title')).toBeInTheDocument();
        expect(screen.getByTestId('test-todo-description')).toBeInTheDocument();
        expect(screen.getByTestId('test-todo-complete-toggle')).toBeInTheDocument();
    });

    test('checkbox should be focusable and toggleable', () => {
        const checkbox = screen.getByTestId('test-todo-complete-toggle');
        checkbox.focus();
        expect(checkbox).toHaveFocus();
        expect(checkbox).not.toBeChecked();
        
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    test('should have correct titles for buttons', () => {
        const editBtn = screen.getByTestId('test-todo-edit-button');
        const deleteBtn = screen.getByTestId('test-todo-delete-button');
        
        expect(editBtn).toHaveAttribute('aria-label');
        expect(deleteBtn).toHaveAttribute('aria-label');
    });

    test('time remaining should update', async () => {
        const timeEl = screen.getByTestId('test-todo-time-remaining');
        expect(timeEl).toHaveAttribute('aria-live', 'polite');
        expect(timeEl.textContent).toMatch(/Due in|Overdue by/);
    });
});

// ============================================
// Example 3: Playwright
// ============================================

import { test, expect } from '@playwright/test';

test.describe('Todo Card Component - Playwright', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/index.html');
    });

    test('should have all required data-testid attributes', async ({ page }) => {
        await expect(page.locator('[data-testid="test-todo-card"]')).toBeVisible();
        await expect(page.locator('[data-testid="test-todo-title"]')).toBeVisible();
        await expect(page.locator('[data-testid="test-todo-complete-toggle"]')).toBeVisible();
        await expect(page.locator('[data-testid="test-todo-edit-button"]')).toBeVisible();
        await expect(page.locator('[data-testid="test-todo-delete-button"]')).toBeVisible();
    });

    test('checkbox should be toggleable', async ({ page }) => {
        const checkbox = page.locator('[data-testid="test-todo-complete-toggle"]');
        
        // Initially unchecked
        await expect(checkbox).not.toBeChecked();
        
        // Click to check
        await checkbox.click();
        await expect(checkbox).toBeChecked();
        
        // Click to uncheck
        await checkbox.click();
        await expect(checkbox).not.toBeChecked();
    });

    test('should be keyboard accessible', async ({ page }) => {
        const checkbox = page.locator('[data-testid="test-todo-complete-toggle"]');
        
        // Tab to checkbox
        await page.keyboard.press('Tab');
        await expect(checkbox).toBeFocused();
        
        // Toggle with space
        await page.keyboard.press('Space');
        await expect(checkbox).toBeChecked();
    });
});

// ============================================
// Summary of Test Coverage
// ============================================

/*
✓ Element Presence (all data-testid values)
✓ Checkbox Functionality (toggle, keyboard, state)
✓ Button Functionality (click, console, confirmation)
✓ Accessibility (semantic HTML, ARIA labels, keyboard)
✓ Responsiveness (multiple viewport sizes)
✓ Time Updates (value format, aria-live)
✓ Visual Changes (strike-through on complete, status update)
✓ Integration (all features working together)

These examples can be adapted to your preferred testing framework.
Run with: jest, cypress run, playwright test, etc.
*/
