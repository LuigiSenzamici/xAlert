# xAlert

A better modal Alert 
simply replace javascript alert with a modal

## Code Example

var xAlert = require('xalert');
xAlert.init();
xAlert.open('Hello World');

## Motivation

I simply need of an alert that doesn't have an animation when displayed so that i can trigger fast the event

## Installation

npm install xalert --save

## API
### init

function init
le proprietà del setter sono tutte opzionali

**Parameters**

-   `setter`  = oggetto di settaggio
-   `setter.overlay.overZIndex`  : (number)  ha un valore di default altissimo nel caso è settabile
-   `setter.overlay.overColor`  : (string) di default è bianco, indicare separati da virgola i valori rgb
-   `setter.overlay.overOpacity`  : (0&lt;number&lt;1) default = 0.5
-   `setter.box.class`  : (string) elenco delle classi da applicare separate da uno spazio
-   `setter.box.cssStyle`  :(string) elenco delle regole css separate da ';' esempio: "padding: 0px; .... border: 1px solid red;"
-   `setter.button.text`  : (string) testo visualizzato nel bottone - default = 'OK'
-   `setter.button.backColor`  : (string/#code)  colore del bottone default è "green"
-   `setter.button.cssStyle`  : (string) elenco delle regole css separate da ';' esempio: "padding: 0px; .... border: 1px solid red;"
-   `setter.button.class`  : (string) elenco delle classi da applicare separate da uno spazio
-   `setter.button.onClick`  : (function) funzione da eseguire su click del bottone ok, di default chiude la finestra
-   `setter.text.title`  :(string) titolo di xAlert
-   `setter.text.message`  : (string) testo da mostrare nel messaggio
-   `setter.title.class`  : (string) elenco delle classi da applicare separate da uno spazio
-   `setter.title.cssStyle`  :(string) elenco delle regole css separate da ';' esempio: "padding: 0px; .... border: 1px solid red;"
-   `setter.message.class`  : (string) elenco delle classi da applicare separate da uno spazio
-   `setter.message.cssStyle`  :(string) elenco delle regole css separate da ';' esempio: "padding: 0px; .... border: 1px solid red;"\*

Returns **any** divElement, divElement ritorna un div che fa da overlay e un div che mostra il messaggio


### open

**Parameters**

-   `message`  , può essere una stringa o un oggetto con le proprietà {"title:'', message:''"}

Returns **any** void, setta il messaggio e mostra la finestra centrata

### close

chiude xAlert

### destroy

remove xAlert from the DOM



## Tests

No unit test for now.

## Contributors

## License
