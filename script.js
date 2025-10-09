let signs = [];
let funFacts = [];

const glossary = document.getElementById("glossary");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const funFactText = document.getElementById("funFactText");

// Cargar datos de señas
fetch('data/signs.json')
  .then(res => res.json())
  .then(data => {
    signs = data;
    populateCategoryFilter();
    displaySigns(signs);
  });

// Cargar datos curiosos
fetch('data/funfacts.json')
  .then(res => res.json())
  .then(data => {
    funFacts = data;
    displayFunFact();
  });

// Filtro de categorías
function populateCategoryFilter() {
  const categories = [...new Set(signs.map(s => s.categoria))];
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// Mostrar señas
function displaySigns(list) {
  glossary.innerHTML = '';
  list.forEach(sign => {
    const card = document.createElement('div');
    card.className = 'card';

    const title = document.createElement('h2');
    title.textContent = sign.palabra;
    card.appendChild(title);

    // Tabs para múltiples videos
    if(sign.videos.length > 1) {
      const tabs = document.createElement('div');
      tabs.className = 'tabs';
      sign.videos.forEach((v, idx) => {
        const btn = document.createElement('button');
        btn.textContent = v.profesor;
        btn.className = 'tab-btn';
        if(idx === 0) btn.classList.add('active');
        btn.onclick = () => {
          card.querySelector('iframe').src = v.url.replace("watch?v=", "embed/");
          tabs.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
          btn.classList.add('active');
        };
        tabs.appendChild(btn);
      });
      card.appendChild(tabs);
    }

    const iframe = document.createElement('iframe');
    iframe.src = sign.videos[0].url.replace("watch?v=", "embed/");
    iframe.frameBorder = 0;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    card.appendChild(iframe);

    // Profesor y contexto
    const label = document.createElement('p');
    label.className = 'label';
    label.textContent = `Profesor: ${sign.videos[0].profesor} | Contexto: ${sign.context} | Significado: ${sign.meaning}`;
    card.appendChild(label);

    glossary.appendChild(card);
  });
}

// Buscar y filtrar
function filterSigns() {
  const term = searchInput.value.toLowerCase();
  const filtered = signs.filter(s => s.palabra.toLowerCase().includes(term) &&
    (categoryFilter.value === 'all' || s.categoria === categoryFilter.value));
  displaySigns(filtered);
}

searchInput.addEventListener('input', filterSigns);
categoryFilter.addEventListener('change', filterSigns);

// Mostrar dato curioso diario
function displayFunFact() {
  const day = new Date().getDate();
  funFactText.textContent = funFacts[day % funFacts.length];
}
