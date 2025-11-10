async function buscarPais() {
  const pais = BuscarPais.value.trim();
  const resultado = document.getElementById('resultado');
  resultado.textContent = '';

  const dataPais = await (await fetch(`https://restcountries.com/v3.1/name/${pais}`)).json();
  const p = dataPais[0];
  const nombre = p.name.common;
  const capital = p.capital?.[0] || 'Desconocida';
  const [lat, lon] = p.latlng;
  const bandera = p.flags.png;

  const climaData = await (await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)).json();
  const clima = climaData.current_weather;


  const divRes = document.createElement('div');

  const h2 = document.createElement('h2');
  h2.textContent = nombre;

  const img = document.createElement('img');
  img.src = bandera;
  img.alt = `Bandera de ${nombre}`;
  img.width = 180;

  const pCapital = document.createElement('p');
  pCapital.innerHTML = `<strong>Capital:</strong> ${capital}`;

  const pCoords = document.createElement('p');
  pCoords.innerHTML = `<strong>Coordenadas:</strong> ${lat}, ${lon}`;

  const h3Clima = document.createElement('h3');
  h3Clima.textContent = `Clima actual en ${capital}`;

  const pTemp = document.createElement('p');
  pTemp.innerHTML = `<strong>Temperatura:</strong> ${clima.temperature} °C`;

  const pViento = document.createElement('p');
  pViento.innerHTML = `<strong>Viento:</strong> ${clima.windspeed} km/h`;

  const pHora = document.createElement('p');
  pHora.innerHTML = `<strong>Hora:</strong> ${clima.time}`;

  divRes.append(h2, img, pCapital, pCoords, h3Clima, pTemp, pViento, pHora);
  resultado.appendChild(divRes);
}
