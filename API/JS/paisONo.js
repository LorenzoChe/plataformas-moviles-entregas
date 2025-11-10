const nombresFalsos = [
  "Florania", "San Morado", "Molvinea", "Castellora", "Peruvia",
  "Zangaria", "Novarica", "Elboria", "Cartovia", "Ventora",
  "Griflanda", "Oceandra", "Narnesia", "Tropania", "Azuria",
  "Valdoria", "Montelvia", "Lumeria", "Cordania", "Estravia",
  "Belmora", "Falindia", "Sylvania", "Orvania", "Caldora",
  "Brastonia", "Rivoria", "Zelvania", "Ardenia", "Palestora",
  "Veloria", "Norvanda", "Talandra", "Maravia", "Solendia"
];


let paises = [], esReal, nombreActual;

async function cargarPaises() {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name');
  paises = (await res.json()).map(p => p.name.common.toLowerCase());
  nuevoNombre();
}

function nuevoNombre() {
  esReal = Math.random() < 0.5;
  nombreActual = esReal 
    ? paises[Math.floor(Math.random() * paises.length)] 
    : nombresFalsos[Math.floor(Math.random() * nombresFalsos.length)].toLowerCase();
  nombre.textContent = capitalizar(nombreActual);
  resultado.textContent = "";
}

function verificar(r) {
  resultado.textContent = r === esReal
    ? "¡Correcto!"
    : `"${capitalizar(nombreActual)}" ${esReal ? "sí existe." : "no es real."}`;
  resultado.style.color = r === esReal ? "green" : "red";
}

const capitalizar = t => t[0].toUpperCase() + t.slice(1);

btnSi.onclick = () => verificar(true);
btnNo.onclick = () => verificar(false);
btnSiguiente.onclick = nuevoNombre;

cargarPaises();
