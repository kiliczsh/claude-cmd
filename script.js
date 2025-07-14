// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;

// Load saved theme or default to light (Anthropic style)
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeIcon.textContent = '🌙';
} else {
    themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    themeIcon.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Commands Data and State
let allCommands = [];
let filteredCommands = [];
let currentView = 'list';
let currentFilter = 'all';

// Pagination State
let currentPage = 1;
const commandsPerPage = 12;

// DOM Elements
const commandsContainer = document.getElementById('commands-container');
const commandSearch = document.getElementById('command-search');
const listViewBtn = document.getElementById('list-view');
const gridViewBtn = document.getElementById('grid-view');
const filterTags = document.getElementById('filter-tags');
const commandsCount = document.getElementById('commands-count');

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Find the copy button that was clicked
        const copyBtn = event.target.closest('.copy-btn');
        if (copyBtn) {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 1000);
        }
    }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const copyBtn = event.target.closest('.copy-btn');
        if (copyBtn) {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 1000);
        }
    });
}

// Load commands from GitHub (works both locally and when deployed)
async function loadCommands() {
    try {
        const dataURL = 'https://raw.githubusercontent.com/kiliczsh/claude-cmd/refs/heads/main/commands/commands.json';
        const response = await fetch(dataURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allCommands = await response.json();
        filteredCommands = [...allCommands];
        
        // Extract unique tags and create filter buttons
        const tags = new Set();
        allCommands.forEach(cmd => {
            cmd.tags.forEach(tag => tags.add(tag));
        });
        
        createFilterTags([...tags].sort());
        renderCommands();
        updateCommandsCount();
        renderPagination();
        
    } catch (error) {
        console.error('Error loading commands:', error);
        commandsContainer.innerHTML = `
            <div class="error-message">
                <p>Failed to load commands. Please try again later.</p>
                <p>Error: ${error.message}</p>
            </div>
        `;
        commandsCount.textContent = 'Error loading commands';
    }
}

// Create filter tag buttons
function createFilterTags(tags) {
    filterTags.innerHTML = '<button class="tag-filter active" data-tag="all">All</button>';
    
    tags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'tag-filter';
        button.dataset.tag = tag;
        button.textContent = capitalizeFirst(tag);
        filterTags.appendChild(button);
    });
    
    // Add event listeners to filter buttons
    filterTags.addEventListener('click', (e) => {
        if (e.target.classList.contains('tag-filter')) {
            // Remove active class from all buttons
            filterTags.querySelectorAll('.tag-filter').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Update filter and render
            currentFilter = e.target.dataset.tag;
            applyFilters();
        }
    });
}

// Apply search and tag filters
function applyFilters() {
    const searchTerm = commandSearch.value.toLowerCase().trim();
    
    filteredCommands = allCommands.filter(cmd => {
        // Tag filter
        const tagMatch = currentFilter === 'all' || cmd.tags.includes(currentFilter);
        
        // Search filter
        const searchMatch = !searchTerm || 
            cmd.name.toLowerCase().includes(searchTerm) ||
            cmd.description.toLowerCase().includes(searchTerm) ||
            cmd.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            cmd.author.toLowerCase().includes(searchTerm);
        
        return tagMatch && searchMatch;
    });
    
    // Reset to first page when filters change
    currentPage = 1;
    renderCommands();
    updateCommandsCount();
    renderPagination();
}

// Render commands based on current view with pagination
function renderCommands() {
    if (filteredCommands.length === 0) {
        commandsContainer.innerHTML = `
            <div class="no-commands">
                <p>No commands found matching your criteria.</p>
                <p>Try adjusting your search or filter settings.</p>
            </div>
        `;
        return;
    }
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * commandsPerPage;
    const endIndex = startIndex + commandsPerPage;
    const commandsToShow = filteredCommands.slice(startIndex, endIndex);
    
    const containerClass = currentView === 'grid' ? 'commands-grid' : 'commands-list';
    commandsContainer.className = containerClass;
    
    commandsContainer.innerHTML = commandsToShow
        .map(cmd => createCommandCard(cmd))
        .join('');
}

// Create individual command card HTML
function createCommandCard(command) {
    const category = command.id.split('/')[0] || 'general';
    const tagsHtml = command.tags
        .map(tag => `<span class="command-tag">${tag}</span>`)
        .join('');
    
    return `
        <div class="command-card" onclick="showCommandDetails('${command.id}')" style="cursor: pointer;">
            <div class="command-header">
                <h3 class="command-name">${escapeHtml(command.name)}</h3>
                <span class="command-category">${capitalizeFirst(category)}</span>
            </div>
            <p class="command-description">${escapeHtml(command.description)}</p>
            <div class="command-meta">
                <div class="command-author">
                    <span>👤</span>
                    <span>${escapeHtml(command.author)}</span>
                </div>
                <div class="command-tags">
                    ${tagsHtml}
                </div>
            </div>
        </div>
    `;
}

// Update commands count display
function updateCommandsCount() {
    const total = allCommands.length;
    const filtered = filteredCommands.length;
    const startIndex = (currentPage - 1) * commandsPerPage + 1;
    const endIndex = Math.min(currentPage * commandsPerPage, filtered);
    
    if (filtered === 0) {
        commandsCount.textContent = 'No commands found';
    } else if (filtered === total) {
        commandsCount.textContent = `Showing ${startIndex}-${endIndex} of ${total} commands`;
    } else {
        commandsCount.textContent = `Showing ${startIndex}-${endIndex} of ${filtered} filtered commands (${total} total)`;
    }
}

// Render pagination controls
function renderPagination() {
    const totalPages = Math.ceil(filteredCommands.length / commandsPerPage);
    const paginationContainer = document.getElementById('pagination-controls');
    
    if (!paginationContainer || totalPages <= 1) {
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="pagination-btn" onclick="goToPage(${currentPage - 1})">« Previous</button>`;
    }
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        paginationHTML += `<button class="pagination-btn" onclick="goToPage(1)">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        paginationHTML += `<button class="pagination-btn ${activeClass}" onclick="goToPage(${i})">${i}</button>`;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
        paginationHTML += `<button class="pagination-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="pagination-btn" onclick="goToPage(${currentPage + 1})">Next »</button>`;
    }
    
    paginationContainer.innerHTML = paginationHTML;
}

// Navigate to specific page
function goToPage(page) {
    const totalPages = Math.ceil(filteredCommands.length / commandsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderCommands();
        updateCommandsCount();
        renderPagination();
        
        // Scroll to top of commands section
        document.getElementById('commands').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
        });
    }
}

// View toggle functionality
listViewBtn.addEventListener('click', () => {
    currentView = 'list';
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
    renderCommands();
});

gridViewBtn.addEventListener('click', () => {
    currentView = 'grid';
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
    renderCommands();
});

// Search functionality with debouncing
let searchTimeout;
commandSearch.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        applyFilters();
    }, 300);
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Utility functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Privacy Policy Modal (simple implementation)
function showPrivacyPolicy() {
    alert('Privacy Policy: This is a static website hosted on GitHub Pages. We do not collect any personal data. The theme preference is stored locally in your browser.');
}

// Terms of Service Modal (simple implementation)
function showTermsOfService() {
    alert('Terms of Service: Claude CMD is provided "as is" under the MIT License. Use at your own risk. See the GitHub repository for full license terms.');
}

// Enhanced intersection observer for staggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for smoother animations
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.use-case-card, .command-card, .install-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Command details modal functionality
let selectedCommand = null;

function showCommandDetails(commandId) {
    selectedCommand = allCommands.find(cmd => cmd.id === commandId);
    if (!selectedCommand) return;
    
    const modal = document.getElementById('command-modal');
    const category = selectedCommand.id.split('/')[0] || 'general';
    
    // Populate modal content
    document.getElementById('modal-command-name').textContent = selectedCommand.name;
    document.getElementById('modal-command-category').textContent = capitalizeFirst(category);
    document.getElementById('modal-command-author').textContent = `👤 ${selectedCommand.author}`;
    document.getElementById('modal-command-description').textContent = selectedCommand.description;
    
    // Tags
    const tagsContainer = document.getElementById('modal-command-tags');
    tagsContainer.innerHTML = selectedCommand.tags
        .map(tag => `<span class="command-tag">${tag}</span>`)
        .join('');
    
    // GitHub link
    const githubLink = document.getElementById('modal-github-link');
    githubLink.href = `https://github.com/kiliczsh/claude-cmd/blob/main/commands/${selectedCommand.filePath}`;
    
    // Dates
    const createdDate = new Date(selectedCommand.created_at).toLocaleDateString();
    const updatedDate = new Date(selectedCommand.updated_at).toLocaleDateString();
    document.getElementById('modal-created-date').textContent = createdDate;
    document.getElementById('modal-updated-date').textContent = updatedDate;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCommandModal() {
    const modal = document.getElementById('command-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedCommand = null;
}

function copyCommandId() {
    if (selectedCommand) {
        copyToClipboard(selectedCommand.id);
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('command-modal');
    if (e.target === modal) {
        closeCommandModal();
    }
});

// Make functions globally accessible
window.copyToClipboard = copyToClipboard;
window.showCommandDetails = showCommandDetails;
window.closeCommandModal = closeCommandModal;
window.copyCommandId = copyCommandId;

// Load commands when page loads
document.addEventListener('DOMContentLoaded', loadCommands);

// Enhanced keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Escape key to close FAQ items and modal
    if (e.key === 'Escape') {
        document.querySelectorAll('.faq-item.active').forEach(item => {
            item.classList.remove('active');
        });
        
        // Close modal if open
        const modal = document.getElementById('command-modal');
        if (modal && modal.style.display === 'flex') {
            closeCommandModal();
        }
    }
    
    // Enter/Space to toggle theme
    if ((e.key === 'Enter' || e.key === ' ') && e.target === themeToggle) {
        e.preventDefault();
        themeToggle.click();
    }
    
    // Arrow keys for filter navigation
    if (e.target.classList.contains('tag-filter')) {
        const filters = Array.from(document.querySelectorAll('.tag-filter'));
        const currentIndex = filters.indexOf(e.target);
        
        if (e.key === 'ArrowRight' && currentIndex < filters.length - 1) {
            e.preventDefault();
            filters[currentIndex + 1].focus();
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            e.preventDefault();
            filters[currentIndex - 1].focus();
        }
    }
    
    // Enter/Space to trigger copy buttons
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('copy-btn')) {
        e.preventDefault();
        e.target.click();
    }
});

// Error boundary for better error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Could implement error reporting here
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Log Core Web Vitals if available
        if ('web-vitals' in window) {
            // This would require the web-vitals library
            console.log('Web Vitals monitoring enabled');
        }
    });
}

// Add subtle hover effects for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to command cards
    const commandCards = document.querySelectorAll('.command-card');
    commandCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Preload critical resources
document.addEventListener('DOMContentLoaded', () => {
    // Preload the commands JSON file
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = './commands/commands.json';
    document.head.appendChild(link);
});

// Add support for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition', 'none');
    
    // Remove animation classes
    document.addEventListener('DOMContentLoaded', () => {
        const animatedElements = document.querySelectorAll('.use-case-card, .command-card, .install-card');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    });
}