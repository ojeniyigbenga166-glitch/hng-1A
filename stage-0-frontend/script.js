/**
 * Todo Card Component - JavaScript
 * Handles interactivity, time updates, and state management
 */

class TodoCard {
    constructor() {
        // DOM Elements
        this.card = document.querySelector('[data-testid="test-todo-card"]');
        this.titleElement = document.querySelector('[data-testid="test-todo-title"]');
        this.statusBadge = document.querySelector('[data-testid="test-todo-status"]').querySelector('.status-badge');
        this.checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
        this.timeRemainingElement = document.querySelector('[data-testid="test-todo-time-remaining"]');
        this.editButton = document.querySelector('[data-testid="test-todo-edit-button"]');
        this.deleteButton = document.querySelector('[data-testid="test-todo-delete-button"]');

        // Fixed due date: February 18, 2026 at 6:00 PM UTC
        this.dueDate = new Date('2026-02-18T18:00:00Z');

        // Initialize
        this.init();
    }

    init() {
        // Set initial time remaining
        this.updateTimeRemaining();

        // Update time remaining every 60 seconds
        this.timeUpdateInterval = setInterval(() => {
            this.updateTimeRemaining();
        }, 60000);

        // Bind event listeners
        this.checkbox.addEventListener('change', () => this.toggleCompletion());
        this.editButton.addEventListener('click', () => this.handleEdit());
        this.deleteButton.addEventListener('click', () => this.handleDelete());

        // Keyboard accessibility for buttons
        this.setupKeyboardNavigation();
    }

    /**
     * Calculate and display time remaining
     * Updates the "test-todo-time-remaining" element with friendly text
     */
    updateTimeRemaining() {
        const now = new Date();
        const timeDiff = this.dueDate - now;

        let timeText = '';

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
        } else {
            // Overdue
            const absDiff = Math.abs(timeDiff);
            const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            if (days > 0) {
                timeText = `⏱️ Overdue by ${days} day${days !== 1 ? 's' : ''}`;
            } else {
                timeText = `⏱️ Overdue by ${hours} hour${hours !== 1 ? 's' : ''}`;
            }
        }

        this.timeRemainingElement.textContent = timeText;
    }

    /**
     * Toggle task completion state
     * Updates visual appearance and status
     */
    toggleCompletion() {
        const isChecked = this.checkbox.checked;

        if (isChecked) {
            // Mark as completed
            this.card.classList.add('completed');
            this.statusBadge.textContent = 'Done';
            this.statusBadge.className = 'status-badge done';
            this.statusBadge.parentElement.setAttribute('aria-label', 'Current status: Done');
        } else {
            // Mark as not completed
            this.card.classList.remove('completed');
            this.statusBadge.textContent = 'Pending';
            this.statusBadge.className = 'status-badge pending';
            this.statusBadge.parentElement.setAttribute('aria-label', 'Current status: Pending');
        }

        // Log state change
        console.log(`Task completion toggled: ${isChecked ? 'completed' : 'pending'}`);
    }

    /**
     * Handle edit button click
     * In a real app, this would open an edit modal/form
     */
    handleEdit() {
        console.log('Edit clicked - Task:', {
            title: this.titleElement.textContent,
            completed: this.checkbox.checked,
            dueDate: this.dueDate.toISOString(),
        });

        // Example: Could show a toast notification
        this.showFeedback('Edit functionality would open a form');
    }

    /**
     * Handle delete button click
     * In a real app, this would remove the task after confirmation
     */
    handleDelete() {
        const confirmed = confirm(
            'Are you sure you want to delete this task?\n\n' + 
            this.titleElement.textContent
        );

        if (confirmed) {
            console.log('Delete confirmed - Removing task:', this.titleElement.textContent);
            
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
     */
    showFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'toast-feedback';
        feedback.textContent = message;

        document.body.appendChild(feedback);

        // Trigger animation
        setTimeout(() => {
            feedback.classList.add('show');
        }, 10);

        // Remove after delay
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }

    /**
     * Setup keyboard navigation for better accessibility
     */
    setupKeyboardNavigation() {
        // Tab order is already handled by HTML, but we can add skip link functionality if needed
        document.addEventListener('keydown', (e) => {
            // Handle Enter/Space on checkbox
            if (e.target === this.checkbox && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                this.checkbox.click();
            }

            // Handle Enter on buttons
            if (e.key === 'Enter' && (e.target === this.editButton || e.target === this.deleteButton)) {
                e.target.click();
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
