var U = require('underscore_selector');
module.exports = (function () {
    /**
     * @param {object} setter, setter object for gen overlay
     * @param {integer} setter.overlay.overZIndex: overaly zIndex default = 100000
     * @param {string} setter.overlay.overColor: rgb value colon separated default "0, 0, 0";
     * @param {number} setter.overlay.overOpacity: 0 <= value <= 1, default 0.5
     * @returns {divElement} with display property setted on 'none' and full screen dimension
     */
    function _genOverlay(setter) {
        if (setter === undefined) setter = {};
        if (setter.overlay === undefined) setter.overlay = {};
        var overlayZIndex = setter.overlay.overZIndex || 100000;
        var overlayColor = setter.overlay.overColor || "0, 0, 0";
        var overlayOpacity = setter.overlay.overOpacity || "0.5";
        var overlayBackColor = "rgba(" + overlayColor + ", " + overlayOpacity + ")";
        var overlay = document.createElement('div');
        U(overlay).css({
            display: 'none',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: overlayZIndex,
            backgroundColor: overlayBackColor
        }).attr('id', 'xAlert_overlay');
        return overlay;
    }

    /**
     * chiude xAlert accedendo direttamente al DOM (no via istanza)
     */
    function _close() {
        U('#xAlert_overlay').css({ display: 'none' });
        U('#xAlert_box').css({ display: 'none' });
    }

    /**
     * apre xAlert accedendo direttamente al DOM
     * @param message, se impostato cambia la descrizione inserita nell'init,
     * se è un oggetto deve contenere le proprietà message e title
     * @returns divElement ritorna il nodo box
     */
    function _open(message) {
        function setText(nodo, testo) {
            if (testo != null && testo != undefined && testo != '' && testo.length > 0) {
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
        if (message != undefined && message != null && message != '') {
            if (typeof message === 'string') {
                setText('xAlert_text', message);
                U(title).css({ display: 'none' });
            } else if (typeof message === 'object') {
                setText('xAlert_title', message.title);
                U(title).css({ display: 'block' });
                setText('xAlert_text', message.message);
            }
        }
        U(box).css({ display: 'block' });
        U(overlay).css({ display: 'block' });
        return box;
    }

    /**
     * @param setter.button.text testo da visualizzare sul bottone, default è "OK"
     * @param setter.button.backColor  colore del bottone default è "green"
     * @param setter.button.cssStyle style inline del bottone nel formato css "prop:value;...prop:value;"
     * @param setter.button.class, classi da assegnare al box formato stringa separata da spazi
     */
    function _genButton(setter) {
        if (setter === undefined) setter = {};
        if (setter.button === undefined) setter.button = {};

        var onClickEvent = setter.button.onClick || _close;
        var classe = setter.button.class || null;
        var cssStyle = setter.button.cssStyle || null;


        var button = document.createElement('button');
        var textNode = setter.button.text || 'OK';
        var text = document.createTextNode(textNode);
        U(button).css({
            display: 'block',
            minWidth: '50px',
            minHeight: '30px',
            marginTop: '5px',
            marginBottom: '5px',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: 'green',
        });

        if (classe) U(button).attr('class', classe);
        if (cssStyle) U(button).attr('style', cssStyle);
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
    function _genText(setter) {
        if (setter === undefined) setter = {};
        if (setter.text === undefined) setter.text = {};
        if (setter.text.title === undefined) setter.text.title = {};
        if (setter.text.message === undefined) setter.text.message = 'inserire qui il testo del messaggio attraverso la proprietà message';
        var TitleCssStyle = setter.text.title.cssStyle || null;
        var TitleClasse = setter.text.title.class || null;
        var MessageCssStyle = setter.text.message.cssStyle || null;
        var MessageClasse = setter.text.message.class || null;

        var divTesto = document.createElement('div');
        var testoMessaggio = document.createTextNode(setter.text.message);
        U(divTesto).css({
            display: 'block',
            padding: '20px',
            maxHeight: '80%',
            maxWidth: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
        });

        if (MessageCssStyle) U(divTesto).attr('style', MessageCssStyle);
        if (MessageClasse) U(divTesto).attr('class', MessageClasse);
        divTesto.setAttribute('id', 'xAlert_text');
        divTesto.appendChild(testoMessaggio);

        var divTitolo = document.createElement('div');
        var testoTitolo = document.createTextNode(setter.text.title);
        U(divTitolo).css({
            display: (setter.text.title) ? 'block' : 'none',
            padding: '20px',
            maxHeight: '20%',
            maxWidth: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
        });

        if (TitleCssStyle) U(divTitolo).attr('style', TitleCssStyle);
        if (TitleClasse) U(divTitolo).attr('class', TitleClasse);
        divTitolo.setAttribute('id', 'xAlert_title');
        divTitolo.appendChild(testoTitolo);

        var divContenitore = document.createElement('div');
        U(divContenitore).css({
            display: 'block',
            padding: '0px',
            maxHeight: '90%',
            maxWidth: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
        });

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
    function _genBox(setter) {
        if (setter === undefined) setter = {};
        if (setter.overlay === undefined) setter.overlay = {};
        if (setter.box === undefined) setter.box = {};


        var classe = setter.box.class || null;
        var cssStyle = setter.box.cssStyle || null;

        var box = document.createElement('div');
        U(box).css({
            display: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            maxWidth: '35%',
            maxHeight: '50%',
            padding: '10px',
            textAlign: 'center',
            backgroundColor: 'white',
            border: '1px solid gray',
            zIndex: setter.overlay.overZindex + 1 || 100001,
        });
        if (classe) U(box).attr('class', classe);
        if (cssStyle) U(box).attr('style', cssStyle);
        box.setAttribute('id', 'xAlert_box');
        var text = _genText(setter);
        var button = _genButton(setter);
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
        var bH = window.innerHeight / 2;
        var maxDim = '35%';
        var bW = 0;
        if (window.innerWidth <= 767) {
            maxDim = '100%';
            bW = window.innerWidth;
        } else {
            bW = window.innerWidth / 2;
        }
        var top = window.innerHeight / 2 - bH / 2;
        var left = maxDim != '100%' ? window.innerWidth / 2 - ((bW * 75) / 100) / 2 : '0';
        U(box).css({
            top: top + 'px',
            left: left + 'px',
            width: bW + 'px',
            maxWidth: maxDim,
        });
    }

    /**
     * chiude xAlert
     */
    function close() {
        _close();
    }
    /**
     * remove xAlert from the DOM
     */
    function destroy() {
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
    function init(setter) {
        var overlay = _genOverlay(setter);
        var box = _genBox(setter);
        document.body.appendChild(overlay);
        document.body.appendChild(box);
    }
    return {
        init: init,
        open: open,
        destroy: destroy,
        close: close,
    }
})();