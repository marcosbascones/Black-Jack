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
    } else if(puntosJugador===21){
        console.warn('Perfecto 21');
        btnPedir.disabled=true;
    }

})




