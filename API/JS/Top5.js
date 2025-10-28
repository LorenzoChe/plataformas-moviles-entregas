    async function obtenerDatos() {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,population,area,languages');
        if (!res.ok) throw new Error('Error al obtener los datos de la API');
        const datos = await res.json();

        // TOP 5 por población
        const topPoblacion = [...datos]
          .filter(p => p.population)
          .sort((a, b) => b.population - a.population)
          .slice(0, 5);

        // TOP 5 por superficie
        const topSuperficie = [...datos]
          .filter(p => p.area)
          .sort((a, b) => b.area - a.area)
          .slice(0, 5);

        // TOP 5 por cantidad de idiomas
        const topIdiomas = [...datos]
          .map(p => ({
            nombre: p.name?.translations?.spa?.common || p.name.common,
            cantidad: p.languages ? Object.keys(p.languages).length : 0
          }))
          .sort((a, b) => b.cantidad - a.cantidad)
          .slice(0, 5);

        // Mostrar en tablas
        llenarTabla("tablaPoblacion", topPoblacion.map(p => ({
          nombre: p.name?.translations?.spa?.common || p.name.common,
          valor: p.population.toLocaleString()
        })));

        llenarTabla("tablaSuperficie", topSuperficie.map(p => ({
          nombre: p.name?.translations?.spa?.common || p.name.common,
          valor: p.area.toLocaleString()
        })));

        llenarTabla("tablaIdiomas", topIdiomas.map(p => ({
          nombre: p.nombre,
          valor: p.cantidad
        })));

      } catch (error) {
        document.getElementById("error").textContent = error.message;
        console.error(error);
      }
    }

    function llenarTabla(idTabla, datos) {
      const tbody = document.querySelector(`#${idTabla} tbody`);
      tbody.innerHTML = "";
      datos.forEach(pais => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td>${pais.nombre}</td><td>${pais.valor}</td>`;
        tbody.appendChild(fila);
      });
    }

    // Ejecutar
    obtenerDatos();