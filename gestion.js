const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let empleados = [];

// Función auxiliar para transformar rl.question en Promesa (así usamos async/await de forma simple)
const pregunta = (texto) => new Promise((resolve) => rl.question(texto, resolve));

async function iniciarSistema() {
    let opcion;

    do {
        console.log("\n===== SISTEMA DE EMPLEADOS =====");
        console.log("1. Registrar empleado");
        console.log("2. Listar empleados");
        console.log("3. Buscar empleado por identificación");
        console.log("4. Mostrar total de empleados");
        console.log("5. Salir");
        
        opcion = await pregunta("\nSeleccione una opción: ");

        switch (opcion) {
            case "1":
                await registrarEmpleado();
                break;
            case "2":
                listarEmpleados();
                break;
            case "3":
                await buscarEmpleado();
                break;
            case "4":
                mostrarTotal();
                break;
            case "5":
                console.log("\n👋 Saliendo del sistema... ¡Hasta luego!");
                break;
            default:
                console.log(" Opción no válida. Intente de nuevo.");
        }

    } while (opcion !== "5");

    rl.close();
}

async function registrarEmpleado() {
    console.log("\n--- REGISTRAR EMPLEADO ---");
    const identificacion = await pregunta("Ingrese la identificación: ");

    const existe = empleados.find(emp => emp.identificacion === identificacion);
    if (existe) {
        console.log(" Ya existe un empleado con esa identificación.");
        return;
    }

    const nombre = await pregunta("Ingrese el nombre: ");
    const cargo = await pregunta("Ingrese el cargo: ");
    const salarioInput = await pregunta("Ingrese el salario: ");
    const salario = Number(salarioInput);
    const area = await pregunta("Ingrese el área de trabajo: ");

    empleados.push({ identificacion, nombre, cargo, salario, area });
    console.log(" Empleado registrado correctamente.");
}

function listarEmpleados() {
    if (empleados.length === 0) {
        console.log("\n No hay empleados registrados.");
        return;
    }

    console.log("\n===== LISTA DE EMPLEADOS =====");
    empleados.forEach((empleado, index) => {
        console.log(`\n[Empleado ${index + 1}]`);
        console.log(`ID:      ${empleado.identificacion}`);
        console.log(`Nombre:  ${empleado.nombre}`);
        console.log(`Cargo:   ${empleado.cargo}`);
        console.log(`Salario: $${empleado.salario}`);
        console.log(`Área:    ${empleado.area}`);
    });
}

async function buscarEmpleado() {
    console.log("\n--- BUSCAR EMPLEADO ---");
    const identificacion = await pregunta("Ingrese la identificación a buscar: ");

    const empleado = empleados.find(emp => emp.identificacion === identificacion);

    if (!empleado) {
        console.log(" Empleado no encontrado.");
        return;
    }

    console.log("\n ===== EMPLEADO ENCONTRADO =====");
    console.log(`ID:      ${empleado.identificacion}`);
    console.log(`Nombre:  ${empleado.nombre}`);
    console.log(`Cargo:   ${empleado.cargo}`);
    console.log(`Salario: $${empleado.salario}`);
    console.log(`Área:    ${empleado.area}`);
}

function mostrarTotal() {
    console.log(`\n Total de empleados en el sistema: ${empleados.length}`);
}

// Arrancar la aplicación
iniciarSistema();