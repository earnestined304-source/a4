// ==========================================================================
// SockEssentials - Interactive Footwear & Fiber Script
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle System with Persistence
    const themeToggle = document.getElementById('themeToggle');
    const bodyElement = document.body;

    const savedTheme = localStorage.getItem('sockessentials_theme') || 'light';
    bodyElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = bodyElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            bodyElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('sockessentials_theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const iconSpan = themeToggle.querySelector('.theme-icon');
        if (iconSpan) {
            iconSpan.textContent = theme === 'dark' ? '☀️' : '🌓';
        }
    }

    // 2. Mobile Drawer Navigation
    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerClose = document.getElementById('drawerClose');

    if (menuToggle && mobileDrawer) {
        menuToggle.addEventListener('click', () => {
            mobileDrawer.classList.add('open');
        });
    }

    if (drawerClose && mobileDrawer) {
        drawerClose.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });
    }

    // 3. Reading Progress Bar on Articles
    const readingProgress = document.getElementById('readingProgress');
    if (readingProgress) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            readingProgress.style.width = scrolled + '%';
        });
    }

    // 4. Interactive Fiber & Fit Navigator Tabs
    const finderBtns = document.querySelectorAll('.finder-tab-btn');
    const finderPanes = document.querySelectorAll('.finder-pane');

    if (finderBtns.length > 0 && finderPanes.length > 0) {
        finderBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                
                finderBtns.forEach(b => b.classList.remove('active'));
                finderPanes.forEach(p => p.classList.remove('active'));

                btn.classList.add('active');
                const activePane = document.getElementById(targetId);
                if (activePane) {
                    activePane.classList.add('active');
                }
            });
        });
    }

    // 5. Journal Search & Filtering
    const journalSearch = document.getElementById('journalSearch');
    const journalCards = document.querySelectorAll('.journal-card');
    const categoryBtns = document.querySelectorAll('.category-filter-btn');

    if (journalSearch && journalCards.length > 0) {
        journalSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            journalCards.forEach(card => {
                const title = card.querySelector('.journal-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.journal-excerpt').textContent.toLowerCase();
                if (title.includes(term) || excerpt.includes(term)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    if (categoryBtns.length > 0 && journalCards.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const cat = btn.getAttribute('data-category');
                journalCards.forEach(card => {
                    const cardCat = card.getAttribute('data-category');
                    if (cat === 'all' || cardCat === cat) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});
