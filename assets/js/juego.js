/**
 * 2C= Two of Clubs (Treboles)
 * 2D= Two of Diamonds
 * 2H= Two of Hearts
 * 2S= Two of Swords
 * 
 */

let deck= [];
const tipos= ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

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
    for(let i= 2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo)
        }
        
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp+tipo)
        }
    }

    deck=_.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

//Esta me permite tomar una carta

const pedirCarta = () =>{

    if (deck.length===0){
        throw 'No hay cartas en tu baraja'
    }

    const carta= deck.pop();

    return carta;

}



const valorCarta= (carta) =>{

    const valor= carta.substring(0, carta.length-1);
    let puntos=0;
    
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

//Turno de la computadora

const turnoComputadora= (puntosMinimos)=>{
    do{

        const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);

    puntosHtml[1].innerHTML=puntosComputadora;

    const imgCarta= document.createElement('img');
    imgCarta.src=`assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasComputadora.append(imgCarta);

    if(puntosMinimos >21){
        break;
    }

    }while((puntosComputadora<puntosMinimos)&& (puntosMinimos<=21));


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



//Eventos

btnPedir.addEventListener('click', ()=>{

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHtml[0].innerHTML=puntosJugador;

    const imgCarta= document.createElement('img');
    imgCarta.src=`assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugador>21){
        console.warn('Perdiste!!!')
        btnPedir.disabled=true;
        turnoComputadora(puntosJugador);
    } else if(puntosJugador===21){
        console.warn('Perfecto 21');
        btnPedir.disabled=true;
        turnoComputadora(puntosJugador);
    }

})

btnParar.addEventListener('click', ()=>{
    btnParar.disabled=true;
    btnPedir.disabled=true;
    turnoComputadora(puntosJugador);

    
})

btnNuevo.addEventListener('click', ()=>{
    console.clear();
    deck= [];
    puntosJugador= 0;
    puntosComputadora=0;
    crearDeck();
    btnParar.disabled=false;
    btnPedir.disabled=false;
    puntosHtml[0].innerHTML=puntosJugador;
    puntosHtml[1].innerHTML=puntosJugador;
    divCartasComputadora.innerHTML="";
    divCartasJugador.innerHTML="";



})






