const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible'); // reset when out of view
        }
           
    });
}, {
    threshold: 0.2 
});

sections.forEach(section => {
    observer.observe(section);
});

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', (e) => {
    e.preventDefault();

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const track = document.querySelector('.icon-track');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Show correct icon
    sunIcon.style.opacity = '';  // clear any leftover inline styles
    moonIcon.style.opacity = '';
    sunIcon.style.left = '';
    moonIcon.style.left = '';

    if (isDark) {
        track.classList.remove('to-dark');
        track.classList.add('to-light');
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        track.classList.remove('to-light');
        track.classList.add('to-dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }

    track.classList.add('animating');

    setTimeout(() => {
        track.classList.remove('animating', 'to-dark', 'to-light');
    }, 600);
});

// Keep the theme after refreshing the page
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

const nameEl = document.getElementById('animated-name');
const nameText = nameEl.textContent;

nameEl.innerHTML = ''; // clear the original text

[...nameText].forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char; 
    span.classList.add('letter');
    span.style.transitionDelay = `${index * 0.03}s`;
    nameEl.appendChild(span);
});

