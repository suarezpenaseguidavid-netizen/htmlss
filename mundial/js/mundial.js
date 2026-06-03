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