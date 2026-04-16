/**
 * Todo Card Component - Stage 1 Enhanced
 * Handles interactivity, state management, editing, and time updates
 */

class TodoCard {
    /**
     * STRUCTURED STATE MANAGEMENT
     * All component state is managed in one place
     */
    state = {
        title: 'Complete project documentation',
        description: 'Write comprehensive documentation for the API endpoints, including examples and best practices.',
        priority: 'high', // 'low', 'medium', 'high'
        status: 'pending', // 'pending', 'in-progress', 'done'
        dueDate: new Date('2026-02-18T18:00:00Z'),
        isExpanded: true,
        isEditing: false,
        originalState: null, // For cancel functionality
    };

    constructor() {
        // DOM Elements - View Mode
        this.card = document.querySelector('[data-testid="test-todo-card"]');
        this.viewMode = document.querySelector('[data-testid="test-todo-view-mode"]');
        this.titleElement = document.querySelector('[data-testid="test-todo-title"]');
        this.descriptionElement = document.querySelector('[data-testid="test-todo-description"]');
        this.statusBadge = document.querySelector('[data-testid="test-todo-status"]').querySelector('.status-badge');
        this.checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
        this.timeRemainingElement = document.querySelector('[data-testid="test-todo-time-remaining"]');
        this.overdueIndicator = document.querySelector('[data-testid="test-todo-overdue-indicator"]');
        this.priorytyIndicator = document.querySelector('[data-testid="test-todo-priority-indicator"]');
        this.priorityBadge = document.querySelector('[data-testid="test-todo-priority"]').querySelector('.priority-badge');
        this.statusControl = document.querySelector('[data-testid="test-todo-status-control"]').querySelector('.status-select');
        this.expandToggle = document.querySelector('[data-testid="test-todo-expand-toggle"]');
        this.collapsibleSection = document.querySelector('[data-testid="test-todo-collapsible-section"]');
        this.editButton = document.querySelector('[data-testid="test-todo-edit-button"]');
        this.deleteButton = document.querySelector('[data-testid="test-todo-delete-button"]');

        // DOM Elements - Edit Mode
        this.editForm = document.querySelector('[data-testid="test-todo-edit-form"]');
        this.editTitleInput = document.querySelector('[data-testid="test-todo-edit-title-input"]');
        this.editDescriptionInput = document.querySelector('[data-testid="test-todo-edit-description-input"]');
        this.editPrioritySelect = document.querySelector('[data-testid="test-todo-edit-priority-select"]');
        this.editDueDateInput = document.querySelector('[data-testid="test-todo-edit-due-date-input"]');
        this.saveButton = document.querySelector('[data-testid="test-todo-save-button"]');
        this.cancelButton = document.querySelector('[data-testid="test-todo-cancel-button"]');

        // Initialize
        this.init();
    }

    /**
     * Initialize component with event listeners and initial render
     */
    init() {
        // Set initial time remaining
        this.updateTimeRemaining();

        // Update time remaining every 30-60 seconds for accessibility
        this.timeUpdateInterval = setInterval(() => {
            this.updateTimeRemaining();
        }, 45000);

        // Bind event listeners
        this.checkbox.addEventListener('change', () => this.handleCheckboxChange());
        this.statusControl.addEventListener('change', () => this.handleStatusChange());
        this.expandToggle.addEventListener('click', () => this.toggleExpand());
        this.editButton.addEventListener('click', () => this.enterEditMode());
        this.deleteButton.addEventListener('click', () => this.handleDelete());
        this.saveButton.addEventListener('click', (e) => this.handleSave(e));
        this.cancelButton.addEventListener('click', () => this.exitEditMode());

        // Keyboard accessibility
        this.setupKeyboardNavigation();

        // Initial render to sync UI with state
        this.render();
    }

    /**
     * RENDER - Update all UI elements based on current state
     */
    render() {
        // Update title
        this.titleElement.textContent = this.state.title;

        // Update description
        this.descriptionElement.textContent = this.state.description;

        // Update priority badge styling
        this.updatePriorityDisplay();

        // Update status badge
        this.updateStatusDisplay();

        // Update checkbox to match status
        const isChecked = this.state.status === 'done';
        this.checkbox.checked = isChecked;

        // Update status control dropdown
        this.statusControl.value = this.state.status;

        // Update checkbox label and accessibility
        const checkboxLabel = this.checkbox.parentElement.querySelector('.checkbox-label');
        if (isChecked) {
            this.card.classList.add('completed');
            checkboxLabel.textContent = 'Mark as undone';
        } else {
            this.card.classList.remove('completed');
            checkboxLabel.textContent = 'Mark as done';
        }

        // Update collapsible section
        if (this.state.isExpanded) {
            this.collapsibleSection.classList.add('expanded');
            this.expandToggle.setAttribute('aria-expanded', 'true');
        } else {
            this.collapsibleSection.classList.remove('expanded');
            this.expandToggle.setAttribute('aria-expanded', 'false');
        }

        // Update priority indicator color
        this.updatePriorityIndicatorColor();

        // Sync all visual states
        this.syncStates();
    }

    /**
     * Update priority badge styling and text
     */
    updatePriorityDisplay() {
        // Remove all priority classes
        this.priorityBadge.className = 'priority-badge';
        
        // Add appropriate class based on priority
        this.priorityBadge.classList.add(this.state.priority);
        
        // Update text
        const priorityText = this.state.priority.charAt(0).toUpperCase() + this.state.priority.slice(1);
        this.priorityBadge.textContent = priorityText;

        // Update aria label
        this.priorityBadge.parentElement.setAttribute('aria-label', `Priority: ${priorityText}`);
    }

    /**
     * Update status badge based on current state
     */
    updateStatusDisplay() {
        this.statusBadge.className = 'status-badge';
        this.statusBadge.classList.add(this.state.status);
        
        const statusText = this.state.status === 'in-progress' 
            ? 'In Progress' 
            : this.state.status.charAt(0).toUpperCase() + this.state.status.slice(1);
        
        this.statusBadge.textContent = statusText;
        this.statusBadge.parentElement.setAttribute('aria-label', `Current status: ${statusText}`);
    }

    /**
     * Update priority indicator color bar
     */
    updatePriorityIndicatorColor() {
        const indicatorBar = this.priorytyIndicator.querySelector('.priority-indicator');
        const priorityColors = {
            low: '#10b981',
            medium: '#f59e0b',
            high: '#ef4444',
        };
        
        const color = this.state.status === 'done' 
            ? '#10b981' 
            : priorityColors[this.state.priority] || '#94a3b8';
        
        indicatorBar.style.backgroundColor = color;
    }

    /**
     * Synchronize checkbox, status, and related states
     */
    syncStates() {
        const isChecked = this.checkbox.checked;
        
        // If checkbox checked but status not done, update status
        if (isChecked && this.state.status !== 'done') {
            this.state.status = 'done';
            this.updateStatusDisplay();
            this.updatePriorityIndicatorColor();
        }
        
        // If status is done but checkbox not checked, check it
        if (this.state.status === 'done' && !isChecked) {
            this.checkbox.checked = true;
            this.card.classList.add('completed');
        }
        
        // If status not done and checkbox is checked, uncheck it
        if (this.state.status !== 'done' && isChecked) {
            this.checkbox.checked = false;
            this.card.classList.remove('completed');
        }
    }

    /**
     * Handle checkbox change - synchronize with status
     */
    handleCheckboxChange() {
        const isChecked = this.checkbox.checked;

        if (isChecked) {
            // Mark as completed
            this.state.status = 'done';
            this.card.classList.add('completed');
        } else {
            // Revert to pending
            this.state.status = 'pending';
            this.card.classList.remove('completed');
        }

        // Stop time updates if completed
        if (this.state.status === 'done') {
            this.timeRemainingElement.textContent = '✓ Completed';
            this.timeRemainingElement.setAttribute('aria-label', 'Task completed');
        }

        this.render();
        console.log(`Task completion toggled: ${isChecked ? 'completed' : 'pending'}`);
    }

    /**
     * Handle status dropdown change
     */
    handleStatusChange() {
        const newStatus = this.statusControl.value;
        this.state.status = newStatus;

        // Synchronize checkbox
        if (newStatus === 'done') {
            this.checkbox.checked = true;
            this.card.classList.add('completed');
        } else {
            this.checkbox.checked = false;
            this.card.classList.remove('completed');
        }

        this.render();
        console.log(`Status changed to: ${newStatus}`);
    }

    /**
     * Toggle expand/collapse of details section
     */
    toggleExpand() {
        this.state.isExpanded = !this.state.isExpanded;
        this.render();
        console.log(`Expanded: ${this.state.isExpanded}`);
    }

    /**
     * Calculate and display time remaining
     * Updates every 30-60 seconds for accessibility
     */
    updateTimeRemaining() {
        // Don't update if task is completed
        if (this.state.status === 'done') {
            this.timeRemainingElement.textContent = '✓ Completed';
            this.overdueIndicator.style.display = 'none';
            return;
        }

        const now = new Date();
        const timeDiff = this.state.dueDate - now;

        let timeText = '';
        let isOverdue = false;

        if (timeDiff > 0) {
            // Due in the future
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

            if (days > 0) {
                if (days === 1) {
                    timeText = '⏱️ Due tomorrow';
                } else {
                    timeText = `⏱️ Due in ${days} days`;
                }
            } else if (hours > 0) {
                timeText = `⏱️ Due in ${hours} hour${hours !== 1 ? 's' : ''}`;
            } else if (minutes > 0) {
                timeText = `⏱️ Due in ${minutes} minute${minutes !== 1 ? 's' : ''}`;
            } else {
                timeText = '⏱️ Due now!';
            }
            this.overdueIndicator.style.display = 'none';
        } else {
            // Overdue
            isOverdue = true;
            const absDiff = Math.abs(timeDiff);
            const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            if (days > 0) {
                timeText = `⏱️ Overdue by ${days} day${days !== 1 ? 's' : ''}`;
            } else {
                timeText = `⏱️ Overdue by ${hours} hour${hours !== 1 ? 's' : ''}`;
            }
            this.overdueIndicator.style.display = 'block';
        }

        this.timeRemainingElement.textContent = timeText;
        this.timeRemainingElement.setAttribute('aria-label', timeText);
    }

    /**
     * Enter edit mode
     */
    enterEditMode() {
        // Save original state for cancel
        this.state.originalState = { ...this.state };

        // Populate form with current values
        this.editTitleInput.value = this.state.title;
        this.editDescriptionInput.value = this.state.description;
        this.editPrioritySelect.value = this.state.priority;

        // Format date for datetime-local input
        const dateString = this.state.dueDate.toISOString().slice(0, 16);
        this.editDueDateInput.value = dateString;

        // Show edit form, hide view mode
        this.state.isEditing = true;
        this.viewMode.style.display = 'none';
        this.editForm.style.display = 'block';
        this.editTitleInput.focus();

        console.log('Entered edit mode');
    }

    /**
     * Save changes from edit form
     */
    handleSave(e) {
        e.preventDefault();

        // Validate inputs
        if (!this.editTitleInput.value.trim()) {
            this.showFeedback('Title cannot be empty', 'error');
            this.editTitleInput.focus();
            return;
        }

        // Update state
        this.state.title = this.editTitleInput.value.trim();
        this.state.description = this.editDescriptionInput.value.trim();
        this.state.priority = this.editPrioritySelect.value;
        this.state.dueDate = new Date(this.editDueDateInput.value);
        this.state.isEditing = false;
        this.state.originalState = null;

        // Update UI
        this.exitEditMode();
        this.render();
        this.updateTimeRemaining();

        this.showFeedback('Task updated successfully');
        this.editButton.focus();

        console.log('Task saved:', this.state);
    }

    /**
     * Cancel editing and restore original state
     */
    exitEditMode() {
        this.state.isEditing = false;
        
        // Restore original state if editing was cancelled
        if (this.state.originalState) {
            this.state = { ...this.state.originalState };
        }
        
        this.state.originalState = null;

        // Hide edit form, show view mode
        this.editForm.style.display = 'none';
        this.viewMode.style.display = 'block';

        console.log('Exited edit mode');
    }

    /**
     * Handle delete button click
     */
    handleDelete() {
        const confirmed = confirm(
            'Are you sure you want to delete this task?\n\n' + this.state.title
        );

        if (confirmed) {
            console.log('Delete confirmed - Removing task:', this.state.title);

            // Smooth fade-out animation
            this.card.style.opacity = '0';
            this.card.style.transform = 'translateY(-10px)';

            setTimeout(() => {
                this.card.remove();
                clearInterval(this.timeUpdateInterval);
            }, 300);
        } else {
            console.log('Delete cancelled');
        }
    }

    /**
     * Show temporary feedback message
     * @param {string} message - Message to display
     * @param {string} type - 'success', 'error', or 'info'
     */
    showFeedback(message, type = 'success') {
        const feedback = document.createElement('div');
        feedback.className = 'toast-feedback';
        feedback.textContent = message;
        feedback.setAttribute('role', 'status');
        feedback.setAttribute('aria-live', 'polite');

        document.body.appendChild(feedback);

        // Trigger animation
        setTimeout(() => {
            feedback.classList.add('show');
        }, 10);

        // Remove after delay
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => feedback.remove(), 300);
        }, 2500);
    }

    /**
     * Setup keyboard navigation for better accessibility
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape key to exit edit mode
            if (e.key === 'Escape' && this.state.isEditing) {
                e.preventDefault();
                this.cancelButton.click();
            }

            // Enter on buttons
            if (e.key === 'Enter') {
                if (e.target === this.editButton || e.target === this.deleteButton) {
                    e.target.click();
                }
            }

            // Space to toggle expand
            if (e.key === ' ' && e.target === this.expandToggle) {
                e.preventDefault();
                this.expandToggle.click();
            }
        });
    }

    /**
     * Cleanup - call when component is destroyed
     */
    destroy() {
        if (this.timeUpdateInterval) {
            clearInterval(this.timeUpdateInterval);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const todoCard = new TodoCard();
});

