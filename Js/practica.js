/*function calcular(){
    let valorUno= parseInt(document.querySelector("#valorUno").value);
    let valorDos= parseInt(document.querySelector("#valorDos").value);
    let operaciones= document.querySelector("#operaciones").value;
    let resultado;

    if (operaciones === "+"){
        resultado= valorUno + valorDos;
    }
    if(operaciones === "-"){
        resultado= valorUno - valorDos;
    }
    if(operaciones === "*"){
        resultado= valorUno * valorDos;
    }
    if(operaciones === "/"){
        resultado= valorUno / valorDos;
    }
    document.querySelector("#resultado").innerHTML= resultado;
}*/
function mostrarResultado(resultado){
    document.querySelector("#resultado").innerHTML= resultado
}
function operarar(a,b, operacion){
    switch(operacion){
        case "+":
            return a + b;
        case "-":
            return a- b;
        case "*":
            return a * b;
        case "/":
            return a / b;
    }
}
function calcular(){
    let valorUno= parseInt(document.querySelector("#valorUno").value);
    let valorDos= parseInt(document.querySelector("#valorDos").value);
    let operaciones= document.querySelector("#operaciones").value;
    if (isNaN(valorUno) || isNaN(valorDos)){
        document.querySelector("#resultado").innerHTML= 
        "ingrese numero valido"
        return;

    }


    let resultado= operarar(valorUno, valorDos, operaciones)
    document.querySelector("#resultado").innerHTML= resultado;
    mostrarResultado(resultado)
}
