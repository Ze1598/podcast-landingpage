// Set dynamic year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Guest carousel
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    if (!track || !prevBtn || !nextBtn) return;

    const items = Array.from(track.querySelectorAll('.guest-item'));
    const total = items.length;
    let current = 0;
    let autoTimer = null;
    let isHovered = false;

    // Build dot indicators
    const dots = items.map((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to guest ${i + 1}`);
        dot.addEventListener('click', () => { goTo(i); resetAuto(); });
        indicatorsContainer.appendChild(dot);
        return dot;
    });

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = isHovered ? null : setInterval(() => goTo(current + 1), 10000);
    }

    function resetAuto() {
        clearInterval(autoTimer);
        autoTimer = isHovered ? null : setInterval(() => goTo(current + 1), 10000);
    }

    prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

    // Pause on hover; resume with a fresh 10s window on leave
    const carousel = track.closest('.carousel');
    carousel.addEventListener('mouseenter', () => {
        isHovered = true;
        clearInterval(autoTimer);
        autoTimer = null;
    });
    carousel.addEventListener('mouseleave', () => {
        isHovered = false;
        startAuto();
    });

    startAuto();
});
