let carrito =
JSON.parse(localStorage.getItem("carrito")) || []
mostrarCarrito()

function agregar(){

    let nombre = document.querySelector("#nombre").value

    let cantidad = Number(
        document.querySelector("#cantidad").value
    )

    let precio = Number(
        document.querySelector("#precio").value
    )
    if(nombre === "" || cantidad <= 0 || precio <= 0){
        document.querySelector("#alerta").textContent= "PORFAVOR COMPLETA TODOS LOS CAMPOS  GRACIAS :)"
        return;
    }
    

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

    let tabla = document.querySelector("#tablaProductos");

    tabla.innerHTML = "";

    let total = 0;
    
    tabla.innerHTML = "";

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;

        tabla.innerHTML += `
        <tr>
           <td>${producto.id}</td>
           <td>${producto.nombre}</td>
           <td>${producto.precio}</td>  
           <td>${producto.cantidad}</td>  
           <td>
              <button onclick="eliminarProducto(${producto.id})">eliminar</button>
           </td>          
        </tr>
        `;


    });
    document.querySelector("#total").textContent= total;
}

