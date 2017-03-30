/**
 * Created by luigisenzamici.
 * xAlert sostituisce la funzione alert() di javascript
 */
module.exports=(function(){
    /**
     * @param setter.overlay.overZIndex: ha un valore di default altissimo nel caso è settabile
     * @param setter.overlay.overColor: di default è bianco, indicare separati da virgola i valori rgb
     * @param setter.overlay.overOpacity: di default 0.5
     * @returns divElement con display: none a grandezza pieno schermo
     */
    function genOverlay(setter){
        if(setter === undefined)setter = {};
        if(setter.overlay === undefined)setter.overlay = {};
        var overlayZIndex = setter.overlay.overZIndex || 100000;
        var overlayColor = setter.overlay.overColor || "0, 0, 0";
        var overlayOpacity = setter.overlay.overOpacity || "0.5";


        var overlayBackColor = "rgba(" + overlayColor + ", " + overlayOpacity + ")";
        var overlay = document.createElement('div');
        overlay.style.display = 'none';
        overlay.style.position = 'fixed';
        overlay.style.top=0;
        overlay.style.left=0;
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = overlayZIndex;
        overlay.style.backgroundColor = overlayBackColor;

        overlay.setAttribute('id', 'xAlert_overlay');
        return overlay;
    }

    /**
     * chiude xAlert accedendo direttamente al DOM (no via istanza)
     */
    function _close(){
        var overlay = document.getElementById('xAlert_overlay');
        var box = document.getElementById('xAlert_box');
        box.style.display ='none';
        overlay.style.display = 'none';
    }

    /**
     * apre xAlert accedendo direttamente al DOM
     * @param message, se impostato cambia la descrizione inserita nell'init,
     * se è un oggetto deve contenere le proprietà message e title
     * @returns divElement ritorna il nodo box
     */
    function _open(message){
        function setText(nodo, testo){
            if(testo!=null && testo!=undefined && testo!='' && testo.length > 0) {
                var text = document.getElementById(nodo);

                while (text.hasChildNodes()) {
                    text.removeChild(text.firstChild);
                }
                var textNode = document.createTextNode(testo);
                text.appendChild(textNode);
            }
        }
        var overlay = document.getElementById('xAlert_overlay');
        var box = document.getElementById('xAlert_box');
        var title = document.getElementById('xAlert_title');
        if(message!=undefined && message!=null && message!='') {
            if(typeof message === 'string'){
                setText('xAlert_text', message);
                title.style.display = 'none';
            }else if(typeof message === 'object'){
                setText('xAlert_title', message.title);
                title.style.display = 'block';
                setText('xAlert_text', message.message);
            }
        }
        box.style.display ='block';
        overlay.style.display = 'block';
        return box;
    }

    /**
     * @param setter.button.text testo da visualizzare sul bottone, default è "OK"
     * @param setter.button.backColor  colore del bottone default è "green"
     * @param setter.button.cssStyle style inline del bottone nel formato css "prop:value;...prop:value;"
     * @param setter.button.class, classi da assegnare al box formato stringa separata da spazi
     */
    function genButton(setter){
        if(setter === undefined)setter = {};
        if(setter.button === undefined)setter.button ={};

        var onClickEvent =  setter.button.onClick || _close;
        var classe = setter.button.class || null;
        var cssStyle = setter.button.cssStyle || null;


        var button = document.createElement('button');
        var textNode = setter.button.text || 'OK';
        var text = document.createTextNode(textNode);

        button.style.display = 'block';
        button.style.minWidth = '50px';
        button.style.minHeight = '30px';
        button.style.marginTop = '5px';
        button.style.marginBottom = '5px';
        button.style.marginLeft = 'auto';
        button.style.marginRight = 'auto';
        button.style.backgroundColor = 'green';

        if(classe)button.setAttribute('class', classe);
        if(cssStyle)button.setAttribute('style', cssStyle);
        button.appendChild(text);

        button.addEventListener('click', onClickEvent);
        return button;

    }

    /**
     * @param setter.text.title, titolo di xAlert
     * @param setter.text.message, testo da mostrare nel messaggio
     * @param setter.text.title.cssStyle style inline del titolo nel formato css "prop:value;...prop:value;"
     * @param setter.text.title.class, classi da assegnare al titolo formato stringa separata da spazi
     * @param setter.text.message.cssStyle style inline del testo nel formato css "prop:value;...prop:value;"
     * @param setter.text.message.class, classi da assegnare al testo formato stringa separata da spazi
     * @returns divElement contiene il testo da mostrare
     */
    function genText(setter){
        if(setter === undefined)setter = {};
        if(setter.text === undefined) setter.text = {};
        if(setter.text.title === undefined) setter.text.title = {};
        if(setter.text.message === undefined) setter.text.message ='inserire qui il testo del messaggio attraverso la proprietà message';
        var TitleCssStyle = setter.text.title.cssStyle || null;
        var TitleClasse = setter.text.title.class || null;
        var MessageCssStyle = setter.text.message.cssStyle || null;
        var MessageClasse = setter.text.message.class || null;

        var divTesto = document.createElement('div');
        var testoMessaggio = document.createTextNode(setter.text.message);
        divTesto.style.display = 'block';
        divTesto.style.padding = '20px';
        divTesto.style.maxHeight='80%';
        divTesto.style.maxWidth ='100%';
        divTesto.style.marginLeft = 'auto';
        divTesto.style.marginRight = 'auto';
        divTesto.style.textAlign='center';

        if(MessageCssStyle) divTesto.setAttribute('style', MessageCssStyle);
        if(MessageClasse) divTesto.setAttribute('class', MessageClasse);
        divTesto.setAttribute('id', 'xAlert_text');
        divTesto.appendChild(testoMessaggio);

        var divTitolo = document.createElement('div');
        var testoTitolo = document.createTextNode(setter.text.title);
        divTitolo.style.display = (setter.text.title)?'block':'none';
        divTitolo.style.padding = '20px';
        divTitolo.style.maxHeight='20%';
        divTitolo.style.maxWidth ='100%';
        divTitolo.style.marginLeft = 'auto';
        divTitolo.style.marginRight = 'auto';
        divTitolo.style.textAlign='center';

        if(TitleCssStyle) divTitolo.setAttribute('style', TitleCssStyle);
        if(TitleClasse) divTitolo.setAttribute('class', TitleClasse);
        divTitolo.setAttribute('id', 'xAlert_title');
        divTitolo.appendChild(testoTitolo);
        var divContenitore = document.createElement('div');
        divContenitore.style.display = 'block';
        divContenitore.style.padding = '0px';
        divContenitore.style.maxHeight='90%';
        divContenitore.style.maxWidth ='100%';
        divContenitore.style.marginLeft = 'auto';
        divContenitore.style.marginRight = 'auto';
        divContenitore.style.textAlign='center';

        divContenitore.appendChild(divTitolo);
        divContenitore.appendChild(divTesto);
        return divContenitore;

    }

    /**
     * @param setter.overlay.overZindex, serve a mettere il box sopra all'overlay (passato automaticamente)
     * @param setter.box.class, classi da assegnare al box formato stringa separata da spazi
     * @param setter.box.cssStyle, stile inline per il box formato css "prop:value;... prop:value;"
     * @returns divElement div contenitore del messaggio e bottone ok
     */
    function genBox(setter) {
        if(setter === undefined)setter = {};
        if (setter.overlay === undefined) setter.overlay = {};
        if(setter.box === undefined) setter.box = {};


        var classe = setter.box.class || null;
        var cssStyle = setter.box.cssStyle || null;

        var box = document.createElement('div');
        box.style.display = 'none';
        box.style.position = 'fixed';
        box.style.top = 0;
        box.style.left = 0;
        box.style.maxWidth = '35%';
        box.style.maxHeight = '50%';
        box.style.padding = '10px';
        box.style.textAlign = 'center';
        box.style.backgroundColor = 'white';
        box.style.border = '1px solid gray';
        box.style.zIndex = setter.overlay.overZindex + 1 || 100001;

        if(classe)box.setAttribute('class', classe);
        if(cssStyle)box.setAttribute('style', cssStyle);
        box.setAttribute('id', 'xAlert_box');
        var text = genText(setter);
        var button = genButton(setter);
        box.appendChild(text);
        box.appendChild(button);

        return box;
    }

    /**
     * @param message, può essere una stringa o un oggetto con le proprietà {"title:'', message:''"}
     * @returns void, setta il messaggio e mostra la finestra centrata
     */
    function open(message) {
        var box = _open(message);
        var bH = window.innerHeight/2;
        var maxDim = '35%';
        var bW = 0;
        if(window.innerWidth <= 767){
            maxDim = '100%';
            bW= window.innerWidth;
        }else{
            bW= window.innerWidth/2;
        }
        var top =  window.innerHeight/2 - bH/2;
        var left =  maxDim != '100%'?window.innerWidth/2 - ((bW*75)/100)/2: '0';
        box.style.top = top + 'px';
        box.style.left = left + 'px';
        box.style.width = bW + 'px';
        box.style.maxWidth = maxDim;
    }

    /**
     * chiude xAlert
     */
    function close(){
        _close();
    }
    /**
     * remove xAlert from the DOM
     */
    function destroy(){
        var overlay = document.getElementById('xAlert_overlay');
        var box = document.getElementById('xAlert_box');
        document.body.removeChild(overlay);
        document.body.removeChild(box);
    }

     /**
     * function init
     * le proprietà del setter sono tutte opzionali
     * @param setter = oggetto di settaggio
     * @param setter.overlay.overZIndex : (number)  ha un valore di default altissimo nel caso è settabile
     * @param setter.overlay.overColor: (string) di default è bianco, indicare separati da virgola i valori rgb
     * @param setter.overlay.overOpacity: (0<number<1) default = 0.5
     * @param setter.box.class: (string) elenco delle classi da applicare separate da uno spazio
     * @param setter.box.cssStyle:(string) elenco delle regole css separate da ';' esempio: "padding: 0px; .... border: 1px solid red;"
     * @param setter.button.text: (string) testo visualizzato nel bottone - default = 'OK'
     * @param setter.button.backColor: (string/#code)  colore del bottone default è "green"
     * @param setter.button.cssStyle: (string) elenco delle regole css separate da ';' esempio: "padding: 0px; .... border: 1px solid red;"
     * @param setter.button.class: (string) elenco delle classi da applicare separate da uno spazio
     * @param setter.button.onClick: (function) funzione da eseguire su click del bottone ok, di default chiude la finestra
     * @param setter.text.title:(string) titolo di xAlert
     * @param setter.text.message: (string) testo da mostrare nel messaggio
     * @param setter.title.class: (string) elenco delle classi da applicare separate da uno spazio
     * @param setter.title.cssStyle:(string) elenco delle regole css separate da ';' esempio: "padding: 0px; .... border: 1px solid red;"
     * @param setter.message.class: (string) elenco delle classi da applicare separate da uno spazio
     * @param setter.message.cssStyle:(string) elenco delle regole css separate da ';' esempio: "padding: 0px; .... border: 1px solid red;"*

     *@returns divElement, divElement ritorna un div che fa da overlay e un div che mostra il messaggio
     */
    function init(setter){
        var overlay = genOverlay(setter);
        var box = genBox(setter);
        document.body.appendChild(overlay);
        document.body.appendChild(box);
    }
    return {
        init: init,
        open: open,
        destroy : destroy,
        close: close,
    }
})();