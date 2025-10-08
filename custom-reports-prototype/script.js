document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const createReportBtn = document.getElementById('createReportBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const createFromTemplate = document.getElementById('createFromTemplate');
    const templateCards = document.querySelectorAll('.template-card');

    let selectedTemplate = null;

    // Open modal
    createReportBtn.addEventListener('click', function() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal functions
    function closeModalFunction() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Reset selection
        templateCards.forEach(card => card.classList.remove('selected'));
        selectedTemplate = null;
        createFromTemplate.disabled = true;
    }

    closeModal.addEventListener('click', closeModalFunction);
    cancelBtn.addEventListener('click', closeModalFunction);

    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModalFunction();
        }
    });

    // Template selection
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove previous selection
            templateCards.forEach(c => c.classList.remove('selected'));
            
            // Select current card
            this.classList.add('selected');
            selectedTemplate = this.dataset.template;
            
            // Enable create button
            createFromTemplate.disabled = false;
        });
    });

    // Create report from template
    createFromTemplate.addEventListener('click', function() {
        if (selectedTemplate) {
            // Simulate creating report
            alert(`Creating ${getTemplateName(selectedTemplate)} report...`);
            closeModalFunction();
            
            // You could add actual functionality here to create the report
            // For now, we'll just show a success message
            setTimeout(() => {
                alert('Report created successfully!');
            }, 1000);
        }
    });

    // Helper function to get template name
    function getTemplateName(template) {
        const names = {
            'category': 'Category',
            'item-sales': 'Item Sales',
            'pmix': 'PMIX',
            'weekly-sales': 'Weekly Sales'
        };
        return names[template] || 'Unknown';
    }

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const tableRows = document.querySelectorAll('.reports-table tbody tr');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        tableRows.forEach(row => {
            const reportName = row.querySelector('.report-name').textContent.toLowerCase();
            const reportDescription = row.querySelector('.report-description').textContent.toLowerCase();
            
            if (reportName.includes(searchTerm) || reportDescription.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        
        updateReportCount();
    });

    // Filter functionality
    const filterSelect = document.querySelector('.filter-dropdown select');
    
    filterSelect.addEventListener('change', function() {
        const filterValue = this.value.toLowerCase();
        
        tableRows.forEach(row => {
            if (filterValue === 'all status') {
                row.style.display = '';
            } else {
                const status = row.querySelector('.status-badge').textContent.toLowerCase();
                if (status === filterValue) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
        
        updateReportCount();
    });

    // Update report count
    function updateReportCount() {
        const visibleRows = Array.from(tableRows).filter(row => row.style.display !== 'none');
        const totalRows = tableRows.length;
        const reportCount = document.querySelector('.report-count');
        reportCount.textContent = `${visibleRows.length} of ${totalRows} reports`;
    }

    // Action buttons functionality
    const actionBtns = document.querySelectorAll('.action-btn');
    
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-eye')) {
                // View report
                const reportName = this.closest('tr').querySelector('.report-name').textContent.trim();
                alert(`Opening report: ${reportName}`);
            } else if (icon.classList.contains('fa-ellipsis-h')) {
                // Show more options menu
                alert('More options menu would appear here');
            }
        });
    });

    // Navigation functionality for the simplified sidebar
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked item
            this.parentElement.classList.add('active');
            
            // Here you could add routing logic to show different pages
            const linkText = this.textContent.trim();
            console.log(`Navigating to: ${linkText}`);
        });
    });

    // Add some interactive hover effects
    const reportRows = document.querySelectorAll('.reports-table tbody tr');
    
    reportRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});
