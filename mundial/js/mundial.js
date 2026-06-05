let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

mostrarCarrito();

function comprar(partido, precio){

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

    let contenido = `
        <h2>TICKET DE COMPRA</h2>

        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>

        <hr>
    `;

    carrito.forEach(ticket => {

        contenido += `
            <div class="ticket">

                <h3>${ticket.partido}</h3>

                <p><strong>ID:</strong> ${ticket.id}</p>

                <p><strong>Cantidad de boletas:</strong>
                ${ticket.cantidad}</p>

                <p><strong>Precio por boleta:</strong>
                $${ticket.precio}</p>

                <p><strong>Total:</strong>
                $${ticket.total}</p>

                <p><strong>

                <hr>

            </div>
        `;
    });

    document.querySelector("#ticketCompra").innerHTML =
        contenido;
}