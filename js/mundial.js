const datosGuardados = JSON.parse(
    localStorage.getItem("datosCliente")
);

if (datosGuardados) {

    document.querySelector("#nombre").value =
        datosGuardados.nombre || "";

    document.querySelector("#documento").value =
        datosGuardados.documento || "";

    document.querySelector("#correo").value =
        datosGuardados.correo || "";

    document.querySelector("#telefono").value =
        datosGuardados.telefono || "";
}
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

mostrarCarrito();

function guardarDatos() {
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}

function calcularTotalGeneral() {
    return carrito.reduce(
        (acumulador, ticket) => acumulador + ticket.total,
        0
    );
}

function comprar(partido, precio, fecha, estadio) {

    const ticketExistente = carrito.find(
        ticket => ticket.partido === partido
    );

    if (ticketExistente) {

        ticketExistente.cantidad++;
        ticketExistente.total =
            ticketExistente.cantidad * ticketExistente.precio;

    } else {

        carrito.push({
            id: Date.now(),
            partido,
            fecha,
            estadio,
            cantidad: 1,
            precio,
            total: precio
        });
    }

    guardarDatos();
    mostrarCarrito();
}

function mostrarCarrito() {

    const tabla = document.querySelector("#tablaCarrito");

    tabla.innerHTML = carrito.map(ticket => `
        <tr>
            <td>${ticket.id}</td>
            <td>${ticket.partido}</td>
            <td>${ticket.cantidad}</td>
            <td>$${ticket.precio}</td>
            <td>$${ticket.total}</td>
            <td>
                <button onclick="eliminar(${ticket.id})">
                    Eliminar
                </button>
            </td>
        </tr>
    `).join("");

    document.querySelector("#totalGeneral").textContent =
        `$${calcularTotalGeneral()}`;
}

function eliminar(id) {

    carrito = carrito.filter(
        ticket => ticket.id !== id
    );

    guardarDatos();
    mostrarCarrito();
}

function obtenerDatosCliente() {

    return {
        nombre: document.querySelector("#nombre").value.trim(),
        documento: document.querySelector("#documento").value.trim(),
        correo: document.querySelector("#correo").value.trim(),
        telefono: document.querySelector("#telefono").value.trim()
    };
}

function validarCompra(datosCliente) {

    const { nombre, documento, correo, telefono } = datosCliente;

    if (!nombre || !documento || !correo || !telefono) {
        alert("Complete todos los campos");
        return false;
    }

    if (carrito.length === 0) {
        alert("No hay tickets en el carrito");
        return false;
    }

    return true;
}

function generarFactura(datosCliente) {

    const totalTickets = carrito.reduce(
        (total, ticket) => total + ticket.cantidad,
        0
    );

    let contenido = `
        <h2>FACTURA DE COMPRA</h2>

        <p><strong>Nombre:</strong> ${datosCliente.nombre}</p>
        <p><strong>Documento:</strong> ${datosCliente.documento}</p>
        <p><strong>Correo:</strong> ${datosCliente.correo}</p>
        <p><strong>Teléfono:</strong> ${datosCliente.telefono}</p>

        <p><strong>Total de tickets:</strong>
        ${totalTickets}</p>

        <p><strong>Precio total:</strong>
        $${calcularTotalGeneral()}</p>

        <hr>
    `;

    carrito.forEach(ticket => {

        contenido += `
            <div class="ticket">

                <h3>${ticket.partido}</h3>

                <p><strong>ID:</strong> ${ticket.id}</p>

                <p><strong>Fecha:</strong>
                ${ticket.fecha}</p>

                <p><strong>Precio:</strong>
                $${ticket.precio}</p>

                <p><strong>Estadio:</strong>
                ${ticket.estadio}</p>

                <hr>

            </div>
        `;
    });

    contenido += `
        <button id="btnImprimir"
                onclick="imprimirTicket()">
            Imprimir
        </button>
    `;

    return contenido;
}
function confirmarCompra() {

    const datosCliente = obtenerDatosCliente();

    console.log(datosCliente);

    if (!validarCompra(datosCliente)) {
        return;
    }

    localStorage.setItem(
        "datosCliente",
        JSON.stringify(datosCliente)
    );

    document.querySelector("#ticketCompra").innerHTML =
        generarFactura(datosCliente);
}

function imprimirTicket() {

    const boton =
        document.querySelector("#btnImprimir");

    boton.style.display = "none";

    const contenido =
        document.querySelector("#ticketCompra").innerHTML;

    const ventana = window.open("", "_blank");

    ventana.document.write(contenido);
    ventana.document.close();

    ventana.print();

    boton.style.display = "inline-block";
}