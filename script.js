window.onload = function() {
  const landing = document.getElementById('landing');
  const enterBtn = document.getElementById('enterBtn');
  const glossarySection = document.getElementById('glossarySection');
  const glossary = document.getElementById('glossary');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');

  const toggleTeachersBtn = document.getElementById('toggleTeachersBtn');
  const teachersSection = document.getElementById('teachersSection');
  const teachersDiv = document.getElementById('teachers');

  const funFactText = document.getElementById('funFactText');

  // Datos de ejemplo
  const signs = [
    {
      palabra: "Hola",
      categoria: "Saludos",
      context: "Informal",
      videos: [
        { profesor: "Ana", url: "https://www.youtube.com/watch?v=VIDEOID1" },
        { profesor: "Lucas", url: "https://www.youtube.com/watch?v=VIDEOID2" },
        { profesor: "Mónica", url: "https://www.youtube.com/watch?v=VIDEOID3" }
      ]
    },
    {
      palabra: "Familia",
      categoria: "Sustantivos",
      context: "Formal",
      videos: [
        { profesor: "Ana", url: "https://www.youtube.com/watch?v=VIDEOID4" },
        { profesor: "Julián", url: "https://www.youtube.com/watch?v=VIDEOID5" },
        { profesor: "Lucas", url: "https://www.youtube.com/watch?v=VIDEOID6" }
      ]
    },
    {
      palabra: "Comer",
      categoria: "Verbos",
      context: "Informal",
      videos: [
        { profesor: "Mónica", url: "https://www.youtube.com/watch?v=VIDEOID7" },
        { profesor: "Julián", url: "https://www.youtube.com/watch?v=VIDEOID8" },
        { profesor: "Ana", url: "https://www.youtube.com/watch?v=VIDEOID9" }
      ]
    }
  ];

  const teachers = [
    { nombre: "Ana", anosEnsenando: 5, descripcion: "Profesora sorda especializada en LSA.", foto: "https://via.placeholder.com/150" },
    { nombre: "Lucas", anosEnsenando: 3, descripcion: "Profesor sordo, enseña cursos intermedios.", foto: "https://via.placeholder.com/150" },
    { nombre: "Mónica", anosEnsenando: 10, descripcion: "Profesora sorda, experta en alfabetización LSA.", foto: "https://via.placeholder.com/150" },
    { nombre: "Julián", anosEnsenando: 7, descripcion: "Profesor sordo, cursos avanzados de LSA.", foto: "https://via.placeholder.com/150" }
  ];

  const funFacts = [
    "Dato curioso 1: La LSA tiene su propia gramática visual.",
    "Dato curioso 2: Las expresiones faciales son esenciales para la LSA.",
    "Dato curioso 3: La LSA es reconocida legalmente en Argentina."
  ];

  // Botón entrar
  enterBtn.addEventListener('click', () => {
    landing.style.display = 'none';
    glossarySection.style.display = 'block';
    toggleTeachersBtn.style.display = 'block';
    displaySigns(signs);
    displayFunFact();
    populateCategoryFilter();
  });

  const toggleCollaboratorsBtn = document.getElementById('toggleCollaboratorsBtn');
const collaboratorsSection = document.getElementById('collaboratorsSection');
const collaboratorsDiv = document.getElementById('collaborators');

// Datos de ejemplo para colaboradores
const collaborators = [
  { nombre: "Ana", anos: 5, descripcion: "Sorda, creadora de varios ejemplos de LSA.", foto: "https://via.placeholder.com/150" },
  { nombre: "Lucas", anos: 3, descripcion: "Colaborador en videos de vocabulario cotidiano.", foto: "https://via.placeholder.com/150" },
  { nombre: "Mónica", anos: 10, descripcion: "Especialista en LSA y coordinación de contenido.", foto: "https://via.placeholder.com/150" },
  { nombre: "Julián", anos: 7, descripcion: "Colaborador en videos de verbos y acciones.", foto: "https://via.placeholder.com/150" }
];

// Botón mostrar/ocultar colaboradores
toggleCollaboratorsBtn.addEventListener('click', () => {
  if (collaboratorsSection.style.display === 'none') {
    collaboratorsSection.style.display = 'block';
    displayCollaborators();
    toggleCollaboratorsBtn.textContent = "Ocultar Colaboradores";
  } else {
    collaboratorsSection.style.display = 'none';
    toggleCollaboratorsBtn.textContent = "Ver Colaboradores";
  }
});

function displayCollaborators() {
  collaboratorsDiv.innerHTML = '';
  collaborators.forEach(c => {
    const card = document.createElement('div');
    card.className = 'collaborator-card';

    const img = document.createElement('img');
    img.src = c.foto;
    img.alt = c.nombre;
    card.appendChild(img);

    const name = document.createElement('h3');
    name.textContent = c.nombre;
    card.appendChild(name);

    const years = document.createElement('p');
    years.textContent = `Años colaborando: ${c.anos}`;
    card.appendChild(years);

    const desc = document.createElement('p');
    desc.textContent = c.descripcion;
    card.appendChild(desc);

    collaboratorsDiv.appendChild(card);
  });
}


  // Glosario
  function populateCategoryFilter() {
    const categories = [...new Set(signs.map(s => s.categoria))];
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
  }

  function displaySigns(list) {
    glossary.innerHTML = '';
    list.forEach(sign => {
      const card = document.createElement('div');
      card.className = 'card';

      const title = document.createElement('h2');
      title.textContent = sign.palabra;
      card.appendChild(title);

      if(sign.videos.length > 1){
        const tabs = document.createElement('div');
        tabs.className = 'tabs';
        sign.videos.forEach((v, idx) => {
          const btn = document.createElement('button');
          btn.textContent = v.profesor;
          btn.className = 'tab-btn';
          if(idx===0) btn.classList.add('active');
          btn.onclick = () => {
            iframe.src = v.url.replace("watch?v=","embed/");
            tabs.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
          };
          tabs.appendChild(btn);
        });
        card.appendChild(tabs);
      }

      const iframe = document.createElement('iframe');
      iframe.src = sign.videos[0].url.replace("watch?v=","embed/");
      iframe.frameBorder = 0;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      card.appendChild(iframe);

      const label = document.createElement('p');
      label.className = 'label';
      label.textContent = `Profesor: ${sign.videos[0].profesor} | Contexto: ${sign.context}`;
      card.appendChild(label);

      glossary.appendChild(card);
    });
  }

  searchInput.addEventListener('input', filterSigns);
  categoryFilter.addEventListener('change', filterSigns);

  function filterSigns() {
    const term = searchInput.value.toLowerCase();
    const filtered = signs.filter(s => 
      s.palabra.toLowerCase().includes(term) &&
      (categoryFilter.value==='all' || s.categoria === categoryFilter.value)
    );
    displaySigns(filtered);
  }

  // Profesores
  function displayTeachers() {
    teachersDiv.innerHTML = '';
    teachers.forEach(t => {
      const card = document.createElement('div');
      card.className = 'teacher-card';

      const img = document.createElement('img');
      img.src = t.foto;
      img.alt = t.nombre;
      card.appendChild(img);

      const name = document.createElement('h3');
      name.textContent = t.nombre;
      card.appendChild(name);

      const years = document.createElement('p');
      years.textContent = `Años enseñando LSA: ${t.anosEnsenando}`;
      card.appendChild(years);

      const desc = document.createElement('p');
      desc.textContent = t.descripcion;
      card.appendChild(desc);

      teachersDiv.appendChild(card);
    });
  }

  // Dato curioso
  function displayFunFact() {
    const day = new Date().getDate();
    funFactText.textContent = funFacts[day % funFacts.length];
  }
};
