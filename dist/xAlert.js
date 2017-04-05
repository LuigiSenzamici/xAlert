
module.exports = (function () {
    /**
     * @private
     * @param {object} setter setter object for gen overlay
     * @property {integer} setter.overlay.overZIndex overlay zIndex default = 100000
     * @property {string} setter.overlay.overColor rgb value colon separated default "0, 0, 0";
     * @property {number} setter.overlay.overOpacity 0 <= value <= 1, default 0.5
     * @returns {divElement} with display property setted on 'none' and full screen dimension
     */
    function _genOverlay(setter) {
        if (setter === undefined) setter = {};
        if (setter.overlay === undefined) setter.overlay = {};
        var overlayZIndex = setter.overlay.overZIndex || 100000;
        var overlayColor = setter.overlay.overColor || null;
        var overlayOpacity = setter.overlay.overOpacity || null;
        var overlayBackColor = "rgba(" + overlayColor + ", " + overlayOpacity + ")";
        var overlay = document.createElement('div');
        overlay.id = 'xAlert_overlay';
        if (overlayZIndex) overlay.style.zIndex = overlayZIndex;
        if (overlayColor && overlayOpacity) overlay.style.backgroundColor = overlayBackColor;
        
        return overlay;
    }

    /**
     *@private
     * close xAlert 
     */
    function _close() {
        var overlay = document.getElementById('xAlert_overlay');
        var box = document.getElementById('xAlert_box');
        overlay.style.display ='none';
        box.style.display =  'none';
    }

    /**
     * @private
     * open xAlert 
     * @param {string|object} message if setted change the value setted by init(),
     * @property {string} object.title title of message box
     * @property {string} object.message message to display
     * @returns {divElement} box node
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
                title.style.display = 'none';
            } else if (typeof message === 'object') {
                setText('xAlert_title', message.title);
                title.style.display = 'block';
                setText('xAlert_text', message.message);
            }
        }
        box.style.display = 'block';
        overlay.style.display = 'block';
        return box;
    }

    /**
     * @private
     * @param {object} setter.button setter object for button,
     * @property {string} setter.button.text text to display in button, default = 'OK'
     * @property {string} setter.button.backColor button background color, default ='green'
     * @property {string} setter.button.cssStyle inline style inline css format "prop:value;...prop:value;"
     * @property {string} setter.button.class classes to be assigned to button separated width space
     * @property {function} setter.button.onClick function to be executed on click function default _close()
     * @return {buttonElement} a button tag
     */
    function _genButton(setter) {
        if (setter === undefined) setter = {};
        if (setter.button === undefined) setter.button = {};

        var onClickEvent = setter.button.onClick || _close;
        var classe = setter.button.class || null;
        var cssStyle = setter.button.cssStyle || null;


        var button = document.createElement('button');
        button.id = 'xAlert_OKButton';
        var textNode = setter.button.text || 'OK';
        var text = document.createTextNode(textNode);
        

        if (classe) button.setAttribute('class', classe);
        if (cssStyle) button.setAttribute('style', cssStyle);
        button.appendChild(text);

        button.addEventListener('click', onClickEvent);
        return button;

    }

    /**
     * @private
     * @param {object} setter.text setter object for text in box
     * @property {string} setter.text.title.text xAlert title
     * @property {string} setter.text.title.cssStyle inline style inline css format "prop:value;...prop:value;"
     * @property {string} setter.text.title.class classes to be assigned to text separated width space
     * @property {string} setter.text.message.text xAlert message
     * @property {string} setter.text.message.cssStyle inline style inline css format "prop:value;...prop:value;"
     * @property {string} setter.text.message.class classes to be assigned to text separated width space
     * @returns {divElement} contain text to display
     */
    function _genText(setter) {
        if (setter === undefined) setter = {};
        if (setter.text === undefined) setter.text = {};
        if (setter.text.title === undefined) setter.text.title = {};
        if (setter.text.message === undefined) setter.text.message = {};
        setter.text.message.text = 'inserire qui il testo del messaggio attraverso la proprietà message';
        var TitleCssStyle = setter.text.title.cssStyle || null;
        var TitleClasse = setter.text.title.class || null;
        var MessageCssStyle = setter.text.message.cssStyle || null;
        var MessageClasse = setter.text.message.class || null;

        var divTesto = document.createElement('div');
        divTesto.id = 'xAlert_text';
        var testoMessaggio = document.createTextNode(setter.text.message.text);
        
        if (MessageCssStyle) divTesto.setAttribute('style', MessageCssStyle);
        if (MessageClasse) divTesto.setAttribute('class', MessageClasse);
       
        divTesto.appendChild(testoMessaggio);

        var divTitolo = document.createElement('div');
        divTitolo.id = 'xAlert_title';
        var testoTitolo = document.createTextNode(setter.text.title.text);
        divTitolo.style.display = (setter.text.title.text) ? 'block' : 'none';
        
        if (TitleCssStyle) divTitolo.setAttribute('style', TitleCssStyle);
        if (TitleClasse) divTitolo.setAttribute('class', TitleClasse);
        
        divTitolo.appendChild(testoTitolo);

        var divContenitore = document.createElement('div');
        divContenitore.id = 'xAlert_container';

        divContenitore.appendChild(divTitolo);
        divContenitore.appendChild(divTesto);
        return divContenitore;

    }

    /**
     * @private
     * @param {object} setter setter object
     * @property {integer} setter.overlay.overZindex automatic passed
     * @property {string} setter.box.class classes to be assigned to text separated width space
     * @property {string} setter.box.cssStyle inline style inline css format "prop:value;...prop:value;"
     * @returns {divElement} box message container
     */
    function _genBox(setter) {
        if (setter === undefined) setter = {};
        if (setter.overlay === undefined) setter.overlay = {};
        if (setter.box === undefined) setter.box = {};


        var classe = setter.box.class || null;
        var cssStyle = setter.box.cssStyle || null;

        var box = document.createElement('div');
        box.id = 'xAlert_box';
        if (setter.overlay.overZindex) {
            box.style.zIndex = setter.overlay.overZindex;
        }
        
        if (classe) box.setAttribute('class', classe);
        if (cssStyle) box.setAttribute('style', cssStyle);
        
        var text = _genText(setter);
        var button = _genButton(setter);
        box.appendChild(text);
        box.appendChild(button);

        return box;
    }



    /**
    * @param {object} setter setter object for xAlert
    *   @property {object} setter.overlay setter for overlay
    *       @property {integer} setter.overlay.overZIndex overlay zIndex default = 100000
    *       @property {string} setter.overlay.overColor rgb value colon separated default "0, 0, 0";
    *       @property {number} setter.overlay.overOpacity 0 <= value <= 1, default 0.5
    *
    *   @property {object} setter.box setter for box
    *       @property {string} setter.box.class  classes to be assigned to text separated width space
    *       @property {string} setter.box.cssStyle inline style inline css format "prop:value;...prop:value;"
    *
    *   @property {object} setter.button setter object for button
    *       @property {string} setter.button.text text to display in button, default = 'OK'
    *       @property {string} setter.button.backColor button background color, default ='green'
    *       @property {string} setter.button.cssStyle inline style inline css format "prop:value;...prop:value;"
    *       @property {string} setter.button.class classes to be assigned to button separated width space
    *       @property {function} setter.button.onClick function to be executed on click function default _close()
    *
    *   @property {object} setter.text setter object for text in box
    *       @property {object} setter.text.title title setter
    *           @property {string} text.title.text xAlert title
    *           @property {string} text.title.cssStyle inline style inline css format "prop:value;...prop:value;"
    *           @property {string} text.title.class classes to be assigned to text separated width space
    *
    *       @property {object} setter.text.message message
    *           @property {string} text.message.text xAlert message
    *           @property {string} text.message.cssStyle inline style inline css format "prop:value;...prop:value;"
    *           @property {string} text.message.class classes to be assigned to text separated width space
    *
    * @returns {divElement} an overlay and a box with message an ok button
    */
    function init(setter) {
        var overlay = _genOverlay(setter);
        var box = _genBox(setter);
        document.body.appendChild(overlay);
        document.body.appendChild(box);
    }
    /**
     * set the message and display centered xAlert
     * @param {string|object} message message to display in xAlert
     * @property {string} object.title xAlert title
     * @property {string} object.message xAlert message
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
        box.style.top = top + 'px';
        box.style.left = left + 'px';
        box.style.width = bW + 'px';
        box.style.maxWidth = maxDim;
    }

    /**
     * close xAlert
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
    return {
        init: init,
        open: open,
        destroy: destroy,
        close: close,
    }
})();