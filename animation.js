document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content');

    function checkVisibility() {
        const viewportHeight = window.innerHeight;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < viewportHeight * 0.1) { // Ajuste conforme necessário
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }

    // Check visibility on scroll and resize
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    // Initial check
    checkVisibility();
});