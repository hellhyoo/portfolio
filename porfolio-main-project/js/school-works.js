(function() {
    'use strict';
    
    const SchoolCarousel = {
        currentIndex: 0,
        slides: [],
        thumbnails: [],
        
        // Массив акцентов для работ
        accents: [
            '#d8005f', // work 1
            '#08c291', // work 2
            '#0091ff', // work 3
            '#d92641', // work 4
            '#0cac44', // work 5
            '#ffbb00', // work 6
            '#f06800', // work 7
            '#b55af2', // work 8
            '#e878b4', // work 9
            '#bfa892', // work 10
            '#0eb8cd', // work 11
        ],
        
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
            
            // Установить начальный акцент
            this.updateAccent();
            
            // Навигация стрелками
            prevBtn?.addEventListener('click', () => this.prev());
            nextBtn?.addEventListener('click', () => this.next());
            
            // Навигация миниатюрами
            this.thumbnails.forEach((thumb, index) => {
                thumb.addEventListener('click', () => this.goToSlide(index));
            });
            
            // Клавиатурная навигация
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            });
        },
        
        goToSlide(index) {
            if (index === this.currentIndex) return;
            
            const currentSlide = this.slides[this.currentIndex];
            const nextSlide = this.slides[index];
            
            // Определить направление
            if (index > this.currentIndex) {
                currentSlide.classList.add('prev');
                currentSlide.classList.remove('active');
                nextSlide.classList.remove('prev');
                nextSlide.classList.add('active');
            } else {
                currentSlide.classList.remove('active');
                nextSlide.classList.remove('prev');
                nextSlide.classList.add('active');
                
                setTimeout(() => {
                    currentSlide.classList.remove('prev');
                }, 500);
            }
            
            // Обновить миниатюры
            this.thumbnails[this.currentIndex]?.classList.remove('active');
            this.thumbnails[index]?.classList.add('active');
            
            this.currentIndex = index;
            this.updateAccent();
        },
        
        next() {
            const nextIndex = (this.currentIndex + 1) % this.slides.length;
            this.goToSlide(nextIndex);
        },
        
        prev() {
            const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            this.goToSlide(prevIndex);
        },
        
        updateAccent() {
            const accent = this.accents[this.currentIndex];
            
            if (accent) {
                // Установить CSS переменную для текущего акцента
                document.documentElement.style.setProperty('--current-accent', accent);
            }
        }
    };
    
    SchoolCarousel.init();
})();