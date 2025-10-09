document.addEventListener('DOMContentLoaded', () => {
  const landing = document.getElementById('landing');
  const enterBtn = document.getElementById('enterBtn');
  const glossarySection = document.getElementById('glossarySection');
  const teachersSection = document.getElementById('teachersSection');

  // Botón para entrar al glosario
  enterBtn.addEventListener('click', () => {
    landing.classList.add('hidden');
    glossarySection.classList.remove('hidden');
    teachersSection.classList.remove('hidden');
  });

  // Elements
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

// Landing -> Glosario
enterBtn.addEventListener('click', () => {
  landing.classList.add('hidden');
  glossarySection.classList.remove('hidden');
  teachersSection.classList.remove('hidden');
});

// Fetch data
fetch('data/signs.json').then(r=>r.json()).then(data=>{ signs = data; populateCategoryFilter(); displaySigns(signs); });
fetch('data/funfacts.json').then(r=>r.json()).then(data=>{ funFacts = data; displayFunFact(); });
fetch('data/teachers.json').then(r=>r.json()).then(data=>{ teachers = data; displayTeachers(); });

// Categories
function populateCategoryFilter(){
  const categories = [...new Set(signs.map(s=>s.categoria))];
  categories.forEach(cat=>{
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// Display Signs
function displaySigns(list){
  glossary.innerHTML = '';
  list.forEach(sign=>{
    const card = document.createElement('div'); card.className='card';
    const title = document.createElement('h2'); title.textContent = sign.palabra; card.appendChild(title);

    // Tabs for videos
    if(sign.videos.length>1){
      const tabs = document.createElement('div'); tabs.className='tabs';
      sign.videos.forEach((v,idx)=>{
        const btn = document.createElement('button'); btn.textContent=v.profesor; btn.className='tab-btn';
        if(idx===0) btn.classList.add('active');
        btn.onclick = ()=>{ iframe.src=v.url.replace("watch?v=","embed

});
