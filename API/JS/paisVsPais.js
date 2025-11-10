let paises = [];
let paisA = null;
let paisB = null;
let criterio = "";
const criterios = ["poblacion", "superficie", "idiomas"];

async function cargarPaises() {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,area,languages');
    const data = await res.json();

    paises = data.filter(p => p.name && p.flags && p.population && p.area && p.languages);
    nuevaRonda();
  } catch (error) {
    document.getElementById("pregunta").textContent = "Error al cargar países.";
    console.error(error);
  }
}

function nuevaRonda() {
  document.getElementById("resultado").textContent = "";

  criterio = criterios[Math.floor(Math.random() * criterios.length)];

  do {
    paisA = paises[Math.floor(Math.random() * paises.length)];
    paisB = paises[Math.floor(Math.random() * paises.length)];
  } while (paisA === paisB);

  mostrarPregunta();
  mostrarPais("pais1", paisA);
  mostrarPais("pais2", paisB);
}

function mostrarPregunta() {
  const preguntas = {
    poblacion: "¿Cuál país tiene más población?",
    superficie: "¿Cuál país tiene más superficie?",
    idiomas: "¿Cuál país habla más idiomas?"
  };
  document.getElementById("pregunta").textContent = preguntas[criterio];
}

function mostrarPais(id, pais) {
  const cont = document.getElementById(id);
  cont.innerHTML = ""; 
  const img = document.createElement('img');
  img.src = pais.flags.png;
  img.alt = `Bandera de ${pais.name.common}`;

  const h3 = document.createElement('h3');
  h3.textContent = pais.name.translations?.spa?.common || pais.name.common;

  cont.append(img, h3);
  cont.onclick = () => verificarRespuesta(pais);
}

function verificarRespuesta(seleccionado) {
  const valor = (p) => {
    switch (criterio) {
      case "poblacion": return p.population;
      case "superficie": return p.area;
      case "idiomas": return Object.keys(p.languages).length;
    }
  };

  const valorA = valor(paisA);
  const valorB = valor(paisB);

  const esCorrecto = (seleccionado === paisA && valorA >= valorB) || 
                     (seleccionado === paisB && valorB >= valorA);

  const mensaje = document.getElementById("resultado");
  if (esCorrecto) {
    mensaje.textContent = "¡Correcto!";
    mensaje.style.color = "green";
  } else {
    const nombreCorrecto = valorA >= valorB 
      ? (paisA.name.translations?.spa?.common || paisA.name.common) 
      : (paisB.name.translations?.spa?.common || paisB.name.common);
    mensaje.textContent = `Incorrecto. La respuesta correcta era: ${nombreCorrecto}`;
    mensaje.style.color = "red";
  }

  document.getElementById("pais1").onclick = null;
  document.getElementById("pais2").onclick = null;
}

document.getElementById("btnSiguiente").addEventListener("click", nuevaRonda);

cargarPaises();