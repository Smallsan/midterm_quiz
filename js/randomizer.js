// Randomizer fetches posters list and picks one at random
async function loadPosters() {
  try {
    const res = await fetch('data/posters.json');
    const posters = await res.json();
    return posters.filter(p => !p.startsWith('_'));
  } catch (err) {
    console.error('Failed to load posters', err);
    return [];
  }
}

function titleFromFilename(name) {
  // Remove extension and replace dashes/underscores with spaces
  const noExt = name.replace(/\.[^.]+$/, '');
  return noExt.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
}

async function showRandom() {
  const posters = await loadPosters();
  const container = document.getElementById('random-poster');
  const titleEl = document.getElementById('random-title');
  if (!posters.length) {
    container.innerHTML = '<p>No posters available.</p>';
    titleEl.textContent = '';
    return;
  }
  const pick = posters[Math.floor(Math.random() * posters.length)];
  const img = document.createElement('img');
  img.src = `assets/images/Plex Collection Posters/${encodeURI(pick)}`;
  img.alt = titleFromFilename(pick);
  img.loading = 'lazy';
  img.style.maxWidth = '420px';
  img.style.width = '100%';
  container.innerHTML = '';
  container.appendChild(img);
  titleEl.textContent = titleFromFilename(pick);
}

window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('randomize-btn');
  if (btn) btn.addEventListener('click', showRandom);
  showRandom();
});
