    let paises = [];
    let paisActual = null;

    // Cargar todos los países.
  async function cargarPaises() {
    try {
      const respuesta = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
      
      if (!respuesta.ok) throw new Error('Error al obtener los datos: ' + respuesta.status);
      const data = await respuesta.json();
      paises = data.filter(p => p.name?.common && p.flags?.png);
      cargarNuevoPais();

    } catch (error) {
      document.getElementById('mensaje').textContent = 'Error cargando países: ' + error.message;
      console.error(error);
    }
  }

    // Elegir un país al azar.
    function cargarNuevoPais() {
      paisActual = paises[Math.floor(Math.random() * paises.length)];

      const bandera = document.getElementById('bandera');
      const input = document.getElementById('inputPais');
      const mensaje = document.getElementById('mensaje');

      bandera.src = paisActual.flags.png;
      bandera.alt = `Bandera de ${paisActual.name.common}`;

      input.value = '';
      input.disabled = false;
      mensaje.textContent = '';
      mensaje.style.color = 'black';
    }

    // Verificar si el nombre ingresado es correcto
    function verificarRespuesta() {
      const input = document.getElementById('inputPais');
      const mensaje = document.getElementById('mensaje');

      const respuestaUsuario = input.value.trim().toLowerCase();
      const respuestaCorrecta = paisActual.name.common.toLowerCase();

      if (respuestaUsuario === '') {
        mensaje.textContent = 'Por favor escribe un nombre.';
        mensaje.style.color = 'orange';
        return;
      }

      if (respuestaUsuario === respuestaCorrecta) {
        mensaje.textContent = '¡Correcto!';
        mensaje.style.color = 'green';
      } else {
        mensaje.textContent = `Incorrecto. La respuesta correcta era: ${paisActual.name.common}`;
        mensaje.style.color = 'red';
      }

      input.disabled = true; // Deshabilitar Input.
    }

    // Eventos.
    document.getElementById('btnVerificar').addEventListener('click', verificarRespuesta);
    document.getElementById('btnSiguiente').addEventListener('click', cargarNuevoPais);

    document.getElementById('inputPais').addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        verificarRespuesta();
      }
    });

    cargarPaises();