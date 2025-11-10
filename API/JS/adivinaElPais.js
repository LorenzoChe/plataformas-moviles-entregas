let paises = [], paisActual;

async function cargarPaises() {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
  paises = (await res.json()).filter(p => p.name && p.flags);
  nuevoPais();
}

function nuevoPais() {
  paisActual = paises[Math.floor(Math.random() * paises.length)];
  bandera.src = paisActual.flags.png;
  bandera.alt = paisActual.name.common;
  inputPais.value = '';
  inputPais.disabled = false;
  mensaje.textContent = '';
  mensaje.style.color = '';
}

function verificar() {
  const correcto = paisActual.name.common.toLowerCase();
  const respuesta = inputPais.value.trim().toLowerCase();
  let texto, color;

  if (respuesta === correcto) {
    texto = '¡Correcto!';
    color = 'green';
  } else {
    texto = `Incorrecto. Era ${paisActual.name.common}`;
    color = 'red';
  }

  mensaje.textContent = texto;
  mensaje.style.color = color;
  inputPais.disabled = true;
}

btnVerificar.onclick = verificar;
btnSiguiente.onclick = nuevoPais;
inputPais.onkeyup = e => e.key === 'Enter' && verificar();

cargarPaises();