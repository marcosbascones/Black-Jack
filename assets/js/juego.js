/**
 * 2C= Two of Clubs (Treboles)
 * 2D= Two of Diamonds
 * 2H= Two of Hearts
 * 2S= Two of Swords
 * 
 */

//Inicialización de un array vacio donde se va a montar el deck
let deck= [];

//Tipos de cartas y especiales
const tipos= ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

//Puntos iniciales de jugador y computadora
let puntosJugador= 0;

let puntosComputadora=0;

//Referencias HTML

const btnPedir= document.getElementById("btnPedir");
const btnNuevo= document.querySelector('#btnNuevo');
const btnParar= document.querySelector('#btnDetener');

const puntosHtml= document.querySelectorAll('small');
const divCartasJugador= document.querySelector('#jugador-cartas');
const divCartasComputadora= document.querySelector('#computadora-cartas');


//Esta función crea una nueva baraja
const crearDeck = () =>{
    //Se añade un tipo hasta el número 10
    for(let i= 2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo)
        }
        
    }
    //Por cada tipo se añade un especial
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp+tipo)
        }
    }

    //Se llama al método de mezclado aleatorio de la libreria underscore
    deck=_.shuffle(deck);
    console.log(deck);
    //La función nos devolverá el array de deck ya mezclado
    return deck;
}

//Se llama a la función crearDeck para disponer de una baraja
crearDeck();

//Función para tomar carta
const pedirCarta = () =>{

    if (deck.length===0){
        throw 'No hay cartas en tu baraja'
    }

    //Toma el ultimo elemento del array deck y lo guarda en carta
    const carta= deck.pop();

    return carta;

}



const valorCarta= (carta) =>{

    // Esta función recibe una carta (ej: '10H', 'AS') y devuelve su valor numérico. Elimina la última letra y se queda con el valor numérico
    const valor= carta.substring(0, carta.length-1);
    //Variable para almacenar los puntos 
    let puntos=0;
     //En caso de que no sea un número y sea una letra especial se le asigna valor por un ternario
    if(isNaN(valor)){
        puntos= (valor ==='A')? 11 : 10;
   
    }else{
        puntos=valor*1; //Esto se hace para pasar de String a number
    }

    return puntos;
  
    //OPCION TERNARIO
    // return(isNaN(valor))?
    //         (valor==='A')?11:10
    //         :valor*1;


}

//Turno de la computadora recibe como puntos mínimos los puntos del jugador a superar

const turnoComputadora= (puntosMinimos)=>{

    //INICIALIZACIÓN DE UN DO-WHILE
    do{

        const carta = pedirCarta();

    //Se añade el valor de la carta a los puntosComputadora
    puntosComputadora = puntosComputadora + valorCarta(carta);

    //Se inserta en la segunda posición de puntoHtml 
    puntosHtml[1].innerHTML=puntosComputadora;

    //Se indica la creación de una img en HTML
    const imgCarta= document.createElement('img');
    //Se da la ruta y se la añade el valor de la carta para llegar al naipe específico
    imgCarta.src=`assets/cartas/${carta}.png`;

    //Se le aplica la clase de CSS carta
    imgCarta.classList.add('carta');
    //Se añade la carta al div correspondiente
    divCartasComputadora.append(imgCarta);

    //Regla de BlackJack
    if(puntosMinimos >21){
        break;
    }
    //Ejecutar mientras se cumpla la condición si el jugador ha pasado los 21 solo se ejcutará 1 vez
    }while((puntosComputadora<puntosMinimos)&& (puntosMinimos<=21));


    //Se establece timeOut para que de tiempo a mostrar las imagenes y mensajes
    setTimeout(()=>{
        if (puntosComputadora===puntosJugador){
        alert("EMPATE");
    }else if(puntosMinimos>21){
        alert("GANA COMPUTADORA")
    }else if (puntosComputadora>21){
        alert("JUGADOR GANA")
    }else{
        alert("GANA COMPUTADORA")
    }
    },150);
    
}



//Eventos para jugador

//Botón pedir

btnPedir.addEventListener('click', ()=>{

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);

    //Se añade en el primer elemento de puntosHTML
    puntosHtml[0].innerHTML=puntosJugador;

    const imgCarta= document.createElement('img');
    imgCarta.src=`assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    //Si se supera 21 se deshabilita btnPedir y mensaje de derrota se llama a computadora 
    if(puntosJugador>21){
        console.warn('Perdiste!!!')
        btnPedir.disabled=true;
        turnoComputadora(puntosJugador);
    } else if(puntosJugador===21){
        //Deshabilita btnPedir y se llama a turnoComputadora
        console.warn('Perfecto 21');
        btnPedir.disabled=true;
        turnoComputadora(puntosJugador);
    }

})

//btnParar deshabilita botones y llama a turnoComputadora
btnParar.addEventListener('click', ()=>{
    btnParar.disabled=true;
    btnPedir.disabled=true;
    turnoComputadora(puntosJugador);

    
})

//btnNuevo para resetear juego 
btnNuevo.addEventListener('click', ()=>{
    console.clear();
    deck= [];
    puntosJugador= 0;
    puntosComputadora=0;
    crearDeck();
    //Se reactivan los botones
    btnParar.disabled=false;
    btnPedir.disabled=false;
    //Reset de contadores
    puntosHtml[0].innerHTML=puntosJugador;
    puntosHtml[1].innerHTML=puntosJugador;
    //Se los huecos para las imágenes
    divCartasComputadora.innerHTML="";
    divCartasJugador.innerHTML="";

})






