!function(){function e(e,t,n,i){Object.defineProperty(e,t,{get:n,set:i,enumerable:!0,configurable:!0})}var t,n,i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},r={},s=i.parcelRequirea202;function a(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}function c(e,t){return function(e,t){return t.get?t.get.call(e):t.value}(e,a(e,t,"get"))}function l(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function d(e,t,n){l(e,t),t.set(e,n)}function u(e,t,n){return function(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}(e,a(e,t,"set"),n),n}function h(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}function m(e,t){l(e,t),t.add(e)}null==s&&((s=function(e){if(e in o)return o[e].exports;if(e in r){var t=r[e];delete r[e];var n={id:e,exports:{}};return o[e]=n,t.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},i.parcelRequirea202=s),s.register("iE7OH",(function(t,n){var i,o;e(t.exports,"register",(function(){return i}),(function(e){return i=e})),e(t.exports,"resolve",(function(){return o}),(function(e){return o=e}));var r={};i=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)r[t[n]]=e[t[n]]},o=function(e){var t=r[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),s.register("1VDWK",(function(e,t){e.exports=s("4WKyX")(s("aNJCr").getBundleURL("8tAhj")+s("iE7OH").resolve("8yRFr")).then((()=>s("hGsRb")))})),s.register("4WKyX",(function(e,t){"use strict";var n=s("2prpb");e.exports=n((function(e){return new Promise((function(t,n){var i=document.getElementsByTagName("script");if([].concat(i).some((function(t){return t.src===e})))t();else{var o=document.createElement("link");o.href=e,o.rel="preload",o.as="script",document.head.appendChild(o);var r=document.createElement("script");r.async=!0,r.type="text/javascript",r.src=e,r.onerror=function(t){var i=new TypeError("Failed to fetch dynamically imported module: ".concat(e,". Error: ").concat(t.message));r.onerror=r.onload=null,r.remove(),n(i)},r.onload=function(){r.onerror=r.onload=null,t()},document.getElementsByTagName("head")[0].appendChild(r)}}))}))})),s.register("2prpb",(function(e,t){"use strict";var n={},i={},o={};function r(e){switch(e){case"preload":return i;case"prefetch":return o;default:return n}}e.exports=function(e,t){return function(n){var i=r(t);return i[n]?i[n]:i[n]=e.apply(null,arguments).catch((function(e){throw delete i[n],e}))}}})),s.register("aNJCr",(function(t,n){var i;e(t.exports,"getBundleURL",(function(){return i}),(function(e){return i=e}));var o={};function r(e){return(""+e).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}i=function(e){var t=o[e];return t||(t=function(){try{throw new Error}catch(t){var e=(""+t.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);if(e)return r(e[2])}return"/"}(),o[e]=t),t}})),s("iE7OH").register(JSON.parse('{"8tAhj":"index.2e652029.js","8yRFr":"barcode-detector.module.2b61079d.js"}')),t={},n=function(){return C},Object.defineProperty(t,"ClipboardCopy",{get:n,set:undefined,enumerable:!0,configurable:!0});const p=document.createElement("template"),f=String.raw;p.innerHTML=f`
  <slot name="button"><button type="button" part="button"><slot name="button-content">Copy</slot></button></slot>
`;var v,b,g=new WeakMap,w=new WeakMap,y=new WeakSet,E=new WeakSet,k=new WeakMap,S=new WeakMap,T=new WeakSet;class C extends HTMLElement{static get observedAttributes(){return["disabled"]}connectedCallback(){h(this,T,O).call(this,"value"),h(this,T,O).call(this,"from"),h(this,T,O).call(this,"disabled"),c(this,g)&&c(this,g).addEventListener("slotchange",c(this,S)),c(this,w)&&c(this,w).addEventListener("click",c(this,k))}disconnectedCallback(){c(this,g).removeEventListener("slotchange",c(this,S)),c(this,w)&&c(this,w).removeEventListener("click",c(this,k))}attributeChangedCallback(e){"disabled"===e&&c(this,w)&&(c(this,w).disabled=this.disabled,c(this,w).setAttribute("aria-disabled",this.disabled),c(this,w).part&&c(this,w).part.contains("button")&&c(this,w).part.toggle("button--disabled",this.disabled))}get disabled(){return this.hasAttribute("disabled")}set disabled(e){e?this.setAttribute("disabled",""):this.removeAttribute("disabled")}get value(){return this.getAttribute("value")}set value(e){this.setAttribute("value",e)}get from(){return this.getAttribute("from")}set from(e){this.setAttribute("from",e)}static defineCustomElement(e="clipboard-copy"){"undefined"==typeof window||window.customElements.get(e)||window.customElements.define(e,C)}constructor(){super(),m(this,y),m(this,E),m(this,T),d(this,g,{writable:!0,value:void 0}),d(this,w,{writable:!0,value:void 0}),d(this,k,{writable:!0,value:e=>{e.preventDefault(),this.disabled||(this.dispatchEvent(new Event("clipboard-copy:click",{bubbles:!0,composed:!0})),h(this,y,A).call(this))}}),d(this,S,{writable:!0,value:e=>{e.target&&"button"===e.target.name&&(c(this,w)&&c(this,w).removeEventListener("click",c(this,k)),u(this,w,h(this,E,x).call(this)),c(this,w)&&(c(this,w).addEventListener("click",c(this,k)),"BUTTON"===c(this,w).nodeName||c(this,w).hasAttribute("role")||c(this,w).setAttribute("role","button")))}}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(p.content.cloneNode(!0))),u(this,g,this.shadowRoot.querySelector('slot[name="button"]')),u(this,w,h(this,E,x).call(this))}}async function A(){if(this.value||this.from)try{let e="";if(this.value)e=this.value;else if(this.from){const t=("getRootNode"in Element.prototype?c(this,w).getRootNode({composed:!0}):c(this,w).ownerDocument).querySelector(this.from);if(!t)return;e=t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement?t.value:t instanceof HTMLAnchorElement&&t.hasAttribute("href")?t.href:t.textContent}await navigator.clipboard.writeText(e),this.dispatchEvent(new CustomEvent("clipboard-copy:success",{bubbles:!0,composed:!0,detail:{value:e}}))}catch(e){this.dispatchEvent(new CustomEvent("clipboard-copy:error",{bubbles:!0,composed:!0,detail:{error:e}}))}}function x(){return c(this,g)?c(this,g).assignedElements({flatten:!0}).find((e=>"BUTTON"===e.nodeName||"button"===e.getAttribute("slot"))):null}function O(e){if(Object.prototype.hasOwnProperty.call(this,e)){const t=this[e];delete this[e],this[e]=t}}function L(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}function M(e,t){return function(e,t){return t.get?t.get.call(e):t.value}(e,L(e,t,"get"))}function I(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function N(e,t,n){I(e,t),t.set(e,n)}function R(e,t,n){return function(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}(e,L(e,t,"set"),n),n}function W(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}function j(e,t){I(e,t),t.add(e)}C.defineCustomElement(),v={},b=function(){return V},Object.defineProperty(v,"ResizeObserverElement",{get:b,set:undefined,enumerable:!0,configurable:!0});const P=document.createElement("template"),z=String.raw;P.innerHTML=z`
  <style>:host { display: contents; }</style>
  <slot></slot>
`;var B=new WeakMap,_=new WeakMap,D=new WeakMap,q=new WeakSet,F=new WeakSet,H=new WeakMap,U=new WeakSet;class V extends HTMLElement{static get observedAttributes(){return["disabled"]}attributeChangedCallback(e,t,n){"disabled"===e&&t!==n&&(this.disabled?W(this,F,J).call(this):W(this,q,$).call(this))}connectedCallback(){W(this,U,K).call(this,"disabled"),"ResizeObserver"in window&&(R(this,_,new ResizeObserver((e=>{this.dispatchEvent(new CustomEvent("resize-observer:resize",{bubbles:!0,composed:!0,detail:{entries:e}}))}))),this.disabled||W(this,q,$).call(this),M(this,B).addEventListener("slotchange",M(this,H)))}disconnectedCallback(){W(this,F,J).call(this),M(this,B).removeEventListener("slotchange",M(this,H))}get disabled(){return this.hasAttribute("disabled")}set disabled(e){e?this.setAttribute("disabled",""):this.removeAttribute("disabled")}static defineCustomElement(e="resize-observer"){"undefined"==typeof window||window.customElements.get(e)||window.customElements.define(e,V)}constructor(){super(),j(this,q),j(this,F),j(this,U),N(this,B,{writable:!0,value:void 0}),N(this,_,{writable:!0,value:void 0}),N(this,D,{writable:!0,value:void 0}),N(this,H,{writable:!0,value:()=>{this.disabled||W(this,q,$).call(this)}}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(P.content.cloneNode(!0))),R(this,B,this.shadowRoot.querySelector("slot")),R(this,_,null),R(this,D,[])}}function $(){M(this,B)&&M(this,_)&&(M(this,D).forEach((e=>M(this,_).unobserve(e))),R(this,D,[]),M(this,B).assignedElements().forEach((e=>{M(this,_).observe(e),M(this,D).push(e)})))}function J(){M(this,_)&&M(this,_).disconnect()}function K(e){if(Object.prototype.hasOwnProperty.call(this,e)){const t=this[e];delete this[e],this[e]=t}}function G(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}function X(e,t){return n=e,(i=G(e,t,"get")).get?i.get.call(n):i.value;var n,i}function Q(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function Y(e,t,n){Q(e,t),t.set(e,n)}function Z(e,t,n){return function(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}(e,G(e,t,"set"),n),n}function ee(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}function te(e,t){Q(e,t),t.add(e)}V.defineCustomElement();const ne=document.createElement("template"),ie=String.raw;ne.innerHTML=ie`
  <style>
    :host {
      all: initial;
      display: block;
      box-sizing: border-box;
    }
    :host *,
    :host *::before,
    :host *::after {
      box-sizing: inherit;
    }
    :host video {
      display: block;
    }
    :host #output:empty {
      display: none;
    }
    [hidden] {
      display: none !important;
    }
  </style>
  <video part="video" playsinline></video>
  <canvas hidden></canvas>
  <div part="actions-container">
    <slot name="capture-button">
      <button part="capture-button" type="button"><slot name="capture-button-content">Capture photo</slot></button>
    </slot>
    <slot name="facing-mode-button"><button part="facing-mode-button" type="button"><slot name="facing-mode-button-content">Toggle facing mode</slot></button></slot>
  </div>
  <div part="output-container" id="output"></div>
`;var oe=new WeakMap,re=new WeakMap,se=new WeakMap,ae=new WeakMap,ce=new WeakMap,le=new WeakMap,de=new WeakMap,ue=new WeakMap,he=new WeakMap,me=new WeakMap,pe=new WeakSet,fe=new WeakSet,ve=new WeakMap,be=new WeakMap,ge=new WeakMap,we=new WeakSet,ye=new WeakSet,Ee=new WeakMap,ke=new WeakMap,Se=new WeakSet,Te=new WeakSet,Ce=new WeakSet;class Ae extends HTMLElement{connectedCallback(){if(ee(this,Ce,Re).call(this,"noImage"),ee(this,Ce,Re).call(this,"facingMode"),ee(this,Ce,Re).call(this,"cameraResolution"),ee(this,Ce,Re).call(this,"zoom"),Z(this,oe,!0),Z(this,ae,this.shadowRoot.querySelector("canvas")),Z(this,ce,this.shadowRoot.getElementById("output")),Z(this,le,this.shadowRoot.querySelector("video")),X(this,le)&&X(this,le).addEventListener("loadedmetadata",X(this,ge)),Z(this,de,this.shadowRoot.querySelector('slot[name="capture-button"]')),X(this,de)&&X(this,de).addEventListener("slotchange",X(this,Ee)),Z(this,ue,ee(this,Te,Ne).call(this)),X(this,ue)&&X(this,ue).addEventListener("click",X(this,be)),Z(this,he,this.shadowRoot.querySelector('slot[name="facing-mode-button"]')),X(this,he)&&X(this,he).addEventListener("slotchange",X(this,ke)),Z(this,me,ee(this,Se,Ie).call(this)),X(this,me)&&(X(this,re).facingMode?X(this,me).addEventListener("click",X(this,ve)):X(this,me).hidden=!0),!Ae.isSupported())return this.dispatchEvent(new CustomEvent("capture-photo:error",{bubbles:!0,composed:!0,detail:{error:{name:"NotSupportedError",message:"Not supported"}}}));ee(this,fe,Oe).call(this)}disconnectedCallback(){ee(this,pe,xe).call(this),X(this,me)&&X(this,me).removeEventListener("click",X(this,ve)),X(this,ue)&&X(this,ue).removeEventListener("click",X(this,be)),X(this,le)&&X(this,le).removeEventListener("canplay",X(this,ge)),X(this,de)&&X(this,de).removeEventListener("slotchange",X(this,Ee)),X(this,he)&&X(this,he).removeEventListener("slotchange",X(this,ke))}attributeChangedCallback(e,t,n){X(this,oe)&&("no-image"===e&&ee(this,we,Le).call(this),"facing-mode"===e&&X(this,re).facingMode&&t!==n&&(ee(this,pe,xe).call(this),ee(this,fe,Oe).call(this),this.dispatchEvent(new CustomEvent("capture-photo:facing-mode-change",{bubbles:!0,composed:!0,detail:{facingMode:n}}))),"camera-resolution"===e&&t!==n&&(ee(this,pe,xe).call(this),ee(this,fe,Oe).call(this),this.dispatchEvent(new CustomEvent("capture-photo:camera-resolution-change",{bubbles:!0,composed:!0,detail:{cameraResolution:n}}))),"zoom"===e&&t!==n&&(ee(this,ye,Me).call(this,this.zoom),this.dispatchEvent(new CustomEvent("capture-photo:zoom-change",{bubbles:!0,composed:!0,detail:{zoom:this.zoom}}))))}static get observedAttributes(){return["no-image","facing-mode","camera-resolution","zoom"]}get noImage(){return this.hasAttribute("no-image")}set noImage(e){e?this.setAttribute("no-image",""):this.removeAttribute("no-image")}get facingMode(){return this.getAttribute("facing-mode")}set facingMode(e){this.setAttribute("facing-mode",e)}get cameraResolution(){return this.getAttribute("camera-resolution")}set cameraResolution(e){this.setAttribute("camera-resolution",e)}get zoom(){return Number(this.getAttribute("zoom"))||null}set zoom(e){const t=Number(e)||0;this.setAttribute("zoom",t>0?Math.floor(t):0)}get loading(){return this.hasAttribute("loading")}capture(){if(!this.loading)try{const e=X(this,ae).getContext("2d"),t=X(this,le).videoWidth,n=X(this,le).videoHeight;X(this,ae).width=t,X(this,ae).height=n,e.drawImage(X(this,le),0,0,t,n);const i=X(this,ae).toDataURL("image/png");if("string"==typeof i&&i.includes("data:image")){if(!this.noImage){const e=new Image;e.src=i,e.width=t,e.height=n,e.part="output-image",ee(this,we,Le).call(this),X(this,ce)&&X(this,ce).appendChild(e)}this.dispatchEvent(new CustomEvent("capture-photo:success",{bubbles:!0,composed:!0,detail:{dataURI:i,width:t,height:n}}))}}catch(e){this.dispatchEvent(new CustomEvent("capture-photo:error",{bubbles:!0,composed:!0,detail:{error:e}}))}}static isSupported(){return Boolean(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)}static defineCustomElement(e="capture-photo"){"undefined"==typeof window||window.customElements.get(e)||window.customElements.define(e,Ae)}constructor(){super(),te(this,pe),te(this,fe),te(this,we),te(this,ye),te(this,Se),te(this,Te),te(this,Ce),Y(this,oe,{writable:!0,value:void 0}),Y(this,re,{writable:!0,value:void 0}),Y(this,se,{writable:!0,value:void 0}),Y(this,ae,{writable:!0,value:void 0}),Y(this,ce,{writable:!0,value:void 0}),Y(this,le,{writable:!0,value:void 0}),Y(this,de,{writable:!0,value:void 0}),Y(this,ue,{writable:!0,value:void 0}),Y(this,he,{writable:!0,value:void 0}),Y(this,me,{writable:!0,value:void 0}),Y(this,ve,{writable:!0,value:e=>{e.preventDefault(),this.loading||(this.facingMode="user"!==this.facingMode&&this.facingMode?"user":"environment")}}),Y(this,be,{writable:!0,value:e=>{e.preventDefault(),this.capture()}}),Y(this,ge,{writable:!0,value:e=>{const t=e.target;t.play().then((()=>{this.dispatchEvent(new CustomEvent("capture-photo:video-play",{bubbles:!0,composed:!0,detail:{video:t}}))})).catch((e=>{this.dispatchEvent(new CustomEvent("capture-photo:error",{bubbles:!0,composed:!0,detail:{error:e}}))})).finally((()=>{this.removeAttribute("loading")}))}}),Y(this,Ee,{writable:!0,value:e=>{e.target&&"capture-button"===e.target.name&&(X(this,ue)&&X(this,ue).removeEventListener("click",X(this,be)),Z(this,ue,ee(this,Te,Ne).call(this)),X(this,ue)&&(X(this,ue).addEventListener("click",X(this,be)),"BUTTON"===X(this,ue).nodeName||X(this,ue).hasAttribute("role")||X(this,ue).setAttribute("role","button")))}}),Y(this,ke,{writable:!0,value:e=>{e.target&&"facing-mode-button"===e.target.name&&(X(this,me)&&X(this,me).removeEventListener("click",X(this,ve)),Z(this,me,ee(this,Se,Ie).call(this)),X(this,me)&&(X(this,me).addEventListener("click",X(this,ve)),"BUTTON"===X(this,me).nodeName||X(this,me).hasAttribute("role")||X(this,me).setAttribute("role","button")))}}),Z(this,oe,!1),Z(this,re,Ae.isSupported()?navigator.mediaDevices.getSupportedConstraints():{}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(ne.content.cloneNode(!0)))}}function xe(){if(!X(this,le)||!X(this,se))return;const[e]=X(this,se).getVideoTracks();e&&e.stop(),X(this,le).srcObject=null,Z(this,se,null)}function Oe(){if(!Ae.isSupported())return;this.setAttribute("loading","");const e={video:{facingMode:{ideal:this.facingMode||"user"}},audio:!1};if("string"==typeof this.cameraResolution){const[t,n]=this.cameraResolution.split("x");e.video.width=t,e.video.height=n}navigator.mediaDevices.getUserMedia(e).then((e=>{X(this,le).srcObject=e,Z(this,se,e),ee(this,ye,Me).call(this,this.zoom)})).catch((e=>{this.dispatchEvent(new CustomEvent("capture-photo:error",{bubbles:!0,composed:!0,detail:{error:e}}))})).finally((()=>{this.removeAttribute("loading")}))}function Le(){X(this,ce)&&Array.from(X(this,ce).childNodes).forEach((e=>e.remove()))}function Me(e){if(!X(this,se)||!e)return;const[t]=X(this,se).getVideoTracks();if("function"!=typeof t.getCapabilities||"function"!=typeof t.getSettings)return;const n=t.getCapabilities();var i,o,r;"zoom"in t.getSettings()&&t.applyConstraints({advanced:[{zoom:(i=Number(e),o=n.zoom.min,r=n.zoom.max,Number.isNaN(o)&&(o=0),Number.isNaN(r)&&(r=0),Math.min(Math.max(i,Math.min(o,r)),Math.max(o,r)))}]})}function Ie(){return X(this,he)?X(this,he).assignedElements({flatten:!0}).find((e=>"BUTTON"===e.nodeName||"facing-mode-button"===e.getAttribute("slot"))):null}function Ne(){return X(this,de)?X(this,de).assignedElements({flatten:!0}).find((e=>"BUTTON"===e.nodeName||"capture-button"===e.getAttribute("slot"))):null}function Re(e){if(Object.prototype.hasOwnProperty.call(this,e)){const t=this[e];delete this[e],this[e]=t}}
/*!
 * @georapbox/web-storage
 * WebStorage is a JavaScript library that improves the way you work with localStorage or sessionStorage using a simple, localStorage-like API. It allows developers to store many types of data instead of just strings.
 *
 * @version v2.1.0
 * @author George Raptis <georapbox@gmail.com>
 * @homepage https://github.com/georapbox/web-storage#readme
 * @repository https://github.com/georapbox/web-storage.git
 * @license MIT
 */function We(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function je(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function Pe(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ze(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function Be(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ze(Object(n),!0).forEach((function(t){Pe(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ze(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function _e(e){return String.prototype.trim?e.trim():e.replace(/(^\s*|\s*$)/g,"")}function De(e,t){return 0===e.indexOf(t)?e.slice(t.length):e}function qe(e){return null!=e&&("string"==typeof e||"[object String]"===Object.prototype.toString.call(e))}function Fe(e){var t=Object.prototype.toString.call(e);return"[object AsyncFunction]"===t||"[object Function]"===t||"[object GeneratorFunction]"===t}function He(e,t){var n=e._driver;Object.keys(n).forEach((function(i){(function(e,t){var n,i;return n=t,i=e._keyPrefix,n.substr(0,i.length)===i})(e,i)&&t(i,n[i])}))}var Ue=function(){},Ve={getItem:Ue,setItem:Ue,removeItem:Ue};function $e(e){try{var t=window[e],n="__web-storage__test";t.setItem(n,"test"),t.getItem(n),t.removeItem(n)}catch(e){return!1}return!0}function Je(e){return $e(e)?window[e]:(console&&console.warn&&console.warn("WebStorage failed to create sync storage; falling back to noop storage."),Ve)}var Ke=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};We(this,e);var n={driver:"localStorage",keyPrefix:"web-storage/"};if("localStorage"!==(t=Be(Be({},n),t)).driver&&"sessionStorage"!==t.driver)throw new Error('The "driver" option must be one of "localStorage" or "sessionStorage".');if(!qe(t.keyPrefix))throw new TypeError('The "keyPrefix" option must be a string.');this._storageType=t.driver,this._driver=Je(t.driver),this._keyPrefix=_e(t.keyPrefix)}var t;return t=[{key:"getItem",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};if(!qe(e))throw new TypeError("Failed to execute 'getItem' on 'Storage': The first argument must be a string.");var n=null;try{var i=this._driver.getItem(this._keyPrefix+e),o=JSON.parse(i);n=o}catch(e){t(e)}return n}},{key:"setItem",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};if(!qe(e))throw new TypeError("Failed to execute 'setItem' on 'Storage': The first argument must be a string.");e=this._keyPrefix+e,t=null==t||Fe(t)?null:t;try{this._driver.setItem(e,JSON.stringify(t))}catch(e){n(e)}}},{key:"removeItem",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};if(!qe(e))throw new TypeError("Failed to execute 'removeItem' on 'Storage': The first argument must be a string.");try{this._driver.removeItem(this._keyPrefix+e)}catch(e){t(e)}}},{key:"clear",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};try{He(this,this._driver.removeItem.bind(this._driver))}catch(t){e(t)}}},{key:"keys",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){},n=[];try{return He(this,(function(t){return n.push(De(t,e._keyPrefix))})),n}catch(e){t(e)}}},{key:"length",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};try{return this.keys().length}catch(t){e(t)}}},{key:"iterate",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};if(!Fe(e))throw new TypeError("Failed to iterate on 'Storage': 'iteratorCallback' must be a function.");try{He(this,(function(n,i){var o=De(n,t._keyPrefix),r=JSON.parse(i);e.call(t,r,o)}))}catch(e){n(e)}}}],je(e.prototype,t),e}();Ke.isAvailable=function(e){return $e(e)},Ke.createInstance=function(e){return new Ke(e)};const Ge=Ke.createInstance({driver:"localStorage",keyPrefix:"barcode-scanner/"}),Xe="settings",Qe=(e,t)=>{if("function"!=typeof e)throw new TypeError("Expected a function for first argument");if("number"!=typeof t)throw new TypeError("Expected a number for second argument");return(...n)=>{const i=t>0?t:0;return e(...n.slice(0,i))}},Ye=document.getElementById("toastContainer"),Ze=e=>{const t=e.currentTarget;t.removeEventListener("click",Ze),Ye.removeChild(t.parentNode)},et=(e="",t="info")=>{["info","warning","danger"].includes(t)||(t="info");const n=`\n    ${e}\n    <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n      <span aria-hidden="true">&times;</span>\n    </button>\n  `,i=document.createElement("div");i.className=`alert alert-${t} alert-dismissible text-break`,i.innerHTML=n,i.querySelector("button").addEventListener("click",Ze),Ye.appendChild(i),setTimeout((()=>i.classList.add("show")),100)};!async function(){const e=["image/jpg","image/jpeg","image/png","image/apng","image/gif","image/webp","image/avif"],t=document.querySelector("capture-photo"),n=document.getElementById("cameraResults"),i=document.getElementById("fileResults"),o=document.getElementById("scanInstructions"),r=document.getElementById("scanBtn"),a=document.getElementById("scanMethod"),c=document.getElementById("fileInput"),l=document.getElementById("dropzone"),d=document.getElementById("cameraView"),u=document.getElementById("fileView"),h=document.querySelector("resize-observer"),m=document.getElementById("scanFrame"),p=document.getElementById("settingsBtn"),f=document.getElementById("settingsDialog"),v=document.forms["settings-form"];let b,g=!0;if(!("BarcodeDetector"in window))try{window.BarcodeDetector=(await s("1VDWK")).default}catch(e){return d.hidden=!0,u.hidden=!0,a.hidden=!0,p.hidden=!0,et("BarcodeDetector API is not supported by your browser.","danger")}const w=(()=>{const e=new(window.AudioContext||window.webkitAudioContext||window.audioContext);if(e)return(t,n,i,o,r)=>{var s;if(!(null===(s=Ge.getItem(Xe))||void 0===s?void 0:s.beep))return;const a=e.createOscillator(),c=e.createGain();a.connect(c),c.connect(e.destination),i&&(c.gain.value=i),n&&(a.frequency.value=n),o&&(a.type=o),"function"==typeof r&&(a.onended=r),a.start(e.currentTime),a.stop(e.currentTime+(t||500)/1e3)}})();function y(e=100){var t;if("function"==typeof window.navigator.vibrate&&(null===(t=Ge.getItem(Xe))||void 0===t?void 0:t.vibrate))try{window.navigator.vibrate(e)}catch{}}function E(e){if(!e)return;const t=e.getBoundingClientRect();m.style.cssText=`width: ${t.width}px; height: ${t.height}px`}t.addEventListener("capture-photo:video-play",(e=>{m.hidden=!1,E(e.detail.video),x()}),{once:!0}),Ae.defineCustomElement(),c.accept=e.join(",");const k=t.shadowRoot.querySelector("video"),S=new window.BarcodeDetector({formats:await window.BarcodeDetector.getSupportedFormats()});function T(e){e.querySelectorAll(".results__item").forEach((e=>e.remove()))}function C(e,t){if(!e)return;let n;try{var i;new URL(e),n=document.createElement("a"),n.href=e,n.setAttribute("target","_blank"),n.setAttribute("rel","noreferrer noopener"),(null===(i=Ge.getItem(Xe))||void 0===i?void 0:i.openWebPage)&&n.click()}catch(e){n=document.createElement("span")}n.className="results__item",n.textContent=e,t.appendChild(n);const o=t.querySelector("clipboard-copy");o&&(o.disabled="-"===e)}function A(e){return new Promise(((t,n)=>{S.detect(e).then((e=>{Array.isArray(e)&&e.length>0?t(e[0]):n({message:"Could not detect barcode from provided source."})})).catch((e=>{n(e)}))}))}async function x(){o.hidden=!1;try{const e=await A(k);return window.cancelAnimationFrame(b),T(n),C(e.rawValue,n),o.hidden=!0,r.hidden=!1,m.hidden=!0,w(200,860,.03,"square"),void y()}catch(e){}g&&(b=window.requestAnimationFrame(Qe(x,0)))}function O(e){const t=new Image,n=new FileReader;n.addEventListener("load",(e=>{const n=e.target.result;t.addEventListener("load",(async()=>{try{const e=await A(t);T(i),C(e.rawValue,i),w(200,860,.03,"square"),y()}catch(e){T(i),C("-",i)}})),t.src=n,l.querySelectorAll("img").forEach((e=>e.remove())),l.prepend(t)})),e&&n.readAsDataURL(e)}Object.entries(Ge.getItem(Xe)||{}).forEach((([e,t])=>{const n=v.querySelector(`[name="${e}"]`);n&&(n.checked=t)})),document.addEventListener("capture-photo:error",(e=>{t.hidden=!0,d.hidden=!0,u.hidden=!1,a.hidden=!0;const n=e.detail.error;if("NotFoundError"===n.name)return;const i="NotAllowedError"===n.name?"Permission to use webcam was denied. Reload the page to give appropriate permissions to webcam.":n.message;et(i,"danger")}),{once:!0}),r.addEventListener("click",(()=>{r.hidden=!0,m.hidden=!1,T(n),x()})),a.addEventListener("change",(e=>{const i=e.target.value;[d,u].forEach((e=>{e.hidden=e.id!==i})),"cameraView"===i&&(g=!0,t.hidden||t.loading||n.querySelector(".results__item")||x()),"fileView"===i&&(g=!1)})),c.addEventListener("change",(e=>{O(e.target.files[0])})),l.addEventListener("dragover",(e=>{e.stopPropagation(),e.preventDefault(),e.dataTransfer.dropEffect="copy"})),l.addEventListener("drop",(t=>{t.stopPropagation(),t.preventDefault();const n=t.dataTransfer.files,[i]=n;i&&e.includes(i.type)&&(c.value=c.defaultValue,O(i))})),h.addEventListener("resize-observer:resize",(()=>{E(t.shadowRoot.querySelector("video"))})),p.addEventListener("click",(()=>{f.showModal()})),f.addEventListener("click",(e=>{e.target===e.currentTarget&&f.close()})),v.addEventListener("change",(e=>{const t={};e.currentTarget.querySelectorAll('input[type="checkbox"]').forEach((e=>t[e.name]=e.checked)),Ge.setItem(Xe,t)}))}()}();
//# sourceMappingURL=index.2e652029.js.map