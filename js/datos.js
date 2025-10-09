const datosCuriosos = [
  "La LSA tiene su propia gramática, diferente del español.",
  "En Argentina, la LSA fue reconocida oficialmente en 2023.",
  "No todas las lenguas de señas del mundo son iguales.",
  "Las expresiones faciales son parte fundamental de la LSA.",
  "Muchas personas oyentes también aprenden LSA por empatía y comunicación inclusiva.",
  "Los intérpretes de LSA tienen una formación profesional específica."
];

function mostrarDato() {
  const hoy = new Date();
  const indice = hoy.getDate() % datosCuriosos.length;
  document.getElementById("dato-dia").textContent = datosCuriosos[indice];
}

document.addEventListener("DOMContentLoaded", mostrarDato);
