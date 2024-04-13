class Comida {
	constructor(
		nombre,
		calorias,
		proteinas,
		grasa,
		carbohidratos,
		fibra,
		colesterol
	) {
		this.nombre = nombre;
		this.calorias = calorias;
		this.proteinas = proteinas;
		this.grasa = grasa;
		this.carbohidratos = carbohidratos;
		this.fibra = fibra;
		this.colesterol = colesterol;
	}
}

class Carnes extends Comida {
	constructor(
		nombre,
		calorias,
		proteinas,
		grasa,
		carbohidratos,
		fibra,
		colesterol
	) {
		super(nombre, calorias, proteinas, grasa, carbohidratos, fibra, colesterol);
	}
}

class Vegetales extends Comida {
	constructor(
		nombre,
		calorias,
		proteinas,
		grasa,
		carbohidratos,
		fibra,
		colesterol
	) {
		super(nombre, calorias, proteinas, grasa, carbohidratos, fibra, colesterol);
	}
}

class Frutas extends Comida {
	constructor(
		nombre,
		calorias,
		proteinas,
		grasa,
		carbohidratos,
		fibra,
		colesterol
	) {
		super(nombre, calorias, proteinas, grasa, carbohidratos, fibra, colesterol);
	}
}

// Instancias de las clases

// Tres instancias adicionales de la clase Carnes
const carne1 = new Carnes("Bacon", "7", "0.084", "0.693", "0", "0", "1");
const carne2 = new Carnes("Pollo", "1", "0", "0", "0", "0", "1");
const carne3 = new Carnes("Jamón de Pavo", "3", "0", "0", "0", "0", "1");
const carne4 = new Carnes("Conejo", "2", "0", "0", "0", "0", "1");

// Tres instancias adicionales de la clase Vegetales
const vegetal1 = new Vegetales("Tomate", "0", "0", "0", "0", "0", "0");
const vegetal2 = new Vegetales("Pimiento", "0", "0", "0", "0", "0", "0");
const vegetal3 = new Vegetales("Cebolla", "0", "0", "0", "0", "0", "0");
const vegetal4 = new Vegetales("Apio", "0", "0", "0", "0", "0", "0");
const vegetal5 = new Vegetales("Champiñones", "0", "0", "0", "0", "0", "0");

// Tres instancias adicionales de la clase Frutas
const fruta1 = new Frutas("Manzana", "1", "0", "0", "0", "0", "0");
const fruta2 = new Frutas("Banano", "1", "0", "0", "0", "0", "0");
const fruta3 = new Frutas("Piña", "1", "0", "0", "0", "0", "0");
const fruta4 = new Frutas("Sandía", "0", "0", "0", "6", "0", "0");

const comidas = [
	carne1,
	carne2,
	carne3,
	carne4,
	vegetal1,
	vegetal2,
	vegetal3,
	vegetal4,
	vegetal5,
	fruta1,
	fruta2,
	fruta3,
	fruta4,
];

document.addEventListener("DOMContentLoaded", function () {
	const comidasSection = document.getElementById("comidas");
	const resultadosSection = document.getElementById("resultados");
	const resultadosComparacion = document.getElementById(
		"resultadosComparacion"
	);

	let cantidadTotalMax = 0;

	// Función para agregar campo de comida
	function agregarCampoComida() {
		const nuevoCampo = document.createElement("div");
		nuevoCampo.innerHTML = `
          <label for="comida">Comida:</label>
          <select name="comida" onchange="mostrarOpciones(this)">
              <option value="seleccionar" disabled selected>Seleccionar</option>
              ${crearOpcionesComidas()}
          </select>
          <div id="opciones"></div>
          <label for="cantidad">Cantidad (en gramos):</label>
          <input type="text" name="cantidad" placeholder="Ingrese la cantidad de gramos">
      `;
		comidasSection.appendChild(nuevoCampo);
	}

	// Función para crear las opciones del desplegable
	function crearOpcionesComidas() {
		let opciones = "";
		comidas.forEach((comida) => {
			opciones += `<option value="${comida.nombre}">${comida.nombre}</option>`;
		});
		return opciones;
	}

	// Función para mostrar opciones específicas según las Comidas seleccionado
	function mostrarOpciones(select) {
		const opcionSeleccionada = select.value;
		const opcionesDiv = select.nextElementSibling;

		// Limpiar opciones anteriores
		opcionesDiv.innerHTML = "";

		// Encontrar la comida seleccionada
		const comidaSeleccionado = comidas.find(
			(comida) => comida.nombre === opcionSeleccionada
		);
	}

	// Función para calcular el itinerario
	function calcularNutrientes() {
		let cantidadTotal = 0;

		let resultadosHTML = `
            <h2>Resultados:</h2>
            <table>
                <tr>
                    <th>Comida</th>
                    <th>Cantidad (gramos)</th>
                    <th>Calorias</th>
                    <th>Proteinas</th>
                    <th>Grasa</th>
                    <th>Carbohidratos</th>
                    <th>Fibra</th>
                    <th>Colesterol</th>
                </tr>
        `;

		const comidasInputs = document.getElementsByName("comidas");
		const cantidadesInputs = document.getElementsByName("cantidad");

		for (let i = 0; i < comidasInputs.length; i++) {
			const tipoComida = comidasInputs[i].value;
			const cantidad = parseInt(cantidadesInputs[i].value);

			// Validar duración ingresada
			if (isNaN(cantidad) || cantidad <= 0) {
				alert(
					"Por favor, ingrese una cantidad válida para la comida " +
						comidasInputs[i].value
				);
				return;
			}

			let actividadesSugeridas = "";
			let nutrientesConsumidos = "";

			// Buscar la comida seleccionado en la lista de comidas
			const comidaSeleccionado = comidas.find(
				(comida) => comida.nombre === tipoComida
			);

			if (comidaSeleccionado) {
				// Asignar actividades sugeridas según tipo de Comida
				if (
					comidaSeleccionado instanceof Carnes ||
					comidaSeleccionado instanceof Vegetales ||
					comidaSeleccionado instanceof Frutas
				) {
					actividadesSugeridas = comidaSeleccionado.actividades.join(", ");
				}

				if (comidaSeleccionado instanceof Carnes) {
					nutrientesConsumidos = "Se puede consumir en cantidades moderadas";
				} else if (comidaSeleccionado instanceof Vegetales) {
					nutrientesConsumidos = "Se puede consumir bastante";
				} else if (comidaSeleccionado instanceof Frutas) {
					nutrientesConsumidos = "Se puede consumir bastante.";
				}

				// Agregar fila a la tabla de resultados
				resultadosHTML += `
                    <tr>
                        <td>${comidaSeleccionado.nombre}</td>
                        <td>${cantidad}</td>
                        <td>${Calorias}</td>
                        <td>${Proteinas}</td>
                        <td>${Grasa}</td>
                        <td>${Carbohidratos}</td>
                        <td>${Fibra}</td>
                        <td>${Colesterol}</td>
                    </tr>
                    
                `;
				cantidadTotal += cantidad;
			}
		}

		resultadosHTML += `</table>`;
		resultadosSection.innerHTML = resultadosHTML;

		alert("La cantidad de gramos ingresada es " + cantidadTotal + ".");
		cantidadTotalMax = cantidadTotal;
	}

	function calcularComparacion() {
		let diasMaximos = document.getElementById("comparacionDias");
		let valorMaximo = parseFloat(diasMaximos.value);

		if (cantidadTotalMax > valorMaximo) {
			let diasSobrantes = cantidadTotalMax - valorMaximo;
			resultadosComparacion.innerHTML = `<p> ¡Te has pasado de días! (Tienes que eliminar ${diasSobrantes} días de tus vacaciones) </p>`;
		} else if (cantidadTotalMax == valorMaximo) {
			resultadosComparacion.innerHTML = `<p> ¡Has planificado la duración de tus días de vacaciones a la perfección! No te sobran ni te faltan días. </p>`;
		} else {
			let diasRestantes = valorMaximo - cantidadTotalMax;
			resultadosComparacion.innerHTML = `<p> Aún puedes añadir más días a tus vacaciones (${diasRestantes} días restantes). </p>`;
		}
	}

	// Evento para agregar campo de comida al hacer clic en un botón
	document
		.getElementById("agregar-comidas")
		.addEventListener("click", agregarCampoComida);

	// Evento para calcular los nutrientes al hacer clic en un botón
	document
		.getElementById("calcular-contenido")
		.addEventListener("click", calcularNutrientes);

	// Evento para calcular la comparación de días al hacer clic en un botón
	document
		.getElementById("calcular-comparacion")
		.addEventListener("click", calcularComparacion);
});
