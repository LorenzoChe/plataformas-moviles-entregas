async function buscarPais() {
      const pais = document.getElementById('BuscarPais').value.trim();
      const resultadoDiv = document.getElementById('resultado');

      try {
        // Buscar país.
        const resultadoPais = await fetch(`https://restcountries.com/v3.1/name/${pais}`);
        const dataPais = await resultadoPais.json();
        const paisInfo = dataPais[0];

        const nombre = paisInfo.name.common;
        const capital = paisInfo.capital?.[0] || 'Desconocida';
        const bandera = paisInfo.flags.png;
        const lat = paisInfo.latlng[0];
        const lon = paisInfo.latlng[1];

        // Buscar clima.
        const resultadoClima = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const dataClima = await resultadoClima.json();
        const clima = dataClima.current_weather;

        // Mostrar resultados.
        resultadoDiv.innerHTML = `
        <div class="resultado">
          <div class="container-pais">
          <h2>${nombre}</h2>
            <img src="${bandera}" alt="Bandera de ${nombre}" width="180" />
          </div>
            
            <div class="container-info">
            <br> 
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Coordenadas:</strong> ${lat}, ${lon}</p>
            <h3>Clima actual en ${capital}</h3>
            <p><strong>Temperatura:</strong> ${clima.temperature} °C</p>
            <p><strong>Viento:</strong> ${clima.windspeed} km/h</p>
            <p><strong>Hora:</strong> ${clima.time}</p>
          </div>

        </div>
          `;
      } catch (error) {
        resultadoDiv.innerHTML = 'Error al buscar datos. Verifica el nombre del país.';
        console.error(error);
      }
    }