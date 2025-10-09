const user = localStorage.getItem("user") || "Invitado";
document.getElementById("userName").textContent = user;

const progress = JSON.parse(localStorage.getItem("progress") || "{}");
const allLessons = ["020","021","022","044","045","046","047","048","049"];

const passed = Object.keys(progress).filter(k => progress[k] >= 80);
const pending = allLessons.filter(l => !passed.includes(l));

document.getElementById("streak").textContent = progress.streak || 0;
document.getElementById("passed").textContent = passed.join(", ") || "Ninguna";
document.getElementById("pending").textContent = pending.join(", ") || "Todas";
