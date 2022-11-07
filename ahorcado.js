var palabras = [
    ["atlantico", "Un oceano"],
    ["ordenador", "Una maquina"],
    ["laurel", "Un arbol"],
    ["plaza", "Espacio publico"],
    ["rueda", "Gran invento"],
    ["cereza", "Una fruta"],
    ["petanca", "Un juego"],
    ["higuera", "Un arbol"],
    ["everest", "Un monte"],
    ["relampago", "Antecede al trueno"],
    ["jirafa", "Un animal"],
    ["luxemburgo", "Un pais"],
    ["uruguay", "Un pais"],
    ["ilustracion", "Representacion grafica"],
    ["excursion", "Actividad de la naturaleza"],
    ["empanadilla", "De la panaderia"],
    ["pastel", "De la pasteleria"],
    ["colegio", "Lugar para estudiar"],
    ["carrera", "Competicion"],
    ["mermelada", "Confitura"]
];

var palabra = "";
var rand;
var oculta=[];
var hueco= document.getElementById("palabra");
var cont= 6;
var buttons = document.getElementsByClassName('palabra');
var btnInicio= document.getElementById("reset");
var cantErrores = 1;

function generaPalabra(){
rand= (Math.random() *19).toFixed(0);
palabra = palabras[rand][0].toUpperCase();
}

function pintarGuiones(num){
    for(var i=0; i<num; i++){
        oculta[i] = "_"
    }
    hueco.innerHTML = oculta.join("");
}

function generarABC(a,z){
    document.getElementById("abcdario").innerHTML = "";
    var i = a.charCodeAt(0), j = z.charCodeAt(0);
    var letra = "";
    for( ; i<=j; i++){
        letra = String.fromCharCode(i).toUpperCase();
            document.getElementById("abcdario").innerHTML += "<button class='btnletra' value = '" + letra +"' onclick = 'intento(\"" + letra + "\")' class='letra' id='"+letra+"'> " + letra +" </button> "
        if(i == 110){
            document.getElementById("abcdario").innerHTML += "<button class='btnletra' value = 'Ñ' onclick = 'intento(\"Ñ\")' class='letra' id='"+letra+"'>Ñ</button> "
        }
    }
}

function intento(Letra){
    document.getElementById(Letra).disabled = true;
    
    if(palabra.indexOf(Letra) != -1){
        for( var i = 0; i<palabra.length; i++){
            if(palabra[i]==Letra) oculta[i] = Letra;
        }
        hueco.innerHTML = oculta.join("");
        document.getElementById("acierto").innerHTML = "Bien";
    }else{
        cantErrores++
        cont--;
        document.getElementById("intentos").innerHTML = cont;
        document.getElementById("acierto").innerHTML = "Fallo";
        const source = `img/ahorcado${cantErrores}.png`;
        const imagen = document.getElementById("imagen");
        imagen.src = source;
    }
    compruebaFin();
    setTimeout(function(){
        document.getElementById("acierto").className = "";
    }, 800);
}

function pista(){
    document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
}

function compruebaFin(){
    
    if(oculta.indexOf("_") == -1){
        document.getElementById("msg-final").innerHTML = "Felicidades!!";
        document.getElementById("reset").innerHTML = "Empezar";
        btnInicio.onclick = function(){location.reload()};
    }else if(cont == 0){
        document.getElementById("msg-final").innerHTML = "Gamer Over";
        document.getElementById("reset").innerHTML = "Empezar";
        btnInicio.onclick = function(){location.reload()};
    }
}

function inicio(){
    cantErrores = 1;
    const source = `img/ahorcado${cantErrores}.png`;
    const imagen = document.getElementById("imagen");
    imagen.src = source;
    generaPalabra();
    pintarGuiones(palabra.length);
    generarABC("a","z");
    cont= 6;
    document.getElementById("intentos").innerHTML = cont;
}

window.onload = inicio();