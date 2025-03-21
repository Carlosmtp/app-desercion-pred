import { select } from "./selectors.js";
document.addEventListener("DOMContentLoaded", function () {
  let locations = {};
  let faculties = {};
  let excepciones = {};
  let sedes = [];
  let ocupaciones = [];
  let reconocimientos = [];
  let maxRiesgos = 0;

  // Función para cargar sedes
  async function loadSedes() {
    const response = await fetch("/static/json/sedes.json");
    sedes = await response.json();

    // Limpiar el select antes de agregar nuevas opciones
    select.sede.innerHTML = '<option value="">Seleccione una sede</option>';
    // Agregar opciones al select
    sedes.forEach((sede) => {
      const option = document.createElement("option");
      option.value = sede;
      option.textContent = sede;
      select.sede.appendChild(option);
    });
  }

  // Función para cargar facultades
  async function loadFacultades() {
    const response = await fetch("/static/json/facultades.json");
    faculties = await response.json();
    select.facultad.innerHTML =
      '<option value="">Seleccione una facultad</option>';
    Object.keys(faculties).forEach((fac) => {
      const option = document.createElement("option");
      option.value = fac;
      option.textContent = fac;
      select.facultad.appendChild(option);
    });
  }

  // Función para cargar programas académicos
  function loadProgramas() {
    const facultad = select.facultad.value;
    select.programa.innerHTML =
      '<option value="">Seleccione un programa académico</option>';
    if (facultad && faculties[facultad]) {
      select.programa.disabled = false;
      select.programa.classList.remove("disabled-select");
      faculties[facultad].forEach((prog) => {
        const option = document.createElement("option");
        option.value = prog;
        option.textContent = prog;
        select.programa.appendChild(option);
      });
    } else {
      select.programa.disabled = true;
      select.programa.classList.add("disabled-select");
    }
  }

  // Función para cargar todos los programas académicos
  function loadTodosLosProgramas() {
    select.nuevoPrograma.innerHTML =
      '<option value="">Seleccione un programa académico</option>';
    Object.keys(faculties).forEach((facultad) => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = facultad;
      faculties[facultad].forEach((prog) => {
        const option = document.createElement("option");
        option.value = prog;
        option.textContent = prog;
        optgroup.appendChild(option);
      });
      select.nuevoPrograma.appendChild(optgroup);
    });
  }

  // Función para cargar departamentos
  async function loadDepartamentos() {
    const response = await fetch("/static/json/departamentos.json");
    locations = await response.json();
    select.departamentoNacimiento.innerHTML =
      '<option value="">Seleccione un departamento</option>';
    select.departamentoResidencia.innerHTML =
      '<option value="">Seleccione un departamento</option>';
    Object.keys(locations).forEach((depto) => {
      const optionNacimiento = document.createElement("option");
      optionNacimiento.value = depto;
      optionNacimiento.textContent = depto;
      select.departamentoNacimiento.appendChild(optionNacimiento);

      const optionResidencia = document.createElement("option");
      optionResidencia.value = depto;
      optionResidencia.textContent = depto;
      select.departamentoResidencia.appendChild(optionResidencia);
    });
  }

  // Función para cargar ciudades de nacimiento
  function loadCiudadesNacimiento() {
    const departamento = select.departamentoNacimiento.value;
    select.ciudadNacimiento.innerHTML =
      '<option value="">Seleccione una ciudad</option>';
    if (departamento && locations[departamento]) {
      select.ciudadNacimiento.disabled = false;
      select.ciudadNacimiento.classList.remove("disabled-select");
      locations[departamento].forEach((ciudad) => {
        const option = document.createElement("option");
        option.value = ciudad;
        option.textContent = ciudad;
        select.ciudadNacimiento.appendChild(option);
      });
    } else {
      select.ciudadNacimiento.disabled = true;
      select.ciudadNacimiento.classList.add("disabled-select");
    }
  }

  // Función para cargar ciudades de residencia
  function loadCiudadesResidencia() {
    const departamento = select.departamentoResidencia.value;
    select.ciudadResidencia.innerHTML =
      '<option value="">Seleccione una ciudad</option>';
    if (departamento && locations[departamento]) {
      select.ciudadResidencia.disabled = false;
      select.ciudadResidencia.classList.remove("disabled-select");
      locations[departamento].forEach((ciudad) => {
        const option = document.createElement("option");
        option.value = ciudad;
        option.textContent = ciudad;
        select.ciudadResidencia.appendChild(option);
      });
    } else {
      select.ciudadResidencia.disabled = true;
      select.ciudadResidencia.classList.add("disabled-select");
    }
  }

  // Función para cargar reconocimientos
  async function loadReconocimientos() {
    const response = await fetch("/static/json/reconocimientos.json");
    reconocimientos = await response.json();
    select.reconocimiento.innerHTML =
      '<option value="" disabled selected>Seleccione un reconocimiento</option>';
    reconocimientos.forEach((reconocimiento) => {
      const option = document.createElement("option");
      option.value = reconocimiento;
      option.textContent = reconocimiento;
      select.reconocimiento.appendChild(option);
    });
  }

  // Función para cargar condiciones de excepción
  async function loadCondicionesExcepcion() {
    const response = await fetch("/static/json/condiciones_excepcion.json");
    excepciones = await response.json();
    select.condExcepcion.innerHTML =
      '<option value="">Seleccione una condición de excepción</option>';
    Object.keys(excepciones).forEach((key) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = excepciones[key];
      select.condExcepcion.appendChild(option);
    });
  }

  // Función para cargar ocupaciones
  async function loadOcupaciones() {
    const response = await fetch("/static/json/ocupaciones.json");
    ocupaciones = await response.json();
    select.ocupacion.innerHTML =
      '<option value="" disabled selected>Seleccione una ocupación</option>';
    ocupaciones.forEach((ocupacion) => {
      const option = document.createElement("option");
      option.value = ocupacion;
      option.textContent = ocupacion;
      select.ocupacion.appendChild(option);
    });

    select.ocupacion.addEventListener("change", function () {
      if (select.ocupacion.value === "No trabaja") {
        select.razonTrabaja.disabled = true;
        select.razonTrabaja.value = "";
        select.horasTrabajoInput.disabled = true;
        select.horasTrabajoInput.value = "";
      } else {
        select.razonTrabaja.disabled = false;
        select.horasTrabajoInput.disabled = false;
      }
    });
  }

  // Función para cargar razones de trabajo
  async function loadRazonTrabaja() {
    const response = await fetch("/static/json/razon_trabaja.json");
    const razones = await response.json();
    select.razonTrabaja.innerHTML =
      '<option value="" disabled selected>Seleccione una razón</option>';
    razones.forEach((razon) => {
      const option = document.createElement("option");
      option.value = razon;
      option.textContent = razon;
      select.razonTrabaja.appendChild(option);
    });
  }

  // Función para cargar niveles educativos
  async function loadNivelesEducativos() {
    const response = await fetch("/static/json/niveles_educativos.json");
    const niveles = await response.json();
    niveles.forEach((nivel) => {
      const optionPadre = document.createElement("option");
      optionPadre.value = nivel;
      optionPadre.textContent = nivel;
      select.nivelEducativoPadre.appendChild(optionPadre);

      const optionMadre = document.createElement("option");
      optionMadre.value = nivel;
      optionMadre.textContent = nivel;
      select.nivelEducativoMadre.appendChild(optionMadre);
    });
  }
  // Función para validar la suma de los valores en una categoría
  function validarSuma(alto, medio, bajo, categoria) {
    const suma =
      parseInt(alto.value || 0) +
      parseInt(medio.value || 0) +
      parseInt(bajo.value || 0);
    if (suma > maxRiesgos) {
      // Mostrar alerta de UIkit
      UIkit.notification({
        message: `La suma de los valores en la categoría "${categoria}" (${suma}) excede el máximo de riesgos permitido (${maxRiesgos}).`,
        status: "warning", // Color de la notificación (rojo)
        pos: "bottom-left", // Posición de la notificación
        timeout: 3000, // Duración en milisegundos (5 segundos)
      });
      return false;
    }
    return true;
  }

  // Función para validar todas las categorías
  function validarTodasLasCategorias() {
    const categorias = [
      {
        alto: select.indivAlto,
        medio: select.indivMedio,
        bajo: select.indivBajo,
        nombre: "Individual",
      },
      {
        alto: select.famiAlto,
        medio: select.famiMedio,
        bajo: select.famiBajo,
        nombre: "Familiar",
      },
      {
        alto: select.econoAlto,
        medio: select.econoMedio,
        bajo: select.econoBajo,
        nombre: "Económico",
      },
      {
        alto: select.academiAlto,
        medio: select.academiMedio,
        bajo: select.academiBajo,
        nombre: "Académico",
      },
      {
        alto: select.vidauAlto,
        medio: select.vidauMedio,
        bajo: select.vidauBajo,
        nombre: "Vida Universitaria",
      },
    ];
    if (acompanamientos.value === "") {
      // Mostrar alerta de UIkit
      UIkit.notification({
        message:
          "Debe ingresar el número de acompañamientos antes de ingresar los riesgos.",
        status: "warning", // Color de la notificación (rojo)
        pos: "bottom-left", // Posición de la notificación
        timeout: 3000, // Duración en milisegundos (5 segundos)
      });
      categorias.forEach((categoria) => {
        categoria.alto.value = "";
        categoria.medio.value = "";
        categoria.bajo.value = "";
      });
      return false;
    }

    let todasValidas = true;
    categorias.forEach((categoria) => {
      if (
        !validarSuma(
          categoria.alto,
          categoria.medio,
          categoria.bajo,
          categoria.nombre
        )
      ) {
        todasValidas = false;
      }
    });

    return todasValidas;
  }

  select.acompanamientos.addEventListener("change", function () {
    maxRiesgos = select.acompanamientos.value;
    select.indivAlto.value = "";
    select.indivMedio.value = "";
    select.indivBajo.value = "";
    select.famiAlto.value = "";
    select.famiMedio.value = "";
    select.famiBajo.value = "";
    select.econoAlto.value = "";
    select.econoMedio.value = "";
    select.econoBajo.value = "";
    select.academiAlto.value = "";
    select.academiMedio.value = "";
    select.academiBajo.value = "";
    select.vidauAlto.value = "";
    select.vidauMedio.value = "";
    select.vidauBajo.value = "";
    select.errorAcompanamientos.style.display = "none";
  });

  [
    select.indivAlto,
    select.indivMedio,
    select.indivBajo,
    select.famiAlto,
    select.famiMedio,
    select.famiBajo,
    select.econoAlto,
    select.econoMedio,
    select.econoBajo,
    select.academiAlto,
    select.academiMedio,
    select.academiBajo,
    select.vidauAlto,
    select.vidauMedio,
    select.vidauBajo,
  ].forEach((input) => {
    input.addEventListener("change", validarTodasLasCategorias);
  });

  function updateFechaNacimiento() {
    if (
      !select.fechaNacimiento.value ||
      !select.yearAdmision.value ||
      !select.semestreAdmision.value
    ) {
      select.edadAdmision.value = "";
      return;
    }

    const fecha = new Date(select.fechaNacimiento.value);
    const yearNacimiento = fecha.getFullYear();
    const monthNacimiento = fecha.getMonth() + 1; // Corregido: getMonth() devuelve 0-11
    const dayNacimiento = fecha.getDate();

    const yearIngreso = parseInt(select.yearAdmision.value);
    const semestre = select.semestreAdmision.value; // "A" o "B"

    // Definir la fecha de referencia según el semestre
    let monthIngreso = semestre === "A" ? 6 : 12; // Junio para "A", Diciembre para "B"

    // Calcular edad
    let edad = yearIngreso - yearNacimiento;
    if (
      monthIngreso < monthNacimiento ||
      (monthIngreso === monthNacimiento && 1 < dayNacimiento)
    ) {
      edad--; // No ha cumplido años en el semestre de ingreso
    }

    select.edadAdmision.value = edad;
  }

  select.fechaNacimiento.addEventListener("change", updateFechaNacimiento);
  select.yearAdmision.addEventListener("change", updateFechaNacimiento);
  select.semestreAdmision.addEventListener("change", updateFechaNacimiento);

  function validarEstrato(input) {
    if (input.value < 1) input.value = 1;
    if (input.value > 6) input.value = 6;
  }

  function validarHorasTrabajo(input) {
    if (input.value < 1) input.value = "1";
  }

  function validarIngresos(input) {
    if (input.value < 0) input.value = "0";
  }

  function validarGastos(input) {
    if (input.value < 0) input.value = "0";
  }

  select.cambiarPrograma.addEventListener("change", function () {
    if (select.cambiarPrograma.value === "Sí") {
      select.programaContainer.classList.remove("uk-child-width-1-2@s");
      select.programaContainer.classList.add("uk-child-width-1-3@s");
      select.nuevoProgramaContainer.style.display = "block";
      loadTodosLosProgramas();
    } else {
      select.programaContainer.classList.remove("uk-child-width-1-3@s");
      select.programaContainer.classList.add("uk-child-width-1-2@s");
      select.nuevoProgramaContainer.style.display = "none";
    }
  });

  function checkCiudadResidencia() {
    const ciudadResidencia = select.ciudadResidencia.value;
    if (ciudadResidencia.toLowerCase() === "cali") {
      select.residenciaContainer.classList.remove("uk-child-width-1-3@s");
      select.residenciaContainer.classList.add("uk-child-width-1-4@s");
      select.comunaResidenciaContainer.style.display = "block";
      select.comunaResidenciaInput.disabled = false;
    } else {
      select.residenciaContainer.classList.remove("uk-child-width-1-4@s");
      select.residenciaContainer.classList.add("uk-child-width-1-3@s");
      select.comunaResidenciaContainer.style.display = "none";
      select.comunaResidenciaInput.disabled = true;
      select.comunaResidenciaInput.value = "";
    }
  }

  function validarRadioButtonsPorCategoria() {
    const rows = document.querySelectorAll("table tbody tr"); // Selecciona todas las filas de la tabla
    let isValid = true;

    rows.forEach((row, index) => {
      const radios = row.querySelectorAll('input[type="radio"]'); // Selecciona todos los radio buttons en la fila

      // Si la fila no tiene radio buttons, la ignoramos
      if (radios.length === 0) {
        return; // Salimos de esta iteración del forEach
      }

      let isRowValid = false;

      // Verifica si al menos un radio button está seleccionado en la fila
      radios.forEach((radio) => {
        if (radio.checked) {
          isRowValid = true;
        }
      });

      // Si no se seleccionó ningún radio button en la fila, marca como inválido
      if (!isRowValid) {
        isValid = false;
        row.style.backgroundColor = "#ffdddd"; // Resalta la fila en rojo
      } else {
        row.style.backgroundColor = ""; // Restablece el color de fondo
      }
    });

    return isValid; // Devuelve true si todas las filas con radio buttons tienen al menos uno seleccionado
  }
  select.ciudadNacimiento.disabled = true;
  select.ciudadResidencia.disabled = true;
  select.comunaResidenciaContainer.style.display = "none";
  select.programa.disabled = true;
  select.cambiarPrograma.disabled = true;
  select.nuevoProgramaContainer.style.display = "none";
  select.condExpContainer.style.display = "none";
  select.condExcepcion.disabled = true;
  select.condExcepcion.style.display = "none";
  select.comunaResidenciaInput.disabled = true;
  select.razonTrabaja.disabled = true;
  select.horasTrabajoInput.disabled = true;
  select.departamentoNacimiento.addEventListener(
    "change",
    loadCiudadesNacimiento
  );
  select.departamentoResidencia.addEventListener(
    "change",
    loadCiudadesResidencia
  );
  select.ciudadResidencia.addEventListener("change", checkCiudadResidencia);
  select.departamentoResidencia.addEventListener(
    "change",
    checkCiudadResidencia
  );
  select.estratoInput.addEventListener("change", function () {
    validarEstrato(estratoInput);
  });
  select.facultad.addEventListener("change", loadProgramas);
  select.programa.addEventListener("change", function () {
    select.cambiarPrograma.disabled = select.programa.value === "";
  });
  select.poblacion.addEventListener("change", function () {
    if (select.poblacion.value === "excepcion") {
      select.condExpContainer.style.display = "block";
      select.condExcepcion.disabled = false;
      select.condExcepcion.style.display = "block";
      select.poblacionContainer.classList.remove("uk-child-width-1-2@s");
      select.poblacionContainer.classList.add("uk-child-width-1-3@s");
    } else {
      select.condExpContainer.style.display = "none";
      select.condExcepcion.disabled = true;
      select.condExcepcion.style.display = "none";
      select.condExcepcion.value = "";
      select.poblacionContainer.classList.remove("uk-child-width-1-3@s");
      select.poblacionContainer.classList.add("uk-child-width-1-2@s");
    }
  });
  select.horasTrabajoInput.addEventListener("change", function () {
    validarHorasTrabajo(horasTrabajoInput);
  });
  select.ingresosInput.addEventListener("change", function () {
    validarIngresos(ingresosInput);
  });
  select.gastosInput.addEventListener("change", function () {
    validarGastos(gastosInput);
  });

  document
    .getElementById("incluirAcompanamientos")
    .addEventListener("change", function () {
      const seccionAcompanamientos = document.getElementById(
        "seccionAcompanamientos"
      );
      if (this.checked) {
        seccionAcompanamientos.style.display = "block";
        document.querySelectorAll("#seccionAcompanamientos input").forEach((input) => {
          input.value = 0;
        });
        maxRiesgos = select.acompanamientos.value;
      } else {
        seccionAcompanamientos.style.display = "none";
      }
    });

  document
    .getElementById("clear-button")
    .addEventListener("click", function () {
      // Selecciona el formulario por su ID
      const form = document.getElementById("dataForm");

      // Restablece todos los campos del formulario
      form.reset();

      // Deselecciona todos los botones de radio
      document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.checked = false;
      });

      // Deselecciona todos los checkboxes
      document
        .querySelectorAll('input[type="checkbox"]')
        .forEach((checkbox) => {
          checkbox.checked = false;
        });

      // Limpia campos de texto y números
      document
        .querySelectorAll('input[type="text"], input[type="number"]')
        .forEach((input) => {
          input.value = "";
        });

      // Restablece los selects a su primera opción
      document.querySelectorAll("select").forEach((select) => {
        select.selectedIndex = 0;
      });

      // Limpia campos de fecha
      document.querySelectorAll('input[type="date"]').forEach((input) => {
        input.value = "";

        select.ciudadNacimiento.disabled = true;
        select.ciudadResidencia.disabled = true;
        select.comunaResidenciaContainer.style.display = "none";
        select.programa.disabled = true;
        select.cambiarPrograma.disabled = true;
        select.nuevoProgramaContainer.style.display = "none";
        select.condExpContainer.style.display = "none";
        select.condExcepcion.disabled = true;
        select.condExcepcion.style.display = "none";
        select.comunaResidenciaInput.disabled = true;
        select.razonTrabaja.disabled = true;
        select.horasTrabajoInput.disabled = true;
        select.poblacionContainer.classList.remove("uk-child-width-1-3@s");
        select.poblacionContainer.classList.add("uk-child-width-1-2@s");
        select.residenciaContainer.classList.remove("uk-child-width-1-4@s");
        select.residenciaContainer.classList.add("uk-child-width-1-3@s");
        select.comunaResidenciaContainer.style.display = "none";
        select.comunaResidenciaInput.disabled = true;
        select.comunaResidenciaInput.value = "";
        select.residenciaContainer.classList.remove("uk-child-width-1-4@s");
        select.residenciaContainer.classList.add("uk-child-width-1-3@s");
        select.comunaResidenciaContainer.style.display = "none";
        select.comunaResidenciaInput.disabled = true;
        select.comunaResidenciaInput.value = "";
        select.programaContainer.classList.remove("uk-child-width-1-3@s");
        select.programaContainer.classList.add("uk-child-width-1-2@s");
        select.nuevoProgramaContainer.style.display = "none";
        select.seccionAcompanamientos.style.display = "none";
        UIkit.notification({
          message: "Formulario limpiado",
          status: "success",
          pos: "bottom-left",
          timeout: 3000,
        });
      });
    });

  function marcarHabilidadesAleatoriamente() {
    // Obtener todas las filas de la tabla de habilidades
    const filasHabilidades = document.querySelectorAll(".uk-table tbody tr");

    // Iterar sobre cada fila
    filasHabilidades.forEach((fila) => {
      // Obtener todos los radio buttons de la fila
      const radios = fila.querySelectorAll('input[type="radio"]');

      // Seleccionar un radio button aleatorio
      const radioAleatorio = radios[Math.floor(Math.random() * radios.length)];

      // Marcar el radio button seleccionado
      if (radioAleatorio) {
        radioAleatorio.checked = true;
      }
    });
  }

  function llenarAcompanamientos(maxAcompanamientos) {

    function generarValoresPositivos(max) {
      const bajo = Math.floor(Math.random() * max);
      const medio = Math.floor(Math.random() * (max - bajo));
      const alto = max - bajo - medio;
      const valores = [bajo, medio, alto];

      // Mezclar los valores para mayor aleatoriedad
      return valores.sort(() => Math.random() - 0.5);
    }

    const categorias = [
      { alto: "indiv_alto", medio: "indiv_medio", bajo: "indiv_bajo" },
      { alto: "fami_alto", medio: "fami_medio", bajo: "fami_bajo" },
      { alto: "econo_alto", medio: "econo_medio", bajo: "econo_bajo" },
      { alto: "academi_alto", medio: "academi_medio", bajo: "academi_bajo" },
      { alto: "vidau_alto", medio: "vidau_medio", bajo: "vidau_bajo" },
    ];

    categorias.forEach((categoria) => {
      const [alto, medio, bajo] = generarValoresPositivos(maxAcompanamientos);

      document.getElementById(categoria.alto).value = alto;
      document.getElementById(categoria.medio).value = medio;
      document.getElementById(categoria.bajo).value = bajo;
    });
  }

  document
    .getElementById("random-button")
    .addEventListener("click", function () {
      // Función para asegurar que el valor no esté vacío
      function getNonEmptyRandomValue(array) {
        let value;
        do {
          value = array[Math.floor(Math.random() * array.length)];
        } while (value === "");
        return value;
      }

      function getRandomSelectValue(selectElement) {
        // Obtener las opciones del <select> y filtrar las que no tengan valor vacío
        const options = Array.from(selectElement.options).filter(
          (option) => option.value !== ""
        );
        // Seleccionar una opción aleatoria de las opciones filtradas
        return options[Math.floor(Math.random() * options.length)].value;
      }

      // Asignar valores aleatorios asegurándose de que no estén vacíos
      select.sede.value = getNonEmptyRandomValue(sedes);
      select.facultad.value = getNonEmptyRandomValue(Object.keys(faculties));
      select.facultad.dispatchEvent(new Event("change"));
      select.programa.value = getNonEmptyRandomValue(
        faculties[select.facultad.value]
      );
      select.cambiarPrograma.value = Math.random() > 0.5 ? "Sí" : "No";
      select.cambiarPrograma.dispatchEvent(new Event("change"));
      select.cambiarPrograma.disabled = false;

      if (select.cambiarPrograma.value === "Sí") {
        select.nuevoPrograma.value = getNonEmptyRandomValue(
          faculties[select.facultad.value]
        );
      }

      select.poblacion.value =
        Math.random() > 0.5 ? "excepcion" : "generacion-e";
      select.poblacion.dispatchEvent(new Event("change"));

      if (select.poblacion.value === "excepcion") {
        select.condExcepcion.value = getNonEmptyRandomValue(
          Object.keys(excepciones)
        );
      }

      select.ruv.value = Math.random() > 0.5 ? "Sí" : "No";
      select.sexo.value = Math.random() > 0.5 ? "M" : "F";
      select.reconocimiento.value = getNonEmptyRandomValue(reconocimientos);

      const startYear = 1980;
      const endYear = 2010;
      const year =
        Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
      const month = Math.floor(Math.random() * 12) + 1;
      const day =
        Math.floor(Math.random() * new Date(year, month, 0).getDate()) + 1;
      const fechaAleatoria = `${year}-${String(month).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      select.fechaNacimiento.value = fechaAleatoria;

      select.yearAdmision.value = Math.floor(Math.random() * 10) + 2020;
      select.semestreAdmision.value = Math.random() > 0.5 ? "A" : "B";
      select.yearAdmision.dispatchEvent(new Event("change"));
      select.semestreAdmision.dispatchEvent(new Event("change"));

      select.departamentoNacimiento.value = getNonEmptyRandomValue(
        Object.keys(locations)
      );
      select.estadoCivil.value = getNonEmptyRandomValue(
        Array.from(select.estadoCivil.options)
      ).value;
      select.departamentoNacimiento.dispatchEvent(new Event("change"));
      select.ciudadNacimiento.value = getNonEmptyRandomValue(
        locations[select.departamentoNacimiento.value]
      );

      select.departamentoResidencia.value = getNonEmptyRandomValue(
        Object.keys(locations)
      );
      select.departamentoResidencia.dispatchEvent(new Event("change"));
      select.ciudadResidencia.value = getNonEmptyRandomValue(
        locations[select.departamentoResidencia.value]
      );
      select.ciudadResidencia.dispatchEvent(new Event("change"));

      if (select.ciudadResidencia.value === "Cali") {
        select.comunaResidenciaInput.value = Math.floor(Math.random() * 25) + 1;
      }

      select.estratoInput.value = Math.floor(Math.random() * 6) + 1;
      select.estadoCivil.value = getRandomSelectValue(select.estadoCivil);
      select.discapacidad.value = Math.random() > 0.5 ? "Sí" : "No";
      select.formadoFamilia.value = Math.random() > 0.5 ? "Sí" : "No";
      select.ocupacion.value = getNonEmptyRandomValue(ocupaciones);
      select.ocupacion.dispatchEvent(new Event("change"));

      if (select.razonTrabaja.disabled === false) {
        select.razonTrabaja.value = Array.from(select.razonTrabaja.options)[
          Math.floor(Math.random() * select.razonTrabaja.options.length)
        ].value;
        select.horasTrabajoInput.value = Math.floor(Math.random() * 80) + 1;
      }

      select.ingresosInput.value = Math.floor(Math.random() * 10000000);
      select.gastosInput.value = Math.floor(Math.random() * 10000000);
      select.ingresosSuficientes.value = Math.random() > 0.5 ? "Sí" : "No";
      select.lugarEstudio.value = Math.random() > 0.5 ? "Sí" : "No";
      select.computador.value = Math.random() > 0.5 ? "Sí" : "No";
      select.internet.value = Math.random() > 0.5 ? "Sí" : "No";

      select.nivelEducativoPadre.value = getRandomSelectValue(
        select.nivelEducativoPadre
      );
      select.nivelEducativoMadre.value = getRandomSelectValue(
        select.nivelEducativoMadre
      );

      marcarHabilidadesAleatoriamente();

      const checkboxAleatorio = Math.random() > 0.5;
      select.incluirAcompanamientosCheckbox.checked = checkboxAleatorio;
      select.incluirAcompanamientosCheckbox.dispatchEvent(new Event("change"));
      select.acompanamientos.value = Math.floor(Math.random() * 200) + 1;
      maxRiesgos = select.acompanamientos.value;

      if (checkboxAleatorio) {
        llenarAcompanamientos(select.acompanamientos.value);
      }

      UIkit.notification({
        message: "Datos aleatorios generados",
        status: "success",
        pos: "bottom-left",
        timeout: 3000,
      });
    });

  loadSedes();
  loadDepartamentos();
  loadFacultades();
  loadCondicionesExcepcion();
  loadReconocimientos();
  loadOcupaciones();
  loadRazonTrabaja();
  loadNivelesEducativos();

  document
    .getElementById("dataForm")
    .addEventListener("submit", async function (event) {
      if (!validarRadioButtonsPorCategoria()) {
        event.preventDefault();
        UIkit.notification({
          message: "Por favor, selecciona una opción para cada habilidad.",
          status: "warning",
          pos: "bottom-left",
          timeout: 3000,
        });
        return;
      } else if (!validarTodasLasCategorias()) {
        event.preventDefault();
        return;
      } else {
        event.preventDefault();
        const submitButton = document.getElementById("submit");
        submitButton.disabled = true;
        submitButton.classList.add("uk-disabled");
        const spinner = document.getElementById('spinner');
  spinner.classList.remove('uk-hidden');
        const formData = {
          programa_admision: select.programa.value,
          condicion_excepcion:
            select.poblacion.value === "excepcion"
              ? select.condExcepcion.value
              : "No Aplica",
          cond_exp:
            select.poblacion.value === "excepcion"
              ? select.condExcepcion.value
              : "No Aplica",
          periodo:
            document.getElementById("year").value +
            "-" +
            document.getElementById("semestre").value,
          poblacion: document.getElementById("poblacion").value,
          edad_admision: parseInt(
            document.getElementById("edad_admision").value
          ),
          sexo: document.getElementById("sexo").value,
          departamento_nacimiento: document.getElementById(
            "departamento_nacimiento"
          ).value,
          municipio_nacimiento:
            document.getElementById("ciudad_nacimiento").value,
          reconocimiento: document.getElementById("reconocimiento").value,
          discapacidad: document.getElementById("discapacidad").value,
          estado_civil: document.getElementById("estado_civil").value,
          ruv: document.getElementById("ruv").value,
          estrato: parseInt(document.getElementById("estrato").value),
          departamento_residencia: document.getElementById(
            "departamento_residencia"
          ).value,
          municipio_residencia:
            document.getElementById("ciudad_residencia").value,
          comuna_residencia:
            document.getElementById("ciudad_residencia").value === "Cali"
              ? document.getElementById("comuna_residencia").value
              : "No aplica",
          lugar_estudio: document.getElementById("lugar_estudio").value,
          ocupacion: document.getElementById("ocupacion").value,
          " ingresos": parseInt(
            document.getElementById("ingresos_mensuales").value
          ),
          " gastos": parseInt(
            document.getElementById("gastos_mensuales").value
          ),
          horas_trabajo:
            ocupacion.value === "No trabaja"
              ? 0
              : parseInt(document.getElementById("horas_trabajo").value),
          razon_trabaja:
            ocupacion.value === "No trabaja"
              ? "No trabaja"
              : document.getElementById("razon_trabaja").value,
          educacion_padre: document.getElementById("nivel_educativo_padre")
            .value,
          educacion_madre: document.getElementById("nivel_educativo_madre")
            .value,
          "ingresos suficientes": document.getElementById(
            "ingresos_suficientes"
          ).value,
          formado_familia: document.getElementById("formado_familia").value,
          cambiar_programa:
            select.cambiarPrograma.value === "Sí"
              ? document.getElementById("nuevo_programa").value
              : "No",
          h_lectura:
            document.querySelector('input[name="h_lectura"]:checked')?.value ||
            "No sabe",
          h_escritura:
            document.querySelector('input[name="h_escritura"]:checked')
              ?.value || "No sabe",
          h_editor_texto:
            document.querySelector('input[name="h_editor_texto"]:checked')
              ?.value || "No sabe",
          h_hoja_calculo:
            document.querySelector('input[name="h_hoja_calculo"]:checked')
              ?.value || "No sabe",
          h_email:
            document.querySelector('input[name="h_email"]:checked')?.value ||
            "No sabe",
          h_tiempo:
            document.querySelector('input[name="h_tiempo"]:checked')?.value ||
            "No sabe",
          h_web:
            document.querySelector('input[name="h_web"]:checked')?.value ||
            "No sabe",
          h_matemáticas:
            document.querySelector('input[name="h_matemáticas"]:checked')
              ?.value || "No sabe",
          h_exp_oral:
            document.querySelector('input[name="h_exp_oral"]:checked')?.value ||
            "No sabe",
          h_trabajo_equipo:
            document.querySelector('input[name="h_trabajo_equipo"]:checked')
              ?.value || "No sabe",
          h_manejo_estres:
            document.querySelector('input[name="h_manejo_estres"]:checked')
              ?.value || "No sabe",
          h_bibliografía:
            document.querySelector('input[name="h_bibliografía"]:checked')
              ?.value || "No sabe",
          h_ingles:
            document.querySelector('input[name="h_ingles"]:checked')?.value ||
            "No sabe",
          h_idiomas:
            document.querySelector('input[name="h_idiomas"]:checked')?.value ||
            "No sabe",
          computador: document.getElementById("acceso_computador").value,
          internet: document.getElementById("acceso_internet").value,
          sede: document.getElementById("sede").value,
          facultad: document.getElementById("facultad").value,
        };
        function calcularEdadActual() {
          const fecha = new Date();
          const year = fecha.getFullYear();
          const month = fecha.getMonth() + 1; // Corregido: getMonth() devuelve 0-11
          const day = fecha.getDate();
          const fechaNacimiento = new Date(select.fechaNacimiento.value);
          const yearNacimiento = fechaNacimiento.getFullYear();
          const monthNacimiento = fechaNacimiento.getMonth() + 1; // Corregido: getMonth() devuelve 0-11
          const dayNacimiento = fechaNacimiento.getDate();
          let edad = year - yearNacimiento;
          if (
            month < monthNacimiento ||
            (month === monthNacimiento && day < dayNacimiento)
          ) {
            edad--; // No ha cumplido años en el semestre de ingreso
          }
          return edad;
        }
        calcularEdadActual();
        if (incluirAcompanamientos.checked) {
          formData.edad_actual = calcularEdadActual();
          formData.acompanamientos = parseInt(acompanamientos.value);
          formData.indiv_alto =
            parseInt(document.getElementById("indiv_alto").value) || 0;
          formData.indiv_medio =
            parseInt(document.getElementById("indiv_medio").value) || 0;
          formData.indiv_bajo =
            parseInt(document.getElementById("indiv_bajo").value) || 0;

          formData.fami_alto =
            parseInt(document.getElementById("fami_alto").value) || 0;
          formData.fami_medio =
            parseInt(document.getElementById("fami_medio").value) || 0;
          formData.fami_bajo =
            parseInt(document.getElementById("fami_bajo").value) || 0;

          formData.econo_alto =
            parseInt(document.getElementById("econo_alto").value) || 0;
          formData.econo_medio =
            parseInt(document.getElementById("econo_medio").value) || 0;
          formData.econo_bajo =
            parseInt(document.getElementById("econo_bajo").value) || 0;

          formData.academi_alto =
            parseInt(document.getElementById("academi_alto").value) || 0;
          formData.academi_medio =
            parseInt(document.getElementById("academi_medio").value) || 0;
          formData.academi_bajo =
            parseInt(document.getElementById("academi_bajo").value) || 0;

          formData.vidau_alto =
            parseInt(document.getElementById("vidau_alto").value) || 0;
          formData.vidau_medio =
            parseInt(document.getElementById("vidau_medio").value) || 0;
          formData.vidau_bajo =
            parseInt(document.getElementById("vidau_bajo").value) || 0;
        }

        const jsonData = JSON.stringify(formData, null, 2);
        console.log(jsonData);

        const apiRoute = incluirAcompanamientos.checked
          ? "/api/predict2"
          : "/api/predict1";

        await fetch(apiRoute, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData,
        })
        
          .then((response) => response.json()) // Convertir la respuesta a JSON
          .then((data) => {
            spinner.classList.add('uk-hidden');
            submitButton.disabled = false;
            submitButton.classList.remove("uk-disabled");
            // Mostrar la respuesta en la consola
            console.log("Success:", data);
            // Mostrar la respuesta en el modal
            const responseContent = document.getElementById("response-content");
            responseContent.classList.remove(
              "desertor-response",
              "no-desertor-response"
            );
            if (responseContent) {
              // Personalizar el mensaje según la predicción
              if (data.prediction === "DESERTOR") {
                responseContent.classList.add("desertor-response");
                responseContent.classList.add("desertor-response");
                responseContent.innerHTML = `
          <i class="fas fa-exclamation-triangle"></i> <!-- Icono de advertencia -->
          <span> El estudiante es considerado DESERTOR. Se recomienda tomar acciones preventivas.</span>
        `;
              } else if (data.prediction === "NO DESERTOR") {
                responseContent.classList.add("no-desertor-response");
                responseContent.innerHTML = `
          <i class="fa-solid fa-graduation-cap"></i> <!-- Icono de éxito -->
          <span> El estudiante NO es considerado DESERTOR</span>
        `;
              } else {
                responseContent.innerText = JSON.stringify(data, null, 2); // Mostrar la respuesta completa si no coincide
              }
            }

            // Abrir el modal automáticamente
            UIkit.modal("#response-modal").show();
          })
          .catch((error) => {
            console.error("Error:", error);
            // Mostrar el error en el modal si ocurre un problema
            const responseContent = document.getElementById("response-content");
            if (responseContent) {
              responseContent.innerText = `Error: ${error.message}`;
            }
            UIkit.modal("#response-modal").show();
          } 
        );
      }
    });
});
