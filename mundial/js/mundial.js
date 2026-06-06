let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

mostrarCarrito();

function comprar(partido, precio, fecha, estadio){
    
    let ticketExistente = carrito.find(
        ticket => ticket.partido === partido
    );

    if(ticketExistente){

        ticketExistente.cantidad++;
        ticketExistente.total =
            ticketExistente.cantidad * ticketExistente.precio;

    }else{

        let ticket = {
            id: Date.now(),
            partido: partido,
            fecha: fecha,
            estadio: estadio,
            cantidad: 1,
            precio: precio,
            total: precio
        };

        carrito.push(ticket);
    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    mostrarCarrito();
}

function mostrarCarrito() {

    let tabla = document.querySelector("#tablaCarrito");

    tabla.innerHTML = "";

    carrito.forEach(ticket => {

        tabla.innerHTML += `
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
        `;
    });

    let totalGeneral = carrito.reduce(
        (acumulador, ticket) => acumulador + ticket.total,
        0
    );

    document.querySelector("#totalGeneral").textContent =
        `$${totalGeneral}`;
}

function eliminar(id) {

    carrito = carrito.filter(ticket => ticket.id !== id);

    guardarDatos();
    mostrarCarrito();
}

function guardarDatos() {
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}
function confirmarCompra() {

    let nombre = document.querySelector("#nombre").value.trim();
    let correo = document.querySelector("#correo").value.trim();
    let telefono = document.querySelector("#telefono").value.trim();

    if(nombre === "" || correo === "" || telefono === ""){
        alert("Complete todos los campos");
        return;
    }

    if(carrito.length === 0){
        alert("No hay tickets en el carrito");
        return;
    }

    let totalTickets = carrito.reduce(
        (acumulador, ticket) => acumulador + ticket.cantidad,
        0
    );

    let precioTotal = carrito.reduce(
        (acumulador, ticket) => acumulador + ticket.total,
        0
    );

    let contenido = `
        <h2>FACTURA DE COMPRA</h2>

        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>

        <p><strong>Total de tickets comprados:</strong>
        ${totalTickets}</p>

        <p><strong>Precio total:</strong>
        $${precioTotal}</p>

        <hr>
    `;

    carrito.forEach(ticket => {

        contenido += `
            <div class="ticket">

                <h3>${ticket.partido}</h3>

                <p><strong>ID:</strong> ${ticket.id}</p>

                <p><strong>Fecha del partido:</strong>
                ${ticket.fecha}</p>

                <p><strong>Precio por boleta:</strong>
                $${ticket.precio}</p>

                <p><strong>Estadio:</strong>
                ${ticket.estadio}</p>

                <hr>

            </div>
        `;
    });

    contenido += `
    <br>
    <button id="btnImprimir"onclick="imprimirTicket()">
        Imprimir 
    </button>
`;

    document.querySelector("#ticketCompra").innerHTML = contenido;
    
}
function imprimirTicket() {

    let boton = document.querySelector("#btnImprimir");

    boton.style.display = "none";

    let ticket = document.querySelector("#ticketCompra").innerHTML;

    let ventana = window.open("", "_blank");

    ventana.document.write(ticket);

    ventana.document.close();

    ventana.print();

    boton.style.display = "inline-block";
}