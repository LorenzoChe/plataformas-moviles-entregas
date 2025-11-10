async function getPais(n) {
  return (await (await fetch(`https://restcountries.com/v3.1/name/${n}`)).json())[0];
}

async function getClima([lat, lon]) {
  return (await (await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)).json()).current_weather;
}

function el(tag, txt) {
  const e = document.createElement(tag);
  if (txt) e.textContent = txt;
  return e;
}

function paisInfo(p, c) {
  const d = el('div'); d.className = 'pais';
  d.append(Object.assign(el('img'), {src: p.flags.png, width: 120}));
  d.append(el('h2', p.name.common));
  [['Capital', p.capital?.[0]], ['Población', p.population.toLocaleString()],
   ['Área', `${p.area.toLocaleString()} km²`],
   ['Densidad', `${(p.population/p.area).toFixed(2)} hab/km²`]]
   .forEach(([k,v]) => d.append(el('p', `${k}: ${v}`)));

  const clima = el('div');
  clima.append(el('h4', `Clima en ${p.capital?.[0]}`));
  ['temperature','windspeed','time'].forEach(k =>
    clima.append(el('p', `${k}: ${c[k]}`))
  );
  d.append(clima);
  return d;
}

function comparar(a,b){
  const d = el('div'); d.className='comparacion';
  d.append(el('h3','Comparación general'));
  d.append(el('p',`Diferencia de población: ${Math.abs(a.population-b.population).toLocaleString()}`));
  d.append(el('p',`Diferencia de territorio: ${Math.abs(a.area-b.area).toLocaleString()} km²`));
  return d;
}

async function compararPaises(){
  const [p1,p2] = await Promise.all([
    getPais(pais1.value), getPais(pais2.value)
  ]);
  const [c1,c2] = await Promise.all([getClima(p1.latlng), getClima(p2.latlng)]);
  const r = resultado;
  r.textContent='';
  r.append(paisInfo(p1,c1), paisInfo(p2,c2), comparar(p1,p2));
}
