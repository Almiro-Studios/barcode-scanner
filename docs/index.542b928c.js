!function(){function t(t,e,i,n){Object.defineProperty(t,e,{get:i,set:n,enumerable:!0,configurable:!0})}var e,i,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},r={},a=n.parcelRequirea202;function s(t,e,i){if(!e.has(t))throw new TypeError("attempted to "+i+" private field on non-instance");return e.get(t)}function l(t,e){return function(t,e){return e.get?e.get.call(t):e.value}(t,s(t,e,"get"))}function c(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}function d(t,e,i){c(t,e),e.set(t,i)}function u(t,e,i){return function(t,e,i){if(e.set)e.set.call(t,i);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=i}}(t,s(t,e,"set"),i),i}function h(t,e,i){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return i}function v(t,e){c(t,e),e.add(t)}null==a&&((a=function(t){if(t in o)return o[t].exports;if(t in r){var e=r[t];delete r[t];var i={id:t,exports:{}};return o[t]=i,e.call(i.exports,i,i.exports),i.exports}var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(t,e){r[t]=e},n.parcelRequirea202=a),a.register("iE7OH",(function(e,i){var n,o;t(e.exports,"register",(function(){return n}),(function(t){return n=t})),t(e.exports,"resolve",(function(){return o}),(function(t){return o=t}));var r={};n=function(t){for(var e=Object.keys(t),i=0;i<e.length;i++)r[e[i]]=t[e[i]]},o=function(t){var e=r[t];if(null==e)throw new Error("Could not resolve bundle with id "+t);return e}})),a.register("1VDWK",(function(t,e){t.exports=a("4WKyX")(a("aNJCr").getBundleURL("8tAhj")+a("iE7OH").resolve("8yRFr")).then((()=>a("hGsRb")))})),a.register("4WKyX",(function(t,e){"use strict";var i=a("2prpb");t.exports=i((function(t){return new Promise((function(e,i){var n=document.getElementsByTagName("script");if([].concat(n).some((function(e){return e.src===t})))e();else{var o=document.createElement("link");o.href=t,o.rel="preload",o.as="script",document.head.appendChild(o);var r=document.createElement("script");r.async=!0,r.type="text/javascript",r.src=t,r.onerror=function(e){var n=new TypeError("Failed to fetch dynamically imported module: ".concat(t,". Error: ").concat(e.message));r.onerror=r.onload=null,r.remove(),i(n)},r.onload=function(){r.onerror=r.onload=null,e()},document.getElementsByTagName("head")[0].appendChild(r)}}))}))})),a.register("2prpb",(function(t,e){"use strict";var i={},n={},o={};function r(t){switch(t){case"preload":return n;case"prefetch":return o;default:return i}}t.exports=function(t,e){return function(i){var n=r(e);return n[i]?n[i]:n[i]=t.apply(null,arguments).catch((function(t){throw delete n[i],t}))}}})),a.register("aNJCr",(function(e,i){var n;t(e.exports,"getBundleURL",(function(){return n}),(function(t){return n=t}));var o={};function r(t){return(""+t).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}n=function(t){var e=o[t];return e||(e=function(){try{throw new Error}catch(e){var t=(""+e.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);if(t)return r(t[2])}return"/"}(),o[t]=e),e}})),a("iE7OH").register(JSON.parse('{"8tAhj":"index.542b928c.js","8yRFr":"barcode-detector.module.2b61079d.js"}')),e={},i=function(){return C},Object.defineProperty(e,"ClipboardCopy",{get:i,set:undefined,enumerable:!0,configurable:!0});const m=document.createElement("template"),p=String.raw;m.innerHTML=p`
  <slot name="button"><button type="button" part="button"><slot name="button-content">Copy</slot></button></slot>
`;var f,g,b=new WeakMap,w=new WeakMap,y=new WeakSet,E=new WeakSet,k=new WeakMap,T=new WeakMap,S=new WeakSet;class C extends HTMLElement{static get observedAttributes(){return["disabled"]}connectedCallback(){h(this,S,O).call(this,"value"),h(this,S,O).call(this,"from"),h(this,S,O).call(this,"disabled"),l(this,b)&&l(this,b).addEventListener("slotchange",l(this,T)),l(this,w)&&l(this,w).addEventListener("click",l(this,k))}disconnectedCallback(){l(this,b).removeEventListener("slotchange",l(this,T)),l(this,w)&&l(this,w).removeEventListener("click",l(this,k))}attributeChangedCallback(t){"disabled"===t&&l(this,w)&&(l(this,w).disabled=this.disabled,l(this,w).setAttribute("aria-disabled",this.disabled),l(this,w).part&&l(this,w).part.contains("button")&&l(this,w).part.toggle("button--disabled",this.disabled))}get disabled(){return this.hasAttribute("disabled")}set disabled(t){t?this.setAttribute("disabled",""):this.removeAttribute("disabled")}get value(){return this.getAttribute("value")}set value(t){this.setAttribute("value",t)}get from(){return this.getAttribute("from")}set from(t){this.setAttribute("from",t)}static defineCustomElement(t="clipboard-copy"){"undefined"==typeof window||window.customElements.get(t)||window.customElements.define(t,C)}constructor(){super(),v(this,y),v(this,E),v(this,S),d(this,b,{writable:!0,value:void 0}),d(this,w,{writable:!0,value:void 0}),d(this,k,{writable:!0,value:t=>{t.preventDefault(),this.disabled||(this.dispatchEvent(new Event("clipboard-copy:click",{bubbles:!0,composed:!0})),h(this,y,x).call(this))}}),d(this,T,{writable:!0,value:t=>{t.target&&"button"===t.target.name&&(l(this,w)&&l(this,w).removeEventListener("click",l(this,k)),u(this,w,h(this,E,A).call(this)),l(this,w)&&(l(this,w).addEventListener("click",l(this,k)),"BUTTON"===l(this,w).nodeName||l(this,w).hasAttribute("role")||l(this,w).setAttribute("role","button")))}}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(m.content.cloneNode(!0))),u(this,b,this.shadowRoot.querySelector('slot[name="button"]')),u(this,w,h(this,E,A).call(this))}}async function x(){if(this.value||this.from)try{let t="";if(this.value)t=this.value;else if(this.from){const e=("getRootNode"in Element.prototype?l(this,w).getRootNode({composed:!0}):l(this,w).ownerDocument).querySelector(this.from);if(!e)return;t=e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement?e.value:e instanceof HTMLAnchorElement&&e.hasAttribute("href")?e.href:e.textContent}await navigator.clipboard.writeText(t),this.dispatchEvent(new CustomEvent("clipboard-copy:success",{bubbles:!0,composed:!0,detail:{value:t}}))}catch(t){this.dispatchEvent(new CustomEvent("clipboard-copy:error",{bubbles:!0,composed:!0,detail:{error:t}}))}}function A(){return l(this,b)?l(this,b).assignedElements({flatten:!0}).find((t=>"BUTTON"===t.nodeName||"button"===t.getAttribute("slot"))):null}function O(t){if(Object.prototype.hasOwnProperty.call(this,t)){const e=this[t];delete this[t],this[t]=e}}function L(t,e,i){if(!e.has(t))throw new TypeError("attempted to "+i+" private field on non-instance");return e.get(t)}function M(t,e){return function(t,e){return e.get?e.get.call(t):e.value}(t,L(t,e,"get"))}function I(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}function N(t,e,i){I(t,e),e.set(t,i)}function R(t,e,i){return function(t,e,i){if(e.set)e.set.call(t,i);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=i}}(t,L(t,e,"set"),i),i}function z(t,e,i){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return i}function W(t,e){I(t,e),e.add(t)}C.defineCustomElement(),f={},g=function(){return V},Object.defineProperty(f,"ResizeObserverElement",{get:g,set:undefined,enumerable:!0,configurable:!0});const j=document.createElement("template"),P=String.raw;j.innerHTML=P`
  <style>:host { display: contents; }</style>
  <slot></slot>
`;var B=new WeakMap,_=new WeakMap,D=new WeakMap,q=new WeakSet,F=new WeakSet,H=new WeakMap,U=new WeakSet;class V extends HTMLElement{static get observedAttributes(){return["disabled"]}attributeChangedCallback(t,e,i){"disabled"===t&&e!==i&&(this.disabled?z(this,F,J).call(this):z(this,q,$).call(this))}connectedCallback(){z(this,U,K).call(this,"disabled"),"ResizeObserver"in window&&(R(this,_,new ResizeObserver((t=>{this.dispatchEvent(new CustomEvent("resize-observer:resize",{bubbles:!0,composed:!0,detail:{entries:t}}))}))),this.disabled||z(this,q,$).call(this),M(this,B).addEventListener("slotchange",M(this,H)))}disconnectedCallback(){z(this,F,J).call(this),M(this,B).removeEventListener("slotchange",M(this,H))}get disabled(){return this.hasAttribute("disabled")}set disabled(t){t?this.setAttribute("disabled",""):this.removeAttribute("disabled")}static defineCustomElement(t="resize-observer"){"undefined"==typeof window||window.customElements.get(t)||window.customElements.define(t,V)}constructor(){super(),W(this,q),W(this,F),W(this,U),N(this,B,{writable:!0,value:void 0}),N(this,_,{writable:!0,value:void 0}),N(this,D,{writable:!0,value:void 0}),N(this,H,{writable:!0,value:()=>{this.disabled||z(this,q,$).call(this)}}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(j.content.cloneNode(!0))),R(this,B,this.shadowRoot.querySelector("slot")),R(this,_,null),R(this,D,[])}}function $(){M(this,B)&&M(this,_)&&(M(this,D).forEach((t=>M(this,_).unobserve(t))),R(this,D,[]),M(this,B).assignedElements().forEach((t=>{M(this,_).observe(t),M(this,D).push(t)})))}function J(){M(this,_)&&M(this,_).disconnect()}function K(t){if(Object.prototype.hasOwnProperty.call(this,t)){const e=this[t];delete this[t],this[t]=e}}function G(t,e,i){if(!e.has(t))throw new TypeError("attempted to "+i+" private field on non-instance");return e.get(t)}function X(t,e){return i=t,(n=G(t,e,"get")).get?n.get.call(i):n.value;var i,n}function Q(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}function Y(t,e,i){Q(t,e),e.set(t,i)}function Z(t,e,i){return function(t,e,i){if(e.set)e.set.call(t,i);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=i}}(t,G(t,e,"set"),i),i}function tt(t,e,i){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return i}function et(t,e){Q(t,e),e.add(t)}V.defineCustomElement();const it=document.createElement("template"),nt=String.raw;it.innerHTML=nt`
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
    <slot name="facing-mode-button" hidden><button part="facing-mode-button" type="button"><slot name="facing-mode-button-content">Toggle facing mode</slot></button></slot>
  </div>
  <div part="output-container" id="output"></div>
`;var ot=new WeakMap,rt=new WeakMap,at=new WeakMap,st=new WeakMap,lt=new WeakMap,ct=new WeakMap,dt=new WeakMap,ut=new WeakMap,ht=new WeakMap,vt=new WeakMap,mt=new WeakSet,pt=new WeakSet,ft=new WeakMap,gt=new WeakMap,bt=new WeakMap,wt=new WeakSet,yt=new WeakSet,Et=new WeakMap,kt=new WeakMap,Tt=new WeakSet,St=new WeakSet,Ct=new WeakSet;class xt extends HTMLElement{connectedCallback(){var t,e,i,n,o;if(tt(this,Ct,Rt).call(this,"noImage"),tt(this,Ct,Rt).call(this,"facingMode"),tt(this,Ct,Rt).call(this,"cameraResolution"),tt(this,Ct,Rt).call(this,"pan"),tt(this,Ct,Rt).call(this,"tilt"),tt(this,Ct,Rt).call(this,"zoom"),Z(this,ot,!0),Z(this,st,this.shadowRoot.querySelector("canvas")),Z(this,lt,this.shadowRoot.getElementById("output")),Z(this,ct,this.shadowRoot.querySelector("video")),Z(this,dt,this.shadowRoot.querySelector('slot[name="capture-button"]')),Z(this,ut,tt(this,St,Nt).call(this)),Z(this,ht,this.shadowRoot.querySelector('slot[name="facing-mode-button"]')),Z(this,vt,tt(this,Tt,It).call(this)),null===(t=X(this,ct))||void 0===t||t.addEventListener("loadedmetadata",X(this,bt)),null===(e=X(this,dt))||void 0===e||e.addEventListener("slotchange",X(this,Et)),null===(i=X(this,ut))||void 0===i||i.addEventListener("click",X(this,gt)),null===(n=X(this,ht))||void 0===n||n.addEventListener("slotchange",X(this,kt)),null===(o=X(this,vt))||void 0===o||o.addEventListener("click",X(this,ft)),!xt.isSupported())return this.dispatchEvent(new CustomEvent("capture-photo:error",{bubbles:!0,composed:!0,detail:{error:{name:"NotSupportedError",message:"Not supported"}}}));tt(this,pt,Ot).call(this)}disconnectedCallback(){var t,e,i,n,o;tt(this,mt,At).call(this),null===(t=X(this,vt))||void 0===t||t.removeEventListener("click",X(this,ft)),null===(e=X(this,ut))||void 0===e||e.removeEventListener("click",X(this,gt)),null===(i=X(this,ct))||void 0===i||i.removeEventListener("canplay",X(this,bt)),null===(n=X(this,dt))||void 0===n||n.removeEventListener("slotchange",X(this,Et)),null===(o=X(this,ht))||void 0===o||o.removeEventListener("slotchange",X(this,kt))}static get observedAttributes(){return["no-image","facing-mode","camera-resolution","pan","tilt","zoom"]}attributeChangedCallback(t,e,i){var n,o,r,a;if(!X(this,ot))return;const s=this.getTrackCapabilities(),l=this.getTrackSettings();if("no-image"===t&&e!==i&&tt(this,wt,Lt).call(this),"facing-mode"===t&&e!==i&&(null===(n=X(this,rt))||void 0===n?void 0:n.facingMode)){const t=["user","environment"].includes(this.facingMode);(null==l?void 0:l.facingMode)&&t&&(tt(this,mt,At).call(this),tt(this,pt,Ot).call(this))}if("camera-resolution"===t&&e!==i){var c,d,u,h;const[t,e]=this.cameraResolution.split("x").map((t=>Number(t))),i=t>=(null==s||null===(c=s.width)||void 0===c?void 0:c.min)&&t<=(null==s||null===(d=s.width)||void 0===d?void 0:d.max),n=e>=(null==s||null===(u=s.height)||void 0===u?void 0:u.min)&&e<=(null==s||null===(h=s.height)||void 0===h?void 0:h.max);(null==l?void 0:l.width)&&(null==l?void 0:l.height)&&i&&n&&(tt(this,mt,At).call(this),tt(this,pt,Ot).call(this))}if("pan"===t&&e!==i&&(null===(o=X(this,rt))||void 0===o?void 0:o.pan)){var v,m;const t=this.pan>=(null==s||null===(v=s.pan)||void 0===v?void 0:v.min)&&this.pan<=(null==s||null===(m=s.pan)||void 0===m?void 0:m.max);(null==l?void 0:l.pan)&&t&&tt(this,yt,Mt).call(this,"pan",this.pan)}if("tilt"===t&&e!==i&&(null===(r=X(this,rt))||void 0===r?void 0:r.tilt)){var p,f;const t=this.tilt>=(null==s||null===(p=s.tilt)||void 0===p?void 0:p.min)&&this.tilt<=(null==s||null===(f=s.tilt)||void 0===f?void 0:f.max);(null==l?void 0:l.tilt)&&t&&tt(this,yt,Mt).call(this,"tilt",this.tilt)}if("zoom"===t&&e!==i&&(null===(a=X(this,rt))||void 0===a?void 0:a.zoom)){var g,b;const t=this.zoom>=(null==s||null===(g=s.zoom)||void 0===g?void 0:g.min)&&this.zoom<=(null==s||null===(b=s.zoom)||void 0===b?void 0:b.max);(null==l?void 0:l.zoom)&&t&&tt(this,yt,Mt).call(this,"zoom",this.zoom)}}get noImage(){return this.hasAttribute("no-image")}set noImage(t){t?this.setAttribute("no-image",""):this.removeAttribute("no-image")}get facingMode(){return this.getAttribute("facing-mode")}set facingMode(t){this.setAttribute("facing-mode",t)}get cameraResolution(){return this.getAttribute("camera-resolution")}set cameraResolution(t){this.setAttribute("camera-resolution",t)}get pan(){return Number(this.getAttribute("pan"))||null}set pan(t){this.setAttribute("pan",Number(t)||null)}get tilt(){return Number(this.getAttribute("tilt"))||null}set tilt(t){this.setAttribute("tilt",Number(t)||null)}get zoom(){return Number(this.getAttribute("zoom"))||null}set zoom(t){this.setAttribute("zoom",Number(t)||null)}get loading(){return this.hasAttribute("loading")}capture(){if(!this.loading)try{const e=X(this,st).getContext("2d"),i=X(this,ct).videoWidth,n=X(this,ct).videoHeight;X(this,st).width=i,X(this,st).height=n,e.drawImage(X(this,ct),0,0,i,n);const o=X(this,st).toDataURL("image/png");if("string"==typeof o&&o.includes("data:image")){if(!this.noImage){var t;const e=new Image;e.src=o,e.width=i,e.height=n,e.part="output-image",tt(this,wt,Lt).call(this),null===(t=X(this,lt))||void 0===t||t.appendChild(e)}this.dispatchEvent(new CustomEvent("capture-photo:success",{bubbles:!0,composed:!0,detail:{dataURI:o,width:i,height:n}}))}}catch(t){this.dispatchEvent(new CustomEvent("capture-photo:error",{bubbles:!0,composed:!0,detail:{error:t}}))}}getSupportedConstraints(){return xt.isSupported()&&navigator.mediaDevices.getSupportedConstraints()||{}}getTrackCapabilities(){if(!X(this,at))return{};const[t]=X(this,at).getVideoTracks();return t&&"function"==typeof t.getCapabilities&&t.getCapabilities()||{}}getTrackSettings(){if(!X(this,at))return{};const[t]=X(this,at).getVideoTracks();return t&&"function"==typeof t.getSettings&&t.getSettings()||{}}static isSupported(){var t;return Boolean(null===(t=navigator.mediaDevices)||void 0===t?void 0:t.getUserMedia)}static defineCustomElement(t="capture-photo"){"undefined"==typeof window||window.customElements.get(t)||window.customElements.define(t,xt)}constructor(){super(),et(this,mt),et(this,pt),et(this,wt),et(this,yt),et(this,Tt),et(this,St),et(this,Ct),Y(this,ot,{writable:!0,value:void 0}),Y(this,rt,{writable:!0,value:void 0}),Y(this,at,{writable:!0,value:void 0}),Y(this,st,{writable:!0,value:void 0}),Y(this,lt,{writable:!0,value:void 0}),Y(this,ct,{writable:!0,value:void 0}),Y(this,dt,{writable:!0,value:void 0}),Y(this,ut,{writable:!0,value:void 0}),Y(this,ht,{writable:!0,value:void 0}),Y(this,vt,{writable:!0,value:void 0}),Y(this,ft,{writable:!0,value:t=>{t.preventDefault(),this.loading||(this.facingMode="user"!==this.facingMode&&this.facingMode?"user":"environment")}}),Y(this,gt,{writable:!0,value:t=>{t.preventDefault(),this.capture()}}),Y(this,bt,{writable:!0,value:t=>{const e=t.target;e.play().then((()=>{this.dispatchEvent(new CustomEvent("capture-photo:video-play",{bubbles:!0,composed:!0,detail:{video:e}}))})).catch((t=>{this.dispatchEvent(new CustomEvent("capture-photo:error",{bubbles:!0,composed:!0,detail:{error:t}}))})).finally((()=>{this.removeAttribute("loading")}))}}),Y(this,Et,{writable:!0,value:t=>{var e,i;"capture-button"===(null===(e=t.target)||void 0===e?void 0:e.name)&&(null===(i=X(this,ut))||void 0===i||i.removeEventListener("click",X(this,gt)),Z(this,ut,tt(this,St,Nt).call(this)),X(this,ut)&&(X(this,ut).addEventListener("click",X(this,gt)),"BUTTON"===X(this,ut).nodeName||X(this,ut).hasAttribute("role")||X(this,ut).setAttribute("role","button")))}}),Y(this,kt,{writable:!0,value:t=>{var e,i;"facing-mode-button"===(null===(e=t.target)||void 0===e?void 0:e.name)&&(null===(i=X(this,vt))||void 0===i||i.removeEventListener("click",X(this,ft)),Z(this,vt,tt(this,Tt,It).call(this)),X(this,vt)&&(X(this,vt).addEventListener("click",X(this,ft)),"BUTTON"===X(this,vt).nodeName||X(this,vt).hasAttribute("role")||X(this,vt).setAttribute("role","button")))}}),Z(this,ot,!1),Z(this,rt,this.getSupportedConstraints()),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(it.content.cloneNode(!0)))}}function At(){if(!X(this,ct)||!X(this,at))return;const[t]=X(this,at).getVideoTracks();null==t||t.stop(),X(this,ct).srcObject=null,Z(this,at,null)}async function Ot(){if(!xt.isSupported())return;this.setAttribute("loading","");const t={video:{facingMode:{ideal:this.facingMode||"user"},pan:!0,tilt:!0,zoom:!0},audio:!1};if("string"==typeof this.cameraResolution){const[e,i]=this.cameraResolution.split("x").map((t=>Number(t)));t.video.width=e,t.video.height=i}try{var e;Z(this,at,await navigator.mediaDevices.getUserMedia(t)),X(this,ct).srcObject=X(this,at),tt(this,yt,Mt).call(this,"pan",this.pan),tt(this,yt,Mt).call(this,"tilt",this.tilt),tt(this,yt,Mt).call(this,"zoom",this.zoom),(null===(e=this.getTrackSettings())||void 0===e?void 0:e.facingMode)&&(X(this,ht).hidden=!1)}catch(t){this.dispatchEvent(new CustomEvent("capture-photo:error",{bubbles:!0,composed:!0,detail:{error:t}}))}finally{this.removeAttribute("loading")}}function Lt(){X(this,lt)&&Array.from(X(this,lt).childNodes).forEach((t=>t.remove()))}function Mt(t,e){var i,n,o;if(!X(this,at)||!t||!e)return;const[r]=X(this,at).getVideoTracks(),a=this.getTrackCapabilities();var s,l,c;(null===(i=this.getTrackSettings())||void 0===i?void 0:i[t])&&r.applyConstraints({advanced:[{[t]:(s=Number(e),l=null==a||null===(n=a[t])||void 0===n?void 0:n.min,c=null==a||null===(o=a[t])||void 0===o?void 0:o.max,Number.isNaN(l)&&(l=0),Number.isNaN(c)&&(c=0),Math.min(Math.max(s,Math.min(l,c)),Math.max(l,c)))}]})}function It(){return X(this,ht)?X(this,ht).assignedElements({flatten:!0}).find((t=>"BUTTON"===t.nodeName||"facing-mode-button"===t.getAttribute("slot"))):null}function Nt(){return X(this,dt)?X(this,dt).assignedElements({flatten:!0}).find((t=>"BUTTON"===t.nodeName||"capture-button"===t.getAttribute("slot"))):null}function Rt(t){if(Object.prototype.hasOwnProperty.call(this,t)){const e=this[t];delete this[t],this[t]=e}}
/*!
 * @georapbox/web-storage
 * WebStorage is a JavaScript library that improves the way you work with localStorage or sessionStorage using a simple, localStorage-like API. It allows developers to store many types of data instead of just strings.
 *
 * @version v2.1.0
 * @author George Raptis <georapbox@gmail.com>
 * @homepage https://github.com/georapbox/web-storage#readme
 * @repository https://github.com/georapbox/web-storage.git
 * @license MIT
 */function zt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Wt(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function jt(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function Pt(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function Bt(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?Pt(Object(i),!0).forEach((function(e){jt(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):Pt(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function _t(t){return String.prototype.trim?t.trim():t.replace(/(^\s*|\s*$)/g,"")}function Dt(t,e){return 0===t.indexOf(e)?t.slice(e.length):t}function qt(t){return null!=t&&("string"==typeof t||"[object String]"===Object.prototype.toString.call(t))}function Ft(t){var e=Object.prototype.toString.call(t);return"[object AsyncFunction]"===e||"[object Function]"===e||"[object GeneratorFunction]"===e}function Ht(t,e){var i=t._driver;Object.keys(i).forEach((function(n){(function(t,e){var i,n;return i=e,n=t._keyPrefix,i.substr(0,n.length)===n})(t,n)&&e(n,i[n])}))}var Ut=function(){},Vt={getItem:Ut,setItem:Ut,removeItem:Ut};function $t(t){try{var e=window[t],i="__web-storage__test";e.setItem(i,"test"),e.getItem(i),e.removeItem(i)}catch(t){return!1}return!0}function Jt(t){return $t(t)?window[t]:(console&&console.warn&&console.warn("WebStorage failed to create sync storage; falling back to noop storage."),Vt)}var Kt=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};zt(this,t);var i={driver:"localStorage",keyPrefix:"web-storage/"};if("localStorage"!==(e=Bt(Bt({},i),e)).driver&&"sessionStorage"!==e.driver)throw new Error('The "driver" option must be one of "localStorage" or "sessionStorage".');if(!qt(e.keyPrefix))throw new TypeError('The "keyPrefix" option must be a string.');this._storageType=e.driver,this._driver=Jt(e.driver),this._keyPrefix=_t(e.keyPrefix)}var e;return e=[{key:"getItem",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};if(!qt(t))throw new TypeError("Failed to execute 'getItem' on 'Storage': The first argument must be a string.");var i=null;try{var n=this._driver.getItem(this._keyPrefix+t),o=JSON.parse(n);i=o}catch(t){e(t)}return i}},{key:"setItem",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};if(!qt(t))throw new TypeError("Failed to execute 'setItem' on 'Storage': The first argument must be a string.");t=this._keyPrefix+t,e=null==e||Ft(e)?null:e;try{this._driver.setItem(t,JSON.stringify(e))}catch(t){i(t)}}},{key:"removeItem",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};if(!qt(t))throw new TypeError("Failed to execute 'removeItem' on 'Storage': The first argument must be a string.");try{this._driver.removeItem(this._keyPrefix+t)}catch(t){e(t)}}},{key:"clear",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};try{Ht(this,this._driver.removeItem.bind(this._driver))}catch(e){t(e)}}},{key:"keys",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){},i=[];try{return Ht(this,(function(e){return i.push(Dt(e,t._keyPrefix))})),i}catch(t){e(t)}}},{key:"length",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};try{return this.keys().length}catch(e){t(e)}}},{key:"iterate",value:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};if(!Ft(t))throw new TypeError("Failed to iterate on 'Storage': 'iteratorCallback' must be a function.");try{Ht(this,(function(i,n){var o=Dt(i,e._keyPrefix),r=JSON.parse(n);t.call(e,r,o)}))}catch(t){i(t)}}}],Wt(t.prototype,e),t}();Kt.isAvailable=function(t){return $t(t)},Kt.createInstance=function(t){return new Kt(t)};const Gt=Kt.createInstance({driver:"localStorage",keyPrefix:"barcode-scanner/"}),Xt="settings",Qt=(t,e)=>{if("function"!=typeof t)throw new TypeError("Expected a function for first argument");if("number"!=typeof e)throw new TypeError("Expected a number for second argument");return(...i)=>{const n=e>0?e:0;return t(...i.slice(0,n))}},Yt=document.getElementById("toastContainer"),Zt=t=>{const e=t.currentTarget;e.removeEventListener("click",Zt),Yt.removeChild(e.parentNode)},te=(t="",e="info")=>{["info","warning","danger"].includes(e)||(e="info");const i=`\n    ${t}\n    <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n      <span aria-hidden="true">&times;</span>\n    </button>\n  `,n=document.createElement("div");n.className=`alert alert-${e} alert-dismissible text-break`,n.innerHTML=i,n.querySelector("button").addEventListener("click",Zt),Yt.appendChild(n),setTimeout((()=>n.classList.add("show")),100)};!async function(){const t=["image/jpg","image/jpeg","image/png","image/apng","image/gif","image/webp","image/avif"],e=document.querySelector("capture-photo"),i=document.getElementById("cameraResults"),n=document.getElementById("fileResults"),o=document.getElementById("scanInstructions"),r=document.getElementById("scanBtn"),s=document.getElementById("scanMethod"),l=document.getElementById("fileInput"),c=document.getElementById("dropzone"),d=document.getElementById("cameraView"),u=document.getElementById("fileView"),h=document.querySelector("resize-observer"),v=document.getElementById("scanFrame"),m=document.getElementById("settingsBtn"),p=document.getElementById("settingsDialog"),f=document.forms["settings-form"];let g,b=!0;if(!("BarcodeDetector"in window))try{window.BarcodeDetector=(await a("1VDWK")).default}catch(t){return d.hidden=!0,u.hidden=!0,s.hidden=!0,m.hidden=!0,te("BarcodeDetector API is not supported by your browser.","danger")}const w=(()=>{const t=new(window.AudioContext||window.webkitAudioContext||window.audioContext);if(t)return(e,i,n,o,r)=>{var a;if(!(null===(a=Gt.getItem(Xt))||void 0===a?void 0:a.beep))return;const s=t.createOscillator(),l=t.createGain();s.connect(l),l.connect(t.destination),n&&(l.gain.value=n),i&&(s.frequency.value=i),o&&(s.type=o),"function"==typeof r&&(s.onended=r),s.start(t.currentTime),s.stop(t.currentTime+(e||500)/1e3)}})();function y(t=100){var e;if("function"==typeof window.navigator.vibrate&&(null===(e=Gt.getItem(Xt))||void 0===e?void 0:e.vibrate))try{window.navigator.vibrate(t)}catch{}}function E(t){if(!t)return;const e=t.getBoundingClientRect();v.style.cssText=`width: ${e.width}px; height: ${e.height}px`}e.addEventListener("capture-photo:video-play",(t=>{v.hidden=!1,E(t.detail.video),A();const i=e.getTrackSettings(),n=e.getTrackCapabilities();if((null==i?void 0:i.zoom)&&(null==n?void 0:n.zoom)){var o,r,a;const t=document.getElementById("zoomControl");t.parentElement.hidden=!1,t.min=null==n||null===(o=n.zoom)||void 0===o?void 0:o.min,t.max=null==n||null===(r=n.zoom)||void 0===r?void 0:r.max,t.step=null==n||null===(a=n.zoom)||void 0===a?void 0:a.step,t.value=null==i?void 0:i.zoom,t.addEventListener("input",(t=>e.zoom=t.target.value))}}),{once:!0}),xt.defineCustomElement(),l.accept=t.join(",");const k=e.shadowRoot.querySelector("video"),T=new window.BarcodeDetector({formats:await window.BarcodeDetector.getSupportedFormats()});function S(t){t.querySelectorAll(".results__item").forEach((t=>t.remove()))}function C(t,e){if(!t)return;let i;try{var n;new URL(t),i=document.createElement("a"),i.href=t,i.setAttribute("target","_blank"),i.setAttribute("rel","noreferrer noopener"),(null===(n=Gt.getItem(Xt))||void 0===n?void 0:n.openWebPage)&&i.click()}catch(t){i=document.createElement("span")}i.className="results__item",i.textContent=t,e.appendChild(i);const o=e.querySelector("clipboard-copy");o&&(o.disabled="-"===t)}function x(t){return new Promise(((e,i)=>{T.detect(t).then((t=>{Array.isArray(t)&&t.length>0?e(t[0]):i({message:"Could not detect barcode from provided source."})})).catch((t=>{i(t)}))}))}async function A(){o.hidden=!1;try{const t=await x(k);return window.cancelAnimationFrame(g),S(i),C(t.rawValue,i),o.hidden=!0,r.hidden=!1,v.hidden=!0,w(200,860,.03,"square"),void y()}catch(t){}b&&(g=window.requestAnimationFrame(Qt(A,0)))}function O(t){const e=new Image,i=new FileReader;i.addEventListener("load",(t=>{const i=t.target.result;e.addEventListener("load",(async()=>{try{const t=await x(e);S(n),C(t.rawValue,n),w(200,860,.03,"square"),y()}catch(t){S(n),C("-",n)}})),e.src=i,c.querySelectorAll("img").forEach((t=>t.remove())),c.prepend(e)})),t&&i.readAsDataURL(t)}Object.entries(Gt.getItem(Xt)||{}).forEach((([t,e])=>{const i=f.querySelector(`[name="${t}"]`);i&&(i.checked=e)})),document.addEventListener("capture-photo:error",(t=>{e.hidden=!0,d.hidden=!0,u.hidden=!1,s.hidden=!0;const i=t.detail.error;if("NotFoundError"===i.name)return;const n="NotAllowedError"===i.name?"Permission to use webcam was denied. Reload the page to give appropriate permissions to webcam.":i.message;te(n,"danger")}),{once:!0}),r.addEventListener("click",(()=>{r.hidden=!0,v.hidden=!1,S(i),A()})),s.addEventListener("change",(t=>{const n=t.target.value;[d,u].forEach((t=>{t.hidden=t.id!==n})),"cameraView"===n&&(b=!0,e.hidden||e.loading||i.querySelector(".results__item")||A()),"fileView"===n&&(b=!1)})),l.addEventListener("change",(t=>{O(t.target.files[0])})),c.addEventListener("dragover",(t=>{t.stopPropagation(),t.preventDefault(),t.dataTransfer.dropEffect="copy"})),c.addEventListener("drop",(e=>{e.stopPropagation(),e.preventDefault();const i=e.dataTransfer.files,[n]=i;n&&t.includes(n.type)&&(l.value=l.defaultValue,O(n))})),h.addEventListener("resize-observer:resize",(()=>{E(e.shadowRoot.querySelector("video"))})),m.addEventListener("click",(()=>{p.showModal()})),p.addEventListener("click",(t=>{t.target===t.currentTarget&&p.close()})),f.addEventListener("change",(t=>{const e={};t.currentTarget.querySelectorAll('input[type="checkbox"]').forEach((t=>e[t.name]=t.checked)),Gt.setItem(Xt,e)}))}()}();
//# sourceMappingURL=index.542b928c.js.map
