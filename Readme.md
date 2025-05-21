
# BlackJack - Juego interactivo en JavaScript

Este proyecto es una implementación simple del clásico juego de cartas **BlackJack**.


### 🔁 Lógica básica de programación
- Uso de **variables**, **condicionales** (`if`, `else`, ternarios) y **bucles** (`for`, `do-while`).
- Funciones que encapsulan lógica reutilizable, como `crearDeck`, `pedirCarta`, `valorCarta` o `turnoComputadora`.

### 🧩 Manipulación del DOM
- Inserción dinámica de elementos en el HTML usando `document.createElement` y `appendChild`.
- Acceso y modificación de contenido HTML con `getElementById`, `querySelector`, `innerHTML`, etc.

### 🖱️ Creación y manejo de eventos
- Uso de `addEventListener` para escuchar y responder a eventos del usuario, como clicks en los botones **Pedir**, **Nuevo Juego** y **Detener**.

### 🎨 Estilos con CSS y Bootstrap
- Estilos visuales personalizados mediante clases CSS.
- Uso de clases de Bootstrap para presentación responsive y diseño de elementos (ej botones).

### 📚 Uso de librerías externas
- Se utilizó la librería **Underscore.js** para **barajar aleatoriamente la baraja** de cartas mediante `_.shuffle()`.

### ⏲️ Callbacks y temporizadores
- Implementación de `setTimeout` para generar un pequeño **retraso en la respuesta de la computadora**, simulando un turno realista.
- Uso de funciones callback para modular el flujo de ejecución del juego.

## 🎮 Funcionamiento del juego

El jugador puede pedir cartas hasta que decida detenerse o se pase de 21 puntos. Luego, la computadora juega su turno automáticamente hasta superar al jugador o pasarse. Al final se muestra un mensaje con el resultado del juego.






