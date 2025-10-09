// Espera a que se cargue todo el DOM
window.onload = function() {
  const landing = document.getElementById('landing');
  const enterBtn = document.getElementById('enterBtn');
  const glossarySection = document.getElementById('glossarySection');
  const teachersSection = document.getElementById('teachersSection');

  enterBtn.addEventListener('click', function() {
    landing.style.display = 'none';
    glossarySection.style.display = 'block';
    teachersSection.style.display = 'block';
  });

  console.log("JS cargado: botón funcional");
};
