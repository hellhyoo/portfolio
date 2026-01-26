        const tags = document.querySelectorAll('.skills-tag');
        const icons = document.querySelectorAll('.skills-icon');

        // Объединяем все интерактивные элементы
        const allElements = [...tags, ...icons];

        // Функция для подсветки элементов по data-skill
        function highlightSkill(skill) {
            allElements.forEach(el => {
                if (el.dataset.skill === skill) {
                    el.classList.add('highlighted');
                }
            });
        }

        // Функция для снятия подсветки
        function unhighlightAll() {
            allElements.forEach(el => el.classList.remove('highlighted'));
        }

        // Один цикл для всех элементов
        allElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                highlightSkill(el.dataset.skill);
            });
            el.addEventListener('mouseleave', unhighlightAll);
        });