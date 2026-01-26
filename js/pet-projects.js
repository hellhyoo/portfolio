(function() {
    'use strict';
    
    const PetProjects = {
        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        },
        
        setup() {
            const section = document.getElementById('projectSection');
            const toggleBtn = document.getElementById('toggleBtn');
            const textShow = document.getElementById('textShow');
            const textHide = document.getElementById('textHide');
            
            if (!section || !toggleBtn) return;
            
            let widthShow, widthHide;
            
            // Функция измерения ширины кнопки
            const measure = () => {
                const cs = getComputedStyle(toggleBtn);
                const offset = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) 
                    + parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
                
                widthShow = textShow.offsetWidth + offset;
                widthHide = textHide.offsetWidth + offset;
                
                toggleBtn.style.width = (toggleBtn.classList.contains('active') 
                    ? widthHide 
                    : widthShow) + 'px';
            };
            
            // ResizeObserver следит за изменением размера кнопки
            new ResizeObserver(measure).observe(toggleBtn);
            
            // Переключение при клике
            toggleBtn.addEventListener('click', () => {
                section.classList.toggle('expanded');
                toggleBtn.classList.toggle('active');
                
                toggleBtn.style.width = (toggleBtn.classList.contains('active') 
                    ? widthHide 
                    : widthShow) + 'px';
            });
        }
    };
    
    PetProjects.init();
})();