module.exports=function(){function e(e){void 0===e&&(e={}),void 0===e.overlay&&(e.overlay={});var t=e.overlay.overZIndex||1e5,l=e.overlay.overColor||null,n=e.overlay.overOpacity||null,o="rgba("+l+", "+n+")",d=document.createElement("div");return d.id="xAlert_overlay",t&&(d.style.zIndex=t),l&&n&&(d.style.backgroundColor=o),d}function t(){var e=document.getElementById("xAlert_overlay"),t=document.getElementById("xAlert_box");e.style.display="none",t.style.display="none"}function l(e){function t(e,t){if(null!=t&&void 0!=t&&""!=t&&t.length>0){for(var l=document.getElementById(e);l.hasChildNodes();)l.removeChild(l.firstChild);var n=document.createTextNode(t);l.appendChild(n)}}var l=document.getElementById("xAlert_overlay"),n=document.getElementById("xAlert_box"),o=document.getElementById("xAlert_title");return void 0!=e&&null!=e&&""!=e&&("string"==typeof e?(t("xAlert_text",e),o.style.display="none"):"object"==typeof e&&(t("xAlert_title",e.title),o.style.display="block",t("xAlert_text",e.message))),n.style.display="block",l.style.display="block",n}function n(e){void 0===e&&(e={}),void 0===e.button&&(e.button={});var l=e.button.onClick||t,n=e.button.class||null,o=e.button.cssStyle||null,d=document.createElement("button");d.id="xAlert_OKButton";var i=e.button.text||"OK",r=document.createTextNode(i);return n&&d.setAttribute("class",n),o&&d.setAttribute("style",o),d.appendChild(r),d.addEventListener("click",l),d}function o(e){void 0===e&&(e={}),void 0===e.text&&(e.text={}),void 0===e.text.title&&(e.text.title={}),void 0===e.text.message&&(e.text.message={}),e.text.message.text="inserire qui il testo del messaggio attraverso la proprietà message";var t=e.text.title.cssStyle||null,l=e.text.title.class||null,n=e.text.message.cssStyle||null,o=e.text.message.class||null,d=document.createElement("div");d.id="xAlert_text";var i=document.createTextNode(e.text.message.text);n&&d.setAttribute("style",n),o&&d.setAttribute("class",o),d.appendChild(i);var r=document.createElement("div");r.id="xAlert_title";var s=document.createTextNode(e.text.title.text);r.style.display=e.text.title.text?"block":"none",t&&r.setAttribute("style",t),l&&r.setAttribute("class",l),r.appendChild(s);var a=document.createElement("div");return a.id="xAlert_container",a.appendChild(r),a.appendChild(d),a}function d(e){void 0===e&&(e={}),void 0===e.overlay&&(e.overlay={}),void 0===e.box&&(e.box={});var t=e.box.class||null,l=e.box.cssStyle||null,d=document.createElement("div");d.id="xAlert_box",e.overlay.overZindex&&(d.style.zIndex=e.overlay.overZindex),t&&d.setAttribute("class",t),l&&d.setAttribute("style",l);var i=o(e),r=n(e);return d.appendChild(i),d.appendChild(r),d}function i(t){var l=e(t),n=d(t);document.body.appendChild(l),document.body.appendChild(n)}function r(e){var t=l(e),n=window.innerHeight/2,o="35%",d=0;window.innerWidth<=767?(o="100%",d=window.innerWidth):d=window.innerWidth/2;var i=window.innerHeight/2-n/2,r="100%"!=o?window.innerWidth/2-75*d/100/2:"0";t.style.top=i+"px",t.style.left=r+"px",t.style.width=d+"px",t.style.maxWidth=o}function s(){t()}function a(){var e=document.getElementById("xAlert_overlay"),t=document.getElementById("xAlert_box");document.body.removeChild(e),document.body.removeChild(t)}return{init:i,open:r,destroy:a,close:s}}();