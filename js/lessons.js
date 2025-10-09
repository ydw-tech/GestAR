// Generar todas las combinaciones de videos según tu lista
const seña_ids = ["020","021","022","044","045","046","047","048","049"];

const lessons = seña_ids.map(id => {
  return {
    id: id,
    name: "Seña " + id,
    videos: Array.from({length: 5}, (_, g) => `${id}_001_00${g+1}.mp4`) // Ejemplo para _001
  };
});

const lessonList = document.getElementById("lessonList");

lessons.forEach(lesson => {
  const card = document.createElement("div");
  card.className = "bg-white p-4 rounded shadow-md";

  const videoHTML = lesson.videos.map(v => `<video src="assets/videos/${v}" controls class="w-full mb-2"></video>`).join("");

  card.innerHTML = `
    <h2 class="font-bold mb-2">${lesson.name}</h2>
    ${videoHTML}
    <button onclick="startLesson('${lesson.id}')" class="bg-green-500 text-white px-4 py-2 rounded">Iniciar</button>
  `;
  lessonList.appendChild(card);
});

function startLesson(id) {
  alert(`Aquí se iniciaría la lección ${id} con verificación MediaPipe`);
}
