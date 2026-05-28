let carrito =
JSON.parse(localStorage.getItem("carrito")) || []

function agregar(){

    let nombre = document.querySelector("#nombre").value

    let cantidad = Number(
        document.querySelector("#cantidad").value
    )

    let precio = Number(
        document.querySelector("#precio").value
    )

    let producto = {
        id: Date.now(),
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
    }

    carrito.push(producto)

    // GUARDAR EN LOCAL STORAGE
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    )

    mostrarCarrito()
}

function eliminarProducto(id){

    carrito = carrito.filter(
        producto => producto.id !== id
    )

    // ACTUALIZAR LOCAL STORAGE
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    )

    mostrarCarrito()
}

function mostrarCarrito(){

    let lista = document.querySelector("#lista")

    lista.innerHTML = ""

    let total = 0

    carrito.forEach(producto => {

        let li = document.createElement("li")

        li.textContent =
        producto.nombre +
        " - $" + producto.precio +
        " x " + producto.cantidad

        let botonEliminar =
        document.createElement("button")

        botonEliminar.textContent = "Eliminar"

        botonEliminar.onclick = function(){
            eliminarProducto(producto.id)
        }

        li.appendChild(botonEliminar)

        lista.appendChild(li)

        total +=
        producto.precio * producto.cantidad
    })

    document.querySelector("#total").textContent =
    "Total: $" + total
}

// MOSTRAR EL CARRITO AL RECARGAR
mostrarCarrito()