// assets/js/main.js
window.addEventListener('DOMContentLoaded', () => {

  // If on landing page we do nothing here (landing uses anchor link)
  // On glosario or colaboradores pages we need to fetch data and render.
  const path = location.pathname.split('/').pop();

  // Common elements
  const toEmbedUrl = (urlOrId) => {
    if (!urlOrId) return '';
    if (urlOrId.includes('watch?v=')) return urlOrId.replace('watch?v=', 'embed/');
    if (urlOrId.includes('youtube.com/embed/')) return urlOrId;
    if (!urlOrId.includes('/')) return `https://www.youtube.com/embed/${urlOrId}`;
    return urlOrId;
  };

  // Only run glossary logic on glosario.html
  if (path === '' || path === 'index.html') {
    // nothing extra here
    return;
  }

  // Load data
  async function loadData() {
    try {
      const [glossRes, collRes, funRes] = await Promise.all([
        fetch('../data/glossary.json').then(r => r.json()).catch(_ => fetch('data/glossary.json').then(r => r.json())),
        fetch('../data/collaborators.json').then(r => r.json()).catch(_ => fetch('data/collaborators.json').then(r => r.json())),
        fetch('../data/funfacts.json').then(r => r.json()).catch(_ => fetch('data/funfacts.json').then(r => r.json()))
      ]);
      return { glossary: glossRes || [], collaborators: collRes || [], funfacts: funRes || [] };
    } catch (err) {
      console.error('Error cargando JSON:', err);
      return { glossary: [], collaborators: [], funfacts: [] };
    }
  }

  loadData().then(data => {
    if (path === 'glosario.html' || path === 'glossary.html') {
      initGlossaryPage(data);
    } else if (path === 'colaboradores.html' || path === 'colaborators.html') {
      initCollaboratorsPage(data);
    }
  });

  // ---------- GLOSSARY ----------
  function initGlossaryPage({ glossary, collaborators, funfacts }) {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const glossaryGrid = document.getElementById('glossaryGrid');
    const resultsCountEl = document.getElementById('resultsCount');
    const datoDiaEl = document.getElementById('dato-dia');

    // populate categories
    const cats = Array.from(new Set(glossary.map(s => s.categoria))).sort();
    cats.forEach(c => {
      const o = document.createElement('option'); o.value = c; o.textContent = c;
      categoryFilter.appendChild(o);
    });

    // funfact
    if (funfacts && funfacts.length && datoDiaEl) {
      const idx = (new Date()).getDate() % funfacts.length;
      datoDiaEl.textContent = funfacts[idx];
    }

    // initial render
    renderGlossary(glossary);

    // search/filter listeners
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);

    function applyFilters() {
      const term = (searchInput.value || '').trim().toLowerCase();
      const cat = categoryFilter.value || 'all';
      const filtered = glossary.filter(s => {
        const matchTerm = s.palabra.toLowerCase().includes(term);
        const matchCat = cat === 'all' ? true : s.categoria === cat;
        return matchTerm && matchCat;
      });
      renderGlossary(filtered);
    }

    function renderGlossary(list) {
      glossaryGrid.innerHTML = '';
      if (!list.length) {
        glossaryGrid.innerHTML = `<p class="text-gray-600">No hay resultados.</p>`;
        resultsCountEl.textContent = 0;
        return;
      }
      list.forEach((sign, idx) => {
        const card = document.createElement('article');
        card.className = 'bg-white rounded-2xl shadow card-hover overflow-hidden';

        // first embed
        const embed0 = toEmbedUrl(sign.videos[0].url || sign.videos[0].embed || '');
        const tabsId = `tabs-${idx}`, iframeId = `iframe-${idx}`;

        // HTML structure
        card.innerHTML = `
          <div class="p-4">
            <h3 class="text-xl font-semibold text-center text-gray-900">${escapeHtml(sign.palabra)}</h3>
            <p class="text-sm text-gray-600 text-center mt-1">${escapeHtml(sign.meaning || '')}</p>
          </div>

          <div id="${tabsId}" class="px-4 pb-2 flex gap-2 justify-center flex-wrap"></div>

          <div class="video-embed">
            <iframe id="${iframeId}" src="${embed0}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>

          <div class="p-4 border-t">
            <p class="text-sm text-gray-600 text-center">Colaborador: <strong>${escapeHtml(sign.videos[0].profesor)}</strong>  |  Contexto: <strong>${escapeHtml(sign.context)}</strong></p>
          </div>
        `;

        glossaryGrid.appendChild(card);

        // tabs
        const tabsContainer = document.getElementById(tabsId);
        sign.videos.forEach((v, iVid) => {
          const btn = document.createElement('button');
          btn.className = iVid === 0 ? 'px-3 py-1 rounded-full bg-indigo-600 text-white text-sm' : 'px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700';
          btn.textContent = v.profesor;
          btn.dataset.embed = toEmbedUrl(v.url);
          btn.addEventListener('click', () => {
            document.getElementById(iframeId).src = btn.dataset.embed;
            // reset styles
            tabsContainer.querySelectorAll('button').forEach(b => {
              b.classList.remove('bg-indigo-600', 'text-white');
              b.classList.add('bg-gray-100', 'text-gray-700');
            });
            btn.classList.add('bg-indigo-600', 'text-white');
            btn.classList.remove('bg-gray-100', 'text-gray-700');
          });
          tabsContainer.appendChild(btn);
        });
      });

      resultsCountEl.textContent = list.length;
    }

    function escapeHtml(s) {
      return String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    }
  }

  // ---------- COLLABORATORS PAGE ----------
  function initCollaboratorsPage({ glossary, collaborators, funfacts }) {
    const row = document.getElementById('collaboratorsRow');
    if (!row) return;
    row.innerHTML = '';
    collaborators.forEach(c => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-2xl shadow p-4 min-w-[220px] flex-shrink-0';
      card.innerHTML = `
        <div class="flex flex-col items-center">
          <img src="${escapeHtml(c.photo)}" alt="${escapeHtml(c.nombre)}" class="w-24 h-24 rounded-full object-cover mb-3" />
          <h4 class="text-lg font-semibold text-indigo-600">${escapeHtml(c.nombre)}</h4>
          <p class="text-sm text-gray-600 mt-1">Años colaborando: <span class="font-medium">${escapeHtml(String(c.years))}</span></p>
          <p class="text-sm text-gray-700 mt-2 text-center">${escapeHtml(c.description)}</p>
        </div>
      `;
      row.appendChild(card);
    });

    function escapeHtml(s) {
      return String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    }
  }

});
