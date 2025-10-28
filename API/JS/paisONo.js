    let paises = [];
    let esReal = false;
    let nombreActual = "";

    const nombresFalsos = [
      "Floribia", "San Azúcar", "Molvania", "Castellónia", "Peruvania",
      "Zangria", "Novarica", "Elboria", "Cartumbia", "Venturia",
      "Griflandia", "Oceandor", "Narnesia", "Tropicana", "Azuria"
    ];

    async function cargarPaises() {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name');
        if (!res.ok) throw new Error("No se pudieron cargar los países.");
        const data = await res.json();
        paises = data.map(p => p.name.common.toLowerCase());
        mostrarNuevoNombre();
      } catch (err) {
        document.getElementById("nombre").textContent = "Error al cargar países.";
        console.error(err);
      }
    }

    function mostrarNuevoNombre() {
      const resultado = document.getElementById("resultado");
      resultado.textContent = "";

      const usarReal = Math.random() < 0.5;
      esReal = usarReal;

      if (usarReal) {
        const nombre = paises[Math.floor(Math.random() * paises.length)];
        nombreActual = nombre;
      } else {
        const nombre = nombresFalsos[Math.floor(Math.random() * nombresFalsos.length)];
        nombreActual = nombre.toLowerCase();
      }

      document.getElementById("nombre").textContent =
        nombreActual.charAt(0).toUpperCase() + nombreActual.slice(1);
    }

    function verificarRespuesta(usuarioDiceQueEsReal) {
      const resultado = document.getElementById("resultado");

      if (usuarioDiceQueEsReal === esReal) {
        resultado.textContent = "¡Correcto! ";
        resultado.style.color = "green";
      } else {
        resultado.textContent = `Incorrecto. "${capitalizar(nombreActual)}" ${esReal ? "sí es un país real." : "no existe como país."}`;
        resultado.style.color = "red";
      }
    }

    function capitalizar(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1);
    }

    // Eventos
    document.getElementById("btnSi").addEventListener("click", () => verificarRespuesta(true));
    document.getElementById("btnNo").addEventListener("click", () => verificarRespuesta(false));
    document.getElementById("btnSiguiente").addEventListener("click", mostrarNuevoNombre);

    // Iniciar
    cargarPaises();