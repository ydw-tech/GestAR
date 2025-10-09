document.addEventListener('DOMContentLoaded', () => {

  const landing = document.getElementById('landing');
  const enterBtn = document.getElementById('enterBtn');
  const glossarySection = document.getElementById('glossarySection');
  const teachersSection = document.getElementById('teachersSection');
  const glossary = document.getElementById('glossary');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const teachersDiv = document.getElementById('teachers');
  const funFactText = document.getElementById('funFactText');

  let signs = [];
  let funFacts = [];
  let teachers = [];

  // Botón entrar
  enterBtn.addEventListener('click', () => {
    landing.style.display = 'none';
    glossarySection.style.display = 'block';
    teachersSection.style.display = 'block';
  });

  // Fetch data
  fetch('data/signs.json').then(r=>r.json()).then(data=>{
    signs = data;
    populateCategoryFilter();
    displaySigns(signs);
  });

  fetch('data/funfacts.json').then(r=>r.json()).then(data=>{
    funFacts = data;
    displayFunFact();
  });

  fetch('data/teachers.json').then(r=>r.json()).then(data=>{
    teachers = data;
    displayTeachers();
  });

  function populateCategoryFilter(){
    const categories = [...new Set(signs.map(s=>s.categoria))];
    categories.forEach(cat=>{
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
  }

  function displaySigns(list){
    glossary.innerHTML='';
    list.forEach(sign=>{
      const card=document.createElement('div');
      card.className='card';

      const title=document.createElement('h2');
      title.textContent=sign.palabra;
      card.appendChild(title);

      // Tabs si hay más de un video
      if(sign.videos.length>1){
        const tabs=document.createElement('div');
        tabs.className='tabs';
        sign.videos.forEach((v,idx)=>{
          const btn=document.createElement('button');
          btn.textContent=v.profesor;
          btn.className='tab-btn';
          if(idx===0) btn.classList.add('active');
          btn.onclick=()=>{
            iframe.src=v.url.replace("watch?v=","embed/");
            tabs.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
          };
          tabs.appendChild(btn);
        });
        card.appendChild(tabs);
      }

      const iframe=document.createElement('iframe');
      iframe.src=sign.videos[0].url.replace("watch?v=","embed/");
      iframe.frameBorder=0;
      iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen=true;
      card.appendChild(iframe);

      const label=document.createElement('p');
      label.className='label';
      label.textContent=`Profesor: ${sign.videos[0].profesor} | Contexto: ${sign.context} | Significado: ${sign.meaning}`;
      card.appendChild(label);

      glossary.appendChild(card);
    });
  }

  searchInput.addEventListener('input', filterSigns);
  categoryFilter.addEventListener('change', filterSigns);

  function filterSigns(){
    const term=searchInput.value.toLowerCase();
    const filtered=signs.filter(s=>
      s.palabra.toLowerCase().includes(term) &&
      (categoryFilter.value==='all'||s.categoria===categoryFilter.value)
    );
    displaySigns(filtered);
  }

  function displayTeachers(){
    teachersDiv.innerHTML='';
    teachers.forEach(t=>{
      const card=document.createElement('div');
      card.className='teacher-card';

      const img=document.createElement('img');
      img.src=t.foto;
      img.alt=t.nombre;
      card.appendChild(img);

      const name=document.createElement('h3');
      name.textContent=t.nombre;
      card.appendChild(name);

      const years=document.createElement('p');
      years.textContent=`Años enseñando LSA: ${t.anosEnsenando}`;
      card.appendChild(years);

      const desc=document.createElement('p');
      desc.textContent=t.descripcion;
      card.appendChild(desc);

      teachersDiv.appendChild(card);
    });
  }

  function displayFunFact(){
    const day=new Date().getDate();
    funFactText.textContent=funFacts[day % funFacts.length];
  }

});
