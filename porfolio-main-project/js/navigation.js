(function() {
    'use strict';
    
    const SmoothNav = {
        activeLink: null,
        
        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        },
        
        setup() {
            const nav = document.querySelector('.smooth-nav');
            const indicator = document.querySelector('.smooth-nav-indicator');
            
            if (!nav || !indicator) return;
            
            const links = document.querySelectorAll('.smooth-nav-link');
            
            // Hover-эффект - только индикатор
            links.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    this.updateIndicator(link, nav, indicator);
                    indicator.classList.add('active');
                });
                
                // Плавный скролл при клике
                link.addEventListener('click', (e) => {
                    const sectionId = link.dataset.section;
                    if (sectionId) {
                        e.preventDefault();
                        this.scrollToSection(sectionId);
                    }
                });
            });
            
            // При уходе мыши - убрать индикатор
            nav.addEventListener('mouseleave', () => {
                indicator.classList.remove('active');
            });
            
            // Отслеживать текущую секцию при скролле
            this.observeSections();
        },
        
        updateIndicator(link, nav, indicator) {
            const linkRect = link.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();
            
            Object.assign(indicator.style, {
                left: `${linkRect.left - navRect.left}px`,
                top: `${linkRect.top - navRect.top}px`,
                width: `${linkRect.width}px`,
                height: `${linkRect.height}px`
            });
        },
        
        scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        
        observeSections(nav, indicator) {
            const sections = document.querySelectorAll('section[id]');
            const options = {
                rootMargin: '-50% 0px -50% 0px',
                threshold: 0
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.setActiveLink(entry.target.id, nav, indicator);
                    }
                });
            }, options);
            
            sections.forEach(section => observer.observe(section));
        },
        
        setActiveLink(sectionId) {
            const link = document.querySelector(`[data-section="${sectionId}"]`);
            
            if (link && link !== this.activeLink) {
                // Убрать активный класс у предыдущей ссылки
                if (this.activeLink) {
                    this.activeLink.classList.remove('active');
                }
                
                // Добавить к новой - только класс для цвета текста
                link.classList.add('active');
                this.activeLink = link;
                
                // НЕ трогаем индикатор - он управляется только hover
            }
        }
    };
    // Инициализация
    SmoothNav.init();
})();