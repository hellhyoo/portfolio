(function() {
    'use strict';
    
    const SchoolCarousel = {
        currentIndex: 0,
        slides: [],
        thumbnails: [],
        
        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        },
        
        setup() {
            this.slides = document.querySelectorAll('.carousel-slide');
            this.thumbnails = document.querySelectorAll('.thumbnail');
            const prevBtn = document.querySelector('.carousel-arrow-left');
            const nextBtn = document.querySelector('.carousel-arrow-right');
            
            if (!this.slides.length) return;
            
            prevBtn?.addEventListener('click', () => this.prev());
            nextBtn?.addEventListener('click', () => this.next());
            
            this.thumbnails.forEach((thumb, index) => {
                thumb.addEventListener('click', () => this.goToSlide(index));
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            });
        },
        
        goToSlide(index, forceDirection = null) {
            if (index === this.currentIndex || index < 0 || index >= this.slides.length) return;
            
            const currentSlide = this.slides[this.currentIndex];
            const nextSlide = this.slides[index];
            
            // Определяем направление
            let isForward;
            
            if (forceDirection !== null) {
                isForward = forceDirection;
            } else {
                const diff = index - this.currentIndex;
                const totalSlides = this.slides.length;
                
                if (Math.abs(diff) === totalSlides - 1) {
                    isForward = diff < 0;
                } else {
                    isForward = diff > 0;
                }
            }
            
            // Полностью очищаем все слайды от классов анимации
            this.slides.forEach(slide => {
                slide.classList.remove('exit-left', 'exit-right', 'from-left', 'from-right');
            });
            
            // Устанавливаем начальное положение для нового слайда БЕЗ transition
            nextSlide.style.transition = 'none';
            
            if (isForward) {
                // Вправо: новый начинает справа
                nextSlide.classList.add('from-right');
            } else {
                // Влево: новый начинает слева
                nextSlide.classList.add('from-left');
            }
            
            // Форсируем reflow для применения изменений
            void nextSlide.offsetHeight;
            
            // Возвращаем transition
            nextSlide.style.transition = '';
            
            // Запускаем анимацию
            requestAnimationFrame(() => {
                // Убираем активность у текущего и запускаем его выход
                currentSlide.classList.remove('active');
                
                if (isForward) {
                    // Вправо: текущий уходит влево
                    currentSlide.classList.add('exit-left');
                    nextSlide.classList.remove('from-right');
                } else {
                    // Влево: текущий уходит вправо
                    currentSlide.classList.add('exit-right');
                    nextSlide.classList.remove('from-left');
                }
                
                // Активируем следующий слайд
                nextSlide.classList.add('active');
            });
            
            // Обновляем миниатюры
            this.thumbnails[this.currentIndex]?.classList.remove('active');
            this.thumbnails[index]?.classList.add('active');
            
            this.currentIndex = index;
        },
        
        next() {
            const nextIndex = (this.currentIndex + 1) % this.slides.length;
            this.goToSlide(nextIndex, true); // true = вправо
        },
        
        prev() {
            const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            this.goToSlide(prevIndex, false); // false = влево
        }
    };
    
    SchoolCarousel.init();
})();