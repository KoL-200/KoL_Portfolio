const phrases = [
    "Hi,",
    "I'm KoL.",
    "A Backend Engineer.",
    "I specialize in system design & clean architecture."
];
const typeLine = document.getElementById('typeLine');
let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;
const TYPE_SPEED = 55;
const DELETE_SPEED = 30;
const HOLD = 1400;
const GAP = 400;

function tick() {
    const currentPhrase = phrases[phraseIndex];
    if (!deleting) {
        characterIndex++;
        typeLine.childNodes[0].nodeValue = currentPhrase.slice(0, characterIndex);
        if (characterIndex === currentPhrase.length) {
            deleting = true;
            return setTimeout(tick, HOLD);
        }
        return setTimeout(tick, TYPE_SPEED);
    }

    characterIndex--;
    typeLine.childNodes[0].nodeValue = currentPhrase.slice(0, characterIndex);
    if (characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        return setTimeout(tick, GAP);
    }
    return setTimeout(tick, DELETE_SPEED);
}

setTimeout(tick, 500);

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('kol-theme');

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.dataset.theme = isDark ? 'dark' : 'light';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to white theme' : 'Switch to black theme');
    themeToggle.querySelector('.theme-text').textContent = isDark ? 'White' : 'Black';
    themeToggle.querySelector('.theme-icon').textContent = isDark ? '☾' : '☼';
}

applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('kol-theme', nextTheme);
});

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
});
const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
});

function updateDateTime() {
    const now = new Date();
    document.getElementById('currentDate').textContent = dateFormatter.format(now);
    document.getElementById('currentTime').textContent = timeFormatter.format(now);
}

updateDateTime();
setInterval(updateDateTime, 1000);

const rubikCube = document.getElementById('rubikCube');
const faceNames = ['front', 'back', 'right', 'left', 'top', 'bottom'];

for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            const cubie = document.createElement('div');
            const seed = x * 17 + y * 31 + z * 43;
            cubie.className = 'cubie';
            cubie.style.setProperty('--final-x', `${x * 35}px`);
            cubie.style.setProperty('--final-y', `${y * 35}px`);
            cubie.style.setProperty('--final-z', `${z * 35}px`);
            cubie.style.setProperty('--scatter-x', `${x * 35 + (seed % 5) * 22}px`);
            cubie.style.setProperty('--scatter-y', `${y * 35 + ((seed + 3) % 5) * 19}px`);
            cubie.style.setProperty('--scatter-z', `${z * 35 + ((seed + 7) % 5) * 20}px`);
            cubie.style.setProperty('--scatter-rx', `${(seed % 4) * 90}deg`);
            cubie.style.setProperty('--scatter-ry', `${((seed + 1) % 4) * 90}deg`);
            cubie.style.setProperty('--scatter-rz', `${((seed + 2) % 4) * 90}deg`);
            cubie.style.setProperty('--delay', `${Math.abs(seed % 9) * -0.08}s`);

            faceNames.forEach((faceName) => {
                const face = document.createElement('span');
                face.className = `cubie-face ${faceName}`;
                cubie.appendChild(face);
            });
            rubikCube.appendChild(cubie);
        }
    }
}

document.querySelector('.note').textContent =
    document.querySelector('.note').textContent.replace('{{YEAR}}', new Date().getFullYear());

const starsLayer = document.getElementById('starsLayer');
for (let i = 0; i < 220; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.2 + .6;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * -5}s`;
    star.style.animationDuration = `${2.2 + Math.random() * 3.8}s`;
    star.style.boxShadow = `0 0 ${2 + Math.random() * 7}px var(--star-glow)`;
    starsLayer.appendChild(star);
}
