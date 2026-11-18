
let posiciones = [0, 0, 0, 0];
let turno = 0;
let juegoTerminado = false;

function tirar() {

    if (juegoTerminado) return;

    let dado = numeroAleatorioEntre(1, 6);

    // Avanzar el caballo
    posiciones[turno] += dado;

    if (posiciones[turno] > 15) {
        posiciones[turno] = 15;
    }

    let filas = document.querySelectorAll(".pista tr");

    // Actualizar los caballos
    for (let i = 0; i < 4; i++) {

        let celdas = filas[i].querySelectorAll("td");

        // Limpiar las casillas anteriores
        for (let j = 0; j < celdas.length - 1; j++) {
            celdas[j].innerHTML = "";
        }

        let caballo = '<span style="font-size:28px">🐎' + (i + 1) + '</span>';

        // Colocar el caballo
        if (posiciones[i] >= 15) {
            celdas[15].innerHTML = "META<br>" + caballo;
        } else {
            celdas[posiciones[i]].innerHTML = caballo;
        }
    }

    // Obtener nombre del jugador
    let nombre = document.getElementById("Jugador" + (turno + 1)).value;

    // Comprobar si ha ganado
    if (posiciones[turno] >= 15) {

        avisarTirada("🏆 ¡HA GANADO " + nombre + "! 🏆");

        juegoTerminado = true;
        return;
    }

    // Mostrar resultado del dado
    avisarTirada("🎲 " + nombre + " ha sacado un " + dado);

    // Pasar al siguiente jugador
    turno = (turno + 1) % 4;
}


// Iniciar la carrera
function Iniciar() {

    posiciones = [0, 0, 0, 0];

    turno = numeroAleatorioEntre(0, 3);

    juegoTerminado = false;

    ColocarCaballosencasillasdesalida();

    avisarTirada("🏁 ¡Que comience la carrera!");
}


// Generar número aleatorio
function numeroAleatorioEntre(minimo, maximo) {

    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}


// Colocar los caballos en la salida
function ColocarCaballosencasillasdesalida() {

    let filas = document.querySelectorAll(".pista tr");

    for (let i = 0; i < 4; i++) {

        let celdas = filas[i].querySelectorAll("td");

        // Limpiar las casillas
        for (let j = 0; j < celdas.length - 1; j++) {
            celdas[j].innerHTML = "";
        }

        // Recuperar el texto de META
        celdas[15].innerHTML = "META";

        // Colocar el caballo en la salida
        let caballo = '<span style="font-size:28px">🐎' + (i + 1) + '</span>';

        celdas[0].innerHTML = caballo;
    }
}


// Mostrar el resultado
function avisarTirada(mensaje) {

    document.getElementById("lbl_aviso").innerHTML = mensaje;

}
