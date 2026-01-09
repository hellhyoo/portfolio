(function() {
    // Ждем загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSmoothNav);
    } else {
        initSmoothNav();
    }

    function initSmoothNav() {
        const nav = document.querySelector('.smooth-nav');
        const ind = document.querySelector('.smooth-nav-indicator');
    
        if (!nav || !ind) return;
    
        document.querySelectorAll('.smooth-nav-link').forEach(link => {
            link.onmouseenter = () => {
                const r = link.getBoundingClientRect();
                const n = nav.getBoundingClientRect();
                Object.assign(ind.style, {
                    left: r.left - n.left + 'px',
                    top: r.top - n.top + 'px',
                    width: r.width + 'px',
                    height: r.height + 'px'
                });
                ind.classList.add('active');
            };
        });

        nav.onmouseleave = () => ind.classList.remove('active');
    }
})();